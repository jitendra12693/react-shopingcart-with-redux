import React, { PureComponent } from 'react'
import formatCurrency from '../util';
import Fade from "react-reveal/Fade";

const Cart = (props) => {
    const { cartItem } = props;
    return (
        <div>
            {cartItem.length === 0 ? (
                <div className="cart cart-header">Cart is empty.</div>
            ) : (
                    <div className="cart cart-header">
                        You have {cartItem.length} item in the cart {" "}
                    </div>
                )
            }
            <div>
                <div className="cart">
                    <Fade left cascade>
                        <ul className="cart-items">
                            {cartItem.map((item, inde) => (
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title}></img>
                                    </div>
                                    <div>{item.title}</div>
                                    <div className="right">
                                        {formatCurrency(item.price)} x {item.count} {" "}
                                        <button className="button" onClick={() => props.removeFromCart(item)}>Remove</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Fade>
                </div>
            </div>
            {cartItem.length !== 0 && (
                <div className="cart">
                    <div className="total">
                        Total:{" "}
                        {formatCurrency(cartItem.reduce((a, c) => a + c.price * c.count, 0))}
                    </div>
                    <button className="button primary">Procced</button>
                </div>
            )}
        </div>

    )
}
export default Cart