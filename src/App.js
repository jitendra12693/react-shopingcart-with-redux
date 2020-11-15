import React from 'react';
import Product from './components/products';
import data from './data.json';

function App() {
  return (
    <div className="grid-container">
      <header>
        <a href='/'>React Shoping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Product products={data.products} />
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
