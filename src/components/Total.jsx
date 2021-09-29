import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toggleShipping } from './actions/cartActions'


class Total extends Component {

	componentWillUnmount() {

    if(this.refs.shipping.checked)
    	this.props.toggleShipping(false)
    this.refs.shipping.checked = false
  }

	render(){

		return (
			<div className="total collection" >
				<div className="collection-item">
					<label>
            <input type="checkbox" ref="shipping" 
            	onChange= { (e)=>{
            		console.log(e.target);
            		console.log(e.target.cheked);
            		this.props.toggleShipping(e.target.checked)
            	}} 
            />
            <span>Shipping(+{this.props.shippingPrice}$)</span>
          </label>
				</div>
				<div className="collection-item">
					<h3> Total: {this.props.total} </h3> 
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state)=>{
	return {
	  total: state.total,
	  shippingPrice: state.shippingPrice,
	}
}
const mapDispatchToProps= (dispatch)=>{
    
  return{
  	toggleShipping: (shipping)=>{dispatch(toggleShipping(shipping))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Total)
