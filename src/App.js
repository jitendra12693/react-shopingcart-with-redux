import React, { useEffect, useState } from 'react';
import Filter from './components/filter';
import Product from './components/products';
import data from './data.json';

function App() {
  const [size, setSize] = useState("");
  const [sort, setsort] = useState("");
  const [products, setproducts] = useState(data.products);

  useEffect(() => {
    setproducts(data.products);
  }, [])

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

  const filterProducts = (event) => {
    debugger;
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
            <Product products={products} />
          </div>
          <div className="sidebar">
            Cart Item
          </div>
        </div>
      </main>
      <footer>All right is reserved.</footer>
    </div>
  );
}

export default App;
