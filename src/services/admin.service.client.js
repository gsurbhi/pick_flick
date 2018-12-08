let _singleton = Symbol();

let HEROKU_URL = 'https://desolate-retreat-56126.herokuapp.com/api/';

class AdminServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new AdminServiceClient(_singleton);
        return this[_singleton]
    }

    static findAllFavoriteMovies() {
        return fetch(HEROKU_URL + 'admin/user/favMovies', {
            credentials: 'include',
            method: 'get'
        })
    }

    static getUsers(){
        return fetch(HEROKU_URL+'admin/user',{
            credentials: "include",
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static updateUser(user){
        return fetch(HEROKU_URL+'admin/user',{
            credentials: "include",
            method: 'post',
            body:JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }})
    }

    static deleteUser(id){
        return fetch(HEROKU_URL+'admin/user/'+id,{
            credentials: "include",
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }})
    }
    

    static deleteFavoriteMovie(favouriteMovie, user) {
        return fetch(HEROKU_URL + `user/${user._id}/movie/${favouriteMovie._id}/dislike`,{
            method: 'delete'
        });
    }
}

export default AdminServiceClient;