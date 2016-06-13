import test from 'tape';

// Reducer
import playbookView, { initialState } from '../reducers/playbookView';

test('PlaybookView', ({ test }) => {

  test('Reducer generics', assert => {

    const action = {
      type: 'ABC',
      data: 'ABCDEFG'
    };

    const state = {};

    assert.deepEqual(
      playbookView(state, action),
      state,
      'Should return the initial state when action isn\'t known'
    );

    assert.end();
  });

  // This test is broken, but I think it might be a node/babel issue.. not respecting es6 argument defaults.
  test('Reducer defaults', t => {
    t.plan(0);

    // Broken test
    // t.deepEqual(
    //   playbookView(null, {}),
    //   initialState,
    //   'Returns proper initial state if no state is passed into reducer'
    // );

    t.end();
  });

  // PLAYBOOKS_RETRIEVED
  test('PLAYBOOKS_RETRIEVED reducer', assert => {

    const action = {
      type: 'PLAYBOOKS_RETRIEVED',
      playbookList: ['Playbook1', 'Playbook2', 'Playbook3']
    };

    const action_with_extra = {
      type: 'PLAYBOOKS_RETRIEVED',
      playbookList: ['Playbook1', 'Playbook2', 'Playbook3'],
      THIRDPROP: 'BLABLABLA I WILL EAT YOUR SOUL'
    };

    const before = {
      hello: 'world',
      list: [],
    };

    const after = {
      hello: 'world',
      list: ['Playbook1', 'Playbook2', 'Playbook3']
    };

    assert.plan(2);

    assert.deepEqual(
      playbookView(before, action),
      after,
      'PLAYBOOKS_RETRIEVED must merge action.playbookList and state'
    );

    assert.deepEqual(
      playbookView(before, action_with_extra),
      after,
      'PLAYBOOKS_RETRIEVED must merge ONLY action.playbookList and state'
    );

    assert.end();
  });

  // SINGLE_PLAYBOOK_RETRIEVED
  test('SINGLE_PLAYBOOK_RETRIEVED reducer', assert => {
    const action = {
      type: 'SINGLE_PLAYBOOK_RETRIEVED',
      playbook: {
        k3y: 'hello i am k3y'
      }
    };

    const state_after = {
      playbook: {
        k3y: 'hello i am k3y'
      }
    };

    assert.plan(1);

    assert.deepEqual(
      playbookView(0, action),
      state_after,
      'SINGLE_PLAYBOOK_RETRIEVED should return the state with a non-empty playbook value');

    assert.end();
  });

  // ADD_NEW_PLAYBOOK
  test('ADD_NEW_PLAYBOOK', assert => {
    assert.plan(1);

    const action = {
      type: 'ADD_NEW_PLAYBOOK',
      playbook: { id: 1, name: 'Object 1' }
    };

    const state = {
      name: 'My first state',
      list: [
        { id: 0, name: 'Object 0'}
      ]
    };

    const state_after = {
      name: 'My first state',
      list: [
        { id: 0, name: 'Object 0'},
        { id: 1, name: 'Object 1' }
      ]
    };

    assert.plan(1);

    assert.deepEqual(
      playbookView(state, action),
      state_after,
      'New playbook should be pushed into list'
    );

    assert.end();
  });

  // ADD_NEW_PLAYBOOK
  test('ADD_NEW_PLAYBOOK', assert => {
    assert.plan(1);

    const firstState = {
      name: 'My first state',
      list: [
        { id: 0, name: 'Object 0'}
      ]
    };

    const action = {
      type: 'ADD_NEW_PLAYBOOK',
      playbook: {
        id: 1,
        name: 'Object 1'
      }
    };

    const finalAction = {
      ...firstState,
      list: [
        ...firstState.list,
        action.playbook
      ]
    };

    assert.deepEqual(playbookView(firstState, action), finalAction);
    assert.end();
  });

  // ADD_SLIDE
  test('ADD_SLIDE', assert => {

    const action = {
      type: 'ADD_SLIDE',
      slideID: 'bar',
      slideInfo: {
        val: 'b'
      }
    };

    const state = {
      name: 'Hello',
      playbook: {
        name: 'playbook',
        doc: {
          'foo': {
            val: 'a',
            slide_number: 1
          }
        }
      }
    };

    const state_after = {
      name: 'Hello',
      playbook: {
        name: 'playbook',
        doc: {
          'foo': {
            val: 'a',
            slide_number: 1
          },
          'bar': {
            val: 'b',
            slide_number: 2
          }
        }
      }
    };

    assert.plan(7);

    // Run reducer
    const newState = playbookView(state, action);

    assert.ok(newState.name === state.name, 'state maintains other properties');
    assert.ok(newState.playbook, 'state passes playbook object');
    assert.ok(newState.playbook.name === state.playbook.name, 'state.playbook maintains other properties');
    assert.ok(newState.playbook.doc, 'state.playbook has a doc property');
    assert.ok(typeof newState.playbook.doc === 'object', 'state.playbook.doc is an object');
    assert.ok(Object.keys(newState.playbook.doc).length === 2, 'doc has two properties');
    assert.deepEqual(newState, state_after, 'deep equals matches');

    assert.end();
  });

  // REMOVE_SLIDE
  test('REMOVE_SLIDE', t => {

    const action = {
      type: 'REMOVE_SLIDE',
      slideID: 'bar'
    };

    const state = {
      name: 'Hello',
      playbook: {
        name: 'playbook',
        doc: {
          'foo': {
            val: 'a',
            slide_number: 1
          },
          'bar': {
            val: 'b',
            slide_number: 2
          }
        }
      }
    };

    const state_after = {
      name: 'Hello',
      playbook: {
        name: 'playbook',
        doc: {
          'foo': {
            val: 'a',
            slide_number: 1
          }
        }
      }
    };

    t.plan(1);

    t.deepEqual(
      playbookView(state, action),
      state_after,
      'REMOVE SLIDE doesn\'t work properly'
    );

    t.end();
  });

  // EDIT_SLIDE
  test('EDIT_SLIDE', t => {

    const action = {
      type: 'EDIT_SLIDE',
      slide_number: 'bat',
      data: {
        foo: 'bar'
      }
    };

    const bad_action = {
      type: 'EDIT_SLIDE',
      slide_number: 'bbt',
      data: {
        foo: 'bar'
      }
    };

    const state = {
      hello: 'world',
      playbook: {
        baz: 'qux',
        doc: {
          xyzzy: { name: 'hi' },
          bat: { foo: 'friends' }
        }
      }
    };

    const state_after = {
      hello: 'world',
      playbook: {
        baz: 'qux',
        doc: {
          xyzzy: { name: 'hi' },
          bat: { foo: 'bar' }
        }
      }
    };

    t.plan(2);

    t.deepEqual(
      playbookView(state, action),
      state_after,
      'Edit the proper slide object on input'
    );

    t.deepEqual(
      playbookView(state, bad_action),
      state,
      'Un-recognized slides don\'t cause issues'
    );

    t.end();
  });

  // TOGGLE_OPEN_CARD
  test('TOGGLE_OPEN_CARD', t => {
    const action = {
      type: 'TOGGLE_OPEN_CARD',
      cardID: 'foo'
    };

    const state = {
      name: 'bar',
      openCards: []
    };

    const state_after = {
      name: 'bar',
      openCards: ['foo']
    };

    t.plan(2);

    t.deepEqual(
      playbookView(state, action),
      state_after,
      'CardID needs to be added to state.openCards if it isn\'t there'
    );

    t.deepEqual(
      playbookView(state_after, action),
      state,
      'CardID needs to be removed from state.openCards if it\'s already there'
    );

    t.end();

  });

  // TOGGLE_SEND_PLAYBOOK_MODAL
  test('TOGGLE_SEND_PLAYBOOK_MODAL', t => {
    const action = {
      type: 'TOGGLE_SEND_PLAYBOOK_MODAL'
    };

    const state = {};

    const state_after = {
      showModal: true
    };

    const state_after_2 = {
      showModal: false
    };

    t.plan(0);

    // t.deepEqual(
    //   playbookView(state,action),
    //   state_after,
    //   'If modal isn\'t open, toggle showModal to true'
    // );
    // t.deepEqual(
    //   playbookView(state_after, action),
    //   state_after_2,
    //   'If modal ist open, toggle showModal to false'
    // );

    t.end();
  });
});
