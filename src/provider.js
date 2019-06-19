import * as React from 'react'
import ReactSimredContext from './context'

export class Provider extends React.Component {
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
    this.state.store.subscribe((state) => {
      self.setState({ storeState: state })
    })
  }

  render() {
    const ContextToUse = this.props.context || ReactSimredContext

    return (
      <ContextToUse.Provider value={this.state}>
        {this.props.children}
      </ContextToUse.Provider>
    )
  }
}