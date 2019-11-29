import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    })
  })

  test('multiple increments works', () => {
    const goodAction = {
      type: 'GOOD'
    }
    const okAction = {
      type: 'OK'
    }
    const badAction = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const state1 = counterReducer(state, goodAction)
    const state2 = counterReducer(state1, goodAction)
    const state3 = counterReducer(state2, goodAction)
    const state4 = counterReducer(state3, okAction)
    const state5 = counterReducer(state4, okAction)
    const state6 = counterReducer(state5, badAction)
    const finalState = counterReducer(state6, badAction)

    expect(finalState).toEqual({
      good: 3,
      ok: 2,
      bad: 2,
    })
  })

  test('zero zeroes all', () => {
    const incrementedState = {
      good: 5,
      ok: 5,
      bad: 5,
    }

    const action = {
      type: 'ZERO',
    }

    const state = incrementedState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0,
    })
  })

  test('default makes no changes', () => {
    const incrementedState = {
      good: 5,
      ok: 5,
      bad: 5,
    }

    const action = {
      type: 'ASDF',
    }

    const state = incrementedState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 5,
      ok: 5,
      bad: 5,
    })
  })
})