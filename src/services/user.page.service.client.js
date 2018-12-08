let movies =
    [
        {
            title:'a'
        },
        {
            title:'b'
        },
        {
            title:'c'
        },
        {
            title:'d'
        }
    ]

let series =
    [
        {
            title:'s1'
        },
        {
            title:'s2'
        },
        {
            title:'s3'
        },
        {
            title:'s4'
        }
    ]

let myList =
    [
    {
        title:'my1'
    },
    {
        title:'my2'
    },
    {
        title:'my3'
    },
    {
        title:'my4'
    }
    ]

export default class UserPageService {

    getTrendingMovies = () =>{
        return movies;
    }

    addToUsersList = (movie) => {
        // ADD UNIQUENESS CHECK. DO NOT RE-ADD ALREADY PRESENT MOVIES
        myList.push(movie)
    }

    getUsersList = () => {
        return myList
    }

    deleteFromUsersList = (movie) => {
        // CHECK IF MOVIE IS PRESEnt
        myList = myList.filter(movie1 => movie1!==movie)
    }
}


