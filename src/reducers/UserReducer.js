import UserServiceClient from '../services/user.service.client'

let initUser = {
    username:'',
    password:''
}

const userReducer = (state=initUser, action) => {

    switch (action.type) {
        case 'LOGIN':{
            let bool = UserServiceClient.login(action.username,action.password)
            if(bool === true) {
                return {
                    username: action.username,
                    password: action.password
                }
            }

        }


    }
}

export default userReducer