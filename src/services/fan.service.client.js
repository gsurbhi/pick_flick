let FAN_URL = 'https://desolate-retreat-56126.herokuapp.com/api/movie';

class FanServiceClient {

    static findAllFans() {
        return fetch(FAN_URL + 'fan', {
            method: 'get',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    static followFan(id) {
        return fetch(FAN_URL + 'fan/' + id, {
            method: 'post',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    static unfollowFan(item) {
        return fetch(FAN_URL + 'fan/unfollow', {
            method: 'delete',
            credentials: "include",
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static getFanContent(id) {
        return fetch(FAN_URL + 'fan/likes/' + id, {
            method: 'get',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })

    }

    static getFollowedFansForUser() {
        return fetch(FAN_URL + 'fan/following', {
            method: 'get',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

export default FanServiceClient;