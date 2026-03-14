import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightning, Eye, ArrowCounterClockwise, ArrowRight } from '@phosphor-icons/react';
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

  const CTA_LABELS = ['How it works', 'One more thing', "Let's go"];

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
        <button className="onboarding-cta" onClick={next}>
          {CTA_LABELS[slide]}
          <ArrowRight size={18} weight="bold" />
        </button>
      </div>
    </div>
  );
}

function WelcomeScreen() {
  return (
    <div className="onboarding-screen">
      <div className="onboarding-welcome-top">
        <div className="onboarding-brand-mark">
          <NeaOnnim size={96} variant="full" withAnimation />
        </div>
        <p className="onboarding-eyebrow">ask · learn · grow</p>
        <h1 className="onboarding-headline">Bisa</h1>
        <p className="onboarding-meaning">Twi for <em>"to ask"</em></p>
      </div>
      <div className="onboarding-welcome-body">
        <p className="onboarding-body">
          Most people are never taught how to communicate — how to ask the right questions, read what people actually mean, and respond in a way that lands.
        </p>
        <p className="onboarding-body">
          Bisa trains that.
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
      tagline: 'Train your instinct to ask better questions.',
      desc: "Timed scenarios that push you to ask instead of assume. The faster you get, the more natural it becomes.",
    },
    {
      Icon: Eye,
      color: '#8B5CF6',
      name: 'Pattern Recognition',
      tagline: 'Learn to read people and situations accurately.',
      desc: "Five training modes that sharpen how you read tone, subtext, body language, and your own defaults — before you respond.",
    },
    {
      Icon: ArrowCounterClockwise,
      color: '#3B82F6',
      name: 'Review',
      tagline: 'Make sure what you learn actually sticks.',
      desc: "Spaced repetition that tests application, not memorization. Quick drills that adapt to what you're getting right and where you're slipping.",
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
        Bisa trains the skill underneath every conversation — the ability to read what's really happening before you act. That's what separates people who communicate from people who just talk.
      </p>
    </div>
  );
}
