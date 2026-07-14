/** Helpers for mutating commands — kept pure for unit testing. */

export const AUTO_LABEL = 'ai-sdlc-generated';

export function mergeLabels(labels: string[] | undefined, autoLabel: boolean): string[] | undefined {
  if (!autoLabel) return labels;
  const set = new Set(labels ?? []);
  set.add(AUTO_LABEL);
  return [...set];
}

export interface TransitionLike {
  id?: string;
  name?: string;
  to?: { name?: string };
}

/** Resolve --to against available transitions by id, transition name, or target status name. */
export function resolveTransition(transitions: TransitionLike[], target: string): TransitionLike {
  const t = target.trim().toLowerCase();
  const matches = transitions.filter(
    (tr) =>
      tr.id === target ||
      tr.name?.toLowerCase() === t ||
      tr.to?.name?.toLowerCase() === t
  );
  if (matches.length === 1) return matches[0];
  const available = transitions
    .map((tr) => `${tr.id}:${tr.name ?? '?'} -> ${tr.to?.name ?? '?'}`)
    .join('; ');
  if (matches.length === 0) {
    throw new Error(`No transition matches "${target}". Available: ${available}`);
  }
  throw new Error(`Ambiguous transition "${target}" (${matches.length} matches). Available: ${available}`);
}

/** Parse --fields-json, rejecting non-object payloads with a useful message. */
export function parseFieldsJson(raw: string | undefined): Record<string, unknown> {
  if (raw === undefined) return {};
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    throw new Error(`--fields-json is not valid JSON: ${(e as Error).message}`);
  }
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('--fields-json must be a JSON object mapping field ids to values');
  }
  return parsed as Record<string, unknown>;
}
