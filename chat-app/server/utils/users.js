class Users {
    constructor () {
        this.users = []
    }

    addUser(Id,room,name) {
        var user = { Id , room , name }
        this.users.push(user);
        return user;
    }

    getUser(Id) {
        var user = this.users.filter((user) => {
            user.Id == Id;
        });

        return user;
    }

    removeUser(Id) {

        var user = this.getUser(Id);
        this.users.pop(user);
        return user;
    }

    getUserList(room) {
        var users = this.users.filter((user) => {
            user.room == room;
        })
        var UsersArray = users.map((user) => user.name)
        
        return UsersArray;
    }
}

module.exports = {
    Users
}