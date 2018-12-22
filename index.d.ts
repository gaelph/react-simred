import * as Simred from 'simred'
import * as React from 'react'

declare namespace ReactSimred {
  export class Provider extends React.Component<{ store: Simred.Store<any> }> { }

  export type MapStateToProps = (state: any, ownProps: any) => any
  export type MapActionsToProps = (actions: any) => any
  export type ConnectHOC<T> = (component: T) => T
  export function connect<T>(mapStateToProps: MapStateToProps, mapActionsToProp: MapActionsToProps): ConnectHOC<T>
}

export = ReactSimred