import {React } from 'react'
import './productList.css'
import { DataGrid} from "@mui/x-data-grid";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteProduct, getProducts } from '../../redux/apiCalls';
import { Link } from 'react-router-dom/cjs/react-router-dom';


function ProductList() {

    const dispatch =useDispatch();
 //ywrihomli f redux tool who to make them disply in our interface --> by using useSelctor
   const products = useSelector(state=>state.product.products)
    useEffect(()=>{
      getProducts(dispatch)

    },[dispatch])
   

    const handleDelete = (id) => {
      deleteProduct(id,dispatch)
      };
    
      const columns = [
        { field: "_id", headerName: "ID", width: 260 },
        {
          field: "product",
          headerName: "Product",
          width: 350,
          renderCell: (params) => {
            return (
              <div className="productListItem">
                <img className="productListImg" src={params.row.img} alt="" />
                {params.row.title}
              </div>
            );
          },
        },
        { field: "inStock", headerName: "Stock", width: 100 },
       
        {
          field: "price",
          headerName: "Price",
          width: 130,
        },
        {
          field: "action",
          headerName: "Action",
          width: 160,
          renderCell: (params) => {
            
                return (
                
                   
                   <div className='act'>
                   <Link to={"/product/" + params.row._id}>
                   
                      <button className="productListEdit"> 
                      Edit</button>
                      </Link>
                      <DeleteOutlineRoundedIcon className='productListDelete'
                      onClick={() => handleDelete(params.row._id)} />
                  </div>
                );
                },
              },
            
      ];
    
  return (
    
    <div className='productList'>
    <DataGrid
    rows={products}
    disable
    columns={columns}
    getRowId={(row)=>row._id}
    autoPageSize
    checkboxSelection
  />
    </div>
  )
}

export default ProductList
