import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightning, Eye, ArrowCounterClockwise, ArrowRight, ArrowLeft } from '@phosphor-icons/react';
import { NeaOnnim } from '../components/brand';
import './OnboardingPage.css';

export default function OnboardingPage() {
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();

  const finish = () => {
    localStorage.setItem('bisa-onboarding-done', 'true');
    navigate('/auth');
  };

  const next = () => {
    if (slide < 2) setSlide(s => s + 1);
    else finish();
  };

  const back = () => {
    if (slide > 0) setSlide(s => s - 1);
  };

  const CTA_LABELS = ['How it works', 'One more thing', "Let's begin"];

  return (
    <div className="onboarding">
      <div className="onboarding-card animate-fade-in">
        <div className="onboarding-card-body">
          <div key={slide} className="onboarding-slide animate-slide-fade-in">
            {slide === 0 && <WelcomeScreen />}
            {slide === 1 && <ModesScreen />}
            {slide === 2 && <PhilosophyScreen />}
          </div>
        </div>

        <div className="onboarding-card-footer">
          <div className="onboarding-footer-left">
            {slide > 0 && (
              <button className="onboarding-back" onClick={back} aria-label="Go back">
                <ArrowLeft size={15} weight="bold" />
              </button>
            )}
            <div className="onboarding-dots">
              {[0, 1, 2].map(i => (
                <div key={i} className={`onboarding-dot${i === slide ? ' active' : ''}`} />
              ))}
            </div>
            <button className="onboarding-skip" onClick={finish}>Skip</button>
          </div>
          <button className="onboarding-cta" onClick={next}>
            {CTA_LABELS[slide]}
            <ArrowRight size={15} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}

function WelcomeScreen() {
  return (
    <div className="onboarding-screen">
      <p className="onboarding-eyebrow">ask · learn · grow</p>
      <div className="onboarding-headline-row">
        <NeaOnnim size={48} />
        <h1 className="onboarding-headline">Bisa</h1>
      </div>
      <div className="onboarding-welcome-body">
        <p className="onboarding-body">
          There's a skill most of us were never taught — how to ask the kind of questions that actually open things up. Not interrogate. Not perform. Just genuinely understand.
        </p>
        <p className="onboarding-body">
          Bisa is a quiet space to practice that.
        </p>
        <div className="onboarding-example">
          <div className="onboarding-example-before">
            <span className="onboarding-example-label before">Before</span>
            <span className="onboarding-example-text">"Was that a good meeting?"</span>
          </div>
          <div className="onboarding-example-arrow">↓</div>
          <div className="onboarding-example-after">
            <span className="onboarding-example-label after">After</span>
            <span className="onboarding-example-text">"What would have made that meeting more useful for you?"</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModesScreen() {
  const modes = [
    {
      Icon: Lightning,
      name: 'Daily prompts',
      desc: 'Short scenarios to reframe how you ask',
    },
    {
      Icon: Eye,
      name: 'Reflection modes',
      desc: 'See the difference a better question makes',
    },
    {
      Icon: ArrowCounterClockwise,
      name: 'Growth tracking',
      desc: 'Watch your question instincts evolve over time',
    },
  ];

  return (
    <div className="onboarding-screen">
      <p className="onboarding-eyebrow">How it works</p>
      <h2 className="onboarding-subtitle">A quiet space to practice asking well.</h2>
      <p className="onboarding-body">
        Bisa gives you small, thoughtful exercises to sharpen the questions you bring to conversations, work, and life.
      </p>
      <div className="onboarding-features">
        {modes.map(({ Icon, name, desc }) => (
          <div key={name} className="onboarding-feature-row">
            <div className="onboarding-feature-icon">
              <Icon size={18} weight="duotone" color="#78716C" />
            </div>
            <div className="onboarding-feature-text">
              <span className="onboarding-feature-name">{name}</span>
              <span className="onboarding-feature-desc">{desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhilosophyScreen() {
  return (
    <div className="onboarding-screen onboarding-screen--center">
      <div className="onboarding-quote-mark">"</div>
      <h2 className="onboarding-philosophy">
        Before you can say the right thing, you have to see the right thing.
      </h2>
      <p className="onboarding-body">
        Most conversations go sideways before anyone opens their mouth — because nobody stopped to ask what was actually needed. Bisa helps you slow down just enough to notice.
      </p>
      <p className="onboarding-body">
        It's a small skill. It changes a lot.
      </p>
    </div>
  );
}
