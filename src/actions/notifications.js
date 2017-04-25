import { action } from 'mobx';
import { ui } from '../stores'

const actions ={
  @action removeAllNotifications(){
    ui.notifications =[]
  },
  @action removeNotification(i){
    ui.notifications.splice(i,1)
  },
  @action addNotification(type, msg){
    let noti = { type, content: msg }
    ui.notifications.push(noti) 
  },
  @action addErrorNotification(msg){
    this.addNotification('error',msg)
  },
  @action addInfoNotification(msg){
    this.addNotification('info',msg)
  },
  @action addLoading(msg){
    ui.loading = msg
  },
  @action removeLoading(){
    this.addLoading(null)
  },
  @action addModal(name){
    ui.modal = name
  },
  @action removeModal(){
    ui.modal = null
  },

}
export default actions
