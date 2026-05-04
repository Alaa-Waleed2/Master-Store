import React from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails({ products }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="product-details-container">
      <div className="product-details-inner">
        <div style={{ textAlign: "center" }}>
          <img src={product.image} alt={product.title} />
        </div>

        <div>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <h3>${product.price}</h3>
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
