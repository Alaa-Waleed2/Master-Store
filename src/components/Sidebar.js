import React from "react";

export default function Sidebar({ setCategory, closeSidebar, setSort }) {
  const categories = [
    "all",
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery",
  ];

  return (
    <div className="sidebar">
      <button
        onClick={closeSidebar}
        style={{
          background: "red",
          color: "#fff",
          border: "none",
          padding: "5px 10px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        ✖
      </button>

      <h3>Categories</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {categories.map((cat, i) => (
          <li
            key={i}
            onClick={() => {
              setCategory(cat);
              closeSidebar();
            }}
            style={{ margin: "10px 0", cursor: "pointer" }}
          >
            {cat}
          </li>
        ))}
      </ul>

      <hr />

      <h3>Sort By</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li
          onClick={() => {
            setSort("price-asc");
            closeSidebar();
          }}
          style={{ margin: "10px 0", cursor: "pointer" }}
        >
          Price ↑
        </li>
        <li
          onClick={() => {
            setSort("price-desc");
            closeSidebar();
          }}
          style={{ margin: "10px 0", cursor: "pointer" }}
        >
          Price ↓
        </li>
        <li
          onClick={() => {
            setSort("newest");
            closeSidebar();
          }}
          style={{ margin: "10px 0", cursor: "pointer" }}
        >
          Newest
        </li>
      </ul>
    </div>
  );
}

