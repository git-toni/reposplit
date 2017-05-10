import {observable,  computed} from 'mobx';
import R from 'ramda'
import {guid} from '../utils/numbers'

let findLeaves = uuid => R.and( R.propEq('type', 'leaf'), R.propEq('uuid', uuid))

class UiStore{
  @observable errors = []
  //@observable notifications = [
  //  {type:'info',content:'Hola que tal'},
  //]
  @observable notifications = []
  @observable loading = null
  @observable modal = null
  @observable panels = []
  @observable panelTL = null
  @observable panelTR = null
  @observable panelBL = null
  @observable panelBR = null
  @observable activePanel = 'TL'
  @observable openFolders = []
  @observable divVertical = null
  @observable divLeft = null
  @observable divRight = null
  @observable divThick = 8
  @observable nextPos = null
  @observable maximizedPanel = null
  @observable foldersWidth = 20
  @observable repoUser = null
  @observable repoName = null
  @observable repoProvider = null
  @observable repoBranch = null
  @observable repoTruncated = false
  @observable repo = null
  /*
  @observable repo = {type:'tree',path:[], name:'', children: [
    {type:'leaf', path:[], name:'setup.rb', content:"ZGVmIGRpc2tmaWxlCiAgQGZpbGUuYXR0cmlidXRlc1s6bWFya3VwXSB8fD0g\nbWFya3VwX2Zvcl9maWxlKCcnLCBAZmlsZS5maWxlbmFtZSkKICBkYXRhID0g\naHRtbGlmeShAZmlsZS5jb250ZW50cywgQGZpbGUuYXR0cmlidXRlc1s6bWFy\na3VwXSkKCiAgIyBIYWNrIG91ciB3YXkgdG8gd29ya2luZyBoYXNoIGFuY2hv\ncnMgZm9yIHRoZSBSRUFETUUuCiAgIyBHaXRIdWIgZ2VuZXJhdGVzIGhlYWRl\nciBsaW5rcyBhcyAjc29tZS10aGluZyBhbmQgWUFSRAogICMgZ2VuZXJhdGVz\nIHRoZW0gYXMgI1NvbWVfdGhpbmcgc28gdGhpcyBtYWtlcyB0aGUgbmVjZXNz\nYXJ5CiAgIyBjaGFuZ2VzIHRvIHRoZSBnZW5lcmF0ZSBkb2NzIHNvIHRoZSBs\naW5rcyB3b3JrIGJvdGggb24KICAjIEdpdEh1YiBhbmQgaW4gdGhlIGRvY3Vt\nZW50YXRpb24uCiAgaWYgQGZpbGUubmFtZSA9PSAiUkVBRE1FIgogICAgZGF0\nYS5zY2FuKC9ocmVmXD1cIlwjKC4rKVwiLykuZWFjaCBkbyB8YmFkX2xpbmt8\nCiAgICAgIGRhdGEuZ3N1YiEoYmFkX2xpbmsuZmlyc3QsIGJhZF9saW5rLmZp\ncnN0LmNhcGl0YWxpemUuZ3N1YignLScsICdfJykpCiAgICBlbmQKICBlbmQK\nCiAgIjxkaXYgaWQ9J2ZpbGVjb250ZW50cyc+IiArIGRhdGEgKyAiPC9kaXY+\nIgplbmQK\n", uuid: guid()},
    {type:'leaf', path:[], name:'config.rb', content:"cmVxdWlyZSAnc2F3eWVyJwoKcGF0Y2ggPSBNb2R1bGUubmV3IGRvCiAgZGVm\nIGhyZWYob3B0aW9ucz1uaWwpCiAgICAjIFRlbXBvcmFyeSB3b3JrYXJvdW5k\nIGZvcjogaHR0cHM6Ly9naXRodWIuY29tL29jdG9raXQvb2N0b2tpdC5yYi9p\nc3N1ZXMvNzI3CiAgICBuYW1lLnRvX3MgPT0gInNzaCIgPyBAaHJlZiA6IHN1\ncGVyCiAgZW5kCmVuZAoKU2F3eWVyOjpSZWxhdGlvbi5zZW5kKDpwcmVwZW5k\nLCBwYXRjaCkK\n", uuid: guid()},
    {type:'tree', path:[], name:'src', content:'', _isOpen:true, uuid: guid(),
      children:[
        {type:'leaf', path:['src'], name:'app.rb', content:"bW9kdWxlIE9jdG9raXQKCiAgIyBFeHRyYWN0cyBvcHRpb25zIGZyb20gbWV0\naG9kIGFyZ3VtZW50cwogICMgQHByaXZhdGUKICBjbGFzcyBBcmd1bWVudHMg\nPCBBcnJheQogICAgYXR0cl9yZWFkZXIgOm9wdGlvbnMKCiAgICBkZWYgaW5p\ndGlhbGl6ZShhcmdzKQogICAgICBAb3B0aW9ucyA9IGFyZ3MubGFzdC5pc19h\nPyg6Okhhc2gpID8gYXJncy5wb3AgOiB7fQogICAgICBzdXBlcihhcmdzKQog\nICAgZW5kCgogIGVuZAplbmQK\n", uuid: guid()},
        {type:'leaf', path:['src'], name:'variables.yml', content:"bW9kdWxlIE9jdG9raXQKICBjbGFzcyBDbGllbnQKCiAgICAjIE1ldGhvZHMg\nZm9yIHRoZSBFbW9qaXMgQVBJCiAgICBtb2R1bGUgRW1vamlzCgogICAgICAj\nIExpc3QgYWxsIGVtb2ppcyB1c2VkIG9uIEdpdEh1YgogICAgICAjCiAgICAg\nICMgQHJldHVybiBbU2F3eWVyOjpSZXNvdXJjZV0gQSBsaXN0IG9mIGFsbCBl\nbW9qaXMgb24gR2l0SHViCiAgICAgICMgQHNlZSBodHRwczovL2RldmVsb3Bl\nci5naXRodWIuY29tL3YzL2Vtb2ppcy8jZW1vamlzCiAgICAgICMgQGV4YW1w\nbGUgTGlzdCBhbGwgZW1vamlzCiAgICAgICMgICBPY3Rva2l0LmVtb2ppcwog\nICAgICBkZWYgZW1vamlzKG9wdGlvbnMgPSB7fSkKICAgICAgICBnZXQgImVt\nb2ppcyIsIG9wdGlvbnMKICAgICAgZW5kCiAgICBlbmQKICBlbmQKZW5kCg==\n", uuid: guid()}
      ]
    },
    {type:'tree', name:'proc', path:[], content:'', _isOpen:false, uuid: guid(), 
      children:[
        {type:'leaf', path:['proc'], name:'tasks.rb', content:'', uuid: guid()},
        {type:'leaf', path:['proc'], name:'NOWAY.yml', content:'', uuid: guid()}
      ]
    }
  ]}
  */

  get anyFileOpen(){
    return !!this.panelTL 
        || !!this.panelTR
        || !!this.panelBL 
        || !!this.panelBR
  }
  get repoRetrieved(){
    return !!this.repo
  }
  get repoIsSet(){
    return !!this.repoName && !!this.repoUser && !!this.repoProvider
  }
  get asJS(){
    return { 
      //errors: this.errors, 
    }
  }

}

/*
function applyByUUID(tree, uid, cb){
  if(!tree) return undefined
    let condUUID = findLeaves(uid)
  let found = R.find(condUUID)(tree)
  if(!!found){
    console.log('found here',found)
    cb(found)
    return found
  }
  else{
    let trees = R.filter(R.propEq('type','tree'))(tree)
    //found = applyByUUID(trees[0].children, uid, cb)
    //console.log('foundzzz',found)
    if(!trees.length) return
    for(let t of trees){
      //console.log('t',t)
      found = applyByUUID(t.children, uid, cb)
      if(!!found){
        return found
      }
    }
    return undefined
  }
}
*/
const ui = new UiStore()

export default ui
