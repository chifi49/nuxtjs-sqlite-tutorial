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