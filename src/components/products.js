import React, { useEffect, useState } from 'react';
import formatCurrency from '../util';
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

const Product = (props) => {
    const [product, setProduct] = useState({});
    const [modal, setmodal] = useState(false)
    const openModal = (item) => {
        setProduct(item);
        setmodal(!modal);
    }
    const closeModal = () => {
        setmodal(!modal);
    }
    return (
        <div>
            <Fade bottom cascade>
                <ul className="products">
                    {
                        props.products.map((item, index) => (
                            <li key={item._id}>
                                <div className="product">
                                    <a href={"#" + item._id} onClick={() => openModal(item)} >
                                        <img src={item.image} alt="product Image" />
                                        <p>{item.title}</p>
                                    </a>

                                    <div className="product-price">
                                        <div>{formatCurrency(item.price)}</div>
                                        <button className="button primary" onClick={() => props.addToCart(item)} >Add To Cart</button>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </Fade>
            {product && (
                <Modal isOpen={modal} onRequestClose={closeModal}>
                    <Zoom>
                        <button className="close-modal" onClick={closeModal}>x</button>
                        <div className="product-details">
                            <img src={product.image} alt={product.title}></img>
                            <div className="product-details-description">
                                <p>
                                    <strong>{product.title}</strong>
                                </p>
                                <p>{product.description}</p>
                                <p>
                                    Avaiable Sizes:{" "}
                                    {product.availableSizes && product.availableSizes.map((x) => (
                                        <span>
                                            {" "}
                                            <button className="button">{x}</button>
                                        </span>
                                    ))}
                                </p>
                                <div className="product-price">
                                    <div>{"$"} {product.price}</div>
                                    <button
                                        className="button primary"
                                        onClick={() => {
                                            props.addToCart(product);
                                            closeModal();
                                        }}
                                    >
                                        Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                </Modal>
            )}
        </div>
    )
}

export default Product