import { createSlice } from "@reduxjs/toolkit";

// LocalStorage'dan varsa al, yoksa boş dizi
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
    name: "cart",
    initialState:{ cart: savedCart },
    reducers: {
        addToCart: (state, { payload}) =>{ 
            // Sepette aynı üründen varmı kontrol et
            const found = state.cart.find((item) => item.id=== payload.item.id && item.type === payload.selectedType);
            if(found){
                //Sepette aynı üründen varsa adetini arttır, yoksa ürünü ekle
                found.amount++;
            }else{
                state.cart.push({...payload.item, type:payload.selectedType, amount: 1});

               
            }
            // Redux state değişince localStorage'a kaydet
            localStorage.setItem("cart", JSON.stringify(state.cart));

        },

        deleteFromCart: (state, { payload}) =>{
            // Sepette aynı üründen varmı kontrol et
            const index = state.cart.findIndex((item) => item.id=== payload.id && item.type === payload.type);

            if (state.cart[index].amount > 1) {
                // Sepette aynı üründen varsa adetini azalt, yoksa ürünü çıkar
                state.cart[index].amount--;
            } else {
                state.cart.splice(index, 1);
            }
            localStorage.setItem("cart", JSON.stringify(state.cart));
         },

         removeFromCart: (state, { payload}) =>{
            // Ürünü tamamen sepetten çıkar
            state.cart = state.cart.filter((item) => !(item.id === payload.id && item.type === payload.type));
            localStorage.setItem("cart", JSON.stringify(state.cart));
         },

        createOrder: (state, { payload}) =>{ 
            state.cart = [];
            localStorage.removeItem("cart");
        },

        updateCartAmount: (state, { payload }) => {
            const found = state.cart.find(i => i.id === payload.id && i.type === payload.type);
            if (found) found.amount = payload.amount;
            localStorage.setItem("cart", JSON.stringify(state.cart));
        }
    }
})


export const { addToCart, deleteFromCart, createOrder, removeFromCart, updateCartAmount } = cartSlice.actions;
export default cartSlice.reducer;