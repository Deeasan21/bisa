/**
 * Spaced Repetition (Review) database operations.
 */
import { supabase } from '../../lib/supabase';

// SM-2 algorithm
function sm2(card, quality) {
  quality = Math.max(0, Math.min(5, quality));
  let { ease_factor, interval, repetitions } = card;

  if (quality >= 3) {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * ease_factor);
    repetitions += 1;
  } else {
    repetitions = 0;
    interval = 1;
  }

  ease_factor = ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (ease_factor < 1.3) ease_factor = 1.3;

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);
  const next_review = nextDate.toISOString();

  return { ease_factor, interval, repetitions, next_review };
}

export function buildReviewFunctions(userId) {
  async function seedReviewCards(scenarios, challenges) {
    try {
      let created = 0;
      const { data: existing } = await supabase
        .from('sr_cards')
        .select('card_type, source_id')
        .eq('user_id', userId);
      const existingSet = new Set((existing || []).map(r => `${r.card_type}:${r.source_id}`));

      const toInsert = [];
      for (const scenario of scenarios) {
        if (existingSet.has(`practice:${scenario.id}`)) continue;
        const front = `Context: ${scenario.context}\n\nWeak question: "${scenario.weakQuestion}"\n\nSkill: ${scenario.skillCategory}`;
        const back = scenario.strongExamples.join('\n\nOR:\n\n');
        toInsert.push({ user_id: userId, card_type: 'practice', source_id: scenario.id, front, back });
        created++;
      }
      for (let i = 0; i < challenges.length; i++) {
        if (existingSet.has(`challenge:${i}`)) continue;
        const challenge = challenges[i];
        const front = `${challenge.type}: ${challenge.title}\n\n${challenge.description}\n\nPrompt: ${challenge.prompt}`;
        const back = `Example:\n${challenge.example}`;
        toInsert.push({ user_id: userId, card_type: 'challenge', source_id: i, front, back });
        created++;
      }
      if (toInsert.length > 0) {
        await supabase.from('sr_cards').insert(toInsert);
      }
      return created;
    } catch (e) { console.error('seedReviewCards:', e); return 0; }
  }

  async function seedFlashcards(flashcards) {
    try {
      if (!flashcards) return 0;
      const { data: existing } = await supabase
        .from('sr_cards')
        .select('source_id')
        .eq('user_id', userId)
        .eq('card_type', 'flashcard');
      const existingIds = new Set((existing || []).map(r => r.source_id));
      const toInsert = [];
      for (const card of flashcards) {
        if (existingIds.has(card.id)) continue;
        toInsert.push({ user_id: userId, card_type: 'flashcard', source_id: card.id, front: card.front, back: card.back });
      }
      if (toInsert.length > 0) await supabase.from('sr_cards').insert(toInsert);
      return toInsert.length;
    } catch (e) { console.error('seedFlashcards:', e); return 0; }
  }

  async function getDueCards(limit = 10) {
    try {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('sr_cards')
        .select('id, card_type, source_id, front, back, ease_factor, interval, repetitions, next_review')
        .eq('user_id', userId)
        .lte('next_review', now)
        .order('next_review', { ascending: true })
        .limit(limit);
      if (error) throw error;
      return data || [];
    } catch (e) { console.error('getDueCards:', e); return []; }
  }

  async function submitReview(cardId, quality) {
    try {
      const { data: card, error } = await supabase
        .from('sr_cards')
        .select('ease_factor, interval, repetitions')
        .eq('user_id', userId)
        .eq('id', cardId)
        .single();
      if (error || !card) return null;

      const result = sm2(card, quality);
      await supabase.from('sr_cards').update({
        ease_factor: result.ease_factor,
        interval: result.interval,
        repetitions: result.repetitions,
        next_review: result.next_review,
        last_review: new Date().toISOString(),
      }).eq('user_id', userId).eq('id', cardId);

      return result;
    } catch (e) { console.error('submitReview:', e); return null; }
  }

  async function getReviewStats() {
    try {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('sr_cards')
        .select('repetitions, next_review')
        .eq('user_id', userId);
      if (error) throw error;
      const rows = data || [];
      const totalCards = rows.length;
      const cardsDue = rows.filter(r => r.next_review <= now).length;
      const cardsLearned = rows.filter(r => r.repetitions > 0).length;
      return { totalCards, cardsDue, cardsLearned };
    } catch (e) { console.error('getReviewStats:', e); return { totalCards: 0, cardsDue: 0, cardsLearned: 0 }; }
  }

  async function getLearnedCards(limit = 20) {
    try {
      const { data, error } = await supabase
        .from('sr_cards')
        .select('front, card_type, last_review, repetitions')
        .eq('user_id', userId)
        .gt('repetitions', 0)
        .order('last_review', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data || [];
    } catch (e) { console.error('getLearnedCards:', e); return []; }
  }

  return {
    seedReviewCards, seedFlashcards, getDueCards, submitReview, getReviewStats, getLearnedCards,
  };
}
