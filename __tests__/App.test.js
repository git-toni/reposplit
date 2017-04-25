import React,{Component} from 'react';  
import {shallow} from 'enzyme';
import App from '../src/components/App';

test('App renders', () => {
  let name = 'John'
  let email = 'John'
  let status = 'Pending'
  let session ={
    userData:{
      name:'John'
    },
    userName: 'John',
    status: 'Pending'
  }
  const app = shallow(
    <App user={222}  session={session}/>
  );

  expect(app.html()).toMatch('John');

});
