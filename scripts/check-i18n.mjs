import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const en = JSON.parse(await readFile(new URL('../lang/en.json', import.meta.url)));
const is = JSON.parse(await readFile(new URL('../lang/is.json', import.meta.url)));

test('IS and EN dictionaries have identical key sets', () => {
  const ek = Object.keys(en).sort();
  const ik = Object.keys(is).sort();
  assert.deepEqual(ik, ek, 'key sets differ between is.json and en.json');
});

test('no empty values in either dictionary', () => {
  for (const [k, v] of Object.entries(en)) assert.ok(v.trim(), `en.${k} empty`);
  for (const [k, v] of Object.entries(is)) assert.ok(v.trim(), `is.${k} empty`);
});
