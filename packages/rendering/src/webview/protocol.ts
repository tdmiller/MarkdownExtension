export type HostToWebviewMessage =
  | { type: 'init'; markdown: string }
  | { type: 'render-state'; mode: 'source' | 'wysiwyg' };

export type WebviewToHostMessage =
  | { type: 'ready' }
  | { type: 'apply-edit'; markdown: string };
