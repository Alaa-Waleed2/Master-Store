// src/components/Cart.js
import React from "react";

export default function Cart({ cart, removeFromCart }) {
  return (
    <div
      style={{
        padding: "20px",
        width: "100%",
        maxWidth: "350px",
        background: "#f9f9f9",
        minHeight: "300px",
        borderRadius: "10px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ marginBottom: "15px", color: "#222" }}>Your Cart</h3>
      {cart.length === 0 ? (
        <p style={{ color: "#555" }}>No items in cart</p>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              padding: "5px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <span style={{ fontSize: "14px" }}>
              {item.title.length > 15 ? item.title.substring(0, 15) + "..." : item.title}
            </span>
            <button
              onClick={() => removeFromCart(item.id)}
              style={{
                background: "red",
                color: "#fff",
                border: "none",
                padding: "4px 8px",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#c00")}
              onMouseOut={(e) => (e.currentTarget.style.background = "red")}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}
