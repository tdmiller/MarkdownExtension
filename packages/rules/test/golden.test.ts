import { readFile } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import test from 'node:test';
import { parseMarkdownSource, serializeMarkdownModel } from '@markdown-tooling/core';
import { evaluateDefaultRules } from '../src/defaultRules.js';

const fixtureRoot = path.resolve(import.meta.dirname, 'fixtures');

test('round-trip fixture stays stable', async () => {
  const input = await readFile(path.join(fixtureRoot, 'roundtrip', 'basic.input.md'), 'utf8');
  const expected = await readFile(path.join(fixtureRoot, 'roundtrip', 'basic.expected.md'), 'utf8');

  const parsed = parseMarkdownSource(input);
  const serialized = serializeMarkdownModel(parsed);

  assert.equal(serialized, expected);
});

test('rule diagnostics match golden fixture', async () => {
  const input = await readFile(path.join(fixtureRoot, 'rules', 'invalid.md'), 'utf8');
  const expectedRaw = await readFile(path.join(fixtureRoot, 'rules', 'invalid.expected.json'), 'utf8');
  const expected = JSON.parse(expectedRaw) as Array<{ ruleId: string; line: number; message: string }>;

  const actual = evaluateDefaultRules(input).map((item) => ({
    ruleId: item.ruleId,
    line: item.line,
    message: item.message,
  }));

  assert.deepEqual(actual, expected);
});
