import Item1 from '../../images/item1.jpg'
import Item2 from '../../images/item2.jpg'
import Item3 from '../../images/item3.jpg'
import Item4 from '../../images/item4.jpg'
import Item5 from '../../images/item5.jpg'
import Item6 from '../../images/item6.jpg'
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,TOGGLE_SHIPPING} from '../actions/action-types/cart-actions'


const initState = {
	items: [
		{id:1,title:'Doc', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:110,img:Item1},
		{id:2,title:'Grumpy', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:80,img: Item2},
		{id:3,title:'Dopey', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:120,img: Item3},
		{id:4,title:'Happy', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:260,img:Item4},
		{id:5,title:'Bashful', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:160,img: Item5},
		{id:6,title:'Sleepy', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:90,img: Item6}
	],
	addedItems:[],
	total: 0

}
const cartReducer= (state = initState,action)=>{

	switch( action.type ){
		case ADD_TO_CART : return addToCart(state,action)
		case REMOVE_ITEM : return removeItem(state,action)
		case SUB_QUANTITY : return subQuantity(state,action)
		case ADD_QUANTITY : return addQuantity(state,action)
		case TOGGLE_SHIPPING : return toggleShipping(state,action)
	}
   
	return state
}

const addToCart = (state,action)=>{
	let addedItem = state.items.find(item=> item.id === action.id)
	//check if the action id exists in the addedItems
	let existed_item= state.addedItems.find(item=> action.id === item.id)
	if(existed_item)
	{
	  addedItem.quantity += 1 
		return{
		  ...state,
			total: state.total + addedItem.price 
		}
	}
	else{
	  addedItem.quantity = 1;
	  //calculating the total
	  let newTotal = state.total + addedItem.price 
	  
	  return{
			...state,
			addedItems: [...state.addedItems, addedItem],
			total : newTotal
		}	
	}
	return state
}

const removeItem = (state,action)=>{
	let removedItem = state.items.find(item=> item.id === action.id);

	let addedItems = state.addedItems.filter( item=> item!=removedItem );
	
	let removedPrice = removedItem.quantity * removedItem.price;
	
	removedItem.quantity = 0;
	
	return{
		...state,
		total: state.total - removedPrice,
		addedItems: addedItems,
	}
}

const subQuantity = (state, action)=>{
	let item = state.items.find(item=> item.id === action.id)

	if(item.quantity===1)return removeItem(state,action)

	item.quantity -= 1

	return{
		...state,
		total: state.total - item.price
	}
}

const addQuantity = (state, action)=>{
	let item = state.items.find(item=> item.id === action.id)

	if(item.quantity===0)return addToCart(state,action)

	item.quantity += 1

	return{
		...state,
		total: state.total + item.price
	}
}

const toggleShipping = (state, action)=>{
	
}

export default cartReducer;