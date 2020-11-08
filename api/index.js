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