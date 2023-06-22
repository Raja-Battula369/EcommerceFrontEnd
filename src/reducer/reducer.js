

const reducer = (state, action) => {
    switch (action.type) {
        case "display_products":
            return { ...state, products: action.playload };
        case "add_to_cart":
            return { ...state, cart: [{ ...action.playload, qty: 1 }, ...state.cart] }
        case "qty_change": {
            return { ...state, cart: state.cart.filter((prod) => prod.id === action.playload.id ? prod.qty = action.playload.qty : prod.qty) }
        }
        case "remove_from_cart":
            return { ...state, cart: state.cart.filter((prod) => prod.id !== action.playload.id) }
        default:
            break;
    }
}

export default reducer
