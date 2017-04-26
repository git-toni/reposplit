import React from 'react';  
import ReactDOM from 'react-dom';

import {useStrict, transaction} from 'mobx';
import {observer, Provider, inject} from 'mobx-react';
import {Layout, App} from './components'

import stores from './stores'
import {general, common, repo} from './actions'
require('./styles/index.scss')

useStrict(true)


//{routes}
function renderApp(){
  ReactDOM.render(
    <Provider {...stores}>
      <Layout>
        <App/>
      </Layout>
    </Provider>
    , document.getElementById('main'));  
}
setRepo('github','bundler','bundler')
retrieveRepo()
renderApp()


function setRepo(provider, user, repo){
  let uiStoreChanger = common.attrChangerValue(stores.ui)
  uiStoreChanger('repoProvider',provider)
  uiStoreChanger('repoUser',user)
  uiStoreChanger('repoName',repo)
}
function retrieveRepo(){
  repo.getRepoTree()
}

if(module.hot){
  module.hot.accept(App, renderApp)
}

