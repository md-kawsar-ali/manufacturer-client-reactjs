import React from 'react';

const SingleBlog = ({ question, answer }) => {
    return (
        <div class="card w-full bg-slate-100 mb-6">
            <div class="card-body">
                <h2 class="card-title">{question}</h2>
                <p>{answer}</p>
            </div>
        </div>
    );
};

export default SingleBlog;