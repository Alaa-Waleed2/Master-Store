// src/components/ProductCard.js
import React from "react";

export default function ProductCard({ product, addToCart }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        width: "200px",
        textAlign: "center",
        borderRadius: "10px",
        background: "#fff",
        boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
        transition: "0.3s",
      }}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "100px", height: "100px", objectFit: "contain", marginBottom: "10px" }}
      />
      <h4 style={{ fontSize: "16px", margin: "10px 0" }}>
        {product.title.length > 20 ? product.title.substring(0, 20) + "..." : product.title}
      </h4>
      <p style={{ fontWeight: "bold", color: "#007bff" }}>${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        style={{
          background: "#222",
          color: "#fff",
          padding: "8px 12px",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
          transition: "0.3s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#555")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#222")}
      >
        Add to Cart
      </button>
    </div>
  );
}

