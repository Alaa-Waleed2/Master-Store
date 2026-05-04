import React, { useState, useEffect, useRef } from "react";
import LoginModal from "./LoginModal";

const NAV_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

  @keyframes navSlideDown {
    from { transform: translateY(-100%); opacity: 0; }
    to   { transform: translateY(0);     opacity: 1; }
  }
  @keyframes cartBounce {
    0%,100% { transform: scale(1); }
    50%      { transform: scale(1.35); }
  }
  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes drawerIn {
    from { transform: translateX(100%); }
    to   { transform: translateX(0); }
  }

  .master-nav {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #0f1c2e;
    border-bottom: 1px solid #1e3a5f;
    padding: 0 28px;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 1100;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
    animation: navSlideDown 0.5s ease both;
    gap: 20px;
  }

  .nav-logo {
    font-size: 20px; font-weight: 800;
    letter-spacing: -0.5px; white-space: nowrap;
    color: #e8f4ff; cursor: pointer;
    transition: opacity 0.2s; line-height: 1.1;
  }
  .nav-logo:hover { opacity: 0.8; }
  .nav-logo span {
    font-weight: 500; font-size: 10px; display: block;
    color: #4a90c4; letter-spacing: 3px;
    text-transform: uppercase; margin-top: 1px;
  }

  .nav-hamburger {
    background: #1a2e47; border: 1px solid #2a4a6b;
    color: #a8c8e8; width: 40px; height: 40px;
    border-radius: 10px; font-size: 16px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s ease; flex-shrink: 0;
  }
  .nav-hamburger:hover { background: #1e3a5f; border-color: #3a6a9b; color: #e8f4ff; }

  .nav-search-wrap { flex: 1; max-width: 480px; position: relative; }
  .nav-search-wrap input {
    width: 100%; padding: 10px 16px 10px 42px;
    border-radius: 10px; border: 1px solid #1e3a5f;
    background: #162338; color: #e8f4ff; font-size: 13px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    outline: none; transition: all 0.25s ease;
  }
  .nav-search-wrap input::placeholder { color: #4a6a8a; }
  .nav-search-wrap input:focus {
    border-color: #3a7abf; background: #1a2e47;
    box-shadow: 0 0 0 3px rgba(58,122,191,0.15);
  }
  .nav-search-icon {
    position: absolute; left: 14px; top: 50%;
    transform: translateY(-50%); font-size: 14px;
    opacity: 0.4; pointer-events: none;
  }

  .nav-actions { display: flex; align-items: center; gap: 10px; }

  .nav-btn {
    background: #1a2e47; border: 1px solid #2a4a6b;
    color: #a8c8e8; border-radius: 10px; padding: 8px 18px;
    font-size: 13px; font-weight: 600;
    font-family: 'Plus Jakarta Sans', sans-serif;
    cursor: pointer; display: flex; align-items: center; gap: 7px;
    transition: all 0.2s ease; white-space: nowrap; position: relative;
  }
  .nav-btn:hover {
    background: #1e3a5f; border-color: #3a6a9b; color: #e8f4ff;
    transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
  .nav-btn-primary {
    background: linear-gradient(135deg, #1a4a8a, #2a6abf);
    border-color: #2a6abf; color: #e8f4ff;
  }
  .nav-btn-primary:hover {
    background: linear-gradient(135deg, #1e5aaa, #3a7abf);
    border-color: #3a7abf;
  }

  .cart-badge {
    position: absolute; top: -7px; right: -7px;
    background: #3a7abf; color: #ffffff; font-size: 10px;
    font-weight: 800; width: 18px; height: 18px;
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    border: 2px solid #0f1c2e; animation: cartBounce 0.4s ease;
  }

  .cart-backdrop {
    position: fixed; inset: 0; background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px); z-index: 1200;
  }
  .cart-drawer {
    position: fixed; top: 0; right: 0;
    width: 390px; max-width: 95vw; height: 100vh;
    background: #0f1c2e; z-index: 1300;
    display: flex; flex-direction: column;
    box-shadow: -8px 0 40px rgba(0,0,0,0.6);
    animation: drawerIn 0.3s cubic-bezier(0.22,1,0.36,1);
    border-left: 1px solid #1e3a5f; overflow: hidden;
  }
  .cart-header {
    padding: 22px 20px 18px; background: #0d1a2b;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid #1e3a5f;
  }
  .cart-header h3 {
    margin: 0; font-size: 16px; font-weight: 700;
    font-family: 'Plus Jakarta Sans', sans-serif; color: #e8f4ff;
  }
  .cart-close {
    background: #1a2e47; border: 1px solid #2a4a6b; color: #a8c8e8;
    width: 34px; height: 34px; border-radius: 8px; font-size: 16px;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
  }
  .cart-close:hover { background: #1e3a5f; color: #e8f4ff; }

  .cart-body { flex: 1; overflow-y: auto; padding: 16px; background: #0f1c2e; }
  .cart-body::-webkit-scrollbar { width: 4px; }
  .cart-body::-webkit-scrollbar-track { background: #0d1a2b; }
  .cart-body::-webkit-scrollbar-thumb { background: #2a4a6b; border-radius: 4px; }

  .cart-item {
    display: flex; align-items: center; gap: 12px; padding: 12px;
    border: 1px solid #1e3a5f; border-radius: 12px;
    margin-bottom: 10px; background: #162338; transition: all 0.2s;
  }
  .cart-item:hover { border-color: #2a5a8b; box-shadow: 0 4px 16px rgba(0,0,0,0.3); }
  .cart-item img {
    width: 54px; height: 54px; object-fit: contain;
    border-radius: 10px; background: #1a2e47; padding: 6px;
    border: 1px solid #1e3a5f;
  }
  .cart-item-info { flex: 1; min-width: 0; }
  .cart-item-title {
    font-size: 12px; font-weight: 600; color: #c8e0f4;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .cart-item-price {
    font-size: 14px; font-weight: 700; color: #4a90c4;
    margin-top: 3px; font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .cart-qty-row { display: flex; align-items: center; gap: 6px; margin-top: 6px; }
  .qty-btn {
    width: 26px; height: 26px; border-radius: 6px;
    border: 1px solid #2a4a6b; background: #1a2e47; color: #a8c8e8;
    font-size: 16px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s; line-height: 1;
  }
  .qty-btn:hover { background: #1e3a5f; color: #e8f4ff; border-color: #3a6a9b; }
  .qty-num { font-size: 13px; font-weight: 700; min-width: 22px; text-align: center; color: #e8f4ff; }
  .remove-btn {
    background: #1a1a2e; border: 1px solid #2a2a4a; color: #6a6a9a;
    width: 28px; height: 28px; border-radius: 6px; font-size: 13px;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all 0.15s; margin-left: 4px;
  }
  .remove-btn:hover { background: #2a1a2e; border-color: #8a3a6a; color: #e87a9a; }

  .cart-footer { padding: 18px; border-top: 1px solid #1e3a5f; background: #0d1a2b; }
  .cart-total { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
  .cart-total span:first-child { font-size: 13px; color: #4a7aaa; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 500; }
  .cart-total span:last-child { font-size: 20px; font-weight: 800; color: #e8f4ff; font-family: 'Plus Jakarta Sans', sans-serif; }

  .checkout-btn {
    width: 100%; background: linear-gradient(135deg, #1a4a8a, #2a6abf);
    color: #ffffff; border: none; padding: 14px; border-radius: 10px;
    font-size: 14px; font-weight: 700; font-family: 'Plus Jakarta Sans', sans-serif;
    cursor: pointer; transition: all 0.2s ease;
    box-shadow: 0 4px 16px rgba(26,74,138,0.4);
  }
  .checkout-btn:hover {
    background: linear-gradient(135deg, #1e5aaa, #3a7abf);
    transform: translateY(-1px); box-shadow: 0 6px 20px rgba(26,74,138,0.5);
  }

  .checkout-form { margin-top: 14px; }
  .checkout-form h4 {
    font-size: 11px; font-weight: 700; color: #4a90c4;
    margin: 14px 0 8px; font-family: 'Plus Jakarta Sans', sans-serif;
    text-transform: uppercase; letter-spacing: 1.5px;
  }
  .checkout-form input[type=text] {
    width: 100%; padding: 9px 14px; border: 1px solid #1e3a5f;
    border-radius: 8px; font-size: 13px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    margin-bottom: 6px; outline: none;
    background: #162338; color: #e8f4ff; transition: all 0.2s;
  }
  .checkout-form input[type=text]::placeholder { color: #3a5a7a; }
  .checkout-form input[type=text]:focus { border-color: #3a7abf; background: #1a2e47; }

  .pay-methods { display: flex; gap: 8px; margin-bottom: 10px; flex-wrap: wrap; }
  .pay-method-btn {
    flex: 1; min-width: 80px; padding: 9px 10px;
    border: 1px solid #1e3a5f; border-radius: 8px;
    background: #162338; color: #6a9abf;
    font-size: 12px; font-weight: 600;
    font-family: 'Plus Jakarta Sans', sans-serif;
    cursor: pointer; text-align: center; transition: all 0.2s;
  }
  .pay-method-btn.active {
    border-color: #3a7abf; background: #1a3a6a; color: #e8f4ff;
    box-shadow: 0 0 0 2px rgba(58,122,191,0.2);
  }
  .pay-method-btn:hover { border-color: #2a5a8b; color: #a8c8e8; }

  .confirm-btn {
    width: 100%; background: linear-gradient(135deg, #1a4a8a, #2a6abf);
    color: #ffffff; border: none; padding: 13px; border-radius: 10px;
    font-size: 14px; font-weight: 700; font-family: 'Plus Jakarta Sans', sans-serif;
    cursor: pointer; margin-top: 10px; transition: all 0.2s ease;
    box-shadow: 0 4px 16px rgba(26,74,138,0.4);
  }
  .confirm-btn:hover { background: linear-gradient(135deg, #1e5aaa, #3a7abf); transform: translateY(-1px); }

  .user-dropdown {
    position: absolute; top: calc(100% + 10px); right: 0;
    background: #0f1c2e; border-radius: 12px; border: 1px solid #1e3a5f;
    padding: 12px; min-width: 200px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.5);
    animation: fadeInDown 0.2s ease; z-index: 2000;
  }
  .user-email {
    font-size: 12px; color: #4a7aaa; padding: 4px 0 10px;
    border-bottom: 1px solid #1e3a5f; margin-bottom: 8px;
    font-family: 'Plus Jakarta Sans', sans-serif; word-break: break-all;
  }
  .logout-btn {
    width: 100%; background: #1a2e47; border: 1px solid #2a4a6b;
    color: #a8c8e8; padding: 9px; border-radius: 8px;
    font-size: 13px; font-weight: 700; font-family: 'Plus Jakarta Sans', sans-serif;
    cursor: pointer; transition: all 0.2s;
  }
  .logout-btn:hover { background: #1e3a5f; color: #e8f4ff; }
`;

export default function Navbar({
  cart = [],
  removeFromCart = () => {},
  updateQuantity = () => {},
  toggleSidebar,
  setSearch = () => {},
  user,
  setUser,
}) {
  const [openLogin, setOpenLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [method, setMethod] = useState("");
  const [details, setDetails] = useState("");
  const [pendingPayment, setPendingPayment] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const [shipping, setShipping] = useState(() => {
    const saved = localStorage.getItem("shipping");
    return saved ? JSON.parse(saved) : { fullName: "", phone: "", address: "", city: "", governorate: "", country: "" };
  });

  useEffect(() => { localStorage.setItem("shipping", JSON.stringify(shipping)); }, [shipping]);

  useEffect(() => {
    if (document.getElementById("navbar-styles")) return;
    const s = document.createElement("style");
    s.id = "navbar-styles";
    s.textContent = NAV_STYLES;
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (user && pendingPayment) { setPendingPayment(false); setShowCart(true); }
  }, [user]);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2);

  const processPayment = () => {
    const { fullName, phone, address, city, governorate, country } = shipping;
    if (!fullName || !phone || !address || !city || !governorate || !country) {
      alert("من فضلك ادخل بيانات الشحن كاملة"); return;
    }
    if (!method || !details) {
      alert("من فضلك اختر وسيلة الدفع وادخل البيانات"); return;
    }
    alert(`تم الدفع بنجاح!\nالتوصيل الى: ${fullName}, ${address}, ${city}, ${governorate}, ${country}\n${phone}`);
    setMethod(""); setDetails(""); setShowCart(false); setShowCheckout(false); setPendingPayment(false);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!user) { setOpenLogin(true); setPendingPayment(true); return; }
    processPayment();
  };

  return (
    <>
      <nav className="master-nav">
        <button className="nav-hamburger" onClick={toggleSidebar}>☰</button>
        <div className="nav-logo">Master Store<span>Premium Shopping</span></div>
        <div className="nav-search-wrap">
          <span className="nav-search-icon">🔍</span>
          <input type="text" placeholder="Search products..." onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="nav-actions">
          <button className="nav-btn nav-btn-primary" onClick={() => setShowCart(true)}>
            🛒 Cart
            {totalItems > 0 && <span className="cart-badge" key={totalItems}>{totalItems}</span>}
          </button>
          <div style={{ position: "relative" }} ref={menuRef}>
            {!user ? (
              <button className="nav-btn" onClick={() => setOpenLogin(true)}>👤 Login</button>
            ) : (
              <button className="nav-btn" onClick={() => setShowMenu(!showMenu)}>✨ {user.email.split("@")[0]}</button>
            )}
            {showMenu && user && (
              <div className="user-dropdown">
                <div className="user-email">📧 {user.email}</div>
                <button className="logout-btn" onClick={() => { setUser(null); localStorage.removeItem("user"); setShowMenu(false); }}>🚪 Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {showCart && (
        <div className="cart-backdrop" onClick={() => { setShowCart(false); setShowCheckout(false); }}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h3>🛒 Cart ({totalItems} items)</h3>
              <button className="cart-close" onClick={() => { setShowCart(false); setShowCheckout(false); }}>✕</button>
            </div>
            <div className="cart-body">
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <div style={{ fontSize: 52, marginBottom: 14 }}>🛒</div>
                  <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, color: "#4a7aaa" }}>Your cart is empty</p>
                </div>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.title} />
                      <div className="cart-item-info">
                        <div className="cart-item-title">{item.title}</div>
                        <div className="cart-item-price">${(item.price * item.qty).toFixed(2)}</div>
                        <div className="cart-qty-row">
                          <button className="qty-btn" onClick={() => updateQuantity(item.id, item.qty - 1)}>−</button>
                          <span className="qty-num">{item.qty}</span>
                          <button className="qty-btn" onClick={() => updateQuantity(item.id, item.qty + 1)}>+</button>
                          <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {showCheckout && (
                    <form className="checkout-form" onSubmit={handlePayment}>
                      <h4>📦 Delivery Info</h4>
                      {[
                        { key: "fullName", ph: "Full Name" },
                        { key: "phone", ph: "Phone Number" },
                        { key: "address", ph: "Address" },
                        { key: "city", ph: "City" },
                        { key: "governorate", ph: "Governorate" },
                        { key: "country", ph: "Country" },
                      ].map(f => (
                        <input key={f.key} type="text" placeholder={f.ph}
                          value={shipping[f.key]}
                          onChange={e => setShipping({ ...shipping, [f.key]: e.target.value })}
                          required
                        />
                      ))}
                      <h4>💳 Payment Method</h4>
                      <div className="pay-methods">
                        {["Vodafone Cash", "Visa", "InstaPay"].map(m => (
                          <button key={m} type="button"
                            className={`pay-method-btn${method === m ? " active" : ""}`}
                            onClick={() => setMethod(m)}>
                            {m === "Vodafone Cash" ? "📱" : m === "Visa" ? "💳" : "🏦"} {m}
                          </button>
                        ))}
                      </div>
                      {method && (
                        <input type="text"
                          placeholder={method === "Vodafone Cash" ? "رقم الموبايل (11 رقم)" : method === "Visa" ? "رقم الكارت (16 رقم)" : "رقم الحساب (8 ارقام)"}
                          value={details}
                          onChange={e => setDetails(e.target.value)}
                          maxLength={method === "Vodafone Cash" ? 11 : method === "Visa" ? 16 : 8}
                          required
                        />
                      )}
                      <button type="submit" className="confirm-btn">🚀 Confirm & Pay</button>
                    </form>
                  )}
                </>
              )}
            </div>
            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
                {!showCheckout ? (
                  <button className="checkout-btn" onClick={() => setShowCheckout(true)}>Proceed to Checkout →</button>
                ) : (
                  <button className="checkout-btn" style={{ background: "linear-gradient(135deg, #1a3a5a, #2a5a8a)" }} onClick={() => setShowCheckout(false)}>← Back to Cart</button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {openLogin && <LoginModal setOpenLogin={setOpenLogin} setUser={setUser} />}
    </>
  );
}