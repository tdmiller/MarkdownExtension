import { parseMarkdownSource, runRules, type MarkdownRule, type RuleDiagnostic } from '@markdown-tooling/core';

const oneH1Rule: MarkdownRule = {
  id: 'structure/one-h1',
  description: 'Require exactly one H1 heading per document.',
  run: ({ document }) => {
    const h1Headings = document.headings.filter((heading) => heading.depth === 1);
    if (h1Headings.length === 1) {
      return [];
    }

    return [{
      ruleId: 'structure/one-h1',
      message: `Expected exactly one H1 heading, found ${h1Headings.length}.`,
      line: h1Headings[0]?.line ?? 1,
      severity: 'error',
    }];
  },
};

const noSkippedHeadingLevelRule: MarkdownRule = {
  id: 'structure/no-skipped-heading-level',
  description: 'Disallow heading depth jumps larger than one level.',
  run: ({ document }) => {
    const diagnostics: RuleDiagnostic[] = [];

    for (let index = 1; index < document.headings.length; index += 1) {
      const previous = document.headings[index - 1];
      const current = document.headings[index];

      if (current.depth > previous.depth + 1) {
        diagnostics.push({
          ruleId: 'structure/no-skipped-heading-level',
          message: `Heading level jumps from H${previous.depth} to H${current.depth}.`,
          line: current.line,
          severity: 'warning',
        });
      }
    }

    return diagnostics;
  },
};

const requiredSectionsRule: MarkdownRule = {
  id: 'structure/required-sections',
  description: 'Require overview/usage/references sections for starter governance.',
  run: ({ document }) => {
    const requiredSections = ['Overview', 'Usage', 'References'];
    const headingNames = new Set(document.headings.map((heading) => heading.text.toLowerCase()));

    return requiredSections
      .filter((requiredSection) => !headingNames.has(requiredSection.toLowerCase()))
      .map((missingSection) => ({
        ruleId: 'structure/required-sections',
        message: `Missing required section: ${missingSection}.`,
        line: 1,
        severity: 'warning' as const,
      }));
  },
};

export function createDefaultRuleSet(): MarkdownRule[] {
  return [oneH1Rule, noSkippedHeadingLevelRule, requiredSectionsRule];
}

export function evaluateDefaultRules(source: string): RuleDiagnostic[] {
  const document = parseMarkdownSource(source);
  return runRules(document, createDefaultRuleSet());
}
