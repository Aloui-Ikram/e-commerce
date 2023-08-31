import React from 'react'
import Annonce from '../components/Annonce'
import Navbar from '../components/Navbar'
import Slider from '../components/slider'
import Points from '../components/Points'
import Categories from "../components/Categories"
import Products from '../components/Products'
import Footer from '../components/Footer'
import InfoTitle from '../components/InfoTitle'
import ProductTitle from '../components/ProductTitle';

function Home() {
  return (
    <div>
    <Annonce/>
     <Navbar/>
     <Slider/>
     <Points/>
     <Categories/>
     <Points/>
     <ProductTitle/>
     <Products/>
    
     <Points/>
     <InfoTitle/>
    <Footer/>
    </div>
  )
}

export default Home
