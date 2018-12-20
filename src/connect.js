import * as React from 'react'
import { Context } from './Context'

function wrapComponent(Component, options) {
  const { props, mapStateToProps, mapActionsToProps } = options

  return ({ storeState, store }) => {
    props = { ...props, ...mapStateToProps(storeState), ...mapActionsToProps(store.getActions()) }
    
    return <Component {...props} />
  }
}

export function connect(mapStateToProps, mapActionsToProps) {

  return function (Component) {
    
    return (props) => {
      const options = { props, mapStateToProps, mapActionsToProps }
      const ContextToUse = props.context || Context
      const WrappedComponent = wrapComponent(Component, options)
      
      return (
        <ContextToUse.Consumer>
          <WrappedComponent/>
        </ContextToUse.Consumer>
      )
    }
  }
}