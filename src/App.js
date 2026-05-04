import React, { useState, useEffect } from "react";
import "./styles.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";

// ─── Import your images ─────────────────────────────────────────
// Put these 4 images in your /src/assets/ folder
import imgMen      from "./assets/men.png";
import imgWomen    from "./assets/women.png";
import imgElectron from "./assets/electronics.png";
import imgJewelry  from "./assets/jewelry.png";

const injectStyles = () => {
  if (document.getElementById("hero-styles")) return;
  const style = document.createElement("style");
  style.id = "hero-styles";
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap');
    * { box-sizing: border-box; }

    @keyframes marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    @keyframes floatUp {
      0%,100% { transform: translateY(0px) rotate(0deg); }
      50%      { transform: translateY(-10px) rotate(4deg); }
    }
    @keyframes blink {
      0%,100% { opacity: 1; }
      50%      { opacity: 0; }
    }
    @keyframes popIn {
      0%   { opacity: 0; transform: scale(0.75) translateY(20px); }
      65%  { transform: scale(1.04) translateY(-3px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes kenBurns {
      from { transform: scale(1); }
      to   { transform: scale(1.06); }
    }

    .ticker-wrap { background:#0a0a0a; overflow:hidden; padding:9px 0; border-bottom:1px solid #1a1a1a; }
    .ticker-track { display:flex; width:max-content; animation:marquee 26s linear infinite; }
    .ticker-item  { padding:0 28px; font-size:11px; font-weight:700; white-space:nowrap; color:#fff; letter-spacing:.8px; text-transform:uppercase; font-family:'Poppins',sans-serif; }
    .ticker-sep   { opacity:.2; margin-left:28px; }

    .slide-inner { animation: slideUp .45s ease both; }
    .slide-badge { animation: popIn .55s cubic-bezier(.34,1.56,.64,1) both; }

    .hero-arrow {
      position:absolute; top:50%; transform:translateY(-50%);
      width:44px; height:44px; border-radius:50%;
      border:none; cursor:pointer;
      font-size:20px; font-weight:700; z-index:10;
      display:flex; align-items:center; justify-content:center;
      box-shadow:0 3px 16px rgba(0,0,0,.3);
      transition:all .2s cubic-bezier(.34,1.56,.64,1);
    }
    .hero-arrow:hover { transform:translateY(-50%) scale(1.14); }

    .dot {
      height:9px; border-radius:5px; border:none; cursor:pointer; padding:0;
      transition:all .35s ease;
    }

    .cta-btn {
      border:none; padding:13px 44px; font-size:14px; font-weight:800;
      border-radius:999px; cursor:pointer; letter-spacing:.5px;
      font-family:'Poppins',sans-serif;
      box-shadow:0 8px 28px rgba(0,0,0,.25);
      transition:transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s ease;
    }
    .cta-btn:hover { transform:scale(1.08) translateY(-4px); box-shadow:0 16px 36px rgba(0,0,0,.3); }
    .cta-btn:active { transform:scale(.96); }

    .stat-pill {
      border-radius:14px; padding:8px 14px;
      display:flex; align-items:center; gap:7px;
      transition:transform .2s cubic-bezier(.34,1.56,.64,1); cursor:default;
      backdrop-filter:blur(8px);
    }
    .stat-pill:hover { transform:scale(1.1) rotate(-1.5deg); }

    .cat-grid {
      background:#fff; padding:28px 24px 22px;
      border-bottom:1px solid #ebebeb;
      box-shadow:0 4px 20px rgba(0,0,0,.05);
      display:flex; justify-content:center;
      gap:clamp(18px,4vw,56px); flex-wrap:wrap;
    }
    .cat-item {
      display:flex; flex-direction:column; align-items:center; gap:10px;
      cursor:pointer;
      transition:transform .22s cubic-bezier(.34,1.56,.64,1);
    }
    .cat-item:hover { transform:translateY(-7px) scale(1.06); }
    .cat-circle {
      width:88px; height:88px; border-radius:50%; overflow:hidden;
      background-size:cover; background-position:center;
      border:3px solid #fff;
      box-shadow:0 4px 16px rgba(0,0,0,.12);
      transition:box-shadow .2s ease;
    }
    .cat-item:hover .cat-circle { box-shadow:0 10px 30px rgba(0,0,0,.2); }
    .cat-label {
      font-size:12px; font-weight:700; color:#333;
      text-align:center; letter-spacing:.2px;
      font-family:'Poppins',sans-serif;
    }

    .section-head {
      display:flex; align-items:center; gap:13px;
      margin:32px 20px 18px;
    }
    .section-head h2 {
      font-size:20px; font-weight:800; margin:0; color:#111;
      white-space:nowrap; font-family:'Poppins',sans-serif;
    }
    .rainbow-line {
      flex:1; height:3px; border-radius:2px;
      background:linear-gradient(to right,#FF6B9D,#FF8E53,#FFD93D,#43E97B,#4FACFE,transparent);
    }
  `;
  document.head.appendChild(style);
};

// ─── Slide configs ────────────────────────────────────────────────
// Each slide has its own personality: overlay, text colors, button style
const getSLIDES = (imgMen, imgWomen, imgElectron, imgJewelry) => [
  {
    // ── MEN: navy/slate dark overlay, crisp white text, steel-blue accent
    img: imgMen,
    overlay: "rgba(10,20,60,0.45)",
    eyebrowBg: "rgba(255,255,255,0.12)",
    eyebrowBorder: "rgba(255,255,255,0.28)",
    badge: "MEN",
    badgeBg: "#1B3A6B",
    badgeColor: "#B8D4FF",
    eyebrow: "👔 Men's Collection",
    title: "Men's Fashion",
    titleShadow: "0 4px 20px rgba(0,0,0,0.4)",
    highlight: "Shirts · Pants · Jackets",
    highlightBg: "rgba(27,58,107,0.55)",
    highlightColor: "#B8D4FF",
    highlightBorder: "rgba(100,150,255,0.3)",
    sub: "Bold style for the modern man.",
    statBg: "rgba(27,58,107,0.5)",
    statBorder: "rgba(100,150,255,0.3)",
    ctaBg: "#B8D4FF",
    ctaColor: "#0D1F45",
    arrowBg: "rgba(255,255,255,0.92)",
    arrowColor: "#1B3A6B",
    dotActive: "#B8D4FF",
    dotInactive: "rgba(255,255,255,0.3)",
    category: "men's clothing",
  },
  {
    // ── WOMEN: warm rose/dusty pink overlay, champagne accents
    img: imgWomen,
    overlay: "rgba(70,10,30,0.45)",
    eyebrowBg: "rgba(255,210,220,0.12)",
    eyebrowBorder: "rgba(255,180,200,0.3)",
    badge: "WOMEN",
    badgeBg: "#7D1A3A",
    badgeColor: "#FFD6E7",
    eyebrow: "👗 Women's Collection",
    title: "Women's Fashion",
    titleShadow: "0 4px 20px rgba(80,0,30,0.4)",
    highlight: "Dresses · Tops · Accessories",
    highlightBg: "rgba(125,26,58,0.5)",
    highlightColor: "#FFD6E7",
    highlightBorder: "rgba(255,130,160,0.28)",
    sub: "Elegance in every thread. Your style, your story.",
    statBg: "rgba(125,26,58,0.45)",
    statBorder: "rgba(255,130,160,0.3)",
    ctaBg: "#FFD6E7",
    ctaColor: "#5a001f",
    arrowBg: "rgba(255,255,255,0.92)",
    arrowColor: "#7D1A3A",
    dotActive: "#FFD6E7",
    dotInactive: "rgba(255,255,255,0.3)",
    category: "women's clothing",
  },
  {
    // ── ELECTRONICS: dark teal/cyber, neon mint accents
    img: imgElectron,
    overlay: "rgba(0,15,30,0.45)",
    eyebrowBg: "rgba(0,210,160,0.10)",
    eyebrowBorder: "rgba(0,210,160,0.28)",
    badge: "TECH",
    badgeBg: "#003D2B",
    badgeColor: "#7FFFD4",
    eyebrow: "💻 Electronics",
    title: "Tech Store",
    titleShadow: "0 4px 20px rgba(0,0,0,0.5)",
    highlight: "Phones · Laptops · Gadgets",
    highlightBg: "rgba(0,61,43,0.55)",
    highlightColor: "#7FFFD4",
    highlightBorder: "rgba(0,210,160,0.25)",
    sub: "Next-gen tech. Unbeatable prices. Explore now.",
    statBg: "rgba(0,61,43,0.5)",
    statBorder: "rgba(0,210,160,0.3)",
    ctaBg: "#7FFFD4",
    ctaColor: "#002018",
    arrowBg: "rgba(255,255,255,0.92)",
    arrowColor: "#003D2B",
    dotActive: "#7FFFD4",
    dotInactive: "rgba(255,255,255,0.3)",
    category: "electronics",
  },
  {
    // ── JEWELRY: deep warm gold/black, champagne gold accents
    img: imgJewelry,
    overlay: "rgba(30,15,0,0.45)",
    eyebrowBg: "rgba(220,170,0,0.10)",
    eyebrowBorder: "rgba(220,170,0,0.3)",
    badge: "LUXURY",
    badgeBg: "#4A2E00",
    badgeColor: "#FFE08A",
    eyebrow: "💍 Fine Jewelry",
    title: "Jewelry",
    titleShadow: "0 4px 24px rgba(0,0,0,0.5)",
    highlight: "Rings · Necklaces · Earrings",
    highlightBg: "rgba(74,46,0,0.60)",
    highlightColor: "#FFE08A",
    highlightBorder: "rgba(220,170,0,0.28)",
    sub: "Crafted for moments that last forever.",
    statBg: "rgba(74,46,0,0.5)",
    statBorder: "rgba(220,170,0,0.3)",
    ctaBg: "#FFE08A",
    ctaColor: "#2e1a00",
    arrowBg: "rgba(255,255,255,0.92)",
    arrowColor: "#4A2E00",
    dotActive: "#FFE08A",
    dotInactive: "rgba(255,255,255,0.3)",
    category: "jewelery",
  },
];

const STATS = [
  { icon:"👥", val:"50K+", lbl:"Customers" },
  { icon:"⭐", val:"4.9",  lbl:"Rating"    },
  { icon:"🏷️", val:"200+", lbl:"Brands"    },
  { icon:"🚀", val:"24/7", lbl:"Support"   },
];

const TICKER = [
  "🔥 Summer Sale — 70% OFF","✨ New Arrivals Daily",
  "📦 Free Shipping +$50","💎 Premium Brands",
  "⭐ Rated 4.9 by 50K+ Customers","🎁 Gift Wrapping Available",
  "🔒 Secure Checkout","↩️ Easy Returns",
];

const CATS = [
  { key:"men's clothing",   label:"Men",         icon:"👔", img: null },
  { key:"women's clothing", label:"Women",       icon:"👗", img: null },
  { key:"electronics",      label:"Electronics", icon:"💻", img: null },
  { key:"jewelery",         label:"Jewelry",     icon:"💍", img: null },
  { key:"all",              label:"All Items",   icon:"🛍️", img: null },
];

// ─── Typing hook ─────────────────────────────────────────────────
const useTyping = (text, speed = 36, deps = []) => {
  const [out, setOut] = React.useState("");
  React.useEffect(() => {
    setOut("");
    let i = 0;
    const id = setInterval(() => { i++; setOut(text.slice(0, i)); if (i >= text.length) clearInterval(id); }, speed);
    return () => clearInterval(id);
  // eslint-disable-next-line
  }, deps);
  return out;
};

// ─── Hero ─────────────────────────────────────────────────────────
const Hero = ({ onCategoryChange, imgMen, imgWomen, imgElectron, imgJewelry }) => {
  const [cur, setCur]   = useState(0);
  const [fade, setFade] = useState(false);

  const SLIDES = getSLIDES(imgMen, imgWomen, imgElectron, imgJewelry);

  // Build cats with real images
  const catsWithImgs = [
    { key:"men's clothing",   label:"Men",         icon:"👔", img: imgMen   },
    { key:"women's clothing", label:"Women",       icon:"👗", img: imgWomen },
    { key:"electronics",      label:"Electronics", icon:"💻", img: imgElectron },
    { key:"jewelery",         label:"Jewelry",     icon:"💍", img: imgJewelry  },
    { key:"all",              label:"All Items",   icon:"🛍️", img: null },
  ];

  React.useEffect(() => { injectStyles(); }, []);

  const goTo = (i) => {
    if (fade) return;
    setFade(true);
    setTimeout(() => { setCur(i); setFade(false); }, 380);
  };

  React.useEffect(() => {
    const t = setInterval(() => goTo((cur + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  // eslint-disable-next-line
  }, [cur]);

  const sub = useTyping(SLIDES[cur].sub, 36, [cur]);
  const s   = SLIDES[cur];

  return (
    <div style={{ fontFamily:"'Poppins',sans-serif" }}>

      {/* ── Ticker ── */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...TICKER,...TICKER].map((t,i)=>(
            <span key={i} className="ticker-item">{t}<span className="ticker-sep">✦</span></span>
          ))}
        </div>
      </div>

      {/* ── Slide ── */}
      <div style={{
        position:"relative", overflow:"hidden",
        minHeight:"500px",
        display:"flex", alignItems:"center", justifyContent:"center",
        padding:"60px 40px",
        opacity: fade ? 0 : 1,
        transition:"opacity .38s ease",
      }}>

        {/* Background image — full visible */}
        <img
          src={s.img}
          alt=""
          style={{
            position:"absolute", inset:0,
            width:"100%", height:"100%",
            objectFit:"cover",
            objectPosition:"center top",
            pointerEvents:"none",
          }}
        />

        {/* Color overlay — unique per slide */}
        <div style={{
          position:"absolute", inset:0,
          background: s.overlay,
        }}/>

        {/* Content */}
        <div className="slide-inner" key={`inner-${cur}`} style={{
          position:"relative", zIndex:2,
          display:"flex", flexDirection:"column",
          alignItems:"center", textAlign:"center",
          maxWidth:"600px",
        }}>

          {/* Eyebrow */}
          <div className="slide-badge" style={{
            display:"inline-flex", alignItems:"center", gap:8,
            background: s.eyebrowBg,
            border:`1.5px solid ${s.eyebrowBorder}`,
            borderRadius:"999px", padding:"6px 18px",
            color:"#fff", fontSize:11, fontWeight:700,
            letterSpacing:"1px", textTransform:"uppercase",
            marginBottom:18,
          }}>
            {s.eyebrow}
            <span style={{
              background:s.badgeBg, color:s.badgeColor,
              fontSize:10, fontWeight:800,
              padding:"2px 9px", borderRadius:"999px", letterSpacing:"1px",
            }}>{s.badge}</span>
          </div>

          {/* Title */}
          <h1 style={{
            color:"#fff",
            fontSize:"clamp(36px,6vw,64px)",
            fontWeight:900, margin:"0 0 8px",
            lineHeight:1.02, letterSpacing:"-1px",
            textShadow: s.titleShadow,
          }}>{s.title}</h1>

          {/* Highlight pill */}
          <div style={{
            fontSize:"clamp(13px,2.2vw,18px)", fontWeight:700,
            color: s.highlightColor,
            background: s.highlightBg,
            backdropFilter:"blur(6px)",
            borderRadius:10, padding:"6px 20px", marginBottom:12,
            border:`1px solid ${s.highlightBorder}`,
            letterSpacing:".3px",
          }}>{s.highlight}</div>

          {/* Typing sub */}
          <p style={{
            color:"rgba(255,255,255,.88)", fontSize:14,
            fontWeight:600, margin:"0 0 20px", minHeight:22,
          }}>
            {sub}<span style={{ animation:"blink .8s step-end infinite" }}>|</span>
          </p>

          {/* Stats */}
          <div style={{ display:"flex", gap:8, marginBottom:26, flexWrap:"wrap" }}>
            {STATS.map((st,i)=>(
              <div key={i} className="stat-pill" style={{
                background: s.statBg,
                border:`1.5px solid ${s.statBorder}`,
              }}>
                <span style={{ fontSize:16 }}>{st.icon}</span>
                <div>
                  <div style={{ fontSize:14, fontWeight:800, color:"#fff", lineHeight:1, fontFamily:"'Poppins',sans-serif" }}>{st.val}</div>
                  <div style={{ fontSize:9, color:"rgba(255,255,255,.72)", fontWeight:600, letterSpacing:".4px", fontFamily:"'Poppins',sans-serif" }}>{st.lbl}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA — goes to category */}
          <button
            className="cta-btn"
            style={{ background: s.ctaBg, color: s.ctaColor }}
            onClick={() => onCategoryChange(s.category)}
          >
            Shop {s.title} →
          </button>
        </div>

        {/* Arrows */}
        <button
          className="hero-arrow"
          style={{ left:14, background:s.arrowBg, color:s.arrowColor }}
          onClick={()=>goTo((cur-1+SLIDES.length)%SLIDES.length)}
        >‹</button>
        <button
          className="hero-arrow"
          style={{ right:14, background:s.arrowBg, color:s.arrowColor }}
          onClick={()=>goTo((cur+1)%SLIDES.length)}
        >›</button>

        {/* Dots */}
        <div style={{ position:"absolute", bottom:18, display:"flex", gap:8 }}>
          {SLIDES.map((_,i)=>(
            <button key={i}
              className={`dot${i===cur?" active":""}`}
              style={{ width:i===cur?"28px":"9px", background:i===cur?s.dotActive:s.dotInactive }}
              onClick={()=>goTo(i)}
            />
          ))}
        </div>
      </div>

      {/* ── Category circles ── */}
      <div className="cat-grid">
        {catsWithImgs.map(cat=>(
          <div key={cat.key} className="cat-item" onClick={()=>onCategoryChange(cat.key)}>
            <div
              className="cat-circle"
              style={cat.img
                ? { backgroundImage:`url(${cat.img})` }
                : { background:"linear-gradient(135deg,#e8d5ff,#c4b5fd)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32 }
              }
            >
              {!cat.img && cat.icon}
            </div>
            <span className="cat-label">{cat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Section header ───────────────────────────────────────────────
const ALL_CATS = [
  { key:"men's clothing",   label:"Men",         icon:"👔" },
  { key:"women's clothing", label:"Women",       icon:"👗" },
  { key:"electronics",      label:"Electronics", icon:"💻" },
  { key:"jewelery",         label:"Jewelry",     icon:"💍" },
  { key:"all",              label:"All Products",icon:"🛍️" },
];

const SectionHeader = ({ category }) => {
  const found = ALL_CATS.find(c=>c.key===category);
  return (
    <div className="section-head">
      <span style={{ fontSize:22 }}>{found?.icon ?? "🛍️"}</span>
      <h2>{found?.label ?? "All Products"}</h2>
      <div className="rainbow-line"/>
    </div>
  );
};

// ─── Home page ────────────────────────────────────────────────────
const HomePage = ({ filteredProducts, addToCart, category, onCategoryChange,
                    imgMen, imgWomen, imgElectron, imgJewelry }) => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname==="/" && (
        <Hero
          onCategoryChange={onCategoryChange}
          imgMen={imgMen}
          imgWomen={imgWomen}
          imgElectron={imgElectron}
          imgJewelry={imgJewelry}
        />
      )}
      {pathname==="/" && <SectionHeader category={category}/>}
      <ProductList products={filteredProducts} addToCart={addToCart}/>
    </>
  );
};

// ─── App ──────────────────────────────────────────────────────────
export default function App() {
  const [products,    setProducts]    = useState([]);
  const [category,    setCategory]    = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cart,        setCart]        = useState([]);
  const [search,      setSearch]      = useState("");
  const [sort,        setSort]        = useState("");
  const [user,        setUser]        = useState(null);

  const addToCart = (product) => {
    setCart(prev => {
      const ex = prev.find(i=>i.id===product.id);
      if (ex) return prev.map(i=>i.id===product.id?{...i,qty:i.qty+1}:i);
      return [...prev,{...product,qty:1}];
    });
  };

  const updateQuantity = (id,qty) =>
    setCart(prev=>prev.map(i=>i.id===id?{...i,qty:Math.max(1,qty)}:i));

  const removeFromCart = (id) =>
    setCart(prev=>prev.filter(i=>i.id!==id));

  useEffect(()=>{
    const c = JSON.parse(localStorage.getItem("cart"))||[];
    setCart(c);
    const u = JSON.parse(localStorage.getItem("user"));
    if (u) setUser(u);
  },[]);

  useEffect(()=>{ localStorage.setItem("cart",JSON.stringify(cart)); },[cart]);

  useEffect(()=>{
    fetch("https://fakestoreapi.com/products")
      .then(r=>r.json()).then(setProducts);
  },[]);

  let fp = category==="all" ? products : products.filter(p=>p.category===category);
  fp = fp.filter(p=>p.title.toLowerCase().includes(search.toLowerCase()));
  if (sort==="price-asc")  fp=[...fp].sort((a,b)=>a.price-b.price);
  if (sort==="price-desc") fp=[...fp].sort((a,b)=>b.price-a.price);
  if (sort==="newest")     fp=[...fp].sort((a,b)=>b.id-a.id);

  return (
    <Router>
      <Navbar
        toggleSidebar={()=>setSidebarOpen(true)}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        setSearch={setSearch}
        user={user}
        setUser={setUser}
      />

      {sidebarOpen&&(
        <>
          <div onClick={()=>setSidebarOpen(false)} style={{
            position:"fixed",top:0,left:0,width:"100%",height:"100%",
            background:"rgba(0,0,0,.5)",zIndex:900,
          }}/>
          <Sidebar setCategory={setCategory} setSort={setSort} closeSidebar={()=>setSidebarOpen(false)}/>
        </>
      )}

      <div className="main-content" style={{
        marginLeft: sidebarOpen?"250px":"0",
        transition:"margin-left .3s ease",
        minHeight:"100vh",
      }}>
        <Routes>
          <Route path="/" element={
            <HomePage
              filteredProducts={fp}
              addToCart={addToCart}
              category={category}
              onCategoryChange={setCategory}
              imgMen={imgMen}
              imgWomen={imgWomen}
              imgElectron={imgElectron}
              imgJewelry={imgJewelry}
            />
          }/>
          <Route path="/product/:id" element={
            <ProductDetails products={products} addToCart={addToCart}/>
          }/>
        </Routes>
      </div>
    </Router>
  );
}