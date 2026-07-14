/**
 * Markdown → Atlassian Document Format, for the subset the library's templates emit:
 * headings, paragraphs, bold/italic/inline code/links, bullet & ordered lists (flat),
 * fenced code blocks, pipe tables, blockquotes. Fidelity is pinned by golden-file tests.
 * Anything richer: pass raw ADF with --adf.
 */

export interface AdfNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: AdfNode[];
  text?: string;
  marks?: { type: string; attrs?: Record<string, unknown> }[];
}

export interface AdfDoc {
  version: 1;
  type: 'doc';
  content: AdfNode[];
}

// ---------------------------------------------------------------- inline
type Mark = { type: string; attrs?: Record<string, unknown> };

function text(t: string, marks: Mark[]): AdfNode {
  const node: AdfNode = { type: 'text', text: t };
  if (marks.length > 0) node.marks = marks.map((m) => ({ ...m }));
  return node;
}

/** Tokenize inline markdown: **strong**, *em* or _em_, `code`, [text](url). */
export function parseInline(src: string, active: Mark[] = []): AdfNode[] {
  const out: AdfNode[] = [];
  let buf = '';
  const flush = () => {
    if (buf !== '') {
      out.push(text(buf, active));
      buf = '';
    }
  };

  let i = 0;
  while (i < src.length) {
    const rest = src.slice(i);
    let m: RegExpMatchArray | null;

    if ((m = rest.match(/^`([^`]+)`/))) {
      flush();
      out.push(text(m[1], [...active, { type: 'code' }]));
      i += m[0].length;
    } else if ((m = rest.match(/^\*\*(.+?)\*\*/))) {
      flush();
      out.push(...parseInline(m[1], [...active, { type: 'strong' }]));
      i += m[0].length;
    } else if ((m = rest.match(/^\*([^*\s][^*]*)\*/)) || (m = rest.match(/^_([^_\s][^_]*)_/))) {
      flush();
      out.push(...parseInline(m[1], [...active, { type: 'em' }]));
      i += m[0].length;
    } else if ((m = rest.match(/^\[([^\]]+)\]\(([^)\s]+)\)/))) {
      flush();
      out.push(...parseInline(m[1], [...active, { type: 'link', attrs: { href: m[2] } }]));
      i += m[0].length;
    } else {
      buf += src[i];
      i += 1;
    }
  }
  flush();
  return out;
}

// ---------------------------------------------------------------- blocks
function paragraph(src: string): AdfNode {
  return { type: 'paragraph', content: parseInline(src) };
}

function listItem(src: string): AdfNode {
  return { type: 'listItem', content: [paragraph(src)] };
}

function tableCell(src: string, header: boolean): AdfNode {
  return { type: header ? 'tableHeader' : 'tableCell', content: [paragraph(src)] };
}

function splitRow(line: string): string[] {
  return line.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());
}

const isTableSeparator = (line: string): boolean => /^\s*\|?[\s:|-]+\|?\s*$/.test(line) && line.includes('-');

export function markdownToAdf(markdown: string): AdfDoc {
  const lines = markdown.replace(/^﻿/, '').replace(/\r\n/g, '\n').split('\n');
  const content: AdfNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      i += 1;
      continue;
    }

    // fenced code block
    let m = line.match(/^```(\S*)\s*$/);
    if (m) {
      const lang = m[1];
      const body: string[] = [];
      i += 1;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        body.push(lines[i]);
        i += 1;
      }
      i += 1; // closing fence
      const node: AdfNode = {
        type: 'codeBlock',
        ...(lang ? { attrs: { language: lang } } : {}),
        content: body.length > 0 ? [{ type: 'text', text: body.join('\n') }] : []
      };
      content.push(node);
      continue;
    }

    // heading
    m = line.match(/^(#{1,6})\s+(.*)$/);
    if (m) {
      content.push({ type: 'heading', attrs: { level: m[1].length }, content: parseInline(m[2].trim()) });
      i += 1;
      continue;
    }

    // blockquote
    if (/^>\s?/.test(line)) {
      const quoted: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoted.push(lines[i].replace(/^>\s?/, ''));
        i += 1;
      }
      content.push({ type: 'blockquote', content: [paragraph(quoted.join(' ').trim())] });
      continue;
    }

    // bullet list
    if (/^[-*]\s+/.test(line)) {
      const items: AdfNode[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(listItem(lines[i].replace(/^[-*]\s+/, '').trim()));
        i += 1;
      }
      content.push({ type: 'bulletList', content: items });
      continue;
    }

    // ordered list
    if (/^\d+[.)]\s+/.test(line)) {
      const items: AdfNode[] = [];
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i])) {
        items.push(listItem(lines[i].replace(/^\d+[.)]\s+/, '').trim()));
        i += 1;
      }
      content.push({ type: 'orderedList', content: items });
      continue;
    }

    // table
    if (line.trimStart().startsWith('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const headerCells = splitRow(line).map((c) => tableCell(c, true));
      const rows: AdfNode[] = [{ type: 'tableRow', content: headerCells }];
      i += 2;
      while (i < lines.length && lines[i].trimStart().startsWith('|')) {
        rows.push({ type: 'tableRow', content: splitRow(lines[i]).map((c) => tableCell(c, false)) });
        i += 1;
      }
      content.push({ type: 'table', content: rows });
      continue;
    }

    // paragraph — consume consecutive plain lines as one paragraph
    const para: string[] = [line.trim()];
    i += 1;
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(#{1,6}\s|[-*]\s|\d+[.)]\s|```|>|\|)/.test(lines[i].trimStart())
    ) {
      para.push(lines[i].trim());
      i += 1;
    }
    content.push(paragraph(para.join(' ')));
  }

  return { version: 1, type: 'doc', content };
}
