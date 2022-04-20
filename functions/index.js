const functions = require("firebase-functions");
const express = require("express")
const cors = require("cors");
const { request, response } = require("express");

const stripe = require("stripe")('sk_test_51Kp4OHSFfMrfeY2qfRsgKd0z50g783QTIQTBUMayEjZ8jDgGZTFPRC0ULpJuO2eleWC236D6Kp7xMdbkOZfGZj8600wGKRS2js');

const app = express();

app.use(cors({origin: true}));
app.use(express.json())

app.get('/', (request, response) => response.status(200).send("hellow world"))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total
    console.log('Payment request received', total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency:"usd",
    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

exports.api = functions.https.onRequest(app)