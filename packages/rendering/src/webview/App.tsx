import { type ChangeEvent, useEffect, useMemo, useState } from 'react';
import type { HostToWebviewMessage, WebviewToHostMessage } from './protocol.js';

declare function acquireVsCodeApi(): { postMessage: (message: WebviewToHostMessage) => void };

const vscode = typeof acquireVsCodeApi === 'function'
  ? acquireVsCodeApi()
  : { postMessage: (_message: WebviewToHostMessage) => undefined };

export function App(): JSX.Element {
  const [markdown, setMarkdown] = useState('');
  const [mode, setMode] = useState<'source' | 'wysiwyg'>('wysiwyg');

  useEffect(() => {
    const onMessage = (event: MessageEvent<HostToWebviewMessage>) => {
      if (event.data.type === 'init') {
        setMarkdown(event.data.markdown);
      }

      if (event.data.type === 'render-state') {
        setMode(event.data.mode);
      }
    };

    window.addEventListener('message', onMessage);
    vscode.postMessage({ type: 'ready' });

    return () => window.removeEventListener('message', onMessage);
  }, []);

  const headingPreview = useMemo(() => {
    const headingLine = markdown.split(/\r?\n/).find((line) => line.startsWith('# '));
    return headingLine?.slice(2).trim() || 'Untitled Markdown Document';
  }, [markdown]);

  return (
    <main>
      <h1>{headingPreview}</h1>
      <p>Mode: {mode}</p>
      <textarea
        aria-label="Markdown source"
        value={markdown}
        rows={12}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setMarkdown(event.target.value)}
      />
      <button type="button" onClick={() => vscode.postMessage({ type: 'apply-edit', markdown })}>
        Apply to source document
      </button>
    </main>
  );
}
