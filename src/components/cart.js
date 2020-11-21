import React, { useState } from 'react'
import formatCurrency from '../util';
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

const Cart = (props) => {
    const { cartItem } = props;
    const [userData, setuserData] = useState({ email: '', name: '', address: '' })
    const [showCheckout, setshowCheckout] = useState(false);
    const [order, setorder] = useState({});
    const { email, name, address } = userData;
    const [modal, setmodal] = useState(false)

    const handleInput = (e) => {
        setuserData({ ...userData, [e.target.name]: e.target.value })
    }

    const showCheckoutForm = () => {
        setshowCheckout(true);
    }
    const closeModal = () => {
        setmodal(!modal);
    };

    const createOrder = (e) => {
        debugger;
        e.preventDefault();
        const orderDetail = {
            _id: 1,
            name: userData.name,
            email: userData.email,
            address: userData.address,
            cartItems: props.cartItem,
            total: props.cartItem.reduce((a, c) => a + c.price * c.count, 0),
        };
        setorder(orderDetail)
        setmodal(!modal)
        //props.createOrder(order);
    };


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
                            {cartItem.map((item, index) => (
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
                <div>
                    <div className="cart">
                        <div className="total">
                            <div>
                                Total:{" "}
                                {formatCurrency(
                                    cartItem.reduce((a, c) => a + c.price * c.count, 0)
                                )}
                            </div>
                            <button
                                onClick={showCheckoutForm}
                                className="button primary" > Proceed </button>
                        </div>
                    </div>
                    {showCheckout && (
                        <Fade right cascade>
                            <div className="cart">
                                <form onSubmit={createOrder}>
                                    <ul className="form-container">
                                        <li>
                                            <label>Email</label>
                                            <input
                                                name="email"
                                                type="email"
                                                value={email}
                                                required
                                                onChange={(e) => handleInput(e)}
                                            ></input>
                                        </li>
                                        <li>
                                            <label>Name</label>
                                            <input
                                                name="name"
                                                type="text"
                                                value={name}
                                                required
                                                onChange={(e) => handleInput(e)}
                                            ></input>
                                        </li>
                                        <li>
                                            <label>Address</label>
                                            <input
                                                name="address"
                                                type="text"
                                                value={address}
                                                required
                                                onChange={(e) => handleInput(e)}
                                            ></input>
                                        </li>
                                        <li>
                                            <button className="button primary" type="submit"> Checkout </button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </Fade>
                    )}
                </div>
            )}

            {order && (
                <Modal isOpen={modal} onRequestClose={closeModal}>
                    <Zoom>
                        <button className="close-modal" onClick={closeModal}> x </button>
                        <div className="order-details">
                            <h3 className="success-message">Your order has been placed.</h3>
                            <h2>Order {order._id}</h2>
                            <ul>
                                <li>
                                    <div>Name:</div>
                                    <div>{order.name}</div>
                                </li>
                                <li>
                                    <div>Email:</div>
                                    <div>{order.email}</div>
                                </li>
                                <li>
                                    <div>Address:</div>
                                    <div>{order.address}</div>
                                </li>
                                <li>
                                    <div>Date:</div>
                                    <div>{order.createdAt}</div>
                                </li>
                                <li>
                                    <div>Total:</div>
                                    <div>{" "} {order.total}</div>
                                </li>
                                <li>
                                    <div>Cart Items:</div>
                                    <div>
                                        {order && order.cartItems && order.cartItems.length > 0 && order.cartItems.map((x) => (
                                            <div>
                                                {x.count} {" x "} {x.title}
                                            </div>
                                        ))}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Zoom>
                </Modal>
            )}

        </div>

    )
}
export default Cart

