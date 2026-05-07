import type { HeadingToken, MarkdownDocumentModel } from './types.js';

export function parseMarkdownSource(source: string): MarkdownDocumentModel {
  const lines = source.split(/\r?\n/);
  const headings: HeadingToken[] = [];

  lines.forEach((lineText, index) => {
    if (!lineText.startsWith('#')) {
      return;
    }

    let depth = 0;
    while (depth < 6 && lineText[depth] === '#') {
      depth += 1;
    }

    if (depth === 0 || lineText[depth] !== ' ') {
      return;
    }

    headings.push({
      depth,
      text: lineText.slice(depth + 1).trim(),
      line: index + 1,
    });
  });

  return { source, lines, headings };
}

export function serializeMarkdownModel(document: MarkdownDocumentModel): string {
  return document.source;
}
