#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { evaluateDefaultRules } from '@markdown-tooling/rules';

async function main(): Promise<void> {
  const filePath = process.argv[2];

  if (!filePath) {
    console.error('Usage: mdtool <markdown-file>');
    process.exitCode = 1;
    return;
  }

  const markdown = await readFile(filePath, 'utf8');
  const diagnostics = evaluateDefaultRules(markdown);

  if (diagnostics.length === 0) {
    console.log('No issues found.');
    return;
  }

  console.log(JSON.stringify(diagnostics, null, 2));
  process.exitCode = 1;
}

void main();
