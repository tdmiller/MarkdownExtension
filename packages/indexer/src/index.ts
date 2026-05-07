export interface IndexedLink {
  target: string;
  sourceLine: number;
}

function scanMarkdownLinks(line: string): string[] {
  const targets: string[] = [];
  let cursor = 0;

  while (cursor < line.length) {
    const labelStart = line.indexOf('[', cursor);
    if (labelStart === -1) {
      break;
    }

    const labelEnd = line.indexOf('](', labelStart + 1);
    if (labelEnd === -1) {
      break;
    }

    const targetEnd = line.indexOf(')', labelEnd + 2);
    if (targetEnd === -1) {
      break;
    }

    targets.push(line.slice(labelEnd + 2, targetEnd));
    cursor = targetEnd + 1;
  }

  return targets;
}

export function indexLinks(markdownSource: string): IndexedLink[] {
  return markdownSource.split(/\r?\n/).flatMap((line, index) => {
    return scanMarkdownLinks(line).map((target) => ({
      target,
      sourceLine: index + 1,
    }));
  });
}
