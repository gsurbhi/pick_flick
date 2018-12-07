let _singleton = Symbol();

class UserServiceClient {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static login(username,password) {
        console.log(username)
        console.log(password)
        return true
    }
}


export default UserServiceClient;