import * as React from 'react'
import { renderToString } from 'react-dom/server'

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

    const str = renderToString((
      <Provider store={{ getState: () => ({}), getActions: () => ({}) }}>
        <Cmp />
      </Provider>
    ))

    expect(str).toEqual('<div>test</div>')
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
    
    const result = renderToString((
      <Provider store={store}>
        <Container test="test" />
      </Provider>
    ))

    expect(result).toEqual('<ul><li>item</li></ul>')
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
})