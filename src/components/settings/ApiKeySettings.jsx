import { useState, useEffect } from 'react';
import { Key, CheckCircle, XCircle, Spinner } from '@phosphor-icons/react';
import { getApiKey, setApiKey, hasPersonalApiKey, testConnection } from '../../services/claudeApi';
import Button from '../common/Button';
import './ApiKeySettings.css';

export default function ApiKeySettings() {
  const [key, setKey] = useState('');
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null); // 'ok' | 'fail' | null

  useEffect(() => {
    const stored = getApiKey();
    if (stored) {
      setKey(stored);
      setSaved(true);
    }
  }, []);

  const maskKey = (k) => {
    if (!k || k.length < 12) return k;
    return k.slice(0, 7) + '...' + k.slice(-4);
  };

  const handleSave = () => {
    setApiKey(key);
    setSaved(true);
    setTestResult(null);
  };

  const handleClear = () => {
    setApiKey('');
    setKey('');
    setSaved(false);
    setTestResult(null);
  };

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const ok = await testConnection();
      setTestResult(ok ? 'ok' : 'fail');
    } catch {
      setTestResult('fail');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="api-key-settings">
      <div className="api-key-header">
        <Key size={20} weight="duotone" color="var(--text-secondary)" />
        <h3>AI Features</h3>
      </div>
      <p className="api-key-desc">
        Bisa includes AI-powered coaching for everyone. Want to use your own
        API key for unlimited access? Add it below. Your key is stored locally
        in your browser and never saved on any server.
      </p>

      <div className="api-key-input-row">
        {saved ? (
          <div className="api-key-masked">
            <span>{maskKey(key)}</span>
            {testResult === 'ok' && <CheckCircle size={16} weight="fill" color="#10B981" />}
            {testResult === 'fail' && <XCircle size={16} weight="fill" color="#EF4444" />}
          </div>
        ) : (
          <input
            type="password"
            className="api-key-input"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="sk-ant-api03-..."
          />
        )}
      </div>

      <div className="api-key-actions">
        {!saved ? (
          <Button
            variant="mode"
            modeColor="#8B5CF6"
            onClick={handleSave}
            disabled={!key.trim()}
          >
            Save Key
          </Button>
        ) : (
          <>
            <button
              className="api-key-btn test"
              onClick={handleTest}
              disabled={testing}
            >
              {testing ? <Spinner size={14} className="spin" /> : null}
              {testing ? 'Testing...' : 'Test Connection'}
            </button>
            <button className="api-key-btn clear" onClick={handleClear}>
              Clear Key
            </button>
          </>
        )}
      </div>

      {testResult === 'ok' && (
        <p className="api-key-status success">Connected! AI features are active.</p>
      )}
      {testResult === 'fail' && (
        <p className="api-key-status error">Connection failed. Check your key and try again.</p>
      )}

      <a
        className="api-key-link"
        href="https://console.anthropic.com/settings/keys"
        target="_blank"
        rel="noopener noreferrer"
      >
        Get an API key from Anthropic Console
      </a>
    </div>
  );
}
