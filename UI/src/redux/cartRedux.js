import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
        addProduct: (state, action) => {
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quant;
      },
    addProducts: (state, action) => {
      state.quantity += action.payload.length;
      for (let i=0; i < action.payload.length; i++) {
        state.products.push(action.payload[i]);
        state.total += action.payload[i].price;
      }
    },
    removeProduct: (state, action) => {
      state.quantity -= 1;
      state.total -= action.payload.y * action.payload.z;
      const productId = state.products.findIndex(product => {
        return product._id === action.payload.x;
      })
      state.products.splice(productId, 1);
    },
    updateProduct: (state, action) => {
      const productId = state.products.findIndex(product => {
        return product._id === action.payload.x;
      });
    
      if (action.payload.mark === "-") {
        if (state.products[productId].quant >= 1) {
          state.products[productId].quant -= 1;
          state.total -= state.products[productId].price;
        }
      } else {
        state.products[productId].quant += 1;
        state.total += state.products[productId].price;
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    }
},
});


export const { addProduct, addProducts, removeProduct, updateProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;