// Dependencies
import React from 'react';  
import ReactDOM from 'react-dom';

import {useStrict, transaction} from 'mobx';
import {observer, Provider, inject} from 'mobx-react';
import App from './components/App'

import stores from './stores'
import {general, common} from './actions'
import {login} from './utils/auth'
import routes from './routing/routes'
require('./styles/index.scss')

useStrict(true)


function renderApp(){
  ReactDOM.render(
    <Provider {...stores}>
      {routes}
    </Provider>
    , document.getElementById('main'));  
}
renderApp()

setTimeout(()=> {
  general.changeStatus()
  //login(23,23)
}, 400)

setTimeout(()=> {
  //common.attrChangerValue(stores.ui)('panelTL', {height: 50, width: 70})
}, 4000)

if(module.hot){
  module.hot.accept(App, renderApp)
}

