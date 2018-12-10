import MovieServiceClient from "./movie.service.client";

let _singleton = Symbol();
let CRITIC_URL = 'https://desolate-retreat-56126.herokuapp.com/api/review';

class CriticServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new CriticServiceClient(_singleton);
        return this[_singleton]
    }

    static createCriticReview(review) {
        return fetch(CRITIC_URL, {
            method:'post',
            credentials: 'include',
            body: JSON.stringify(review),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    static findAllCriticReviewsForMovie(movieId) {
        console.log(movieId)
        return fetch(CRITIC_URL+"/"+movieId, {
            credentials: 'include'
        }).then(response => response.json())
    }

    static findAllCriticReviewsForUser(){
        return fetch(CRITIC_URL, {
            credentials: 'include'
        }).then(response => response.json())
    }

    static deleteCriticReview(reviewId){
        return fetch(CRITIC_URL + "/" + reviewId,{
            method: 'delete',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static updateCriticReview(review){
        return fetch(CRITIC_URL, {
            method:'put',
            credentials: 'include',
            body: JSON.stringify(review),
            headers: {
                'Content-Type': 'application/json'
            }
        })

    }
}



export default CriticServiceClient;
/*
app.post('/api/review',createCriticReview);
    app.get('/api/review/:movieId',findAllCriticReviewsForMovie);
    app.get('/api/review',findAllCriticReviewsForUser);
    app.delete('/api/review/:reviewId',deleteCriticReview);
    app.put('/api/review',updateCriticReview);
 */