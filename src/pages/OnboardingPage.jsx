import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightning, Eye, ArrowCounterClockwise, ArrowRight, ArrowLeft } from '@phosphor-icons/react';
import { NeaOnnim } from '../components/brand';
import Card from '../components/common/Card';
import './OnboardingPage.css';

export default function OnboardingPage() {
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();

  const finish = () => {
    localStorage.setItem('bisa-onboarding-done', 'true');
    navigate('/');
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
      <button className="onboarding-skip" onClick={finish}>Skip</button>

      <div className="onboarding-slides">
        <div key={slide} className="onboarding-slide animate-slide-fade-in">
          {slide === 0 && <WelcomeScreen />}
          {slide === 1 && <ModesScreen />}
          {slide === 2 && <PhilosophyScreen />}
        </div>
      </div>

      <div className="onboarding-footer">
        <div className="onboarding-dots">
          {[0, 1, 2].map(i => (
            <div key={i} className={`onboarding-dot${i === slide ? ' active' : ''}`} />
          ))}
        </div>
        <div className="onboarding-nav">
          <button
            className="onboarding-back"
            onClick={back}
            style={{ visibility: slide === 0 ? 'hidden' : 'visible' }}
            aria-hidden={slide === 0}
          >
            <ArrowLeft size={18} weight="bold" />
          </button>
          <button className="onboarding-cta" onClick={next}>
            {CTA_LABELS[slide]}
            <ArrowRight size={18} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}

function WelcomeScreen() {
  return (
    <div className="onboarding-screen">
      <div className="onboarding-welcome-top">
        <p className="onboarding-eyebrow">ask · learn · grow</p>
        <div className="onboarding-headline-row">
          <NeaOnnim size={52} variant="full" />
          <h1 className="onboarding-headline">Bisa</h1>
        </div>
      </div>
      <div className="onboarding-welcome-body">
        <p className="onboarding-body">
          There's a skill most of us were never taught — how to ask the kind of questions that actually open things up. Not interrogate. Not perform. Just genuinely understand.
        </p>
        <p className="onboarding-body">
          Bisa is a quiet space to practice that.
        </p>
      </div>
    </div>
  );
}

function ModesScreen() {
  const modes = [
    {
      Icon: Lightning,
      color: '#F59E0B',
      name: 'Question Burst',
      tagline: 'Build the instinct before the words.',
      desc: "Short timed rounds that train you to ask instead of assume. The goal isn't speed — it's making curiosity feel natural.",
    },
    {
      Icon: Eye,
      color: '#8B5CF6',
      name: 'Pattern Recognition',
      tagline: 'Learn to hear what isn\'t being said.',
      desc: "Five training modes that help you read tone, subtext, and your own defaults — before you respond.",
    },
    {
      Icon: ArrowCounterClockwise,
      color: '#3B82F6',
      name: 'Review',
      tagline: 'Let what you learn actually land.',
      desc: "Spaced repetition that tests how you apply ideas, not just whether you remember them.",
    },
  ];

  return (
    <div className="onboarding-screen">
      <h2 className="onboarding-subtitle">Three ways to train</h2>
      <div className="onboarding-modes">
        {modes.map(({ Icon, color, name, tagline, desc }) => (
          <Card key={name} padding="md" className="onboarding-mode-card">
            <div className="onboarding-mode-row">
              <div className="onboarding-mode-icon" style={{ background: `${color}18` }}>
                <Icon size={22} weight="duotone" color={color} />
              </div>
              <div className="onboarding-mode-content">
                <span className="onboarding-mode-name">{name}</span>
                <span className="onboarding-mode-tagline">{tagline}</span>
                <span className="onboarding-mode-desc">{desc}</span>
              </div>
            </div>
          </Card>
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
