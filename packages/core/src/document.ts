import type { HeadingToken, MarkdownDocumentModel } from './types.js';

const HEADING_PATTERN = /^(#{1,6})\s+(.*)$/;

export function parseMarkdownSource(source: string): MarkdownDocumentModel {
  const lines = source.split(/\r?\n/);
  const headings: HeadingToken[] = [];

  lines.forEach((lineText, index) => {
    const match = HEADING_PATTERN.exec(lineText);
    if (!match) {
      return;
    }

    headings.push({
      depth: match[1].length,
      text: match[2].trim(),
      line: index + 1,
    });
  });

  return { source, lines, headings };
}

export function serializeMarkdownModel(document: MarkdownDocumentModel): string {
  return document.source;
}
