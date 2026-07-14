import { mergeLabels, parseFieldsJson, resolveTransition, AUTO_LABEL } from '../src/writes.js';

describe('mergeLabels', () => {
  test('adds the auto label to user labels without duplicating', () => {
    expect(mergeLabels(['x', AUTO_LABEL], true)).toEqual(['x', AUTO_LABEL]);
    expect(mergeLabels(['x'], true)).toEqual(['x', AUTO_LABEL]);
  });
  test('undefined labels with auto-label yields just the auto label', () => {
    expect(mergeLabels(undefined, true)).toEqual([AUTO_LABEL]);
  });
  test('--no-auto-label passes labels through untouched', () => {
    expect(mergeLabels(['x'], false)).toEqual(['x']);
    expect(mergeLabels(undefined, false)).toBeUndefined();
  });
});

describe('resolveTransition', () => {
  const transitions = [
    { id: '11', name: 'Start Progress', to: { name: 'In Progress' } },
    { id: '21', name: 'Close', to: { name: 'Closed' } },
    { id: '31', name: 'Reopen', to: { name: 'Open' } }
  ];

  test('resolves by id', () => {
    expect(resolveTransition(transitions, '21').name).toBe('Close');
  });
  test('resolves by transition name, case-insensitive', () => {
    expect(resolveTransition(transitions, 'start progress').id).toBe('11');
  });
  test('resolves by target status name', () => {
    expect(resolveTransition(transitions, 'In Progress').id).toBe('11');
  });
  test('unknown target lists available transitions', () => {
    expect(() => resolveTransition(transitions, 'Done')).toThrow(/Available: 11:Start Progress -> In Progress/);
  });
  test('ambiguous target throws', () => {
    const dup = [
      { id: '1', name: 'Go', to: { name: 'Done' } },
      { id: '2', name: 'Go', to: { name: 'Done' } }
    ];
    expect(() => resolveTransition(dup, 'go')).toThrow(/Ambiguous/);
  });
});

describe('parseFieldsJson', () => {
  test('undefined yields empty object', () => {
    expect(parseFieldsJson(undefined)).toEqual({});
  });
  test('parses an object', () => {
    expect(parseFieldsJson('{"customfield_1": 5}')).toEqual({ customfield_1: 5 });
  });
  test('rejects arrays and invalid JSON with clear messages', () => {
    expect(() => parseFieldsJson('[1]')).toThrow(/must be a JSON object/);
    expect(() => parseFieldsJson('{nope')).toThrow(/not valid JSON/);
  });
});
