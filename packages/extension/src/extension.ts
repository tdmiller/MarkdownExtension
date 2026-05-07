import * as vscode from 'vscode';
import { getWebviewHtml, type WebviewToHostMessage } from '@markdown-tooling/rendering';

const STARTER_MARKDOWN = `# Overview

## Usage
Describe how to use this document.

## References
- [Markdown Style Guide](./STYLE.md)`;

export function activate(context: vscode.ExtensionContext): void {
  const disposable = vscode.commands.registerCommand('markdownTooling.openWysiwyg', () => {
    const panel = vscode.window.createWebviewPanel(
      'markdownToolingWysiwyg',
      'Markdown Tooling WYSIWYG',
      vscode.ViewColumn.One,
      { enableScripts: true }
    );

    const scriptUri = panel.webview.asWebviewUri(
      vscode.Uri.joinPath(context.extensionUri, '..', 'rendering', 'dist', 'webview', 'index.js')
    );

    panel.webview.html = getWebviewHtml(scriptUri.toString());

    panel.webview.onDidReceiveMessage((message: WebviewToHostMessage) => {
      if (message.type === 'ready') {
        panel.webview.postMessage({ type: 'init', markdown: STARTER_MARKDOWN });
        panel.webview.postMessage({ type: 'render-state', mode: 'wysiwyg' });
        return;
      }

      if (message.type === 'apply-edit') {
        void vscode.window.showInformationMessage('Markdown Tooling received an edit from WYSIWYG mode.');
      }
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate(): void {}
