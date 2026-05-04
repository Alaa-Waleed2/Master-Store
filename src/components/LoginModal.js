import React, { useState } from "react";

export default function LoginModal({ setOpenLogin, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("⚠️ Please enter email and password");
      return;
    }

    if (password.length < 6) {
      alert("⚠️ Password must be at least 6 characters");
      return;
    }

    const newUser = { email };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));

    setOpenLogin(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1200,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "400px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <button
          onClick={() => setOpenLogin(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "none",
            background: "red",
            color: "#fff",
            cursor: "pointer",
            padding: "5px 10px",
          }}
        >
          ✖
        </button>

        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ display: "block", margin: "10px auto", padding: "10px", width: "90%" }}
          />
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ display: "block", margin: "10px auto", padding: "10px", width: "90%" }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              marginTop: "10px",
              cursor: "pointer",
              background: "green",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}


