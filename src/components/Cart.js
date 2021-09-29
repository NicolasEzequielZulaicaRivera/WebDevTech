import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Total from './Total';
import { removeItem, subQuantity, addQuantity } from './actions/cartActions'

class Cart extends Component{

    render(){
              
        let addedItems = this.props.items.length ?
            (  
                this.props.items.map(item=>{
                    return(
                       
                        <li className="collection-item avatar" key={item.id}>
                                    <div className="item-img"> 
                                        <img src={item.img} alt={item.img} className=""/>
                                    </div>
                                
                                    <div className="item-desc">
                                        <span className="title">{item.title}</span>
                                        <p>{item.desc}</p>
                                        <p><b>Price: {item.price}$</b></p> 
                                        <p>
                                            <b>Quantity: {item.quantity}</b> 
                                        </p>
                                        <div className="add-remove">
                                            <Link to="/cart"
                                                onClick={ ()=>{this.props.addQuantity(item.id)} }
                                            >
                                                <i className="material-icons">arrow_drop_up</i>
                                            </Link>
                                            <Link to="/cart"  
                                                onClick={ ()=>{this.props.subQuantity(item.id)} }
                                            >
                                                <i className="material-icons">arrow_drop_down</i>
                                            </Link>
                                        </div>
                                        <button 
                                            className="waves-effect waves-light btn pink remove"
                                            onClick={ ()=>{this.props.removeItem(item.id)} }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    
                               </li>                        
                    )
                })
            ):

             (
                <div className="collection-item">
                    <p>Nothing.</p>
                </div>
             )
       return(
            <div className="container">
                <div className="cart">
                    <h5>You have ordered:</h5>
                    <ul className="collection">
                        {addedItems}
                    </ul>
                </div>  
                <Total />
            </div>
       )
    }
}

const mapStateToProps = (state)=>{
    return{
        items: state.addedItems
    }
}

const mapDispatchToProps= (dispatch)=>{
    
  return{
    removeItem: (id)=>{dispatch(removeItem(id))},
    subQuantity: (id)=>{dispatch(subQuantity(id))},
    addQuantity: (id)=>{dispatch(addQuantity(id))},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)