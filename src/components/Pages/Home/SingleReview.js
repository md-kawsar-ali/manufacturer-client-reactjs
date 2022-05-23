import React from 'react';

const SingleReview = ({ review }) => {
    const { _id, name, description, rating } = review;
    return (
        <div className='p-7 rounded-lg bg-slate-100'>
            <q className="text-lg text-slate-600 italic block mb-2">
                {description}
            </q>
            <h3 className="text-2xl font-bold mb-2">{name}</h3>
            <div className="rating rating-sm">
                {
                    [...Array(5)].map((item, index) => <input
                        key={index}
                        type="radio"
                        className='mask mask-star-2 bg-orange-400'
                        name={_id}
                        checked={rating === (index + 1) ? true : false}
                        disabled />)
                }
            </div>
        </div>
    );
};

export default SingleReview;