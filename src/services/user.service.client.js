let _singleton = Symbol();
let heroku = 'http://desolate-retreat-56126.herokuapp.com/api/';

class UserServiceClient {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new UserServiceClient(_singleton);
        return this[_singleton]
    }

    static isloggedIn(){
        return fetch(heroku+'login',{
            credentials:'include'
        })
    }

    static isAdmin(){
        return fetch(heroku+'login/isAdmin',{
            credentials:'include'
        })
    }

    static login(username,password) {
        var user ={
            username: username,
            password:password};
        return fetch(heroku+'login',{
            method:'POST',
            headers:{
                'Content-type': 'application/json'
            },
            credentials:'include',
            body: JSON.stringify(user),
        })
    }

    static  logout (){
        return fetch(heroku+'logout',{
            credentials:'include'
        })
    }

    static register(user){
        var newuser = user
        return fetch(heroku+'register',{
            headers:{
                'Content-type': 'application/json'
            },
            method:'POST',
            body:JSON.stringify(newuser),
            credentials:'include',
        })

    }

    static createUser (user){
        return fetch(heroku+'user',{
            method:'POST',
            headers:{
                'Content-type': 'application/json'
            },
            credentials:'include',
            body:JSON.stringify(user),
        }).then(response=>response.json())
    }

    static findUserById(userId){
        return fetch(heroku+'user/'+userId,{
            method:'GET',
            credentials:'include',
        }).then(response=>response.json())
    }

    static findAllUsers(){
        return fetch(heroku+'user',{
            method:'GET',
            credentials:'include',
        }).then(response=>response.json())
    }

    static updateProfile(user){
        return fetch(heroku+'profile',{
            method:'PUT',
            headers:{
                'Content-type': 'application/json'
            },
            body:JSON.stringify(user),
            credentials:'include'
        })
    }

    static getProfile() {
    return fetch(heroku+'profile',{
        method:'GET',
        credentials:'include'
    }).then(response=>response.json())


    }
}


export default UserServiceClient;