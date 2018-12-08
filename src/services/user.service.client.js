let _singleton = Symbol();

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

    static login(username,password) {
        console.log(username)
        console.log(password)
        return true
    }

    getProfile(){
        return {
            id:1,
            username:'alice',
            password:'alice',
            firstName:'Alice',
            lastName:'Wonderland',
            email:'alice@pickflick.com',
            dob:'26-11-1993',
            phone:'617-893-8604',
            city: 'Boston'

        }
    }
}


export default UserServiceClient;