import React, {Component} from 'react';  
import {observer, inject} from 'mobx-react';
import notiActions from '../../actions/notifications'
import {reqLogin} from '../../requests/Auth'

@inject('ui') @observer
class LoginModal extends Component{
  constructor(props){
    super(props)
    this.state ={
      email: '',
      password: '',
      isLoading: false
    }
    this.submitForm = this.submitForm.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }
  submitForm(e){
    this.setState({isLoading: true})
    reqLogin(this.state.email, this.state.password)
    e.preventDefault()
  } 
  isLoading(){
    return this.state.isLoading ? 'is-loading' : ''
  }
  render(){
    const {session} = this.props
    return(
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content box has-padding-4">
          <div className='modal-title has-text-centered title is-2'>
            Login
          </div>
          <form className="form" onSubmit={this.submitForm}>
            <label className="label">Email</label>
            <p className="control has-icon has-icon-right">
              <input className="input" type="text" placeholder="Email" onChange={e=> this.setState({email: e.target.value})}  value={this.state.email}/>
            </p>
            <label className="label">Password</label>
            <p className="control has-icon has-icon-right">
              <input className="input" type="password" placeholder="Password" onChange={e=> this.setState({password: e.target.value})}  value={this.state.password}/>
            </p>

            <div className="has-margin-top-2 control is-grouped">
              <p className="control">
                <button type='submit' className={`button is-large is-primary ${this.isLoading()}`} disabled={this.state.isLoading}>Submit</button>
              </p>
            </div>
          </form>
        </div>
        <button onClick={notiActions.removeModal} className="modal-close"></button>
      </div>
    )
  }
}

export default LoginModal
