/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Cart from './components/cart';
import Filter from './components/filter';
import Product from './components/products';
import data from './data.json';

function App() {
  const [size, setSize] = useState("");
  const [sort, setsort] = useState("");
  const [products, setproducts] = useState(data.products);
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    setproducts(data.products);
  }, [])

  useEffect(() => {
    setCartItem(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []);
  }, [localStorage.getItem('cartItems')])

  const addToCart = (product) => {
    const cartItems = cartItem.slice();
    let alreadyinCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyinCart = true;
      }
    });
    if (!alreadyinCart) {
      cartItems.push({ ...product, count: 1 });
    }
    setCartItem(cartItems);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  const sortProducts = (event) => {
    setsort(event.target.value);
    const productList = data.products.slice().sort((a, b) => (
      event.target.value === "lowest" ?
        ((a.price > b.price) ? 1 : -1) :
        event.target.value === "highest" ?
          ((a.price < b.price) ? 1 : -1) :
          ((a._id < b._id) ? 1 : -1)
    ))

    setproducts(productList);
  }

  const removeFromCart = (product) => {
    const cartItems = cartItem.slice();
    setCartItem(cartItems.filter(item => item._id !== product._id));
    localStorage.setItem('cartItems', JSON.stringify(cartItems.filter(item => item._id !== product._id)));
  }

  const filterProducts = (event) => {
    if (event.target.value === "") {
      setSize("");
      setproducts(data.products);
    } else {
      setSize(event.target.value);
      const productList = data.products.filter(item => item.availableSizes.indexOf(event.target.value) >= 0);
      setproducts(productList);
    }
  }

  return (
    <div className="grid-container">
      <header>
        <a href='/'>React Shoping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter counts={products.length} size={size} sort={sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts} />
            <Product products={products} addToCart={addToCart} />
          </div>
          <div className="sidebar">
            <Cart cartItem={cartItem} removeFromCart={removeFromCart} />
          </div>
        </div>
      </main>
      <footer>All right is reserved.</footer>
    </div>
  );
}

export default App;
