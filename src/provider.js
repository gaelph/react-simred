import * as React from 'react'
import { Context } from './context'

class Provider extends React.Provider {
  constructor(props) {
    super(props)

    const { store } = props

    this.state = {
      storeState: store.getState(),
      store
    }

    this._mounted = false
  }

  componentDidMount() {
    this._mounted = true

    this.subscribe()
  }

  subscribe() {
    const self = this
    this.store.subscribe((state) => {
      self.setState({ storeState: state })
    })
  }

  render() {
    const Context = this.props.context || Context
    
    return (
      <Context.Provider value={this.state}>
        { this.props.children }
      </Context.Provider>
    )
  }
}