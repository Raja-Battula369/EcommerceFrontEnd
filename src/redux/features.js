
import { createSlice } from '@reduxjs/toolkit';

const initalState = {
    cart: [],
    isCartOpen: false,
    Token: '',
    userName: ''
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initalState,
    reducers: {
        addToCart: (state, action) => {
            const exists = state.cart.find((prod) => prod.id === action.payload.id)
            if (!exists) {
                state.cart = [...state.cart, { ...action.payload }]
            } else {
                state.cart = [...state.cart]
            }

        },
        cartQtyChange: (state, action) => {
            state.cart = state.cart.filter((prod) => prod.id === action.payload.id ? prod.qty = action.payload.qty : prod.qty)

        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((prod) => prod.id !== action.payload.id)
        },

        cardOpen: (state) => {
            state.isCartOpen = !state.isCartOpen

        },
        addToken: (state, action) => {
            state.Token = action.payload
        },
        addUserName: (state, action) => {
            state.userName = action.payload
        },
        logOut: (state) => {
            state.Token = ""
        }
    }
});

export const { addToCart, cartQtyChange, removeFromCart, cardOpen, addToken, addUserName, logOut } = cartSlice.actions;
export default cartSlice.reducer;