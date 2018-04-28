import React, { Component } from 'react'
import createState from 'react-copy-write'

const State = createState({
  user: {
    firebaseUser: null,
    loggedIn: false
  }
})

export default State

export function connect (selector) {
  return (WrappedComponent) => {
    return class extends Component {
      render () {
        return (
          <State.Consumer>
            {(state, mutate) => (
              <WrappedComponent state={state} mutate={mutate}/>
            )}
          </State.Consumer>
        )
      }
    }
  }
}
