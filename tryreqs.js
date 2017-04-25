var axios = require('axios')

// for user 4
var goodjwt="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqaXQiOiIwZjYzMTA5YmRlMjQ0Y2U3ZTlhZWQzNmRhN2YwZGUwNCIsImV4cCI6MTYxNTY1OTkwNCwidXNlciI6eyJpZCI6MSwibmFtZSI6IkdyZWVuIE9yYW5nZSIsImVtYWlsIjoidXNlcjFAdGVzdC5jb20ifX0.BjBPSabvaSnAaXyVoBVEL46DDBUvwo3crcMvwuKJRKU"


//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqaXQiOiIzYzNkYzA3Nzk3ZGYzYWM3ZjNlZWEyZTEyZGEzOTc5YyIsImV4cCI6MTYxNTM5NjE4NSwidXNlciI6eyJpZCI6MSwibmFtZSI6IkdyZWVuIE9yYW5nZSIsImVtYWlsIjoidXNlcjFAdGVzdC5jb20ifX0.r8JnxO7dhxk-yfODSio8_QpKidbnWLYJnXOtqqxe-3c


//.get('http://localhost:3000/users/asd/profile',{headers:{authorization: "Bearer "+goodjwt}})
//axios
//.get('http://localhost:3000/lololo',{headers:{authorization: "Bearer "+goodjwt}})
//.then(function(res){console.log(res)})
//.catch(function(err){ console.log(err) })


//LOGIN

//axios
//.post('http://localhost:3000/login',{auth:{email:'lol@hola.la',password:3333}})
//.then(function(res){console.log(res)})
//.catch(function(err){ console.log(err) })
//
//
//axios
//.post('http://localhost:3000/login',{auth:{email:'lol@hola.la',password:2333}})
//.then(function(res){console.log(res)})
//.catch(function(err){ console.log(err) })


//SETTINGS
//axios
//.get('http://localhost:3000/users/1/settings',{headers:{authorization: "Bearer "+goodjwt}})
//.then(function(res){console.log(res)})
//.catch(function(err){ console.log(err) })


//INDEX
axios
.get('http://localhost:3000/users',{headers:{authorization: "Bearer "+goodjwt}})
.then(function(res){console.log(res)})
.catch(function(err){ console.log(err) })
