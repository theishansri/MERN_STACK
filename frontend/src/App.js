import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import AppNavBar from "./components/AppNavbar"
import ShoppingList from "./components/ShoppingList"
import {Provider} from 'react-redux'
import store from './store'
import {Container} from 'reactstrap'
import ItemModal from './components/ItemModal';
import {loadUser} from './actions/authActions'
import React, { Component } from 'react'

export class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser())
  }
  render() {
    return (
    <Provider store={store}>
    <div className="App">
      <AppNavBar/>
      <Container>
      <ItemModal/>
      <ShoppingList/>
      </Container>
    </div>
    </Provider>
    )
  }
}

export default App

