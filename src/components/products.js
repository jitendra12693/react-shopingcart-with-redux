import React, { useEffect } from 'react';
import formatCurrency from '../util';

const Product = (props) => {

    useEffect(() => {

        console.log(props.products);

    }, [])

    return (
        <div>
            <ul className="products">
                {
                    props.products.map((item, index) => (
                        <li key={item._id}>
                            <div className="product">
                                <a href={"#" + item._id}>
                                    <img src={item.image} alt="product Image" />
                                    <p>{item.title}</p>
                                </a>

                                <div className="product-price">
                                    <div>{formatCurrency(item.price)}</div>
                                    <button className="button primary" >Add To Cart</button>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Product