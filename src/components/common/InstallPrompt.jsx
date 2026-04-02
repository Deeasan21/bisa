import { useState, useEffect } from 'react';
import { X, DownloadSimple } from '@phosphor-icons/react';

const DISMISSED_KEY = 'bisa-install-dismissed';

export default function InstallPrompt() {
  const [prompt, setPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISSED_KEY)) return;

    const handler = (e) => {
      e.preventDefault();
      setPrompt(e);
      setVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!prompt) return;
    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === 'accepted') {
      setVisible(false);
    }
    setPrompt(null);
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="install-prompt animate-slide-up">
      <div className="install-prompt-icon">
        <DownloadSimple size={20} weight="duotone" color="#D4A853" />
      </div>
      <div className="install-prompt-text">
        <span className="install-prompt-title">Add Bisa to your home screen</span>
        <span className="install-prompt-sub">Practice anywhere, anytime</span>
      </div>
      <button className="install-prompt-cta" onClick={handleInstall}>Install</button>
      <button className="install-prompt-dismiss" onClick={handleDismiss} aria-label="Dismiss">
        <X size={16} weight="bold" />
      </button>
    </div>
  );
}
