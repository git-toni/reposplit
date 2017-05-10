import R from 'ramda'

function styleUnits(unit){
  return function(amount){
    return amount+unit
  }
}

const vw = styleUnits('vw')
const vh = styleUnits('vh')
const pc = styleUnits('%')
const px = styleUnits('px')
const em = styleUnits('em')

let transformations ={
  left: R.pipe(R.toString,R.append('vw'), R.join('')),
  right: R.pipe(R.toString,R.append('vw'), R.join('')),
  top: R.pipe(R.toString,R.append('vh'), R.join('')),
  bottom: R.pipe(R.toString,R.append('vh'), R.join('')),
  height: R.pipe(R.toString,R.append('vh'), R.join('')),
  width: R.pipe(R.toString,R.append('vw'), R.join('')),
}
function evolveDimensions(target){
  return R.evolve(transformations, target)
}

let transPC ={
  left: R.pipe(R.toString,R.append('%'), R.join('')),
  right: R.pipe(R.toString,R.append('%'), R.join('')),
  top: R.pipe(R.toString,R.append('%'), R.join('')),
  bottom: R.pipe(R.toString,R.append('%'), R.join('')),
  height: R.pipe(R.toString,R.append('%'), R.join('')),
  width: R.pipe(R.toString,R.append('%'), R.join('')),
  maxWidth: R.pipe(R.toString,R.append('%'), R.join('')),
}
function evolveDimensionsPC(target){
  return R.evolve(transPC, target)
}

function detectLanguage(name){
  let ext = name.split('.').slice(-1)[0]
  let mappings = {
    'js': 'javascript',
    'json': 'javascript',
    'jsx': 'javascript',
    'rb': 'ruby',
    'c': 'c',
    'h': 'c',
    'cpp': 'cpp',
    'hpp': 'cpp',
    'ex': 'elixir',
    'java': 'java',
    'jar': 'java',
    'py': 'python',
    'yml': 'yaml',
    'yaml': 'yaml',
    'md': 'markdown',
    'css': 'css',
    'scss': 'scss',
    'sass': 'scss',
    'html': 'sass',
    'dart': 'dart',
    'lua': 'lua',
    'ts': 'typescript',
    'm': 'matlab',
    'jl': 'julia',
    'go': 'go',
  }
  let choice = mappings[ext]
  //choice = !!choice ? choice : ''
  choice = !!choice ? choice : 'javascript'
  //console.log('ext choice',ext, choice)
  return choice
}

export {
  styleUnits,
  vw,
  vh,
  pc,
  px,
  em,
  evolveDimensions,
  evolveDimensionsPC,
  detectLanguage,
}
