import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import CheckoutProduct from './CheckoutProduct'
import './Payment.css'
import axios from 'axios'
import { useStateValue } from './StateProvider'
import { useEffect } from 'react'
import { getBasketTotal } from './reducer'
import { db } from './firebase'

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements()
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const getClientSecret = async () => {
            const parameter = {total: getBasketTotal(basket) * 100}
            const response =  axios.post(`http://localhost:5001/clone-1ef90/us-central1/api/payments/create?total=${getBasketTotal(basket) * 100}`)
            setClientSecret((await response).data.clientSecret)
        }
        getClientSecret();
    }, [basket])

    console.log("Cliet SECRET -->",clientSecret)
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {payment_method:{
            card: elements.getElement(CardElement)
        }
    }).then(({paymentIntent}) => {
        db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created
        })

        setSucceeded(true);
        setError(null);
        setProcessing(false)
        dispatch({
            type: 'EMPTY_BASKET'
        })
        navigate('/orders')
    })

    }

    const handleChange = e => {

    }
  return (
    <div className='payment'>
    <div className='payment__container'>
        <h1>
            Checkout (
                <Link to="/checkout">{basket?.length} items</Link>
                )
        </h1>


        {/* Payment section - delivery address */}
        <div className='payment__section'>
            <div className='payment__title'>
                <h3>Delivery Address</h3>
            </div>
            <div className='payment__address'>
                <p>{user?.email}</p>
                <p>123 React Lane</p>
                <p>Los Angeles, CA</p>
            </div>
        </div>

        {/* Payment section - Review Items */}
        <div className='payment__section'>
            <div className='payment__title'>
                <h3>Review items and delivery</h3>
            </div>
            <div className='payment__items'>
                {basket.map(item => (
                    <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                    />
                ))}
            </div>
        </div>
    

        {/* Payment section - Payment method */}
        <div className='payment__section'>
            <div className="payment__title">
                <h3>Payment Method</h3>
            </div>
            <div className="payment__details">
                    {/* Stripe magic will go */}

                    <form onSubmit={handleSubmit}>
                        <div className='payment__cardElement'>
                            <CardElement onChange={handleChange}></CardElement>
                        </div>
                        <div className='payment__priceContainer'>
                            <CurrencyFormat
                                renderText={(value) => (
                                    <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                            
                        </div>

                          {/* Errors */}
                        {error && <div>{error}</div>}
                    </form>
            </div>
        </div>
    </div>
</div>
)
}

export default Payment