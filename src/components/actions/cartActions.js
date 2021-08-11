import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,TOGGLE_SHIPPING} from './action-types/cart-actions'

//add cart action
export const addToCart= (id)=>{
    return{
        type: ADD_TO_CART,
        id
    }
}
//remove item action
export const removeItem= (id)=>{
    return{
        type: REMOVE_ITEM,
        id
    }
}
//substract quantity action
export const subQuantity= (id)=>{
    return{
        type: SUB_QUANTITY,
        id
    }
}
//add quantity action
export const addQuantity= (id)=>{
    return{
        type: ADD_QUANTITY,
        id
    }
}
//toggle shipping action
export const toggleShipping= (id)=>{
    return{
        type: TOGGLE_SHIPPING,
        id
    }
}