// Database module for Bisa
// Uses sql.js (pure JavaScript SQLite) with IndexedDB persistence

const IDB_NAME = 'bisa-db';
const IDB_STORE = 'database';
const IDB_KEY = 'main';

// ============================================
// IndexedDB Helpers
// ============================================

export function openIDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(IDB_NAME, 1);
    request.onupgradeneeded = (e) => {
      e.target.result.createObjectStore(IDB_STORE);
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
}

export async function loadFromIDB() {
  try {
    const idb = await openIDB();
    return new Promise((resolve) => {
      const tx = idb.transaction(IDB_STORE, 'readonly');
      const store = tx.objectStore(IDB_STORE);
      const req = store.get(IDB_KEY);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (e) {
    return null;
  }
}

export function saveToIDB(data) {
  openIDB().then(idb => {
    const tx = idb.transaction(IDB_STORE, 'readwrite');
    tx.objectStore(IDB_STORE).put(data, IDB_KEY);
  }).catch(e => console.error('Failed to save to IndexedDB:', e));
}

// ============================================
// Schema Initialization
// ============================================

export function initializeSchema(db) {
  db.run(`
    CREATE TABLE IF NOT EXISTS reflections (
      lesson_id INTEGER PRIMARY KEY,
      content TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS practice_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      scenario_id INTEGER NOT NULL,
      user_question TEXT NOT NULL,
      score INTEGER NOT NULL,
      feedback TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS challenge_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      challenge_date TEXT NOT NULL,
      challenge_type TEXT NOT NULL,
      challenge_title TEXT NOT NULL,
      response TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS streak_data (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      current_streak INTEGER DEFAULT 0,
      last_challenge_date TEXT,
      longest_streak INTEGER DEFAULT 0
    )
  `);

  // Initialize streak data if not exists
  const streakCheck = db.exec("SELECT 1 FROM streak_data WHERE id = 1");
  if (streakCheck.length === 0) {
    db.run("INSERT INTO streak_data (id, current_streak, longest_streak) VALUES (1, 0, 0)");
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS journal_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      situation TEXT,
      question TEXT NOT NULL,
      question_type TEXT NOT NULL,
      outcome TEXT,
      rating INTEGER CHECK (rating >= 1 AND rating <= 5),
      reflection TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS simulation_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      simulation_id INTEGER NOT NULL,
      path TEXT NOT NULL,
      quality_scores TEXT NOT NULL,
      ending_node TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS sr_cards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      card_type TEXT NOT NULL,
      source_id INTEGER,
      front TEXT NOT NULL,
      back TEXT NOT NULL,
      ease_factor REAL DEFAULT 2.5,
      interval INTEGER DEFAULT 0,
      repetitions INTEGER DEFAULT 0,
      next_review TEXT DEFAULT CURRENT_TIMESTAMP,
      last_review TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS xp_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      activity_type TEXT NOT NULL,
      xp_amount INTEGER NOT NULL,
      description TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      achievement_id TEXT NOT NULL UNIQUE,
      unlocked_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS user_profile (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      display_name TEXT,
      avatar_id TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ---- Phase 1.5 Engine Tables ----

  db.run(`
    CREATE TABLE IF NOT EXISTS user_scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mode TEXT NOT NULL,
      category TEXT NOT NULL,
      score INTEGER NOT NULL,
      difficulty_tier INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS bpq_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      bpq_score INTEGER NOT NULL,
      category_scores TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS daily_quests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      quest_type TEXT NOT NULL,
      quest_target TEXT,
      quest_description TEXT,
      xp_reward INTEGER NOT NULL,
      completed INTEGER DEFAULT 0,
      progress INTEGER DEFAULT 0,
      goal INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS difficulty_tiers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL UNIQUE,
      current_tier INTEGER DEFAULT 1,
      rolling_scores TEXT DEFAULT '[]',
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS user_stats (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      total_xp INTEGER DEFAULT 0,
      current_level INTEGER DEFAULT 1,
      current_league TEXT DEFAULT 'Bronze',
      current_streak INTEGER DEFAULT 0,
      longest_streak INTEGER DEFAULT 0,
      last_active_date TEXT,
      weekly_xp INTEGER DEFAULT 0,
      week_start_date TEXT
    )
  `);

  // Initialize user_stats if not exists
  const statsCheck = db.exec("SELECT 1 FROM user_stats WHERE id = 1");
  if (statsCheck.length === 0) {
    db.run("INSERT INTO user_stats (id) VALUES (1)");
  }
}

// ============================================
// Query Helpers
// ============================================

export function query(db, sql) {
  if (!db) return [];
  const result = db.exec(sql);
  if (result.length === 0) return [];
  const columns = result[0].columns;
  return result[0].values.map(row => {
    const obj = {};
    columns.forEach((col, i) => obj[col] = row[i]);
    return obj;
  });
}

export function runStmt(db, sql, params = []) {
  if (!db) return;
  const stmt = db.prepare(sql);
  try {
    stmt.bind(params);
    stmt.step();
  } finally {
    stmt.free();
  }
}

export function queryStmt(db, sql, params = []) {
  if (!db) return [];
  const stmt = db.prepare(sql);
  try {
    stmt.bind(params);
    const results = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    return results;
  } finally {
    stmt.free();
  }
}

// ============================================
// Save Database
// ============================================

export function saveDatabase(db) {
  if (db) {
    const data = db.export();
    saveToIDB(data.buffer);
  }
}

// ============================================
// REFLECTION FUNCTIONS
// ============================================

export function getReflection(db, lessonId) {
  const results = queryStmt(db, "SELECT content FROM reflections WHERE lesson_id = ?", [lessonId]);
  return results.length > 0 ? results[0].content : '';
}

export function saveReflection(db, lessonId, content) {
  if (!db) return;
  const exists = queryStmt(db, "SELECT 1 FROM reflections WHERE lesson_id = ?", [lessonId]);
  if (exists.length > 0) {
    runStmt(db, "UPDATE reflections SET content = ?, updated_at = datetime('now') WHERE lesson_id = ?", [content, lessonId]);
  } else {
    runStmt(db, "INSERT INTO reflections (lesson_id, content) VALUES (?, ?)", [lessonId, content]);
  }
  saveDatabase(db);
}

// ============================================
// PRACTICE FUNCTIONS
// ============================================

export function savePracticeAttempt(db, scenarioId, userQuestion, score, feedback) {
  runStmt(
    db,
    "INSERT INTO practice_attempts (scenario_id, user_question, score, feedback, created_at) VALUES (?, ?, ?, ?, datetime('now'))",
    [scenarioId, userQuestion, score, feedback]
  );
  saveDatabase(db);
}

export function getPracticeStats(db) {
  const results = query(db, "SELECT COUNT(*) as count, AVG(score) as avg FROM practice_attempts");
  if (results.length > 0) {
    return {
      count: results[0].count || 0,
      average: Math.round(results[0].avg || 0)
    };
  }
  return { count: 0, average: 0 };
}

// ============================================
// STREAK & CHALLENGE FUNCTIONS
// ============================================

export function getStreakInfo(db) {
  const results = query(db, "SELECT current_streak, longest_streak, last_challenge_date FROM streak_data WHERE id = 1");
  if (results.length > 0) {
    return {
      currentStreak: results[0].current_streak || 0,
      longestStreak: results[0].longest_streak || 0,
      lastChallengeDate: results[0].last_challenge_date
    };
  }
  return { currentStreak: 0, longestStreak: 0, lastChallengeDate: null };
}

export function updateStreak(db, dateStr) {
  if (!db) return 0;
  const info = getStreakInfo(db);

  const today = new Date(dateStr);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let newStreak;
  if (info.lastChallengeDate === yesterdayStr) {
    newStreak = info.currentStreak + 1;
  } else if (info.lastChallengeDate === dateStr) {
    newStreak = info.currentStreak;
  } else {
    newStreak = 1;
  }

  const newLongest = Math.max(newStreak, info.longestStreak);
  runStmt(db, "UPDATE streak_data SET current_streak = ?, longest_streak = ?, last_challenge_date = ? WHERE id = 1",
    [newStreak, newLongest, dateStr]);
  saveDatabase(db);

  return newStreak;
}

export function isChallengeCompletedToday(db, dateStr) {
  const results = queryStmt(db, "SELECT 1 FROM challenge_history WHERE challenge_date = ?", [dateStr]);
  return results.length > 0;
}

export function saveChallengeCompletion(db, date, type, title, response) {
  runStmt(
    db,
    "INSERT INTO challenge_history (challenge_date, challenge_type, challenge_title, response, created_at) VALUES (?, ?, ?, ?, datetime('now'))",
    [date, type, title, response]
  );
  saveDatabase(db);
}

export function getChallengeHistory(db, limit = 30) {
  const results = query(db, `SELECT challenge_date, challenge_type, challenge_title, response FROM challenge_history ORDER BY created_at DESC LIMIT ${limit}`);
  return results.map(r => ({
    date: r.challenge_date,
    type: r.challenge_type,
    title: r.challenge_title,
    response: r.response
  }));
}

// ============================================
// JOURNAL FUNCTIONS
// ============================================

export function addJournalEntry(db, entry) {
  runStmt(
    db,
    "INSERT INTO journal_entries (situation, question, question_type, outcome, rating, reflection, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime('now'))",
    [entry.situation || null, entry.question, entry.type, entry.outcome || null, entry.rating || null, entry.reflection || null]
  );
  saveDatabase(db);

  const result = query(db, "SELECT last_insert_rowid() as id");
  return result.length > 0 ? result[0].id : 0;
}

export function getJournalEntries(db, limit = 50) {
  const results = query(db, `SELECT id, situation, question, question_type, outcome, rating, reflection, created_at FROM journal_entries ORDER BY created_at DESC LIMIT ${limit}`);
  return results.map(r => ({
    id: r.id,
    situation: r.situation,
    question: r.question,
    type: r.question_type,
    outcome: r.outcome,
    rating: r.rating,
    reflection: r.reflection,
    date: r.created_at ? new Date(r.created_at).toLocaleDateString() : new Date().toLocaleDateString()
  }));
}

export function getJournalEntry(db, id) {
  const results = queryStmt(db, "SELECT id, situation, question, question_type, outcome, rating, reflection, created_at FROM journal_entries WHERE id = ?", [id]);
  if (results.length === 0) return null;
  const r = results[0];
  return {
    id: r.id,
    situation: r.situation,
    question: r.question,
    type: r.question_type,
    outcome: r.outcome,
    rating: r.rating,
    reflection: r.reflection,
    date: r.created_at ? new Date(r.created_at).toLocaleDateString() : new Date().toLocaleDateString()
  };
}

export function deleteJournalEntry(db, id) {
  runStmt(db, "DELETE FROM journal_entries WHERE id = ?", [id]);
  saveDatabase(db);
}

// ============================================
// SIMULATION FUNCTIONS
// ============================================

export function saveSimulationAttempt(db, simId, path, qualityScores, endingNode) {
  runStmt(
    db,
    "INSERT INTO simulation_attempts (simulation_id, path, quality_scores, ending_node, created_at) VALUES (?, ?, ?, ?, datetime('now'))",
    [simId, JSON.stringify(path), JSON.stringify(qualityScores), endingNode]
  );
  saveDatabase(db);
}

export function getSimulationStats(db) {
  const results = query(db, "SELECT simulation_id, ending_node, COUNT(*) as count FROM simulation_attempts GROUP BY simulation_id, ending_node");

  const stats = {};
  for (const row of results) {
    const simId = row.simulation_id;
    const endingNode = row.ending_node;
    const count = row.count;

    if (!stats[simId]) {
      stats[simId] = { attempts: 0, greatEndings: 0, goodEndings: 0, poorEndings: 0 };
    }
    stats[simId].attempts += count;

    if (endingNode.includes('great')) {
      stats[simId].greatEndings += count;
    } else if (endingNode.includes('medium') || endingNode.includes('good')) {
      stats[simId].goodEndings += count;
    } else {
      stats[simId].poorEndings += count;
    }
  }
  return stats;
}

// ============================================
// SPACED REPETITION FUNCTIONS (SM-2 Algorithm)
// ============================================

export function seedReviewCards(db, scenarios, challenges) {
  if (!db) return 0;
  let created = 0;

  // Seed from practice scenarios
  for (const scenario of scenarios) {
    const exists = queryStmt(db, "SELECT 1 FROM sr_cards WHERE card_type = ? AND source_id = ?", ['practice', scenario.id]);
    if (exists.length > 0) continue;

    const front = `Context: ${scenario.context}\n\nWeak question: "${scenario.weakQuestion}"\n\nSkill: ${scenario.skillCategory}`;
    const back = scenario.strongExamples.join('\n\nOR:\n\n');

    runStmt(
      db,
      "INSERT INTO sr_cards (card_type, source_id, front, back, created_at) VALUES (?, ?, ?, ?, datetime('now'))",
      ['practice', scenario.id, front, back]
    );
    created++;
  }

  // Seed from challenges
  for (let i = 0; i < challenges.length; i++) {
    const challenge = challenges[i];
    const exists = queryStmt(db, "SELECT 1 FROM sr_cards WHERE card_type = ? AND source_id = ?", ['challenge', i]);
    if (exists.length > 0) continue;

    const front = `${challenge.type}: ${challenge.title}\n\n${challenge.description}\n\nPrompt: ${challenge.prompt}`;
    const back = `Example:\n${challenge.example}`;

    runStmt(
      db,
      "INSERT INTO sr_cards (card_type, source_id, front, back, created_at) VALUES (?, ?, ?, ?, datetime('now'))",
      ['challenge', i, front, back]
    );
    created++;
  }

  saveDatabase(db);
  return created;
}

export function seedFlashcards(db, flashcards) {
  if (!db || !flashcards) return 0;
  let created = 0;

  for (const card of flashcards) {
    const exists = queryStmt(db, "SELECT 1 FROM sr_cards WHERE card_type = ? AND source_id = ?", ['flashcard', card.id]);
    if (exists.length > 0) continue;

    runStmt(
      db,
      "INSERT INTO sr_cards (card_type, source_id, front, back, created_at) VALUES (?, ?, ?, ?, datetime('now'))",
      ['flashcard', card.id, card.front, card.back]
    );
    created++;
  }

  saveDatabase(db);
  return created;
}

export function getDueCards(db, limit = 10) {
  const now = new Date().toISOString();
  const results = query(db, `SELECT id, card_type, source_id, front, back, ease_factor, interval, repetitions, next_review FROM sr_cards WHERE next_review <= '${now}' ORDER BY next_review ASC LIMIT ${limit}`);
  return results;
}

export function getCard(db, cardId) {
  const results = queryStmt(db, "SELECT id, card_type, source_id, front, back, ease_factor, interval, repetitions, next_review FROM sr_cards WHERE id = ?", [cardId]);
  return results.length > 0 ? results[0] : null;
}

export function submitReview(db, cardId, quality) {
  const card = getCard(db, cardId);
  if (!card) return null;

  // SM-2 Algorithm
  quality = Math.max(0, Math.min(5, quality));

  let newEaseFactor = card.ease_factor;
  let newRepetitions = card.repetitions;
  let newInterval = card.interval;

  if (quality >= 3) {
    // Correct response
    if (newRepetitions === 0) {
      newInterval = 1;
    } else if (newRepetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(card.interval * card.ease_factor);
    }
    newRepetitions = card.repetitions + 1;
  } else {
    // Incorrect - reset
    newRepetitions = 0;
    newInterval = 1;
  }

  // Update ease factor
  newEaseFactor = card.ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (newEaseFactor < 1.3) newEaseFactor = 1.3;

  // Calculate next review date
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + newInterval);
  const nextReview = nextDate.toISOString();

  runStmt(
    db,
    "UPDATE sr_cards SET ease_factor = ?, interval = ?, repetitions = ?, next_review = ?, last_review = datetime('now') WHERE id = ?",
    [newEaseFactor, newInterval, newRepetitions, nextReview, cardId]
  );
  saveDatabase(db);

  return { newInterval, newEaseFactor, newRepetitions, nextReview };
}

export function getReviewStats(db) {
  const now = new Date().toISOString();
  const total = query(db, "SELECT COUNT(*) as count FROM sr_cards");
  const due = query(db, `SELECT COUNT(*) as count FROM sr_cards WHERE next_review <= '${now}'`);
  const learned = query(db, "SELECT COUNT(*) as count FROM sr_cards WHERE repetitions > 0");

  return {
    totalCards: total.length > 0 ? total[0].count : 0,
    cardsDue: due.length > 0 ? due[0].count : 0,
    cardsLearned: learned.length > 0 ? learned[0].count : 0
  };
}

// ============================================
// XP FUNCTIONS
// ============================================

export function addXP(db, activityType, amount, description) {
  runStmt(
    db,
    "INSERT INTO xp_log (activity_type, xp_amount, description, created_at) VALUES (?, ?, ?, datetime('now'))",
    [activityType, amount, description || null]
  );
  saveDatabase(db);
}

export function getTotalXP(db) {
  const results = query(db, "SELECT COALESCE(SUM(xp_amount), 0) as total FROM xp_log");
  return results.length > 0 ? results[0].total : 0;
}

export function getXPHistory(db, limit = 50) {
  const results = query(db, `SELECT id, activity_type, xp_amount, description, created_at FROM xp_log ORDER BY created_at DESC LIMIT ${limit}`);
  return results;
}

// ============================================
// ACHIEVEMENT FUNCTIONS
// ============================================

export function unlockAchievement(db, achievementId) {
  const exists = queryStmt(db, "SELECT 1 FROM achievements WHERE achievement_id = ?", [achievementId]);
  if (exists.length > 0) return false;

  runStmt(
    db,
    "INSERT INTO achievements (achievement_id, unlocked_at) VALUES (?, datetime('now'))",
    [achievementId]
  );
  saveDatabase(db);
  return true;
}

export function getUnlockedAchievements(db) {
  const results = query(db, "SELECT achievement_id, unlocked_at FROM achievements ORDER BY unlocked_at DESC");
  return results;
}

// ============================================
// USER PROFILE FUNCTIONS
// ============================================

export function getOrCreateProfile(db) {
  const results = query(db, "SELECT id, display_name, avatar_id, created_at FROM user_profile WHERE id = 1");
  if (results.length > 0) {
    return results[0];
  }
  // Create default profile
  db.run("INSERT INTO user_profile (id, display_name, avatar_id) VALUES (1, 'Learner', 'default')");
  saveDatabase(db);
  return { id: 1, display_name: 'Learner', avatar_id: 'default', created_at: new Date().toISOString() };
}

export function updateProfile(db, data) {
  // Ensure profile exists
  getOrCreateProfile(db);

  const fields = [];
  const params = [];

  if (data.displayName !== undefined) {
    fields.push('display_name = ?');
    params.push(data.displayName);
  }
  if (data.avatarId !== undefined) {
    fields.push('avatar_id = ?');
    params.push(data.avatarId);
  }

  if (fields.length === 0) return;

  params.push(1); // WHERE id = 1
  runStmt(db, `UPDATE user_profile SET ${fields.join(', ')} WHERE id = ?`, params);
  saveDatabase(db);
}

// ============================================
// OVERALL PROGRESS
// ============================================

export function getOverallProgress(db) {
  const reflections = query(db, "SELECT COUNT(*) as count FROM reflections");
  const practice = query(db, "SELECT COUNT(*) as count, AVG(score) as avg FROM practice_attempts");
  const challenges = query(db, "SELECT COUNT(*) as count FROM challenge_history");
  const journal = query(db, "SELECT COUNT(*) as count FROM journal_entries");
  const simulations = query(db, "SELECT COUNT(*) as count FROM simulation_attempts");
  const streak = getStreakInfo(db);
  const reviewStats = getReviewStats(db);
  const totalXP = getTotalXP(db);

  return {
    lessonsWithReflections: reflections.length > 0 ? reflections[0].count : 0,
    totalPracticeAttempts: practice.length > 0 ? practice[0].count : 0,
    averagePracticeScore: practice.length > 0 ? Math.round(practice[0].avg || 0) : 0,
    challengesCompleted: challenges.length > 0 ? challenges[0].count : 0,
    journalEntries: journal.length > 0 ? journal[0].count : 0,
    simulationsCompleted: simulations.length > 0 ? simulations[0].count : 0,
    currentStreak: streak.currentStreak,
    longestStreak: streak.longestStreak,
    cardsLearned: reviewStats.cardsLearned,
    cardsDue: reviewStats.cardsDue,
    totalXP
  };
}
