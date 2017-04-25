import React,{Component} from 'react';  
import {px, em} from '../utils/styles'
import {repo} from '../actions'
import {filePresent} from '../utils/repo'
import FileO from 'react-icons/lib/fa/file-o'
import FolderClosed from 'react-icons/lib/fa/folder'
import FolderOpen from 'react-icons/lib/fa/folder-open-o'

//import {MdCancel} from 'react-icons/lib/md'

let {toggleFolder, openFile} = repo

let depth = 0
const vwWidth = document.documentElement.clientWidth
const item = (el, containerWidth, ui, depth=1) =>{
  //console.log('presence',el.name, presence)
  if(el.type === 'leaf'){
    let isPresent = filePresent(ui, el)
    let presence = !!isPresent ? isPresent : ''
    //console.log('isPresent',isPresent)
    //&#8984;
    return(
      <div key={el.name} className={`tree-leaf isOpen-${presence}`} onClick={openFile.bind(null, el)}>
        <FileO />
         &nbsp;
        {el.name}
      </div>
    )
  }
  else if(el.type ==='tree'){
    let spaceLeft = depth*8
    let styles = {
      left: px(spaceLeft),
      width: px(vwWidth*(containerWidth/100)-spaceLeft)
    }
    if(!!el._isOpen){
      //&darr;
      return([
        <div className="tree-tree" key={Math.random()} onClick={toggleFolder.bind(null, el.uuid)}>
          <span className='folder-icon open'>
          <FolderOpen />
          </span>
          {el.name}
        </div>,
        <div className='tree-children' style={styles} >
          {renderChildren(el,containerWidth, ui, depth++)}
        </div>
          ]
        )
    }
    else if(!el._isOpen){
      //&rarr;
      return(
        <div className="tree-tree" key={Math.random()} onClick={toggleFolder.bind(null, el.uuid)}>
          <span className='folder-icon closed'>
          <FolderClosed />
          </span>
          {el.name}
        </div>
        )
    }
  }
}
function renderChildren(el, containerWidth, ui, depth){
  if(!!el.children.length){
    return el.children.map( c => item(c, containerWidth, ui, depth + 1))
  }
}
//&uarr; &darr;
//⌘
//

export default item
