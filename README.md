# Redux

## Getting Started with create-react-app

### Available Scripts

- `npm install`
- `npx kill-port 3000`
- `npm start`

## [Shopping-Cart Tutorial](https://medium.com/@ayabellazreg/make-a-simple-shopping-cart-app-using-react-redux-1-3-fefde93e80c7)

- [x] Part 1
- [x] Part 2
- [ ] Part 3
	- [ ] Add / Sub Quantity
	- [ ] Shipping Toggle 
	- [ ] `componentWillUnmount`
- [ ] Review & Refactor

### Tutorials

- [x] [Intro for beginners](https://www.youtube.com/watch?v=CVpUuw9XSjY)
- [x] [Cómo funciona redux](https://www.youtube.com/watch?v=5iMhFH9alI0)
- [x] [Actions en redux](https://www.youtube.com/watch?v=2iAKHu2rw-g&list=PL4WxketMZHyeeU3pilSJbgiIFnVzSUFVb&index=2)
- [x] [Reducers en redux](https://www.youtube.com/watch?v=ZvEEpZR2NKU&list=PL4WxketMZHyeeU3pilSJbgiIFnVzSUFVb&index=4&t=0s)
- [ ] [Playlist de react redux](https://www.youtube.com/playlist?list=PL4cUxeGkcC9ij8CfkAY2RAGb-tmkNwQHG)

### Read/Watch List
- [x] Materialize
	- [Setup](https://materializecss.com/getting-started.html)
	- [material icons](https://materializecss.com/icons.html)
- [x] [Polymorphism in reducers](https://www.pluralsight.com/guides/polymorphism-and-action-bubbling-in-redux?clickid=zDr2jURuOxyLTQAwUx0Mo3IgUkBRua2m%3AUsNR40&irgwc=1&mpid=29332&aid=7010a000001xAKZAA2&utm_medium=digital_affiliate&utm_campaign=29332&utm_source=impactradius)
- [x] [Event Propagation - Bubbling & Capturing](https://www.youtube.com/watch?v=BtOrr7oTH_8&ab_channel=ZacGordon)
- [ ] [Multiple Stores](https://stackoverflow.com/questions/33619775/redux-multiple-stores-why-not)
- [ ] [Redux devtools](https://github.com/reduxjs/redux-devtools/tree/master/extension) 
- [ ] Router & Links
- [ ] ES6 - [W3S](https://www.w3schools.com/react/react_es6.asp)
- [ ] Spread operator (...) - [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

### [Alternative Parctice](#another_repo)

Test out different aproaches seen in tutorials
Other things to put in practice
- Multiple Reducers
- Polymorphims in Reducer

### Notes

#### Redux

##### Structure

```
 📂src
 ┣━📂resources
 ┣━📂components
 ┃ ┣━📂actions
 ┃ ┃ ┣━📦action-types
 ┃ ┃ ┗━📦actions
 ┃ ┣━📂reducers
 ┃ ┗━📦components
 ┣━📄index.js
 ┗━📄App.js
```

\

##### At index

- `import { createStore } from 'redux';`
- `import { Provider } from 'react-redux';`
- `import cartReducer from './components/reducers/cartReducer';` import reducers

###### Create a store
`const store = createStore(cartReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());`

- Create a store (~global state) passing a reducer, connection to devtool
- To have multiple reducers in a store: [`combineReducers`](https://redux.js.org/api/combinereducers)

###### Pass Store to App

```jsx
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);
```

\

##### Components ⚠️

> I dont fully understand what's going on here, but it should be something like this:

> mapStateToProps(state) connects the data in the component to the one in the store.
> The function takes the state of the reducer and passes it as props to the component.

> mapDispatchToProps adds the return object as props of the component.
> This object should contain functions that dispatch actions to the reducers.
> This functions should be called in the component.

- `import { connect } from 'react-redux'`
- `import { addToCart } from './actions/cartActions'` import actions

###### connect

`connect`

###### mapStateToProps

`mapStateToProps`

###### mapDispatchToProps

`mapDispatchToProps`

###### Handlers

- Lorem Ipsum

\

##### Reducers

###### action-types

`export const ADD_TO_CART = 'ADD_TO_CART';`

- Types should be in const to avoid typos and duplication since it's a string and could be easily miss spelled

###### actions

`import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING} from './action-types/cart-actions'` 

- import action-types

```jsx
export const addToCart= (id)=>{
    return{
        type: ADD_TO_CART,
        id // ES6 notation. same as id:id
    }// it is common to call parameter as 'payload'
}
```

- The action only contains info on what is to be done

###### reducers

`const initState = {...}` define an initial state

```jsx
const cartReducer= (state = initState,action)=>{

    if(action.type === ADD_TO_CART){
         // add item to cart
         // relevant info in the action
    }
    if(action.type === OTHER_ACTION){
         // add other action
    }
    else{
        return state
    }
}
```

- The reducer contains the logic that implements the actions
- The if-else clauses can be replaced with a switch or polymorphism

`export default cartReducer;`

- export the reducer



#### Development Environment

- [Chrome devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)