import { pubReq, userReq } from "../reqMethod"
import { addProductFailure, addProductStart, addProductSuccess,  deleteProductStart, deleteProductSuccess,deleteProductFail, getProductFail, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";
import { loginFail, loginStart, loginSuccess } from "./userRedux";
import{deleteOrderStart,deleteOrderSuccess,deleteOrderFail}from "./orderRedux"
export const login = async (dispatch , user)=> {
    dispatch(loginStart())
    try{ 
                  //we just send our user name  and password we taking it from login page and
                  //we re gonna make post reqyest after that if it succsesful  we re gonna dispatch (send)
                  //our loginsuccesful actiom
         const res =await pubReq.post("/auth/login", user);
         dispatch (loginSuccess(res.data));

    }catch(err){
        dispatch(loginFail())
    }
};

export const getProducts = async (dispatch)=> {
    dispatch(getProductStart())
    try{ 
        
         const res =await pubReq.get("/products");
         dispatch (getProductSuccess(res.data));

    }catch(err){
        dispatch(getProductFail())
    }
};
//delete

export const deleteProduct = async (id,dispatch)=> {
    dispatch(deleteProductStart())
    try{ 
        
         const res = await userReq.delete(`/products/${id}`);
         dispatch (deleteProductSuccess(id));

    }catch(err){
        dispatch(deleteProductFail())
    }
};
//Update




export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userReq.put(`/products/${id}`,product);
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
      const res = await userReq.post(`/products`, product);
      dispatch(addProductSuccess(res.data));
    } catch (err) {
      dispatch(addProductFailure());
    }
  };
  //delte order
  export const deleteOrder = async (id,dispatch)=> {
    dispatch(deleteOrderStart())
    try{ 
        
         const res = await userReq.delete(`/orders/${id}`);
         dispatch (deleteOrderSuccess(id));

    }catch(err){
        dispatch(deleteOrderFail())
    }
};