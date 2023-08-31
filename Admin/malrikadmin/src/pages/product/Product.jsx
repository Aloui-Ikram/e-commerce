import React from 'react'
import "./product.css";
import { Link ,useLocation} from 'react-router-dom';
import Chart from "../../components/chart/Chart"
import app from '../../firebase';

import { updateProduct } from "../../redux/apiCalls";
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { userReq } from '../../reqMethod';
import { useEffect } from 'react';
import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Product() {
  const location = useLocation();
    const productId = location.pathname.split("/")[2];
     //inside our products arry we re trying to find our product by using its id
     const product = useSelector((state) =>
     state.product.products.find((product) => product._id === productId)
   );
   // Access properties using optional chaining
const productImg = product?.img;
const productTitle = product?.title;
const producttId= product?._id;      
const productDesc= product?.desc;    
const productPrice= product?.price;    
const productCat= product?.categories;    
  
        console.log(product); 
    const [pStats, setPStats] = useState([]);
    const MONTHS = useMemo(
        () => [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Agu",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        []
      );
  const [inputs,setInputs]=useState({});
  const [file,setFile]=useState(null);

  const [color,setColor]=useState([]);
  const [size,setSize]=useState([]);
  const [stock,setinStock]=useState();
  const dispatch =useDispatch();

  //title desc price 
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  
  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };
  const handleStock = (e) => {
    setinStock(e.target.value);
  };
  const handleSize= (e) => {
    setSize(e.target.value.split(","));
  };
  const handleClick = (e) => {
    e.preventDefault();
   //to give the file uniq name
   const fileName = new Date().getTime() + file.name;
   const storage = getStorage(app);
   const storageRef = ref(storage, fileName);
  
   const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //nb3t tswira lla base de donne
     const product ={...inputs,img:downloadURL, color:color,size:size, inStock:stock};
     updateProduct(productId, product, dispatch);
    });
  }
);

  };
 









    
      useEffect(() => {
        const getStats = async () => {
          try {
            const res = await userReq.get("orders/income?pid=" + productId);
            const list = res.data.sort((a,b)=>{
                return a._id - b._id
            })
            list.map((item) =>
              setPStats((prev) => [
                ...prev,
                { name: MONTHS[item._id - 1], Sales: item.total },
              ])
            );
          } catch (err) {
            console.log(err);
          }
        };
        getStats();
      }, [productId, MONTHS]);
  
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create a new product</button>
        </Link>
      </div>
      <div className="productTop">
         
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={productImg} alt={productTitle} className="productInfoImg" />
                  <span className="productName" >{productTitle}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{producttId}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">price:</span>
                      <span className="productInfoValue">{productPrice}DA</span>
                  </div>
                 
                  <div className="productInfoItem">
                      <span className="productInfoKey">Category:</span>
                      <span className="productInfoValue">{productCat}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input name="title" type="text" placeholder="product name" onChange={handleChange}/>
                  <label> Product Description</label>
                  <input name="desc" type="text" placeholder="description .." onChange={handleChange} />

                  
                  <label>Color</label>
                  <input  name="color" type="text" placeholder="brown,pink" onChange={handleColor}/>
                  
                 
                  <label>Size</label>
                  <input  name="color" type="text" placeholder="S,M" onChange={handleSize}/>
                 

                  <label> Price</label>
                  <input name="price" type="number" placeholder="price .." onChange={handleChange} />
                  
                      <label onChange={handleStock}>Stock</label>
                         <select    name="inStock">
                        <option value="true">YES</option>
                         <option value="false">NO</option>
                      </select>
               
                  
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                  <img src={productImg} alt={productTitle} className="productUploadImg" />
                       
                      <label for="file">
                          <PublishRoundedIcon className='icon'/>
                      </label>
                      <input  type="file" id="file" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])} />
                   
                  </div>
                  <button className="productButton" onClick={handleClick}>Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}

