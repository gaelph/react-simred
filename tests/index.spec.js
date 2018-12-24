import * as React from 'react'

import Simred, { createReducer } from 'simred'
import { connect, Provider } from '../src/index'
import renderer from 'react-test-renderer';

class CMP extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div>test</div>
  }
}

describe('Simple test', function () {
  it('renders without crashing', function () {
    const Cmp = connect(() => ({}), () => ({}))(CMP)

    const render = renderer.create((
      <Provider store={{ getState: () => ({}), getActions: () => ({}), subscribe: () => { } }}>
        <Cmp />
      </Provider>
    ))

    expect(render.toJSON()).toMatchObject({ type: 'div', props: {}, children: [ 'test' ]})
  })

  it('renders a loaded state', function () {
    const reducers = {
      list: createReducer({
        add: (state) => (item) => {
          return [...state, item]
        }
      }, [])
    }

    const store = Simred.createStore(reducers, { list: ['item'] })

    const Container = connect(
      ({ list }) => ({ list }),
      ({ list }) => ({...list})
    )((props) => (<ul>
      {
        props.list.map((item, i) => <li key={i}>{item}</li>)
      }
    </ul>))
    
    const result = renderer.create((
      <Provider store={store}>
        <Container test="test" />
      </Provider>
    ))

    const expected = renderer.create((
      <ul><li>item</li></ul>
    ))

    expect(result.toJSON()).toMatchObject(expected.toJSON())
  })

  it('mounts a provider', function () {
    const reducers = {
      list: createReducer({
        add: (state) => (item) => {
          return [...state, item]
        }
      }, [])
    }

    const store = Simred.createStore(reducers, { list: ['item'] })

    const Container = connect(
      ({ list }) => ({ list }),
      ({ list }) => ({...list})
    )((props) => (<ul>
      {
        props.list.map((item, i) => <li key={i}>{item}</li>)
      }
    </ul>))
    
    const provider = renderer.create((
      <Provider store={store}>
        <Container test="test" />
      </Provider>
    ))

  })

  it('updates the provider state when the simred state updates', function () {
    const reducers = {
      list: createReducer({
        add: (state) => (item) => {
          return [...state, item]
        }
      }, [])
    }

    const store = Simred.createStore(reducers, { list: ['item'] })

    const Container = connect(
      ({ list }) => ({ list }),
      ({ list }) => ({...list})
    )((props) => (<ul>
      {
        props.list.map((item, i) => <li key={i}>{item}</li>)
      }
    </ul>))
    
    const provider = renderer.create((
      <Provider store={store}>
        <Container test="test" />
      </Provider>
    ))

    store.actions.list.add('item2')
  })
})