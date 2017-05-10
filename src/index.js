import React from 'react';  
import ReactDOM from 'react-dom';

import {useStrict, transaction} from 'mobx';
import {observer, Provider, inject} from 'mobx-react';
import {Layout, App} from './components'
import {getUrlPath, getRepoFromUrl} from './utils/url'

import stores from './stores'
import {general, common, repo} from './actions'
require('./styles/index.scss')

useStrict(true)


function renderApp(){
  ReactDOM.render(
    <Provider {...stores}>
      <Layout>
        <App/>
      </Layout>
    </Provider>
    , document.getElementById('main'));  
}

let {repoProvider, repoUser, repoName, repoBranch} = getRepoFromUrl(window.location.href)
setRepo(repoProvider, repoUser, repoName, repoBranch)
//setRepo('github', 'bundler', 'bundler', 'auto')
//setRepo('github', 'callemall', 'material-ui', 'master')
//setRepo('github', 'github-tools', 'github')
retrieveRepo()
renderApp()


function setRepo(provider, user, repo, branch){
  let uiStoreChanger = common.attrChangerValue(stores.ui)
  uiStoreChanger('repoProvider',provider)
  uiStoreChanger('repoUser',user)
  uiStoreChanger('repoName',repo)
  uiStoreChanger('repoBranch',branch)
}
function retrieveRepo(){
  repo.getRepoTree()
}

if(module.hot){
  module.hot.accept(App, renderApp)
}

