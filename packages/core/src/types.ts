export type DiagnosticSeverity = 'error' | 'warning' | 'info';

export interface HeadingToken {
  depth: number;
  text: string;
  line: number;
}

export interface MarkdownDocumentModel {
  source: string;
  lines: string[];
  headings: HeadingToken[];
}

export interface RuleDiagnostic {
  ruleId: string;
  message: string;
  line: number;
  severity: DiagnosticSeverity;
}

export interface MarkdownRuleContext {
  document: MarkdownDocumentModel;
}

export interface MarkdownRule {
  id: string;
  description: string;
  run: (context: MarkdownRuleContext) => RuleDiagnostic[];
}
