import * as React from 'react'
import ReactSimredContext from './context'

function wrapComponent(Component, options) {
  const { props, mapStateToProps, mapActionsToProps } = options

  return (ctx) => {
    let wrappedProps = { ...props }

    if (ctx) {
      const { storeState, store } = ctx

      wrappedProps = {
        ...mapStateToProps(storeState),
        ...mapActionsToProps(store.getActions()),
        ...wrappedProps
      }
    }
    
    return <Component {...wrappedProps} />
  }
}

export function connect(mapStateToProps, mapActionsToProps, context) {
  const ContextToUse = context || ReactSimredContext

  return function (Component) {
    
    return class extends React.Component {
      constructor(props) {
        super(props)
      }
      
      render() {
        const options = { props: this.props, mapStateToProps, mapActionsToProps }
        const WrappedComponent = wrapComponent(Component, options)
        
        return (
          <ContextToUse.Consumer>
            {WrappedComponent}
          </ContextToUse.Consumer>
        )
      }
    }
  }
}