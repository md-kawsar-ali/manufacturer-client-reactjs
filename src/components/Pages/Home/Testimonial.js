import React, { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Title from './Title';
import SingleReview from './SingleReview';

const Testimonial = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('https://autima-pro-manufacturer.herokuapp.com/review')
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.error(err))
    }, []);

    return (
        <section className='py-24'>
            <div className="container mx-auto px-8 lg:px-14">
                <Title title='What People Say' />

                <Swiper
                    modules={[Pagination]}
                    spaceBetween={10}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        }
                    }}
                >
                    {
                        reviews?.map(review => <SwiperSlide key={review._id}>
                            <SingleReview review={review} />
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonial;