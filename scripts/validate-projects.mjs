import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const projects = JSON.parse(await readFile(new URL('../projects.json', import.meta.url)));
const BILINGUAL = ['summary', 'problem', 'approach', 'outcome'];

test('projects.json is a non-empty array', () => {
  assert.ok(Array.isArray(projects) && projects.length > 0);
});

test('every project has the required creative + bilingual shape', () => {
  const ids = new Set();
  for (const p of projects) {
    assert.equal(typeof p.id, 'number', `id must be a number (got ${JSON.stringify(p.id)})`);
    assert.ok(!ids.has(p.id), `duplicate id ${p.id}`);
    ids.add(p.id);
    assert.equal(typeof p.title, 'string', `project ${p.id}: title`);
    assert.equal(typeof p.role, 'string', `project ${p.id}: role`);
    assert.equal(typeof p.year, 'string', `project ${p.id}: year`);
    assert.ok(Array.isArray(p.tags), `project ${p.id}: tags must be array`);
    assert.equal(typeof p.cover, 'string', `project ${p.id}: cover`);
    assert.equal(typeof p.video, 'string', `project ${p.id}: video (use "" if none)`);
    assert.equal(typeof p.links, 'object', `project ${p.id}: links object`);
    for (const f of BILINGUAL) {
      assert.equal(typeof p[f]?.is, 'string', `project ${p.id}: ${f}.is`);
      assert.equal(typeof p[f]?.en, 'string', `project ${p.id}: ${f}.en`);
    }
  }
});
