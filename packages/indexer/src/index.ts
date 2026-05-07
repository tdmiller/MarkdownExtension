const LINK_PATTERN = /\[[^\]]+\]\(([^)]+)\)/g;

export interface IndexedLink {
  target: string;
  sourceLine: number;
}

export function indexLinks(markdownSource: string): IndexedLink[] {
  return markdownSource.split(/\r?\n/).flatMap((line, index) => {
    const links: IndexedLink[] = [];
    let match = LINK_PATTERN.exec(line);

    while (match) {
      links.push({ target: match[1], sourceLine: index + 1 });
      match = LINK_PATTERN.exec(line);
    }

    LINK_PATTERN.lastIndex = 0;
    return links;
  });
}
