export let userProfile ={
  id: 4, name:'John', email:'john@gmail.com', favorites:[]
}
export let userIndex =[
  {id: 4, name:'John', email:'john@gmail.com', favorites:[]},
  {id: 5, name:'Dani', email:'dani@gmail.com', favorites:[]},
  {id: 6, name:'James', email:'james@gmail.com', favorites:[]},
]



//LOGIN
export let goodEmail = 'lol@hola.la'
export let badEmail = 'llllll@lll.aa'
export let goodPassword = 3333
export let goodLogin = {
  jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqaXQiOiI4YjY5ZjVkOGNhOWEzMmU3MjJhNzIxNGZlZTgyMTZlNiIsImV4cCI6MTYxNTM4NDQ0OSwidXNlciI6eyJpZCI6NCwibmFtZSI6ImxvbCIsImVtYWlsIjoibG9sQGhvbGEubGEifX0.YK2d2dojA8WMUYFENvfRUm64y_yt7tBk13Zc-E4Zy6E'
}

export let badLogin = {

}

export default {
  userProfile,
  userIndex,
  goodEmail,
  badEmail,
  goodPassword,
  goodLogin,
  badLogin
}
