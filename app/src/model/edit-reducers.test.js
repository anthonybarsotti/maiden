// import rewire from 'rewire';
import scripts from './edit-reducers';
import { virtualRoot } from './listing';

import { List, Map, Set } from 'immutable';

it('initial state should have empty list', () => {
  const state = scripts(undefined, { type: '@@INIT' });
  expect(state.rootNodes).toEqual(new List());
  expect(state.buffers).toEqual(new Map());
  expect(state.expandedNodes).toEqual(new Set());
});

// TODO: figure out how to test the internal functions
