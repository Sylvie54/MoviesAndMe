// App.js

import React from 'react'
//import Search from './Components/Search'
import Navigation from './Navigation/Navigation'

export default class App extends React.Component {
  render() {
    return (
      // appel du component Search contenu dans Search.js
      //<Search/>
      // appel de l'appContainer
      <Navigation/>
    )
  }
}
