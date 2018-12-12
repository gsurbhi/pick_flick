
let FAN_URL = 'http://desolate-retreat-56126.herokuapp.com/api/';
//let FAN_URL = 'http://localhost:4000/api/';


//let FAN_URL = 'http://desolate-retreat-56126.herokuapp.com/api/';

class FanServiceClient {


    static followFan(fanId,userId) {
        return fetch(FAN_URL+ userId + '/fan/' + fanId, {
            method: 'post',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    static unfollowFan(fanId,userId) {
        return fetch(FAN_URL + userId+ '/fan/'+fanId, {
            method: 'delete',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static findMyFollowers(userId){
        return fetch(FAN_URL + userId+ '/follower', {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res=>{
            return res.json()
        })
    }

    static findMyFollowing(userId){
        return fetch(FAN_URL + userId+ '/following', {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res=>{
            return res.json()
        })
    }



}

export default FanServiceClient;