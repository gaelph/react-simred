import Context from './context'
import { useContext } from 'react';

export function useSelector(selector) {
  const { storeState } = useContext(Context)

  return selector(storeState)
}

export function useActions(actionsSelector) {
  const { store: { actions } } = useContext(Context)

  if (actionsSelector) {
    return actionsSelector(actions)
  }

  return actions
}