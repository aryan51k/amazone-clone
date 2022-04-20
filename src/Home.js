import React from 'react'
import "./Home.css"
import Product from './Product'
function Home() {
  return (
    <div className='home'>
        
        <div className='home__container'>
            <img alt=''  className= 'home__image' src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"/>
            <div className='home__row'>
                <Product id = "224151455" title="ASUS TUF Gaming VG289Q1A 4K Gaming Monitor – 28 inch UHD 4K (3840x2160), IPS, DCI-P3, Adaptive-Sync, FreeSync™, HDR 10" price={2000.99} rating={3} image = 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Electronics/Clearance/Clearance_store_Desktop_CC_1x._SY304_CB628315133_.jpg'/>
                <Product id= "2549746446" title="OPPO A31 (Fantasy White, 6GB RAM, 128GB Storage) with No Cost EMI/Additional Exchange Offers" image = "https://images-eu.ssl-images-amazon.com/images/I/41jr5nrfFoL._AC_SR400,600_.jpg" price = {150} rating = {3}/>
            </div>
            <div className='home__row'>
                <Product id = "2465467976" title= "2021 Apple iPad Pro with Apple M1 chip (11-inch/27.96 cm, Wi-Fi, 256GB) - Space Grey (3rd Generation)" image = 'https://m.media-amazon.com/images/I/81Y5WuARqpS._AC_UY218_.jpg' rating ={4} price = {250}/>
                <Product id ="2456795614" title="Echo Dot (3rd Gen) - #1 smart speaker brand in India with Alexa (Black)" image="https://m.media-amazon.com/images/I/61EXU8BuGZL._AC_UY218_.jpg" rating={4} price = {60}/>
                <Product id = "248867166" title ="Fitbit Versa 3 Health & Fitness Smartwatch with GPS, 24/7 Heart Rate, Alexa Built-in, 6+ Days Battery, Black/Black, One Size (S & L Bands Included)" image = "https://m.media-amazon.com/images/I/61ZXwnqqOuS._AC_UL320_.jpg" price = {140} rating={5}/>
            </div>
            <div className='home__row'>
                <Product id = "25646446489" title = "Samsung 125 cm (50 inches) Crystal 4K Pro Series Ultra HD Smart LED TV UA50AUE70AKLXL (Black) (2021 Model)" image="https://m.media-amazon.com/images/I/61GwJAhftvS._AC_UY218_.jpg" rating = {2} price = {1000}/>
            </div> 
        </div>
    </div>

  )
}

export default Home