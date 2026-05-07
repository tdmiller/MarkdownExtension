import type { MarkdownDocumentModel, MarkdownRule, RuleDiagnostic } from './types.js';

export function runRules(document: MarkdownDocumentModel, rules: MarkdownRule[]): RuleDiagnostic[] {
  return rules.flatMap((rule) => rule.run({ document }));
}
