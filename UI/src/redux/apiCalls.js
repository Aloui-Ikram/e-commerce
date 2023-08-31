import { pubReq, userReq } from "../reqMethod"
import {  getUserOrdersStart, getUserOrdersSuccess, getUserOrdersFailure,loginFail, loginStart, loginSuccess, updateInfo } from "./userRedux"


export const login = async (dispatch , user)=> {
    dispatch(loginStart())
    try{ 
                  //we just send our user name  and password we taking it from login page and
                  //we re gonna make post reqyest after that if it succsesful  we re gonna dispatch (send)
                  //our loginsuccesful actiom
         const res =await pubReq.post("/auth/login", user);
         dispatch (loginSuccess(res.data));
         window.location.href="/";
         

    }catch(err){
        dispatch(loginFail())
    }
}
export const register = async (dispatch, user) => {
    dispatch(loginStart());
    try {
      const res = await pubReq.post("/auth/register", user);
      dispatch(loginSuccess(res.data));
      window.location.href="/";
      return true
    } catch (err) {
      dispatch(loginFail());
      
      return false
    }
   };

   export const getUserOrders = (userId) => {
    return async (dispatch) => {
      dispatch(getUserOrdersStart());
      try {
        const res = await userReq.get(`/orders/find/${userId}`);
        dispatch(getUserOrdersSuccess(res.data));
      } catch (err) {
        dispatch(getUserOrdersFailure());
      }
    };
  };
