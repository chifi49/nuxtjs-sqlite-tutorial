# Installation
### 1st step

create a nuxt app
`npm create nuxt-app <project-name>`
e.x.
`npm create nuxt-app nuxtjs-sqlite-tutorial`

### 2nd step

move to project
`cd nuxtjs-sqlite-tutorial`

### 3rd step
install packages `sqlite3` and `@nuxtp/http`

`npm install --save sqlite3 @nuxt/http`

### 4th step
enable nuxt/http inside modules in file nuxt.config.js

```
modules: [
    '@nuxt/http'
]
```

### 5th step
create a folder with the name 'database' inside your project

download the application `db browser for sqlite` [here](https://sqlitebrowser.org/)

open the application and create a new database and save it inside the `database` folder with the name `db.sqlite`

while you still have the application open, create a table `users` and add to 2 columns: `id` as primary key auto increment and `name` as text type

browse the table `users` and enter some data

then write changes to the database and close the application


### 6th step
create a folder `models` inside your project and add a file with the name `users.js` and the following code
````
function users(db){
    this.db = db;
}
users.prototype.findUsers = async function(){
    var me = this;
    return new Promise(function(resolve,reject){
        me.db.all("select * from users",[],function(err,rows){
            if(err){
                return reject(err);
            }
            resolve(rows);
        })
    })
}

module.exports = users;
````


### 7th step
create a folder `api` inside your project and inside that folder add a file named `index.js` with the following contents
````
const bodyParser = require('body-parser')
const app = require('express')()

const sqlite3 = require('sqlite3');
let db = new sqlite3.Database(__dirname+'/../database/db.sqlite',sqlite3.OPEN_READWRITE,function(err){
    if(err){
        console.log(__dirname);
        console.log(err);
    }
});

const usersmodel = require(__dirname+'/../models/users.js');


app.use(bodyParser.json())
app.all('/users', async (req, res) => {
  const usersdb = new usersmodel(db);
  const users = await usersdb.findUsers();
  res.json({ users: users })
})

module.exports = app
````

register your api in `nuxt.config.js` with the following code
````
serverMiddleware:[
    {
      path:'/api',handler:'~/api/index.js'
    }
  ]
````

### 8th step
If you open your application in http://localhost:3000/api/users you should see the response from your api with the content of the users table.
If you want to include it an a vue page then load it from the method asyncData
e.x
````
<template>
    <ul>
        <li v-for="user in users">
            {{user.id}} - {{user.name}}
        </li>
    </ul>
</template>
<script>
export default{
async asyncData(context){
    const data = await context.$http.$get('/api/users');
    return {
      users: data.users
    }
  }
}
</script>
`````

