import React from "react";
import { Link } from "react-router-dom";

export default function ProductList({ products, addToCart }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <img src={product.image} alt={product.title} />
            <h4>{product.title.length > 20 ? product.title.slice(0, 20) + "..." : product.title}</h4>
          </Link>
          <p>${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
