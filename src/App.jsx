import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls, ContactShadows, MeshTransmissionMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, User } from 'lucide-react';
import './index.css';

import logo from './assets/logo.png';
import heroImg from './assets/hero.png';
import prod1 from './assets/prod1.png';

// Elegant 3D Glass Dropper/Serum Bottle Concept
function GlassSerum() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group position={[0, -1, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        <group ref={meshRef}>
          {/* Glass Bottle Body */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[1, 1, 3, 32]} />
            <MeshTransmissionMaterial 
              thickness={1.5}
              roughness={0.05}
              transmission={1}
              ior={1.4}
              color="#ffebd6"
              attenuationColor="#f2b5a7"
              attenuationDistance={2}
              clearcoat={1}
            />
          </mesh>
          
          {/* Inner Serum Liquid (Gold/Pink) */}
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 2.3, 32]} />
            <meshPhysicalMaterial 
              color="#e8a598" 
              transmission={0.5} 
              opacity={0.9} 
              transparent 
              roughness={0.2} 
            />
          </mesh>

          {/* Rose Gold Cap / Dropper Top */}
          <mesh position={[0, 1.7, 0]}>
            <cylinderGeometry args={[0.9, 1, 0.6, 32]} />
            <meshStandardMaterial color="#dcb6ad" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 2.2, 0]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial color="#f4efe9" roughness={0.9} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <img src={logo} alt="HMSOFT BEAUTY" onError={(e) => e.target.style.display='none'} />
          HMSOFT BEAUTY
        </div>
        
        <nav className="nav-links">
          <a href="#">Skincare</a>
          <a href="#">Body</a>
          <a href="#">Fragrance</a>
          <a href="#">Our Story</a>
        </nav>
        
        <div className="nav-icons">
          <button><Search size={20} strokeWidth={1.5} /></button>
          <button><User size={20} strokeWidth={1.5} /></button>
          <button><ShoppingBag size={20} strokeWidth={1.5} /></button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img src={heroImg} alt="Luxury Skincare" />
      </div>
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <motion.span 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Botanical Collection
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Pure. Organic. Radiant.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Discover our new signature serum, formulated with 100% vegan ingredients to restore your natural glow.
        </motion.p>
        <motion.button 
          className="btn-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Shop The Collection
        </motion.button>
      </div>
    </section>
  );
}

function Showcase3D() {
  return (
    <section className="showcase-3d">
      <div className="showcase-text">
        <h2>Essence of Nature</h2>
      </div>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} style={{ zIndex: 2 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 10, 5]} intensity={2} color="#fff" />
        <directionalLight position={[-5, 5, -5]} intensity={1} color="#f2b5a7" />
        <Environment preset="studio" />
        
        <PresentationControls global config={{ mass: 2, tension: 500 }} snap={{ mass: 4, tension: 1500 }} rotation={[0.1, 0, 0]} polar={[-0.2, 0.2]} azimuth={[-Math.PI / 4, Math.PI / 4]}>
          <GlassSerum />
        </PresentationControls>
        
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#dcb6ad" />
        <EffectComposer>
          <Bloom luminanceThreshold={0.8} mipmapBlur intensity={0.5} />
        </EffectComposer>
      </Canvas>
    </section>
  );
}

function Products() {
  const products = [
    { name: "Radiance Rose Serum", price: "$85.00", img: prod1 },
    { name: "Hydrating Petal Cream", price: "$65.00", img: prod1 },
    { name: "Botanical Cleansing Oil", price: "$45.00", img: prod1 },
    { name: "Mineral Sunscreen SPF50", price: "$55.00", img: prod1 }
  ];

  return (
    <section className="products-section">
      <div className="section-header">
        <h2>Bestsellers</h2>
      </div>
      <div className="product-grid">
        {products.map((prod, idx) => (
          <motion.div 
            className="product-card" 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
          >
            <div className="product-image-wrap">
              <img src={prod.img} alt={prod.name} />
              <div className="add-to-cart-layer">
                <button className="add-btn">Add to Bag</button>
              </div>
            </div>
            <h3 className="product-title">{prod.name}</h3>
            <p className="product-price">{prod.price}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Showcase3D />
        <Products />
      </main>
      <footer className="footer">
        <div className="footer-logo">HMSOFT BEAUTY</div>
        <div className="footer-links">
          <a href="#">Ingredients</a>
          <a href="#">Sustainability</a>
          <a href="#">FAQ</a>
          <a href="#">Contact</a>
        </div>
        <p style={{ color: '#6b645c', fontSize: '0.8rem' }}>© 2026 HMSOFT Beauty Cosmetics. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
