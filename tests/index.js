import { expect } from 'chai'
import * as React from 'react'
import { renderToString} from 'react-dom/server'

import Simred, { createReducer } from 'simred'
import { connect, Provider } from '../lib/index'

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

    expect(str).to.equal('<div>test</div>')
  })

  it('renders a loaded state', function () {
    const reducers = {
      list: createReducer({
        add: (state, actions, item) => {
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

    expect(result).to.equal('<ul><li>item</li></ul>')
  })
})