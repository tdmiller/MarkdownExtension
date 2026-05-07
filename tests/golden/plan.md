# Golden test plan

## Round-trip fidelity
- Fixture input is parsed into a lightweight model and serialized back to Markdown.
- Golden assertion: serialized output must exactly equal the expected output fixture.

## Rule validation
- Fixture input is evaluated by the starter default rule set.
- Golden assertion: diagnostics (ruleId, line, message) must match expected JSON fixture.

## Fixture locations
- Round-trip: `/home/runner/work/MarkdownExtension/MarkdownExtension/packages/rules/test/fixtures/roundtrip`
- Rules: `/home/runner/work/MarkdownExtension/MarkdownExtension/packages/rules/test/fixtures/rules`
