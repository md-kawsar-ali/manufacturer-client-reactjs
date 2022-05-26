import React, { useState, useEffect } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ order }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { _id, price, customer, email } = order;

    useEffect(() => {
        fetch("https://autima-pro-manufacturer.herokuapp.com/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    // Handle Card Payment
    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccess('');
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // { paymentMethod } removed from below
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            const err = error.message;
            setCardError(err);
        } else {
            setCardError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: customer,
                        email: email
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
        } else {
            setCardError('');

            fetch(`https://autima-pro-manufacturer.herokuapp.com/myorder/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({
                    transactionId: paymentIntent.id,
                    paid: true
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount === 1) {
                        setSuccess(`Your Payment is Completed!`);
                        setLoading(false);
                        toast.success('Your Payment is Completed!', {
                            duration: 4000
                        })
                        navigate('/dashboard');
                    }
                })
        }
    }

    return (
        <div>
            <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                    <h2 className='text-2xl text-slate-700 font-bold mb-4'>Card Payment</h2>
                    <form onSubmit={handleSubmit}>
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                        <button className={`btn btn-md text-white mt-5 w-full ${loading && 'loading'}`} type="submit" disabled={!stripe || !clientSecret || loading}>
                            Make Payment
                        </button>
                    </form>
                    {
                        cardError && <p className='text-red-500 font-medium mt-2'>{cardError}</p>
                    }
                    {
                        success && <p className='text-green-600 font-medium mt-2'>{success}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;