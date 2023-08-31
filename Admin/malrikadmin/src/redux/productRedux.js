import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "product",
    initialState: {
      products: [],
      isFetching: false,
      error: false,

},
  reducers:{
    //our action and we re gonna to dispatch them
    //get all fetching our data
    getProductStart:(state)=>{
        state.isFetching= true;
        state.error=false;
    },
    getProductSuccess:(state,action)=>{
        state.isFetching= false;
        state.products=action.payload; //updating our product
    },
    getProductFail:(state,action)=>{
        state.isFetching= false;
        state.error=true;
    },
     //DELETE
     deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteProductFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },
   // UPDATE
updateProductStart: (state) => {
  state.isFetching = true;
  state.error = false;
},
updateProductSuccess: (state, action) => {
  state.isFetching = false;
  const productIndex = state.products.findIndex(
    (item) => item._id === action.payload.id
  );
  if (productIndex !== -1) {
    state.products[productIndex] = action.payload.product;
  }
},
updateProductFailure: (state) => {
  state.isFetching = false;
  state.error = true;
},
    //Add product
    addProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },
    addProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
 
  },
})
export const {
    getProductStart,
    getProductSuccess,
    getProductFail,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFail,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure,
  } = productSlice.actions;
  
  export default productSlice.reducer;