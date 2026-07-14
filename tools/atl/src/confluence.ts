import type { AtlConfig } from './config.js';
import type { AdfDoc } from './adf.js';

/**
 * Minimal Confluence Cloud client — v2 endpoints for pages/spaces/comments,
 * the v1 search endpoint for CQL. Errors are thrown in the same
 * { response: { status, headers, data } } shape the retry and output layers expect.
 */
export class ConfluenceClient {
  private readonly base: string;
  private readonly auth: string;

  constructor(cfg: AtlConfig) {
    this.base = `https://${cfg.site}/wiki`;
    this.auth = 'Basic ' + Buffer.from(`${cfg.email}:${cfg.token}`).toString('base64');
  }

  async request(
    method: string,
    pathname: string,
    opts: { query?: Record<string, string | number | undefined>; body?: unknown } = {}
  ): Promise<unknown> {
    const url = new URL(this.base + pathname);
    for (const [k, v] of Object.entries(opts.query ?? {})) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
    const res = await fetch(url, {
      method,
      headers: {
        Authorization: this.auth,
        Accept: 'application/json',
        ...(opts.body !== undefined ? { 'Content-Type': 'application/json' } : {})
      },
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined
    });
    const text = await res.text();
    let data: unknown;
    try {
      data = text === '' ? undefined : JSON.parse(text);
    } catch {
      data = text;
    }
    if (!res.ok) {
      const headers: Record<string, string> = {};
      res.headers.forEach((v, k) => (headers[k] = v));
      throw {
        message: `Confluence ${method} ${pathname} failed with status ${res.status}`,
        response: { status: res.status, headers, data }
      };
    }
    return data;
  }

  getPage(id: string, withBody: boolean): Promise<unknown> {
    return this.request('GET', `/api/v2/pages/${id}`, {
      query: withBody ? { 'body-format': 'atlas_doc_format' } : {}
    });
  }

  createPage(params: { spaceId: string; parentId?: string; title: string; adf: AdfDoc }): Promise<unknown> {
    return this.request('POST', '/api/v2/pages', { body: this.pageBody(params) });
  }

  updatePage(params: {
    id: string;
    title: string;
    adf: AdfDoc;
    version: number;
    message?: string;
  }): Promise<unknown> {
    return this.request('PUT', `/api/v2/pages/${params.id}`, {
      body: {
        id: params.id,
        status: 'current',
        title: params.title,
        body: { representation: 'atlas_doc_format', value: JSON.stringify(params.adf) },
        version: { number: params.version, ...(params.message ? { message: params.message } : {}) }
      }
    });
  }

  pageBody(params: { spaceId: string; parentId?: string; title: string; adf: AdfDoc }): unknown {
    return {
      spaceId: params.spaceId,
      status: 'current',
      title: params.title,
      ...(params.parentId ? { parentId: params.parentId } : {}),
      body: { representation: 'atlas_doc_format', value: JSON.stringify(params.adf) }
    };
  }

  children(id: string): Promise<unknown> {
    return this.request('GET', `/api/v2/pages/${id}/children`, { query: { limit: 250 } });
  }

  spaces(keys?: string): Promise<unknown> {
    return this.request('GET', '/api/v2/spaces', { query: { keys, limit: 100 } });
  }

  cql(query: string, limit: number): Promise<unknown> {
    return this.request('GET', '/rest/api/search', { query: { cql: query, limit } });
  }

  footerComments(pageId: string): Promise<unknown> {
    return this.request('GET', `/api/v2/pages/${pageId}/footer-comments`, {
      query: { 'body-format': 'atlas_doc_format', limit: 100 }
    });
  }
}
