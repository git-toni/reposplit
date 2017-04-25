// Make Enzyme functions available in all test files without importing
import { shallow, render, mount } from 'enzyme';
import React,{Component} from 'react';  
global.shallow = shallow;
global.render = render;
global.mount = mount;

global.React = React;
global.Component = Component;


// Fail tests on any warning
console.error = message => {
   throw new Error(message);
};

//test('',()=>{ 2 })
//global.doGoodSession = function(payload={}){
//}
