# react-simred [![NPM version](https://badge.fury.io/js/react-simred.svg)](https://npmjs.org/package/react-simred)  [![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]() ![Tests](https://img.shields.io/badge/tests-4%2F4-brightgreen.svg) ![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)

React indings for Simred state management

If you're not sure what Simred is, visit the [Simred project page]() for more information.

## Table of Content
- [Installation](#installation)
- [Usage](#usage)
  - [For Redux Users](#for-redux-users)
  - [For the rest of the world](#for-the-rest-of-the-world)

---

## Installation

```sh
$ npm install --save react-simred
```

---

## Usage
### For Redux users
If you used React with Redux, it works the exact same way
#### Passing the store

```js
import Simred from 'simred'
import { Provider } from 'react-simred'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { App } from './components'
import { rootReducer } from './reducers'

const store = Simred.createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

#### Implementing Container Components
```js
import * as React from 'react'
import { connect } from 'react-simred'
import { Component } from './components'

const mapStateToProps = (state) => {
  return { todos: state.todos }
}

const mapActionsToProps = (actions) => {
  return { actions: actions.todos }
}

const Container = connect(mapStateToProps, mapActionsToProps)(Component)

export Container
```

---

### For the rest of the world
To keep help understanding how this works, we'll keep following the todo list example from the [Simred project page](). Make sure you've read the complete to-do list example before continuing.

_This tutorial is heavily inspired by [this redux article](https://redux.js.org/basics/usage-with-react)_

#### Presentational and Container Components
The bindings separate _Presentational_ and _Container_ Components. This helps separate presentation code from the business logic and makes components easier to reuse.

| | Presentational Components | Container Compoents |
|---|---|---|
|**Purpose**| How things look (markup, styles)| How things work (fetching data, state updates) |
|**Aware of Simred**| No | Yes |
|**To read data**| Reads data from props | Subscribes to Simred state |
|**To change data**| Invokes callbacks from props | Calls Simred actions |

#### Designing components
The design is simple, we want to display a list of todos. On click, a todo is crossed as completed. We want a field to add a new todo, and a toggle to show all, only completed or remaining todos.

##### Presentational components
- **`TodoList`** displays a list of todos
props:
  - `todos: Array` list of todo items like `{text, completed}`
  - `onTodoClick(id: number)` callback called when a todo is clicked
- **`TodoItem`** a single todo item:
props:
  - `text: string` text to display
  - `completed: boolean` is whether or not the item has been crossed
  - `onClick()` callback call when a todo is clicked
- **`Link`** a link with a callback
props:
  - `onClick()` callback called when the link is clicked
- **`Footer`** where the user changes the which todos to show
- **`App`** root component rendering everything

##### Container compoenents
- **`VisibleTodoList`** Filters todos according the current visiblity setting
- **`FilterLink`** get the current visibilty filter and renders a link
props:
  - `filter`: The visibility filter it represents
- **`AddTodo`** Input field + "Add" button

#### Implementing components
From this spec it is not hard to implement these components

##### Presentationnal Components
**components/TodoItem.js**
```js
import * as React from 'react'

export const Todo = ({ text, completed, onClick }) => {

  render (
    <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
  )
}
```

**components/TodoList.js**
```js
import * as React from 'react'
import { TodoItem } from './TodoItem'

export const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map((todo, index) => (
      <TodoItem key={index} {...todo} onClick={() => onTodoClick(index)} />
    ))}
  </ul>
)
```

**components/Link.js**
```js
import * as React from 'react'

export const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
    <a
      href=""
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  )
}
```
**components/Footer.js**
```js
import * as React from 'react'
import { FilterLink } from './containers/FilterLink'
import { VisibilityFilters } from './filters'

export const Footer = () => (
  <p>
    Show: <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
    {', '}
    <FilterLink filter={VisibilityFilters.SHOW_REMAINING}>Remaining</FilterLink>
    {', '}
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
  </p>
)
```

##### Container Components
Those are the components aware of the Simred state.
`react-simred` provides a `connect()` function to hook up React components to the Simred state while preventing some unnecessary re-renders.

To use `connect()`, you need to define a special function called `mapStateToProps` that describes how to transform the current Redux store state into the props you want to pass to a presentational component you are wrapping.
`VisibleTodoList` needs to calculate the `todos` to pass to `TodoList` in accordance with the `visibilityFilter`
```js
import { VisibilityFilters } from './filter'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    case VisibilityFilters.SHOW_ALL:
    default:
      return todos
  }
}

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}
```
Container components can also call Simred actions. Same as `mapStateToProps`, you may define a `mapActionsToProps` that recieves all actions from the root reducer and returns the ones to pass to the container.
```js
const mapActionsToProps = actions => {
  return {
    onTodoClick: actions.todos.toggle
  }
}
```
Finally, we create the `VisibleTodoList` by calling `connect()`
```js
export const VisibleTodoList = connect(
  mapStateToProps,
  mapActionsToProps
)(TodoList)
```
And that is all there is to it.

Find the rest of the container components below:
**containers/FilterLink.js**
```js
import { connect } from 'react-simred'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapActionsToProps = (actions, ownProps) => {
  return {
    onClick: () => {
      actions.visibilityFilter.set(ownProps.filter))
    }
  }
}

export const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)
```

**containers/AddTodo.js**
```js
import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

let AddTodo = ({ addTodo }) => {
  let input

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          addTodo(input.value)
          input.value = ''
        }}
      >
        <input
          ref={node => {
            input = node
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}

export const AddTodo = connect(
  () => {},
  actions => ({ addTodo: actions.todos.add })
)(AddTodo)
```
#### Wrapping all container in a single component
**components/App.js**
```js
import * as React from 'react'
import { Footer } from './Footer'
import { AddTodo } from '../containers/AddTodo'
import { VisibleTodoList } from '../containers/VisibleTodoList'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export App
```
#### Passing the store to the application
The containers need to be allowed access to the Simred state and actions. The `<Provider>` component from `react-simred` "magically" gives access to the store to all "connected" containers

**index.js**
```js
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-simred'
import Simred from 'simred'
import { rootReducer } from './reducers'
import { App } from './components/App'

const store = Simred.createStore(rootReducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```
And Voilà!
## License

ISC © [Gaël PHILIPPE](https://github.com/gaelph)
