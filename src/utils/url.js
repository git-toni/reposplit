//import {ui} from '../stores'

function getUrlPath(url){
  let pattern = /(http[s]?:\/\/)?([^\/\s]+\/)(.*)/gi

  return pattern.exec(url)[3]
}
function repoUrl(provider, user, repo){
  switch(provider){
    case 'github':
      return `https://api.github.com/repos/${user}/${repo}/git/trees/master?recursive=1`
    default:
      return ''
  }
}
function siteUrl(provider, user, repo){
  switch(provider){
    case 'github':
      return `https://github.com/repos/${user}/${repo}`
    default:
      return ''
  }
}

export {
  getUrlPath,
  repoUrl,
  siteUrl,
}
export default {
  getUrlPath,
  repoUrl,
  siteUrl,
}
