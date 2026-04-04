import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lightning, Eye, ArrowCounterClockwise, ArrowRight, ArrowLeft } from '@phosphor-icons/react';
import { NeaOnnim } from '../components/brand';
import { useSupabaseDB } from '../hooks/useSupabaseDB';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function OnboardingPage() {
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.next || '/';
  const { db } = useSupabaseDB();

  const TOTAL_SLIDES = 3;

  const finish = async () => {
    try { await db.markOnboardingComplete(); } catch {}
    navigate(destination, { replace: true });
  };

  const next = () => {
    if (slide < TOTAL_SLIDES - 1) setSlide(s => s + 1);
    else finish();
  };

  const back = () => {
    if (slide > 0) setSlide(s => s - 1);
  };

  const CTA_LABELS = ['How it works', 'Almost there', 'Get started'];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm animate-fade-in">
        {/* Slide content */}
        <div key={slide} className="animate-fade-in mb-8">
          {slide === 0 && <WelcomeScreen />}
          {slide === 1 && <ModesScreen />}
          {slide === 2 && <PhilosophyScreen />}
        </div>

        {/* Footer nav */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {slide > 0 && (
              <button
                className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-50"
                onClick={back}
                aria-label="Go back"
              >
                <ArrowLeft size={15} weight="bold" />
              </button>
            )}
            <div className="flex gap-1.5">
              {Array.from({ length: TOTAL_SLIDES }, (_, i) => (
                <div
                  key={i}
                  className={cn(
                    'rounded-full transition-all',
                    i === slide
                      ? 'w-5 h-2 bg-gold'
                      : 'w-2 h-2 bg-stone-200'
                  )}
                />
              ))}
            </div>
            {slide < TOTAL_SLIDES - 1 && (
              <button
                className="text-sm text-stone-400 hover:text-stone-600"
                onClick={finish}
              >
                Skip
              </button>
            )}
          </div>

          <Button
            className="bg-gold hover:bg-gold-mid text-stone-900 font-semibold gap-2"
            onClick={next}
          >
            {CTA_LABELS[slide]}
            <ArrowRight size={15} weight="bold" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function WelcomeScreen() {
  return (
    <div className="space-y-6">
      <p className="text-xs font-semibold tracking-widest text-gold uppercase">ask · learn · grow</p>
      <div className="flex items-center gap-3">
        <NeaOnnim size={48} />
        <h1 className="font-serif text-4xl font-bold text-stone-900">Bisa</h1>
      </div>
      <div className="space-y-4">
        <p className="text-stone-600 leading-relaxed">
          There's a skill most of us were never taught — how to ask the kind of questions that actually open things up. Not interrogate. Not perform. Just genuinely understand.
        </p>
        <p className="text-stone-600 leading-relaxed">Bisa is a quiet space to practice that.</p>

        <div className="rounded-xl border border-stone-200 overflow-hidden">
          <div className="px-4 py-3 bg-stone-50 border-b border-stone-200">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wide">Before</span>
            <p className="text-sm text-stone-600 mt-0.5">"Was that a good meeting?"</p>
          </div>
          <div className="px-4 py-3">
            <span className="text-xs font-semibold text-gold uppercase tracking-wide">After</span>
            <p className="text-sm text-stone-700 font-medium mt-0.5">"What would have made that meeting more useful for you?"</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModesScreen() {
  const modes = [
    { Icon: Lightning, name: 'Daily prompts', desc: 'Short scenarios to reframe how you ask' },
    { Icon: Eye, name: 'Reflection modes', desc: 'See the difference a better question makes' },
    { Icon: ArrowCounterClockwise, name: 'Growth tracking', desc: 'Watch your question instincts evolve over time' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-2">How it works</p>
        <h2 className="font-serif text-2xl font-bold text-stone-900">A quiet space to practice asking well.</h2>
      </div>
      <p className="text-stone-600 leading-relaxed">
        Bisa gives you small, thoughtful exercises to sharpen the questions you bring to conversations, work, and life.
      </p>
      <div className="space-y-3">
        {modes.map(({ Icon, name, desc }) => (
          <div key={name} className="flex items-start gap-3 p-3 rounded-xl bg-stone-50">
            <div className="w-9 h-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center flex-shrink-0">
              <Icon size={18} weight="duotone" color="#78716C" />
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-800">{name}</p>
              <p className="text-xs text-stone-500 mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhilosophyScreen() {
  return (
    <div className="space-y-6">
      <div className="font-serif text-6xl text-gold leading-none">"</div>
      <h2 className="font-serif text-2xl font-bold text-stone-900 leading-snug">
        Before you can say the right thing, you have to see the right thing.
      </h2>
      <p className="text-stone-600 leading-relaxed">
        Most conversations go sideways before anyone opens their mouth — because nobody stopped to ask what was actually needed. Bisa helps you slow down just enough to notice.
      </p>
      <p className="text-stone-600 leading-relaxed">
        It's a small skill. It changes a lot.
      </p>
    </div>
  );
}
