import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { markdownToAdf, parseInline } from '../src/adf.js';

const goldenDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'golden');

describe('golden files', () => {
  for (const name of ['basic', 'lists', 'rich']) {
    test(name, () => {
      const md = fs.readFileSync(path.join(goldenDir, `${name}.md`), 'utf8');
      const expected = JSON.parse(fs.readFileSync(path.join(goldenDir, `${name}.adf.json`), 'utf8'));
      expect(markdownToAdf(md)).toEqual(expected);
    });
  }
});

describe('inline parsing', () => {
  test('nested marks: bold inside link', () => {
    expect(parseInline('[**hi**](https://x.y)')).toEqual([
      {
        type: 'text',
        text: 'hi',
        marks: [{ type: 'link', attrs: { href: 'https://x.y' } }, { type: 'strong' }]
      }
    ]);
  });

  test('plain asterisk not treated as emphasis', () => {
    expect(parseInline('2 * 3 = 6')).toEqual([{ type: 'text', text: '2 * 3 = 6' }]);
  });

  test('underscores inside words stay literal', () => {
    // _em_ requires non-space boundaries; customfield_11261 must survive
    const nodes = parseInline('see customfield_11261 for details');
    expect(nodes.map((n) => n.text).join('')).toContain('customfield');
  });
});

describe('edge cases', () => {
  test('empty string yields empty doc', () => {
    expect(markdownToAdf('')).toEqual({ version: 1, type: 'doc', content: [] });
  });

  test('code block without language has no attrs', () => {
    const doc = markdownToAdf('```\nplain\n```');
    expect(doc.content[0]).toEqual({ type: 'codeBlock', content: [{ type: 'text', text: 'plain' }] });
  });

  test('utf-8 BOM is stripped (PowerShell 5.1 Out-File writes one)', () => {
    const bom = String.fromCharCode(0xfeff);
    const doc = markdownToAdf(bom + '# Title');
    expect(doc).toEqual(markdownToAdf('# Title'));
    expect(doc.content[0].type).toBe('heading');
  });

  test('crlf input parses identically to lf', () => {
    expect(markdownToAdf('# A\r\n\r\ntext\r\n')).toEqual(markdownToAdf('# A\n\ntext\n'));
  });

  test('gherkin block survives as code block', () => {
    const doc = markdownToAdf('```gherkin\nGiven a user\nWhen they act\nThen result\n```');
    expect(doc.content[0].attrs).toEqual({ language: 'gherkin' });
    expect(doc.content[0].content?.[0].text).toBe('Given a user\nWhen they act\nThen result');
  });
});
