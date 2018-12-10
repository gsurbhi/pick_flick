import React from 'react';

export const CriticReviewsListItem = ({review}) => {

    let date = new Date(review.createdDate).toLocaleDateString();
    return (
        <div className="card shadow p-3 mb-5 bg-white rounded ">
            <div className="card-body">
                <h5>{review.title}</h5>
                <p>{date} | By {review.reviewer.firstName} {review.reviewer.lastName}</p>
                <h6>{review.text}</h6>
            </div>
        </div>
    )
}