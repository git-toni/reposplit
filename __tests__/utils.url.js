import {getRepoFromUrl} from '../src/utils/url'

let url 
//let repoName, repoProvider, repoUser, repoBranch

test('github getRepoFromUrl given basic url', () => {
  url = 'https://github.com/git-toni/reposplit'  
  
  let {repoName, repoProvider, repoUser, repoBranch} = getRepoFromUrl(url)
  expect(repoName).toEqual('reposplit')
  expect(repoUser).toEqual('git-toni')
  expect(repoBranch).toEqual('master')
  expect(repoProvider).toEqual('github')

});

test('github getRepoFromUrl given normal master url', () => {
  url = 'https://github.com/git-toni/reposplit/tree/crazy-branch/file/234sdf4'  
  
  let {repoName, repoProvider, repoUser, repoBranch} = getRepoFromUrl(url)
  expect(repoName).toEqual('reposplit')
  expect(repoUser).toEqual('git-toni')
  expect(repoBranch).toEqual('crazy-branch')
  expect(repoProvider).toEqual('github')

});

test('GITLAB getRepoFromUrl given normal master url', () => {
  url = 'https://gitlab.com/gitlab-org/gitlab-ce'  
  
  let {repoName, repoProvider, repoUser, repoBranch} = getRepoFromUrl(url)
  console.log({repoName, repoProvider, repoUser, repoBranch})
  expect(repoName).toEqual('gitlab-ce')
  expect(repoUser).toEqual('gitlab-org')
  expect(repoBranch).toEqual('master')
  expect(repoProvider).toEqual('gitlab')

});

test('GITLAB getRepoFromUrl given normal master url', () => {
  url = 'https://gitlab.com/gitlab-org/gitlab-ce/tree/23079-consider-removing-default-scope-in-sortable'  
  
  let {repoName, repoProvider, repoUser, repoBranch} = getRepoFromUrl(url)
  console.log({repoName, repoProvider, repoUser, repoBranch})
  expect(repoName).toEqual('gitlab-ce')
  expect(repoUser).toEqual('gitlab-org')
  expect(repoBranch).toEqual('23079-consider-removing-default-scope-in-sortable')
  expect(repoProvider).toEqual('gitlab')

});

