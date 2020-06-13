var users = [];

var addUser  = (({ id, name})=> {

    var user = { id, name};
    users.push(user);
    return { user };
});

var removeUser = (id)=> {

    var index = users.findIndex(({ id }) => id === id);
    if(index !== -1) { 
         return users.splice(index, 1)[0]; 
        }
        
}
var getUser = (id) => users.find((user) => user.id === id);
var getUsers = () => { return users; }

module.exports = { addUser, removeUser, getUsers, getUser};

