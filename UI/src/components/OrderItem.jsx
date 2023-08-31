import styles from '../styles/Order.module.css'
import {useState,useEffect} from 'react'
import axios from 'axios'
//import Image from 'next/image'

const OrderItem = ({Product}) => {
const [product,setProduct] = useState([])
 useEffect(()=>{
   const fetchProduct = async()=>{
    try{ 
     const res = typeof(window)!=="undefined" &&  await axios.get(`${window.location.origin}/api/product/find/${Product.productId}`)
     setProduct(res.data)
    }catch(err){
      
    }
   }
   fetchProduct()
 },[Product.productId])


  return (
  product && (
   <>
   <td className={styles.tdI}>
     <div className={styles.imgContainer}>
       
     </div>
   </td>
   <td >
    <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
     <div className={styles.colorContainer} style={{backgroundColor:Product.color}}> </div>
    </div>
   </td>
   <td >
    <span style={{fontSize:'22px'}}>{Product?.size} </span>
   </td>
    <td >
    <span style={{fontSize:'22px'}}> {Product?.quantity} </span>
   </td>
   <td className={styles.td}>
    <span className={styles.total}>{Product?.quantity * product.price} DA </span>
   </td>
 </>)

  )
}

export default OrderItem