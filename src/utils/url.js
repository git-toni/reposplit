//import {ui} from '../stores'

function getUrlPath(url){
  let pattern = /(http[s]?:\/\/)?([^\/\s]+\/)(.*)/gi

  return pattern.exec(url)[3]
}
function getRepoFromUrl(url){
  let pattern = /(http[s]?:\/\/)?([^\/\s]+\/)(.*)/gi
  let match = pattern.exec(url)
  let repoProvider = match[2].replace('/','')
  let reposplit = repoProvider.split('.')
  let repoBranch = 'master'
  switch(reposplit.length){
    case 2:
      repoProvider = reposplit[0]
      break;
    case 3:
      repoProvider = reposplit[1]
      break;
    default:
      break;
  }
  let params = match[3].split('/')
  if(params.length > 2 && params[2] === 'tree'){
    repoBranch = params[3]
  }
  return {repoProvider, repoUser: params[0], repoName: params[1], repoBranch}

}
function repoUrl(provider, user, repo, branch){
  switch(provider){
    case 'github':
      return `https://api.github.com/repos/${user}/${repo}/git/trees/${branch}?recursive=1`
    default:
      return ''
  }
}
function siteUrl(provider, user, repo, branch){
  switch(provider){
    case 'github':
      return `https://github.com/${user}/${repo}/tree/${branch}`
    default:
      return ''
  }
}

export {
  getUrlPath,
  repoUrl,
  siteUrl,
  getRepoFromUrl,
}
export default {
  getUrlPath,
  repoUrl,
  siteUrl,
  getRepoFromUrl,
}
