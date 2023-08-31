import { createSlice } from '@reduxjs/toolkit';
import { userReq } from '../reqMethod';

export const updateOrderStatus = (orderId, newStatus) => {
  return async (dispatch) => {
    try {
      await userReq.put(`/orders/${orderId}`, { status: newStatus });
      dispatch(orderSlice.actions.updateStatus({ orderId, newStatus }));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
  
    updateStatus: (state, action) => {
      const { orderId, newStatus } = action.payload;
      state.orders = state.orders.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      });

    },
    //DELETE
    deleteOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteOrderFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {  updateStatus ,deleteOrderStart,deleteOrderSuccess,deleteOrderFail} = orderSlice.actions;
export default orderSlice.reducer;