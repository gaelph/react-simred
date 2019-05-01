import * as Simred from 'simred'
import * as React from 'react'

declare namespace ReactSimred {
  export class Provider extends React.Component<{ store: Simred.Store<any, any> }> { }

  export type MapStateToProps = (state: any, ownProps: any) => any
  export type MapActionsToProps = (actions: any, ownProps: any) => any
  export type ConnectHOC<T> = (component: T) => T
  export function connect<T>(mapStateToProps: MapStateToProps, mapActionsToProp: MapActionsToProps): ConnectHOC<T>

  export type Selector<T> = (state: Object) => T
  export type ActionsSelector<T> = (actions: Object) => T
  export function useSelector<T>(selector: Selector<T>): T
  export function useActions<T>(actionsSelector: ActionsSelector<T>): T
}

export = ReactSimred