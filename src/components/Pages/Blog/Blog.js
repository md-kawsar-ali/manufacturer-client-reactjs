import React from 'react';
import SubHeader from './../../shared/SubHeader';
import SingleBlog from './SingleBlog';

const Blog = () => {
    const blogs = [
        {
            id: 1,
            question: 'How will you improve the performance of a React Application?',
            answer: "There are a lot of things that can improve the parformace of a React Application such as Keeping component state local where necessary,Memoizing React components to prevent unnecessary re-renders,Code-splitting in React using dynamic import, Windowing or list virtualization in React and Lazy loading images in React. Also we should focus on Image optimization by reducing image size and type."
        },
        {
            id: 2,
            question: 'What are the different ways to manage a state in a React application?',
            answer: "There are four main types of state manage in React app: (1) Local state, (2) Global state, (3) Server state, (4) URL state. Local State: Local state is most often managed in React using the useState hook! Global State: Global state is data we manage across multiple components! Server State: Data that comes from an external server that must be integrated with our UI state! URL State: Data that exists on our URLs, including the pathname, query parameters and search parameters!"
        },
        {
            id: 3,
            question: 'How does prototypical inheritance work?',
            answer: "The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object."
        },
        {
            id: 4,
            question: 'Why you do not set the state directly in React?',
            answer: "Becase, by setting or changing react state directly I will lose control of the state across all components. If I directly update the state, it will not change state immediately. Instead, it will create a pending state transition, and accessing it after calling this method will only return the present value."
        },
        {
            id: 5,
            question: 'What is a unit test? Why should write unit tests?',
            answer: "Unit testing is a testing method that tests an individual software unit in isolation. Unit testing allows the programmer to refactor code at a later date, and make sure the module still works correctly (i.e. Regression testing). The procedure is to write test cases for all functions and methods so that whenever a change causes a fault, it can be quickly identified and fixed."
        }
    ]

    return (
        <div>
            <SubHeader title="Our Blog" />

            <section className="py-16 md:py-20 lg:py-24 b-slate-50">
                <div className="container mx-auto px-8 lg:px-48">
                    {
                        blogs?.map(blog => <SingleBlog
                            key={blog.id}
                            question={blog.question}
                            answer={blog.answer}
                        />)
                    }
                </div>
            </section>
        </div>
    );
};

export default Blog;