import React, { useState, useEffect, useRef } from "react";

/* ========================================
   NOVALIS FERMETURE & MENUISERIE
   Site professionnel - 4 pages
   ======================================== */

/* ========== SEO META TAGS ========== */
const SEO_DATA = {
  accueil: {
    title: "Novalis Fermeture & Menuiserie | Fenêtres, Portes, Volets - Montbéliard",
    description: "Spécialiste menuiserie et fermetures à Montbéliard. Installation fenêtres PVC/alu, portes, volets, portails. Devis gratuit, -30% en ce moment. ☎ 03 63 11 04 67",
    keywords: "menuisier montbéliard, fenêtre pvc, porte entrée, volet roulant, portail aluminium, belfort, héricourt"
  },
  services: {
    title: "Nos Services | Fenêtres, Portes, Volets, Portails - Novalis Menuiserie",
    description: "Découvrez nos services : fenêtres PVC et aluminium, portes d'entrée, volets roulants et battants, portails, baies vitrées. Pose professionnelle garantie.",
    keywords: "fenêtre pvc, fenêtre aluminium, porte entrée, volet roulant, portail, baie vitrée, store, moustiquaire"
  },
  apropos: {
    title: "À Propos | Novalis Fermeture & Menuiserie - Artisan Local",
    description: "Entreprise de menuiserie à taille humaine dans le Pays de Montbéliard. 15+ ans d'expérience, pose professionnelle, garantie et SAV réactif.",
    keywords: "menuisier local, artisan menuiserie, entreprise fermeture, montbéliard, doubs, franche-comté"
  },
  contact: {
    title: "Contact & Devis Gratuit | Novalis Menuiserie - ☎ 03 63 11 04 67",
    description: "Demandez votre devis gratuit pour vos fenêtres, portes et volets. Réponse sous 48h. Intervention Montbéliard, Belfort, Héricourt et environs.",
    keywords: "devis menuiserie, devis fenêtre, devis gratuit, contact menuisier, montbéliard, belfort"
  },
  avis: {
    title: "Avis Clients | Novalis Fermeture & Menuiserie",
    description: "Découvrez les témoignages de nos clients satisfaits. 98% de satisfaction, travail soigné et pose professionnelle.",
    keywords: "avis menuisier, témoignage client, satisfaction client, novalis avis"
  },
  faq: {
    title: "FAQ | Questions Fréquentes - Novalis Menuiserie Montbéliard",
    description: "Toutes les réponses à vos questions : devis, délais, garanties, aides financières, zones d'intervention. Novalis Menuiserie vous accompagne.",
    keywords: "faq menuiserie, questions menuisier, devis gratuit, garantie fenêtre, aide rénovation, maprimerénov"
  }
};

function SEOHead({ page }) {
  const seo = SEO_DATA[page] || SEO_DATA.accueil;
  
  useEffect(() => {
    // Update title
    document.title = seo.title;
    
    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = seo.description;
    
    // Update or create meta keywords
    let metaKeys = document.querySelector('meta[name="keywords"]');
    if (!metaKeys) {
      metaKeys = document.createElement('meta');
      metaKeys.name = 'keywords';
      document.head.appendChild(metaKeys);
    }
    metaKeys.content = seo.keywords;
    
    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: seo.title },
      { property: 'og:description', content: seo.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://novalis-menuiserie.fr' },
      { property: 'og:image', content: 'https://novalis-menuiserie.fr/logo-novalis.png' },
      { property: 'og:locale', content: 'fr_FR' },
      { property: 'og:site_name', content: 'Novalis Fermeture & Menuiserie' }
    ];
    
    ogTags.forEach(tag => {
      let ogTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', tag.property);
        document.head.appendChild(ogTag);
      }
      ogTag.content = tag.content;
    });
    
    // Twitter Card
    let twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCard) {
      twitterCard = document.createElement('meta');
      twitterCard.name = 'twitter:card';
      twitterCard.content = 'summary_large_image';
      document.head.appendChild(twitterCard);
    }
    
  }, [page, seo]);
  
  return null;
}

const C = {
  navy: "#0C2340",
  navyLight: "#153660",
  anthracite: "#3A3A3A",
  anthraciteMed: "#5A5A5A",
  accent: "#E8982B",
  accentHover: "#D48A1F",
  accentLight: "#FEF5E7",
  lightBg: "#F5F6F8",
  warmWhite: "#FAFBFC",
  white: "#FFFFFF",
  dark: "#111111",
  text: "#2A2A2A",
  textMed: "#5C5C5C",
  textLight: "#8A8A8A",
  border: "rgba(0,0,0,0.06)",
  success: "#2D8F4E",
};

function AnimatedCounter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = Date.now();
        const run = () => {
          const p = Math.min((Date.now() - t0) / duration, 1);
          setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end));
          if (p < 1) requestAnimationFrame(run);
        };
        run();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function SectionLabel({ children }) {
  return (
    <span style={{ color: C.accent, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 3, display: "inline-block", marginBottom: 12 }}>
      {children}
    </span>
  );
}

function SectionTitle({ children, light }) {
  return (
    <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, fontWeight: 400, lineHeight: 1.15, color: light ? C.white : C.navy, marginBottom: 16 }}>
      {children}
    </h2>
  );
}

function Btn({ children, variant = "primary", style: s = {}, onClick }) {
  const base = { border: "none", padding: "15px 34px", borderRadius: 50, fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "all 0.3s", letterSpacing: 0.3, display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "inherit", textDecoration: "none" };
  const variants = {
    primary: { ...base, background: C.accent, color: C.white },
    outline: { ...base, background: "transparent", color: C.navy, border: `2px solid ${C.navy}` },
    outlineLight: { ...base, background: "transparent", color: C.white, border: "2px solid rgba(255,255,255,0.5)" },
    white: { ...base, background: C.white, color: C.navy },
  };
  return <button style={{ ...variants[variant], ...s }} onClick={onClick}>{children}</button>;
}

/* ========== NAVIGATION ========== */

function Header({ page, setPage, scrolled, headerVisible }) {
  const [mobile, setMobile] = useState(false);
  const navItems = [
    { id: "accueil", label: "Accueil" },
    { id: "services", label: "Services" },
    { id: "apropos", label: "À propos" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: "rgba(255,255,255,0.97)",
      backdropFilter: "blur(16px)",
      boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.08)" : "0 1px 20px rgba(0,0,0,0.04)",
      transition: "all 0.4s ease", borderBottom: `1px solid ${C.border}`,
      transform: headerVisible ? "translateY(0)" : "translateY(-100%)"
    }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: scrolled ? 70 : 140, transition: "height 0.4s ease" }}>
        <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }} onClick={() => setPage("accueil")}>
          <img src="/logo-novalis1.png" alt="Novalis Menuiserie Montbéliard - Fenêtres Portes Volets" style={{ height: scrolled ? 50 : 130, width: "auto", transition: "all 0.4s ease" }} />
        </div>

        <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 48 }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} style={{
              background: "transparent",
              color: page === n.id ? C.accent : C.anthracite,
              border: "none", borderBottom: page === n.id ? `2px solid ${C.accent}` : "2px solid transparent",
              padding: scrolled ? "7px 4px" : "9px 4px", borderRadius: 0, fontWeight: 600, fontSize: scrolled ? 13 : 14,
              cursor: "pointer", transition: "all 0.3s", fontFamily: "inherit"
            }}>
              {n.label}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Btn onClick={() => setPage("contact")} style={{ padding: scrolled ? "8px 18px" : "10px 24px", fontSize: scrolled ? 12 : 13 }}>Devis gratuit</Btn>
          <button className="mobile-menu-btn" onClick={() => setMobile(!mobile)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8, flexDirection: "column", gap: 5 }}>
            <span style={{ width: 24, height: 2, background: C.dark, display: "block", borderRadius: 2 }} />
            <span style={{ width: 24, height: 2, background: C.dark, display: "block", borderRadius: 2 }} />
            <span style={{ width: 18, height: 2, background: C.dark, display: "block", borderRadius: 2 }} />
          </button>
        </div>
      </div>

      {mobile && (
        <div style={{ background: C.white, padding: "12px 32px 24px", borderTop: `1px solid ${C.border}`, animation: "fadeIn 0.3s" }}>
          {navItems.map(n => (
            <div key={n.id} onClick={() => { setPage(n.id); setMobile(false); }}
              style={{ padding: "14px 0", borderBottom: `1px solid ${C.border}`, fontWeight: 600, cursor: "pointer", color: page === n.id ? C.accent : C.text }}>
              {n.label}
            </div>
          ))}
          <Btn onClick={() => { setPage("contact"); setMobile(false); }} style={{ width: "100%", marginTop: 16, justifyContent: "center" }}>Demander un devis</Btn>
        </div>
      )}
    </header>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: C.navy, color: C.white, padding: "72px 32px 32px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48, marginBottom: 56 }}>
          <div>
            <img src="/logo-novalis.png" alt="Novalis Fermeture Menuiserie - Artisan local Montbéliard" style={{ height: 100, width: "auto", marginBottom: 20 }} />
            <p style={{ fontSize: 14, opacity: 0.6, lineHeight: 1.8 }}>
              Spécialiste de la menuiserie et des fermetures sur mesure. Installation et rénovation dans le Pays de Montbéliard et alentours.
            </p>
          </div>

          <div>
            <h4 style={{ fontWeight: 700, fontSize: 15, marginBottom: 20 }}>Navigation</h4>
            {[["Accueil","accueil"],["Services","services"],["À propos","apropos"],["Contact","contact"]].map(([l,id]) => (
              <span key={id} onClick={() => setPage(id)} style={{ display: "block", color: "rgba(255,255,255,0.55)", fontSize: 14, padding: "5px 0", cursor: "pointer", transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = C.accent} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}>{l}</span>
            ))}
          </div>

          <div>
            <h4 style={{ fontWeight: 700, fontSize: 15, marginBottom: 20 }}>Nos services</h4>
            {["Fenêtres PVC & Aluminium", "Portes d'entrée", "Volets roulants & battants", "Portails & clôtures", "Baies vitrées", "Rénovation énergétique"].map(s => (
              <span key={s} style={{ display: "block", color: "rgba(255,255,255,0.55)", fontSize: 14, padding: "5px 0" }}>{s}</span>
            ))}
          </div>

          <div>
            <h4 style={{ fontWeight: 700, fontSize: 15, marginBottom: 20 }}>Contact</h4>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 2.2 }}>
              <div>- Pays de Montbéliard</div>
              <div>- 03 63 11 04 67</div>
              <div>- contact@novalis-menuiserie.fr</div>
            </div>
            <Btn variant="primary" style={{ marginTop: 20, padding: "10px 24px", fontSize: 13 }} onClick={() => setPage("contact")}>
              Devis gratuit →
            </Btn>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 12, opacity: 0.35 }}>© 2026 Novalis Fermeture & Menuiserie — Tous droits réservés</p>
          <div style={{ display: "flex", gap: 20 }}>
            <span onClick={() => setPage("mentions")} style={{ fontSize: 12, opacity: 0.35, cursor: "pointer", transition: "opacity 0.3s" }} onMouseEnter={e => e.target.style.opacity = 0.7} onMouseLeave={e => e.target.style.opacity = 0.35}>Mentions légales</span>
            <span onClick={() => setPage("confidentialite")} style={{ fontSize: 12, opacity: 0.35, cursor: "pointer", transition: "opacity 0.3s" }} onMouseEnter={e => e.target.style.opacity = 0.7} onMouseLeave={e => e.target.style.opacity = 0.35}>Politique de confidentialité</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ========== PAGE ACCUEIL ========== */

function PageAccueil({ setPage }) {
  const [heroSlide, setHeroSlide] = useState(0);
  const slides = [
    { title: "Novalis Fermeture\n& Menuiserie", sub: "Spécialiste de la menuiserie et des fermetures sur mesure. Installation, rénovation et conseil personnalisé.", cta: "Demander un devis", img: "/pose-fenetre-montbeliard.png" },
    { title: "Fenêtres &\nBaies vitrées", sub: "PVC, aluminium, sur mesure — performance thermique et acoustique pour votre confort quotidien.", cta: "Découvrir", img: "/pose-fenetre-belfort.png" },
    { title: "Portes, portails\n& fermetures", sub: "Sécurité, isolation et élégance. Des solutions adaptées à chaque projet.", cta: "Nos services", img: "/pose-fenetre-besancon.png" },
  ];

  useEffect(() => {
    const t = setInterval(() => setHeroSlide(p => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const expertises = [
    { title: "Fenêtres & Baies vitrées", desc: "PVC, aluminium, sur mesure. Maximisez la lumière naturelle et l'isolation de votre habitat avec des menuiseries haute performance.", items: ["Fenêtres PVC", "Fenêtres aluminium", "Baies vitrées", "Sur mesure"], img: "/menuiserie-montbeliard.jpg", alt: "Installation fenêtre PVC menuisier Montbéliard" },
    { title: "Portes & Portails", desc: "Porte d'entrée, portail aluminium, motorisation. Sécurisez et embellissez les accès de votre maison.", items: ["Portes d'entrée", "Portails aluminium", "Motorisation", "Clôtures"], img: "/pose-fenetre-besançon.webp", alt: "Pose porte entrée et portail aluminium Belfort" },
    { title: "Volets & Fermetures", desc: "Volets roulants, volets battants, stores. Protégez-vous du soleil, du froid et des regards indiscrets.", items: ["Volets roulants", "Volets battants", "Stores", "Moustiquaires"], img: "/pose-fenetre-mulhouse.jpg", alt: "Installation volets roulants Héricourt" },
  ];


  return (
    <>
      {/* BANDEAU PROMO */}
      <div style={{
        background: "linear-gradient(90deg, #E8982B 0%, #D4841A 50%, #E8982B 100%)",
        padding: "12px 32px", textAlign: "center", position: "relative", overflow: "hidden",
        marginTop: 140
      }}>
        <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)" }} />
        <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <span style={{ background: "#fff", color: "#D4841A", fontWeight: 800, fontSize: 14, padding: "4px 14px", borderRadius: 6, letterSpacing: 1 }}>OFFRE EXCEPTIONNELLE</span>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>
            -30% sur toutes les fermetures et menuiseries
          </span>
          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>Offre limitée</span>
          <button onClick={() => setPage("contact")} style={{
            background: "#fff", color: "#D4841A", border: "none", borderRadius: 50, padding: "7px 22px",
            fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit", transition: "all 0.3s"
          }}
            onMouseEnter={ev => { ev.target.style.background = C.navy; ev.target.style.color = "#fff"; }}
            onMouseLeave={ev => { ev.target.style.background = "#fff"; ev.target.style.color = "#D4841A"; }}
          >En profiter →</button>
          <a href="tel:0363110467" style={{
            background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.5)", borderRadius: 50, padding: "6px 20px",
            fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit", transition: "all 0.3s",
            textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8
          }}
            onMouseEnter={ev => { ev.target.style.background = "#fff"; ev.target.style.color = "#D4841A"; ev.target.style.borderColor = "#fff"; }}
            onMouseLeave={ev => { ev.target.style.background = "transparent"; ev.target.style.color = "#fff"; ev.target.style.borderColor = "rgba(255,255,255,0.5)"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            03 63 11 04 67
          </a>
        </div>
      </div>

      {/* HERO */}
      <section style={{
        background: `linear-gradient(135deg, rgba(12,35,64,0.85) 0%, rgba(26,58,92,0.8) 40%, rgba(12,35,64,0.9) 100%), url(${slides[heroSlide].img}) center/cover no-repeat`,
        minHeight: 480, display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        transition: "background-image 0.8s ease"
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M30 0v60M0 30h60' stroke='%23fff' stroke-width='.5'/%3E%3C/svg%3E\")" }} />
        <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 600, height: 600, background: `radial-gradient(circle, rgba(232,152,43,0.1) 0%, transparent 65%)`, borderRadius: "50%" }} />

        {/* BADGE PROMO flottant */}
        <div className="hero-badge" style={{
          position: "absolute", top: 20, right: 40, zIndex: 10,
          background: "linear-gradient(135deg, #E8982B 0%, #D4841A 100%)",
          borderRadius: "50%", width: 100, height: 100,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 30px rgba(232,152,43,0.4)",
          animation: "promoPulse 2s ease-in-out infinite",
          border: "3px solid rgba(255,255,255,0.3)"
        }}>
          <span style={{ fontSize: 28, fontWeight: 800, color: "#fff", lineHeight: 1 }}>-30%</span>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.9)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginTop: 3 }}>sur tout</span>
        </div>

        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "50px 32px 40px", position: "relative", zIndex: 2, width: "100%" }}>
          <div key={heroSlide} style={{ animation: "heroTextIn 0.7s ease" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(232,152,43,0.12)", borderRadius: 50, padding: "6px 16px", marginBottom: 20, border: "1px solid rgba(232,152,43,0.2)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent }} />
              <span style={{ color: C.accent, fontSize: 12, fontWeight: 600 }}>-30% sur toutes les fermetures et menuiseries</span>
            </div>

            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 46, fontWeight: 400, color: C.white, lineHeight: 1.1, maxWidth: 650, marginBottom: 16, whiteSpace: "pre-line" }}>
              {slides[heroSlide].title}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, lineHeight: 1.6, maxWidth: 480, marginBottom: 28 }}>
              {slides[heroSlide].sub}
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Btn onClick={() => setPage("contact")} style={{ fontSize: 15, padding: "14px 32px" }}>
                Demander un devis →
              </Btn>
              <Btn variant="outlineLight" onClick={() => setPage("services")} style={{ padding: "14px 28px" }}>Nos services</Btn>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 32 }}>
            {slides.map((_, i) => (
              <button key={i} onClick={() => setHeroSlide(i)} style={{
                width: i === heroSlide ? 32 : 8, height: 8, borderRadius: i === heroSlide ? 4 : "50%",
                background: i === heroSlide ? C.accent : "rgba(255,255,255,0.25)",
                border: "none", cursor: "pointer", transition: "all 0.4s"
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISES */}
      <section style={{ padding: "100px 32px", background: C.white }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <SectionLabel>Nos domaines d'expertise</SectionLabel>
            <SectionTitle>Des solutions pour chaque ouverture</SectionTitle>
            <p style={{ color: C.textLight, fontSize: 17, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
              De la fenêtre au portail, nous intervenons sur l'ensemble de vos menuiseries et fermetures pour améliorer votre confort et votre sécurité.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 28 }}>
            {expertises.map((e, i) => (
              <div key={i} style={{
                background: C.warmWhite, borderRadius: 20, padding: "40px 32px", border: `1px solid ${C.border}`,
                transition: "all 0.4s", cursor: "pointer"
              }}
                onMouseEnter={ev => { ev.currentTarget.style.transform = "translateY(-6px)"; ev.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.07)"; }}
                onMouseLeave={ev => { ev.currentTarget.style.transform = ""; ev.currentTarget.style.boxShadow = ""; }}
              >
                <div style={{ height: 180, borderRadius: "16px 16px 0 0", overflow: "hidden", marginBottom: 20, margin: "-40px -32px 20px -32px", background: C.lightBg }}>
                  <img src={e.img} alt={e.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={ev => ev.target.style.display = "none"} />
                </div>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: C.navy, marginBottom: 12 }}>{e.title}</h3>
                <p style={{ color: C.textMed, fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>{e.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {e.items.map(it => (
                    <span key={it} style={{ background: C.accentLight, color: C.accent, fontSize: 12, fontWeight: 600, padding: "6px 14px", borderRadius: 50 }}>{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Btn variant="outline" onClick={() => setPage("services")}>Voir tous nos services →</Btn>
          </div>
        </div>
      </section>

      {/* COMMENT CA MARCHE */}
      <section style={{ padding: "100px 32px", background: C.lightBg }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <SectionLabel>Notre processus</SectionLabel>
            <SectionTitle>Comment ça marche ?</SectionTitle>
            <p style={{ color: C.textLight, fontSize: 17, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              Un accompagnement simple et transparent, de votre premier appel jusqu'à la fin des travaux.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32, position: "relative" }}>
            {[
              { step: "01", title: "Prise de contact", desc: "Appelez-nous ou remplissez notre formulaire. Nous vous recontactons sous 24h pour discuter de votre projet.", color: "#E8F4FD" },
              { step: "02", title: "Visite & Devis", desc: "Un technicien se déplace chez vous gratuitement pour prendre les mesures et vous établir un devis détaillé.", color: "#FEF5E7" },
              { step: "03", title: "Fabrication & Pose", desc: "Vos menuiseries sont fabriquées sur mesure puis installées par nos poseurs qualifiés, dans le respect de votre domicile.", color: "#E8F5E9" },
              { step: "04", title: "Garantie & Suivi", desc: "Profitez de votre garantie et de notre service après-vente réactif. Nous restons disponibles pour toute question.", color: "#F3E8FF" },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center", position: "relative" }}>
                <div style={{
                  width: 80, height: 80, borderRadius: "50%", background: item.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 24px", border: `3px solid ${C.accent}`,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.06)"
                }}>
                  <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: C.accent, fontWeight: 700 }}>{item.step}</span>
                </div>
                {i < 3 && <div className="step-line" style={{ position: "absolute", top: 40, left: "60%", width: "80%", height: 2, background: `linear-gradient(90deg, ${C.accent}, rgba(232,152,43,0.2))`, zIndex: 0 }} />}
                <h4 style={{ fontSize: 18, fontWeight: 700, color: C.navy, marginBottom: 10 }}>{item.title}</h4>
                <p style={{ fontSize: 14, color: C.textMed, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Btn onClick={() => setPage("contact")} style={{ fontSize: 16, padding: "17px 38px" }}>Démarrer mon projet →</Btn>
          </div>
        </div>
      </section>

      {/* AVIS CLIENTS */}
      <section style={{ padding: "100px 32px", background: C.white }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <SectionLabel>Témoignages</SectionLabel>
            <SectionTitle>Ce que disent nos clients</SectionTitle>
            <p style={{ color: C.textLight, fontSize: 17, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              La satisfaction de nos clients est notre meilleure carte de visite.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
            {[
              { name: "Marie D.", loc: "Montbéliard", stars: 5, text: "Travail impeccable du début à la fin. Nos nouvelles fenêtres ont transformé notre maison. L'équipe est ponctuelle, propre et très professionnelle. Je recommande vivement !" },
              { name: "Jean-Pierre L.", loc: "Belfort", stars: 5, text: "Nous avons fait poser une baie vitrée et des volets roulants. Le résultat est magnifique et l'isolation est nettement améliorée. Devis respecté, aucune mauvaise surprise." },
              { name: "Sophie & Marc R.", loc: "Héricourt", stars: 5, text: "Très satisfaits de notre porte d'entrée et du portail motorisé. L'accompagnement a été top, du conseil jusqu'à l'installation. Merci à toute l'équipe Novalis !" },
              { name: "Laurent B.", loc: "Audincourt", stars: 5, text: "Rénovation complète des menuiseries de notre maison. Un vrai changement au niveau du confort thermique et phonique. Rapport qualité-prix excellent." },
              { name: "Isabelle M.", loc: "Sochaux", stars: 4, text: "Pose de volets battants sur notre maison ancienne. Le rendu est superbe et respecte parfaitement le style de la façade. Équipe à l'écoute et de bon conseil." },
              { name: "Thomas G.", loc: "Valentigney", stars: 5, text: "Deuxième fois que je fais appel à Novalis, et toujours aussi satisfait. Cette fois pour un portail aluminium motorisé. Installation rapide et soignée." },
            ].map((avis, i) => (
              <div key={i} style={{
                background: C.lightBg, borderRadius: 20, padding: "32px 28px",
                border: `1px solid ${C.border}`, transition: "all 0.4s", position: "relative"
              }}
                onMouseEnter={ev => { ev.currentTarget.style.transform = "translateY(-4px)"; ev.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.06)"; }}
                onMouseLeave={ev => { ev.currentTarget.style.transform = ""; ev.currentTarget.style.boxShadow = ""; }}
              >
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} style={{ fontSize: 18, color: s < avis.stars ? C.accent : "#ddd" }}>&#9733;</span>
                  ))}
                </div>
                <p style={{ fontSize: 15, color: C.textMed, lineHeight: 1.8, marginBottom: 20, fontStyle: "italic" }}>"{avis.text}"</p>
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
                  <p style={{ fontWeight: 700, fontSize: 15, color: C.navy }}>{avis.name}</p>
                  <p style={{ fontSize: 13, color: C.textLight, marginTop: 2 }}>{avis.loc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Btn variant="outline" onClick={() => setPage("avis")}>Laisser un avis →</Btn>
          </div>
        </div>
      </section>

      {/* ZONE D'INTERVENTION */}
      <section style={{ padding: "100px 32px", background: C.lightBg }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <SectionLabel>Zone d'intervention</SectionLabel>
          <SectionTitle>Nous intervenons près de chez vous</SectionTitle>
          <p style={{ fontSize: 17, color: C.textMed, lineHeight: 1.8, maxWidth: 750, margin: "0 auto 48px" }}>
            Novalis Menuiserie intervient dans tout le <strong style={{ color: C.accent }}>Pays de Montbéliard</strong> et ses alentours.
            Nous nous déplaçons également dans les départements du <strong style={{ color: C.accent }}>Doubs (25)</strong>,
            <strong style={{ color: C.accent }}> Territoire de Belfort (90)</strong>, <strong style={{ color: C.accent }}>Haute-Saône (70)</strong> et <strong style={{ color: C.accent }}>Haut-Rhin (68)</strong> pour vos projets de menuiserie et de fermetures sur mesure.
            Déplacement gratuit pour une étude personnalisée.
          </p>
          <div style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 40
          }}>
            {[
              "Montbéliard",
              "Belfort",
              "Héricourt",
              "Audincourt",
              "Sochaux",
              "Valentigney",
              "Delle",
              "Beaucourt",
              "Bavans",
              "Voujeaucourt"
            ].map(ville => (
              <span key={ville}
                style={{
                  background: C.white,
                  padding: "12px 24px",
                  borderRadius: 50,
                  fontSize: 14,
                  fontWeight: 600,
                  color: C.navy,
                  border: `1px solid ${C.border}`,
                  transition: "all 0.3s"
                }}
                onMouseEnter={e => { e.target.style.borderColor = C.accent; e.target.style.color = C.accent; }}
                onMouseLeave={e => { e.target.style.borderColor = C.border; e.target.style.color = C.navy; }}
              >
                {ville}
              </span>
            ))}
          </div>
          <p style={{ fontSize: 15, color: C.textLight }}>
            Et toutes les communes environnantes — 
            <span
              onClick={() => setPage("contact")}
              style={{ color: C.accent, fontWeight: 600, cursor: "pointer" }}
            >
              Contactez-nous
            </span>
            {" "}pour vérifier.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1A3A5C 100%)`, padding: "100px 32px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-30%", right: "-10%", width: 500, height: 500, background: `radial-gradient(circle, rgba(232,152,43,0.1) 0%, transparent 65%)`, borderRadius: "50%" }} />
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <div style={{ display: "inline-block", background: "linear-gradient(135deg, #E8982B 0%, #D4841A 100%)", borderRadius: 12, padding: "14px 32px", marginBottom: 32, boxShadow: "0 4px 20px rgba(232,152,43,0.3)" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 22 }}>-30% sur toutes les fermetures et menuiseries</span>
          </div>
          <SectionTitle light>Profitez de notre offre exceptionnelle</SectionTitle>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 44px" }}>
            Offre limitée sur l'ensemble de nos produits et services. Demandez votre devis gratuit dès maintenant et bénéficiez de -30% sur votre projet.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn onClick={() => setPage("contact")} style={{ fontSize: 16, padding: "17px 42px" }}>J'en profite maintenant →</Btn>
            <Btn variant="outlineLight" onClick={() => setPage("contact")}>Nous appeler</Btn>
          </div>
        </div>
      </section>
    </>
  );
}

/* ========== PAGE SERVICES ========== */

function PageServices({ setPage }) {
  const categories = [
    {
      title: "Menuiserie extérieure",
      desc: "Des menuiseries haute performance pour votre confort thermique, acoustique et votre sécurité.",
      services: [
        { name: "Fenêtres PVC", desc: "Excellent rapport qualité-prix, isolation thermique remarquable, entretien minimal. Large choix de styles et coloris." },
        { name: "Fenêtres aluminium", desc: "Profilés fins pour un maximum de lumière, durabilité exceptionnelle, finitions haut de gamme et design contemporain." },
        { name: "Baies vitrées", desc: "Ouvrez votre intérieur sur l'extérieur. Baies coulissantes, à galandage ou levantes-coulissantes, aluminium ou PVC." },
        { name: "Portes d'entrée", desc: "Premier élément visible de votre maison. PVC, aluminium ou mixte, avec des niveaux de sécurité renforcés." },
      ]
    },
    {
      title: "Fermetures",
      desc: "Protégez votre intérieur avec des fermetures modernes, performantes et esthétiques.",
      services: [
        { name: "Volets roulants", desc: "Motorisés ou manuels, en aluminium ou PVC. Isolation renforcée et sécurité anti-effraction." },
        { name: "Volets battants", desc: "Charme authentique et protection efficace. Aluminium ou bois, large choix de coloris et persiennes." },
        { name: "Stores extérieurs", desc: "Stores bannes, stores verticaux ou screens pour une protection solaire élégante et sur mesure." },
        { name: "Moustiquaires", desc: "Profitez de l'air frais sans les insectes. Enroulables, fixes ou plissées, adaptées à toutes vos ouvertures." },
      ]
    },
    {
      title: "Portails & Clôtures",
      desc: "Sécurisez et embellissez l'accès à votre propriété avec des portails et clôtures de qualité.",
      services: [
        { name: "Portails aluminium", desc: "Légers, robustes et sans entretien. Battants ou coulissants, large choix de designs et couleurs." },
        { name: "Portails motorisés", desc: "Confort au quotidien avec une motorisation fiable et silencieuse. Compatible avec toutes nos gammes." },
        { name: "Clôtures", desc: "Délimitez votre terrain avec élégance. Aluminium, composite ou PVC, designs modernes ou classiques." },
      ]
    },
    {
      title: "Installation & Rénovation",
      desc: "Un accompagnement complet pour vos projets neufs comme pour la rénovation de l'existant.",
      services: [
        { name: "Pose sur mesure", desc: "Chaque ouverture est unique. Nos techniciens réalisent des prises de cotes précises pour une installation parfaite." },
        { name: "Remplacement de menuiseries", desc: "Modernisez vos anciennes fenêtres, portes ou volets. Dépose soignée et pose dans les règles de l'art." },
        { name: "Rénovation énergétique", desc: "Améliorez la performance énergétique de votre habitat. Nous vous guidons sur les aides financières (MaPrimeRénov', CEE...)." },
      ]
    },
  ];

  return (
    <>
      <section style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1A3A5C 100%)`, padding: "180px 32px 90px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M30 0v60M0 30h60' stroke='%23fff' stroke-width='.5'/%3E%3C/svg%3E\")" }} />
        <div style={{ maxWidth: 1240, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <SectionLabel>Nos services</SectionLabel>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 50, color: C.white, marginBottom: 16 }}>Des solutions complètes pour votre habitat</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 18, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
            Menuiserie extérieure, fermetures, portails et rénovation : découvrez l'ensemble de nos prestations.
          </p>
        </div>
      </section>

      {categories.map((cat, ci) => (
        <section key={ci} style={{ padding: "80px 32px", background: ci % 2 === 0 ? C.white : C.lightBg }}>
          <div style={{ maxWidth: 1240, margin: "0 auto" }}>
            <div style={{ marginBottom: 12 }}>
              <SectionTitle>{cat.title}</SectionTitle>
            </div>
            <p style={{ color: C.textMed, fontSize: 17, lineHeight: 1.7, maxWidth: 700, marginBottom: 40 }}>{cat.desc}</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
              {cat.services.map((s, si) => (
                <div key={si} style={{
                  background: ci % 2 === 0 ? C.warmWhite : C.white, borderRadius: 16, padding: "28px 24px",
                  border: `1px solid ${C.border}`, transition: "all 0.3s"
                }}
                  onMouseEnter={ev => { ev.currentTarget.style.borderColor = C.accent; ev.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={ev => { ev.currentTarget.style.borderColor = C.border; ev.currentTarget.style.transform = ""; }}
                >
                  <div style={{ width: 40, height: 4, background: C.accent, borderRadius: 2, marginBottom: 16 }} />
                  <h4 style={{ fontSize: 18, fontWeight: 700, color: C.navy, marginBottom: 10 }}>{s.name}</h4>
                  <p style={{ fontSize: 14, color: C.textMed, lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section style={{ background: C.accentLight, padding: "72px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: C.navy, marginBottom: 16 }}>Un projet en tête ?</h2>
          <p style={{ color: C.textMed, fontSize: 17, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 36px" }}>
            Décrivez-nous votre besoin et recevez un devis personnalisé sous 48h. C'est gratuit et sans engagement.
          </p>
          <Btn onClick={() => setPage("contact")} style={{ fontSize: 16, padding: "17px 42px" }}>Demander un devis gratuit →</Btn>
        </div>
      </section>
    </>
  );
}

/* ========== PAGE À PROPOS ========== */

function PageAPropos({ setPage }) {
  const valeurs = [
    { title: "Qualité", desc: "Nous ne faisons aucun compromis sur la qualité des matériaux et de la pose. Chaque détail compte pour un résultat durable." },
    { title: "Fiabilité", desc: "Respect des engagements, des délais et du budget. Vous pouvez compter sur nous du premier contact à la fin du chantier." },
    { title: "Accompagnement client", desc: "Un interlocuteur unique vous guide à chaque étape : conseil, choix des produits, installation et suivi après-vente." },
    { title: "Travail soigné", desc: "Nos techniciens interviennent avec rigueur et propreté, dans le respect total de votre domicile." },
  ];

  return (
    <>
      <section style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1A3A5C 100%)`, padding: "180px 32px 90px", position: "relative" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <SectionLabel>À propos</SectionLabel>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 50, color: C.white, marginBottom: 16 }}>Qui sommes-nous ?</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 18, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
            Une entreprise à taille humaine, engagée pour la qualité et la satisfaction de ses clients.
          </p>
        </div>
      </section>

      <section style={{ padding: "100px 32px", background: C.white }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <SectionLabel>Notre histoire</SectionLabel>
              <SectionTitle>L'expertise au service de votre habitat</SectionTitle>
              <p style={{ color: C.textMed, fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
                <strong style={{ color: C.navy }}>Novalis Fermeture & Menuiserie</strong> est née de la passion du métier et de la volonté d'offrir à chaque client un service d'excellence. Implantée dans le <strong style={{ color: C.navy }}>Pays de Montbéliard</strong>, notre entreprise intervient sur l'ensemble du territoire : Belfort, Héricourt, Audincourt et les communes environnantes.
              </p>
              <p style={{ color: C.textMed, fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
                Forts de plus de <strong style={{ color: C.navy }}>15 années d'expérience</strong>, nous maîtrisons chaque étape de votre projet : du conseil initial à la pose finale, en passant par la sélection rigoureuse des meilleurs produits.
              </p>
              <p style={{ color: C.textMed, fontSize: 16, lineHeight: 1.8 }}>
                Notre engagement : des solutions sur mesure, performantes et esthétiques, avec un rapport qualité-prix irréprochable.
              </p>
            </div>
            <div style={{ borderRadius: 24, height: 480, position: "relative", overflow: "hidden", background: C.lightBg }}>
              <img src="/fermeture-hericourt.jpg" alt="Camion Novalis menuisier Montbéliard Belfort Héricourt" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", top: 20, right: 20, background: C.accent, color: C.white, borderRadius: 12, padding: "12px 20px", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16 }}>✓</span> Pose professionnelle
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 32px", background: C.lightBg }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <SectionLabel>Nos valeurs</SectionLabel>
            <SectionTitle>Ce qui nous guide au quotidien</SectionTitle>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {valeurs.map((v, i) => (
              <div key={i} style={{ background: C.white, borderRadius: 16, padding: "36px 28px", border: `1px solid ${C.border}`, transition: "all 0.4s", textAlign: "center" }}
                onMouseEnter={ev => { ev.currentTarget.style.transform = "translateY(-6px)"; ev.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.06)"; }}
                onMouseLeave={ev => { ev.currentTarget.style.transform = ""; ev.currentTarget.style.boxShadow = ""; }}
              >
                <h4 style={{ fontSize: 20, fontWeight: 700, color: C.navy, marginBottom: 10 }}>{v.title}</h4>
                <p style={{ fontSize: 14, color: C.textMed, lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 32px", background: C.white }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", textAlign: "center" }}>
          <SectionLabel>Zone d'intervention</SectionLabel>
          <SectionTitle>Nous intervenons près de chez vous</SectionTitle>
          <p style={{ color: C.textMed, fontSize: 17, maxWidth: 640, margin: "0 auto 48px", lineHeight: 1.7 }}>
            Novalis intervient dans tout le <strong style={{ color: C.navy }}>Pays de Montbéliard</strong> et ses alentours. Déplacement gratuit pour une étude personnalisée.
          </p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12, marginBottom: 48 }}>
            {["Montbéliard", "Belfort", "Héricourt", "Audincourt", "Sochaux", "Valentigney", "Delle", "Beaucourt", "Bavans", "Voujeaucourt"].map(v => (
              <span key={v} style={{ background: C.lightBg, padding: "10px 22px", borderRadius: 50, fontSize: 14, fontWeight: 600, color: C.navy, border: `1px solid ${C.border}` }}>
                {v}
              </span>
            ))}
          </div>
          <p style={{ color: C.textLight, fontSize: 15 }}>Et toutes les communes environnantes — <strong style={{ color: C.accent, cursor: "pointer" }} onClick={() => setPage("contact")}>Contactez-nous</strong> pour vérifier.</p>
        </div>
      </section>

      <section style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1A3A5C 100%)`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <SectionTitle light>Envie de travailler avec nous ?</SectionTitle>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 17, lineHeight: 1.7, marginBottom: 36 }}>
            Faites-nous confiance pour votre prochain projet de menuiserie ou de fermeture.
          </p>
          <Btn onClick={() => setPage("contact")} style={{ fontSize: 16, padding: "17px 42px" }}>Demander un devis gratuit →</Btn>
        </div>
      </section>
    </>
  );
}

/* ========== PAGE CONTACT ========== */

function PageContact() {
  const [form, setForm] = useState({ nom: "", tel: "", email: "", ville: "", projet: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!form.nom || !form.tel || !form.email) return;
    setSending(true);
    try {
      await fetch("https://formspree.io/f/mzdjrowq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "DEMANDE DE DEVIS",
          nom: form.nom,
          telephone: form.tel,
          email: form.email,
          ville: form.ville || "Non renseignée",
          projet: form.projet || "Non précisé",
          message: form.message || "Aucun message"
        })
      });
      setSent(true);
    } catch (err) {
      alert("Erreur lors de l'envoi. Veuillez réessayer.");
    }
    setSending(false);
  };

  const inputStyle = {
    width: "100%", padding: "14px 18px", borderRadius: 10, border: "1px solid #ddd",
    fontSize: 15, fontFamily: "inherit", transition: "border 0.3s", outline: "none",
    background: C.warmWhite
  };

  return (
    <>
      <section className="contact-hero" style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1A3A5C 100%)`, padding: "180px 32px 90px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <SectionLabel>Contact</SectionLabel>
          <h1 className="contact-hero-title" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 50, color: C.white, marginBottom: 16 }}>Demandez votre devis gratuit</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 18, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            Décrivez-nous votre projet et recevez une réponse personnalisée sous 48 heures.
          </p>
        </div>
      </section>

      <section className="contact-section" style={{ padding: "80px 32px", background: C.lightBg }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 48, alignItems: "start" }}>
            <div className="contact-form-card" style={{ background: C.white, borderRadius: 20, padding: "44px 40px", boxShadow: "0 4px 30px rgba(0,0,0,0.04)", border: `1px solid ${C.border}` }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
                  <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: C.navy, marginBottom: 12 }}>Demande envoyée !</h3>
                  <p style={{ color: C.textMed, fontSize: 16, lineHeight: 1.7 }}>Merci pour votre confiance. Notre équipe vous recontactera dans les 48 heures.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: C.navy, marginBottom: 8 }}>Formulaire de devis</h3>
                  <p style={{ color: C.textLight, fontSize: 14, marginBottom: 32 }}>Tous les champs marqués * sont obligatoires</p>

                  <div className="contact-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6, display: "block" }}>Nom complet *</label>
                      <input style={inputStyle} placeholder="Jean Dupont" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })}
                        onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = "#ddd"} />
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6, display: "block" }}>Téléphone *</label>
                      <input style={inputStyle} placeholder="06 00 00 00 00" value={form.tel} onChange={e => setForm({ ...form, tel: e.target.value })}
                        onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = "#ddd"} />
                    </div>
                  </div>

                  <div className="contact-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6, display: "block" }}>Email *</label>
                      <input style={inputStyle} placeholder="jean@exemple.fr" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = "#ddd"} />
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6, display: "block" }}>Ville</label>
                      <input style={inputStyle} placeholder="Montbéliard" value={form.ville} onChange={e => setForm({ ...form, ville: e.target.value })}
                        onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = "#ddd"} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6, display: "block" }}>Type de projet</label>
                    <select style={{ ...inputStyle, cursor: "pointer", appearance: "auto" }} value={form.projet} onChange={e => setForm({ ...form, projet: e.target.value })}>
                      <option value="">Sélectionnez un type de projet</option>
                      <option>Fenêtres PVC</option>
                      <option>Fenêtres aluminium</option>
                      <option>Baies vitrées</option>
                      <option>Porte d'entrée</option>
                      <option>Volets roulants</option>
                      <option>Volets battants</option>
                      <option>Portail</option>
                      <option>Clôture</option>
                      <option>Store</option>
                      <option>Rénovation complète</option>
                      <option>Autre</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6, display: "block" }}>Décrivez votre projet</label>
                    <textarea style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
                      placeholder="Type de travaux, nombre d'ouvertures, dimensions approximatives..."
                      value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                      onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = "#ddd"} />
                  </div>

                  <Btn onClick={handleSubmit} style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: "16px", opacity: (form.nom && form.tel && form.email && !sending) ? 1 : 0.5 }}>
                    {sending ? "Envoi en cours..." : "Envoyer ma demande de devis →"}
                  </Btn>
                  <p style={{ textAlign: "center", fontSize: 12, color: C.textLight, marginTop: 12 }}>Gratuit et sans engagement — Réponse sous 48h</p>
                </>
              )}
            </div>

            <div className="contact-sidebar">
              <div style={{ background: C.white, borderRadius: 16, padding: "32px 28px", marginBottom: 20, border: `1px solid ${C.border}` }}>
                <h4 style={{ fontSize: 18, fontWeight: 700, color: C.navy, marginBottom: 20 }}>Nos coordonnées</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { label: "Téléphone", val: "03 63 11 04 67" },
                    { label: "Email", val: "contact@novalis-menuiserie.fr" },
                    { label: "Horaires", val: "Lun - Ven : 8h - 18h" },
                  ].map((c, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontSize: 12, color: C.textLight, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{c.label}</div>
                        <div style={{ fontSize: 15, color: C.text, fontWeight: 500, whiteSpace: "pre-line", lineHeight: 1.5 }}>{c.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Bouton Appeler maintenant */}
                <a href="tel:0363110467" style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  background: `linear-gradient(135deg, #25D366 0%, #128C7E 100%)`,
                  color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 24px",
                  borderRadius: 50, marginTop: 20, textDecoration: "none",
                  boxShadow: "0 4px 15px rgba(37, 211, 102, 0.3)", transition: "all 0.3s"
                }}
                  onMouseEnter={ev => { ev.target.style.transform = "translateY(-2px)"; ev.target.style.boxShadow = "0 6px 20px rgba(37, 211, 102, 0.4)"; }}
                  onMouseLeave={ev => { ev.target.style.transform = ""; ev.target.style.boxShadow = "0 4px 15px rgba(37, 211, 102, 0.3)"; }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  Appeler maintenant
                </a>
              </div>

              <div style={{ background: C.accentLight, borderRadius: 16, padding: "28px", border: "1px solid rgba(232,152,43,0.15)" }}>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: C.accent, marginBottom: 8 }}>- Réponse rapide</h4>
                <p style={{ fontSize: 14, color: C.textMed, lineHeight: 1.7 }}>
                  Nous nous engageons à vous recontacter sous 48 heures ouvrées pour discuter de votre projet.
                </p>
              </div>

              <div style={{ marginTop: 20, borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}` }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42656.39893854584!2d6.7635!3d47.5103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479234a1a0a5b0c3%3A0x409ce34b30458d0!2sMontb%C3%A9liard!5e0!3m2!1sfr!2sfr!4v1710000000000!5m2!1sfr!2sfr"
                  width="100%" height="200" style={{ border: 0, display: "block" }} allowFullScreen="" loading="lazy"
                  title="Novalis Montbéliard"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ========== PAGE AVIS ========== */

function PageAvis({ setPage }) {
  const [stars, setStars] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nom: "", ville: "", message: "" });

  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!form.nom || stars === 0 || !form.message) return;
    setSending(true);
    try {
      await fetch("https://formspree.io/f/mzdjrowq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: form.nom,
          ville: form.ville || "Non renseignée",
          note: stars + " étoile(s) sur 5",
          message: form.message
        })
      });
      setSubmitted(true);
    } catch (err) {
      alert("Erreur lors de l'envoi. Veuillez réessayer.");
    }
    setSending(false);
  };

  return (
    <>
      <section style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1A3A5C 100%)`, padding: "180px 32px 90px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <SectionLabel>Votre avis compte</SectionLabel>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 50, color: C.white, marginBottom: 16 }}>Laissez-nous votre avis</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 18, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            Votre retour nous aide à nous améliorer et à offrir le meilleur service possible.
          </p>
        </div>
      </section>

      <section style={{ padding: "80px 32px", background: C.white }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "60px 32px", background: C.lightBg, borderRadius: 24, border: `1px solid ${C.border}` }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#E8F5E9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 36 }}>
                &#10003;
              </div>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: C.navy, marginBottom: 16 }}>Merci pour votre avis !</h2>
              <p style={{ color: C.textMed, fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
                Votre témoignage a bien été envoyé. Il sera publié après vérification. Nous vous remercions pour votre confiance.
              </p>
              <Btn onClick={() => setPage("accueil")}>Retour à l'accueil →</Btn>
            </div>
          ) : (
            <div style={{ background: C.lightBg, borderRadius: 24, padding: "48px 40px", border: `1px solid ${C.border}` }}>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: C.navy, marginBottom: 8 }}>Partagez votre expérience</h2>
              <p style={{ color: C.textMed, fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>Tous les champs marqués d'un * sont obligatoires.</p>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 8 }}>Votre note *</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <span key={n}
                      onClick={() => setStars(n)}
                      onMouseEnter={() => setHoverStar(n)}
                      onMouseLeave={() => setHoverStar(0)}
                      style={{
                        fontSize: 36, cursor: "pointer", transition: "transform 0.2s",
                        color: n <= (hoverStar || stars) ? C.accent : "#ddd",
                        transform: n <= (hoverStar || stars) ? "scale(1.1)" : "scale(1)"
                      }}
                    >&#9733;</span>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 8 }}>Nom / Prénom *</label>
                  <input value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} placeholder="Ex: Marie D."
                    style={{ width: "100%", padding: "14px 18px", borderRadius: 12, border: `1px solid ${C.border}`, fontSize: 15, fontFamily: "inherit", outline: "none", transition: "border 0.3s" }}
                    onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border} />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 8 }}>Ville</label>
                  <input value={form.ville} onChange={e => setForm({ ...form, ville: e.target.value })} placeholder="Ex: Montbéliard"
                    style={{ width: "100%", padding: "14px 18px", borderRadius: 12, border: `1px solid ${C.border}`, fontSize: 15, fontFamily: "inherit", outline: "none", transition: "border 0.3s" }}
                    onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border} />
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 8 }}>Votre avis *</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5} placeholder="Décrivez votre expérience avec Novalis..."
                  style={{ width: "100%", padding: "14px 18px", borderRadius: 12, border: `1px solid ${C.border}`, fontSize: 15, fontFamily: "inherit", outline: "none", resize: "vertical", transition: "border 0.3s" }}
                  onFocus={e => e.target.style.borderColor = C.accent} onBlur={e => e.target.style.borderColor = C.border} />
              </div>

              <Btn onClick={handleSubmit} style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: "17px 38px", opacity: (form.nom && stars > 0 && form.message && !sending) ? 1 : 0.5 }}>
                {sending ? "Envoi en cours..." : "Envoyer mon avis →"}
              </Btn>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ========== PAGE MENTIONS LÉGALES ========== */

function PageMentions() {
  const pStyle = { fontSize: 15, color: C.textMed, lineHeight: 1.8, marginBottom: 16 };
  const hStyle = { fontSize: 20, fontWeight: 700, color: C.navy, marginTop: 32, marginBottom: 12 };

  return (
    <>
      <section style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1A3A5C 100%)`, padding: "180px 32px 90px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 50, color: C.white, marginBottom: 16 }}>Mentions légales</h1>
        </div>
      </section>

      <section style={{ padding: "80px 32px", background: C.white }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h3 style={hStyle}>1. Éditeur du site</h3>
          <p style={pStyle}>
            Le site novalis-menuiserie.fr est édité par la société NOVALIS ENERGIE, SAS (Société par Actions Simplifiée), immatriculée au Registre du Commerce et des Sociétés sous le numéro SIREN 992 085 654.
          </p>
          <p style={pStyle}>
            Siège social : 19 bis rue Léon Contejean, 25200 Bethoncourt, France<br />
            SIRET : 992 085 654 00018<br />
            N° TVA intracommunautaire : FR57 992085654<br />
            Code APE : 4321A<br />
            Président : Faicel Fettouh
          </p>
          <p style={pStyle}>
            Email : <strong>contact@novalis-menuiserie.fr</strong><br />
            Téléphone : <strong>03 63 11 04 67</strong>
          </p>

          <h3 style={hStyle}>2. Directeur de la publication</h3>
          <p style={pStyle}>Le directeur de la publication est Faicel Fettouh, en qualité de Président de la société NOVALIS ENERGIE.</p>

          <h3 style={hStyle}>3. Hébergement</h3>
          <p style={pStyle}>
            Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.<br />
            Site web : https://vercel.com
          </p>

          <h3 style={hStyle}>4. Propriété intellectuelle</h3>
          <p style={pStyle}>
            L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.) est la propriété exclusive de NOVALIS ENERGIE, sauf mention contraire. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable de NOVALIS ENERGIE.
          </p>

          <h3 style={hStyle}>5. Limitation de responsabilité</h3>
          <p style={pStyle}>
            NOVALIS ENERGIE s'efforce de fournir sur le site des informations aussi précises que possible. Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
          </p>

          <h3 style={hStyle}>6. Cookies</h3>
          <p style={pStyle}>
            Ce site peut utiliser des cookies à des fins de mesure d'audience et d'amélioration de l'expérience utilisateur. Vous pouvez configurer votre navigateur pour refuser les cookies.
          </p>

          <h3 style={hStyle}>7. Droit applicable</h3>
          <p style={pStyle}>
            Tout litige en relation avec l'utilisation du site novalis-menuiserie.fr est soumis au droit français. L'utilisateur reconnaît la compétence exclusive des tribunaux compétents de Montbéliard.
          </p>
        </div>
      </section>
    </>
  );
}

/* ========== PAGE POLITIQUE DE CONFIDENTIALITÉ ========== */

function PageConfidentialite() {
  const pStyle = { fontSize: 15, color: C.textMed, lineHeight: 1.8, marginBottom: 16 };
  const hStyle = { fontSize: 20, fontWeight: 700, color: C.navy, marginTop: 32, marginBottom: 12 };

  return (
    <>
      <section style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1A3A5C 100%)`, padding: "180px 32px 90px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 50, color: C.white, marginBottom: 16 }}>Politique de confidentialité</h1>
        </div>
      </section>

      <section style={{ padding: "80px 32px", background: C.white }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={pStyle}>
            Dernière mise à jour : mars 2026. La société NOVALIS ENERGIE accorde une grande importance à la protection de vos données personnelles. Cette politique de confidentialité vous informe sur la manière dont vos données sont collectées, utilisées et protégées.
          </p>

          <h3 style={hStyle}>1. Responsable du traitement</h3>
          <p style={pStyle}>
            Le responsable du traitement des données est la société NOVALIS ENERGIE, SAS, dont le siège social est situé au 19 bis rue Léon Contejean, 25200 Bethoncourt, représentée par Faicel Fettouh, Président.
          </p>

          <h3 style={hStyle}>2. Données collectées</h3>
          <p style={pStyle}>
            Dans le cadre de l'utilisation de notre site, nous sommes amenés à collecter les données suivantes via nos formulaires :
          </p>
          <p style={pStyle}>
            — Formulaire de demande de devis : nom, prénom, téléphone, adresse email, ville, type de projet, message.<br />
            — Formulaire d'avis client : nom, ville, note, commentaire.
          </p>

          <h3 style={hStyle}>3. Finalité du traitement</h3>
          <p style={pStyle}>
            Vos données sont collectées pour les finalités suivantes : répondre à vos demandes de devis, vous recontacter dans le cadre de votre projet, publier votre avis client (avec votre consentement), et améliorer nos services.
          </p>

          <h3 style={hStyle}>4. Base légale du traitement</h3>
          <p style={pStyle}>
            Le traitement de vos données repose sur votre consentement (envoi volontaire du formulaire) et sur l'intérêt légitime de NOVALIS ENERGIE à répondre à vos demandes commerciales.
          </p>

          <h3 style={hStyle}>5. Destinataires des données</h3>
          <p style={pStyle}>
            Vos données sont transmises uniquement à l'équipe de NOVALIS ENERGIE. Les formulaires sont traités via le service Formspree (https://formspree.io), dont les serveurs sont situés aux États-Unis et qui respecte les normes de protection des données.
          </p>

          <h3 style={hStyle}>6. Durée de conservation</h3>
          <p style={pStyle}>
            Vos données sont conservées pendant une durée maximale de 3 ans à compter de votre dernière interaction avec NOVALIS ENERGIE, sauf obligation légale de conservation plus longue.
          </p>

          <h3 style={hStyle}>7. Vos droits</h3>
          <p style={pStyle}>
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants : droit d'accès, droit de rectification, droit à l'effacement, droit à la limitation du traitement, droit à la portabilité de vos données, et droit d'opposition.
          </p>
          <p style={pStyle}>
            Pour exercer ces droits, vous pouvez nous contacter par email à l'adresse : <strong>contact@novalis-menuiserie.fr</strong> ou par courrier à l'adresse du siège social.
          </p>

          <h3 style={hStyle}>8. Cookies</h3>
          <p style={pStyle}>
            Ce site n'utilise pas de cookies de suivi publicitaire. Des cookies techniques peuvent être utilisés pour le bon fonctionnement du site. Vous pouvez à tout moment configurer votre navigateur pour désactiver les cookies.
          </p>

          <h3 style={hStyle}>9. Modification de la politique</h3>
          <p style={pStyle}>
            NOVALIS ENERGIE se réserve le droit de modifier la présente politique de confidentialité à tout moment. Les modifications prennent effet dès leur publication sur le site.
          </p>
        </div>
      </section>
    </>
  );
}

/* ========== PAGES SEO LOCALES (invisibles dans le menu) ========== */

const villesSEO = [
  {
    slug: "menuisier-montbeliard",
    ville: "Montbéliard",
    region: "Pays de Montbéliard",
    cp: "25200",
    metaTitle: "Menuisier à Montbéliard | Fenêtres, Portes, Volets - Novalis",
    description: "Votre menuisier à Montbéliard et ses environs. Installation de fenêtres, portes, volets et portails. Devis gratuit et intervention rapide.",
    zones: ["Bethoncourt", "Audincourt", "Valentigney", "Sochaux", "Grand-Charmont", "Exincourt", "Bavans", "Voujeaucourt"]
  },
  {
    slug: "menuisier-belfort",
    ville: "Belfort",
    region: "Territoire de Belfort",
    cp: "90000",
    metaTitle: "Menuisier à Belfort | Pose Fenêtres PVC Alu - Novalis",
    description: "Menuisier qualifié à Belfort. Pose de menuiseries PVC et aluminium, volets roulants, portes d'entrée. Intervention dans tout le Territoire de Belfort.",
    zones: ["Delle", "Beaucourt", "Valdoie", "Offemont", "Bavilliers", "Danjoutin", "Essert", "Cravanche"]
  },
  {
    slug: "menuisier-besancon",
    ville: "Besançon",
    region: "Doubs",
    cp: "25000",
    metaTitle: "Menuisier à Besançon | Fenêtres sur Mesure - Novalis",
    description: "Spécialiste menuiserie à Besançon. Fenêtres sur mesure, baies vitrées, rénovation énergétique. Artisan local de confiance.",
    zones: ["Thise", "École-Valentin", "Miserey-Salines", "Pirey", "Franois", "Saône", "Beure", "Châtillon-le-Duc"]
  },
  {
    slug: "menuisier-mulhouse",
    ville: "Mulhouse",
    region: "Haut-Rhin",
    cp: "68100",
    metaTitle: "Menuisier à Mulhouse | Installation Fermetures - Novalis",
    description: "Menuisier professionnel à Mulhouse et alentours. Installation et rénovation de fermetures. Qualité et prix compétitifs.",
    zones: ["Illzach", "Wittenheim", "Kingersheim", "Riedisheim", "Rixheim", "Pfastatt", "Brunstatt", "Lutterbach"]
  },
  {
    slug: "menuisier-hericourt",
    ville: "Héricourt",
    region: "Haute-Saône",
    cp: "70400",
    metaTitle: "Menuisier à Héricourt | Fenêtres & Volets - Novalis",
    description: "Menuisier à Héricourt et en Haute-Saône. Fenêtres, portes, volets : solutions sur mesure pour votre habitat.",
    zones: ["Châlonvillars", "Bussurel", "Tavey", "Brevilliers", "Vyans-le-Val", "Luze", "Mandrevillars", "Couthenans"]
  },
  {
    slug: "menuisier-delle",
    ville: "Delle",
    region: "Territoire de Belfort",
    cp: "90100",
    metaTitle: "Menuisier à Delle | Portes & Portails - Novalis",
    description: "Artisan menuisier à Delle. Pose de menuiseries extérieures, fermetures et portails. Service de proximité et qualité garantie.",
    zones: ["Grandvillars", "Beaucourt", "Bourogne", "Montreux-Château", "Joncherey", "Lebetain", "Fêche-l'Église", "Florimont"]
  }
];

function PageSEOVille({ villeSlug, setPage }) {
  const data = villesSEO.find(v => v.slug === villeSlug) || villesSEO[0];
  
  const services = [
    { icon: "🪟", title: "Fenêtres PVC & Aluminium", desc: "Installation de fenêtres haute performance thermique et acoustique. Large choix de coloris et finitions." },
    { icon: "🚪", title: "Portes d'entrée", desc: "Portes d'entrée sécurisées et isolantes. Design moderne ou classique selon vos envies." },
    { icon: "🏠", title: "Volets roulants & battants", desc: "Volets sur mesure, manuels ou motorisés. Protection solaire et sécurité renforcée." },
    { icon: "🚗", title: "Portails & clôtures", desc: "Portails aluminium motorisés et clôtures assorties. Entrée sécurisée et esthétique." },
    { icon: "🌅", title: "Baies vitrées", desc: "Baies coulissantes et à galandage. Lumière maximale et ouverture sur l'extérieur." },
    { icon: "🔧", title: "Rénovation énergétique", desc: "Remplacement de menuiseries anciennes. Économies d'énergie et aides financières." },
  ];

  return (
    <>
      {/* HERO SEO */}
      <section style={{
        background: `linear-gradient(135deg, ${C.navy} 0%, #1A3A5C 100%)`,
        padding: "180px 32px 100px", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 500, height: 500, background: `radial-gradient(circle, rgba(232,152,43,0.15) 0%, transparent 65%)`, borderRadius: "50%" }} />
        <div style={{ maxWidth: 1240, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(232,152,43,0.15)", borderRadius: 50, padding: "8px 20px", marginBottom: 24, border: "1px solid rgba(232,152,43,0.25)" }}>
            <span style={{ fontSize: 16 }}>📍</span>
            <span style={{ color: C.accent, fontSize: 14, fontWeight: 600 }}>{data.region} • {data.cp}</span>
          </div>
          
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 52, fontWeight: 400, color: C.white, lineHeight: 1.1, maxWidth: 800, marginBottom: 20 }}>
            Menuisier à {data.ville}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 20, lineHeight: 1.7, maxWidth: 650, marginBottom: 36 }}>
            {data.description}
          </p>
          
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 48 }}>
            <Btn onClick={() => setPage("contact")} style={{ fontSize: 16, padding: "17px 38px" }}>
              Devis gratuit à {data.ville} →
            </Btn>
            <a href="tel:0363110467" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "rgba(255,255,255,0.1)", color: "#fff", border: "2px solid rgba(255,255,255,0.3)",
              borderRadius: 50, padding: "15px 28px", fontWeight: 700, fontSize: 15, textDecoration: "none",
              transition: "all 0.3s"
            }}>
              <span>📞</span> 03 63 11 04 67
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            {[
              { n: "15+", s: "années d'expérience" },
              { n: "500+", s: "chantiers réalisés" },
              { n: "98%", s: "clients satisfaits" },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: "left" }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: C.accent }}>{stat.n}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>{stat.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "100px 32px", background: C.white }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <SectionLabel>Nos services à {data.ville}</SectionLabel>
            <SectionTitle>Tous vos travaux de menuiserie</SectionTitle>
            <p style={{ color: C.textLight, fontSize: 17, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              De la fenêtre au portail, nous intervenons sur l'ensemble de vos menuiseries et fermetures à {data.ville} et dans les communes voisines.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
            {services.map((s, i) => (
              <div key={i} style={{
                background: C.lightBg, borderRadius: 16, padding: "32px 28px",
                border: `1px solid ${C.border}`, transition: "all 0.4s"
              }}
                onMouseEnter={ev => { ev.currentTarget.style.transform = "translateY(-4px)"; ev.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.06)"; }}
                onMouseLeave={ev => { ev.currentTarget.style.transform = ""; ev.currentTarget.style.boxShadow = ""; }}
              >
                <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: C.navy, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 15, color: C.textMed, lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zones d'intervention */}
      <section style={{ padding: "80px 32px", background: C.lightBg }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", textAlign: "center" }}>
          <SectionLabel>Zone d'intervention</SectionLabel>
          <SectionTitle>Nous intervenons à {data.ville} et environs</SectionTitle>
          <p style={{ color: C.textMed, fontSize: 17, maxWidth: 640, margin: "0 auto 40px", lineHeight: 1.7 }}>
            Notre équipe se déplace gratuitement pour établir votre devis dans toutes ces communes :
          </p>
          
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12, marginBottom: 40 }}>
            <span style={{ background: C.accent, padding: "12px 24px", borderRadius: 50, fontSize: 15, fontWeight: 700, color: C.white }}>
              {data.ville}
            </span>
            {data.zones.map(z => (
              <span key={z} style={{ background: C.white, padding: "10px 22px", borderRadius: 50, fontSize: 14, fontWeight: 600, color: C.navy, border: `1px solid ${C.border}` }}>
                {z}
              </span>
            ))}
          </div>
          
          <p style={{ color: C.textLight, fontSize: 14 }}>
            Votre commune n'est pas listée ? <strong style={{ color: C.accent, cursor: "pointer" }} onClick={() => setPage("contact")}>Contactez-nous</strong>, nous intervenons probablement chez vous !
          </p>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section style={{ padding: "100px 32px", background: C.white }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <SectionLabel>Pourquoi Novalis ?</SectionLabel>
              <SectionTitle>Votre menuisier de confiance à {data.ville}</SectionTitle>
              <div style={{ marginTop: 32 }}>
                {[
                  { title: "Devis gratuit et sans engagement", desc: "Nous nous déplaçons gratuitement chez vous pour étudier votre projet et établir un devis détaillé." },
                  { title: "Produits de qualité", desc: "Nous travaillons avec les meilleurs fabricants français et européens pour vous garantir des menuiseries durables." },
                  { title: "Pose par des professionnels", desc: "Nos techniciens sont formés et expérimentés. Ils interviennent avec soin et propreté." },
                  { title: "Garantie et SAV réactif", desc: "Bénéficiez d'une garantie jusqu'à 10 ans et d'un service après-vente disponible et efficace." },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <span style={{ color: C.accent, fontWeight: 700, fontSize: 14 }}>✓</span>
                    </div>
                    <div>
                      <h4 style={{ fontSize: 17, fontWeight: 700, color: C.navy, marginBottom: 4 }}>{item.title}</h4>
                      <p style={{ fontSize: 14, color: C.textMed, lineHeight: 1.7 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: C.lightBg, borderRadius: 24, padding: 48, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>🏆</div>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: C.navy, marginBottom: 16 }}>
                Prêt à démarrer votre projet ?
              </h3>
              <p style={{ color: C.textMed, fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
                Obtenez votre devis gratuit en moins de 48h. Nous intervenons rapidement à {data.ville} et dans tout le {data.region}.
              </p>
              <Btn onClick={() => setPage("contact")} style={{ fontSize: 16, padding: "17px 38px" }}>
                Demander un devis gratuit →
              </Btn>
              <p style={{ marginTop: 20, fontSize: 14, color: C.textLight }}>
                ou appelez-nous au <a href="tel:0363110467" style={{ color: C.accent, fontWeight: 700, textDecoration: "none" }}>03 63 11 04 67</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1A3A5C 100%)`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: C.white, marginBottom: 16 }}>
            Menuisier à {data.ville} : faites confiance à Novalis
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 17, lineHeight: 1.7, marginBottom: 36 }}>
            Installation, rénovation, dépannage — nous sommes à votre service pour tous vos projets de menuiserie et fermetures dans le {data.region}.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn onClick={() => setPage("contact")} style={{ fontSize: 16, padding: "17px 42px" }}>Devis gratuit →</Btn>
            <Btn variant="outlineLight" onClick={() => setPage("services")}>Nos services</Btn>
          </div>
        </div>
      </section>
    </>
  );
}

/* ========== PAGE FAQ ========== */

function PageFAQ({ setPage }) {
  const faqs = [
    {
      category: "Nos services",
      questions: [
        {
          q: "Quels types de menuiseries proposez-vous ?",
          a: "Nous proposons une gamme complète : fenêtres PVC et aluminium, portes d'entrée, baies vitrées, volets roulants et battants, portails et clôtures aluminium, stores et moustiquaires. Tous nos produits sont sur mesure et adaptés à vos besoins."
        },
        {
          q: "Travaillez-vous avec quelles marques ?",
          a: "Nous travaillons avec les meilleurs fabricants français et européens pour vous garantir des menuiseries de qualité, durables et performantes. Nous sélectionnons nos partenaires selon des critères stricts de qualité et de fiabilité."
        },
        {
          q: "Proposez-vous la motorisation des volets et portails ?",
          a: "Oui, nous proposons la motorisation de vos volets roulants et portails. Nous pouvons également motoriser vos installations existantes. Télécommande, interrupteur mural ou pilotage par smartphone : plusieurs options sont disponibles."
        }
      ]
    },
    {
      category: "Devis et tarifs",
      questions: [
        {
          q: "Le devis est-il vraiment gratuit ?",
          a: "Oui, le devis est 100% gratuit et sans engagement. Nous nous déplaçons chez vous pour prendre les mesures exactes et vous conseiller sur les meilleures solutions pour votre projet."
        },
        {
          q: "Proposez-vous des facilités de paiement ?",
          a: "Oui, nous proposons des solutions de financement adaptées à votre budget. Paiement en plusieurs fois sans frais possible selon les montants. N'hésitez pas à nous en parler lors de l'établissement du devis."
        },
        {
          q: "Vos prix sont-ils négociables ?",
          a: "Nos devis sont étudiés au plus juste pour vous proposer le meilleur rapport qualité-prix. Actuellement, profitez de -30% sur l'ensemble de nos produits et services."
        }
      ]
    },
    {
      category: "Intervention et délais",
      questions: [
        {
          q: "Dans quelles zones intervenez-vous ?",
          a: "Nous intervenons dans tout le Pays de Montbéliard et ses environs : Belfort, Héricourt, Audincourt, Delle, ainsi que dans les départements du Doubs (25), Territoire de Belfort (90), Haute-Saône (70) et Haut-Rhin (68)."
        },
        {
          q: "Quels sont les délais d'intervention ?",
          a: "Après validation de votre devis, comptez en moyenne 4 à 6 semaines pour la fabrication sur mesure de vos menuiseries. La pose est ensuite réalisée en 1 à 2 jours selon l'ampleur du chantier."
        },
        {
          q: "Intervenez-vous en urgence pour un dépannage ?",
          a: "Oui, nous proposons un service de dépannage pour les problèmes urgents (volet bloqué, serrure cassée, vitrage brisé). Contactez-nous par téléphone pour une intervention rapide."
        }
      ]
    },
    {
      category: "Garanties et aides",
      questions: [
        {
          q: "Quelle garantie sur vos produits et la pose ?",
          a: "Nos menuiseries sont garanties jusqu'à 10 ans selon les produits. La pose est garantie 2 ans. Notre service après-vente reste disponible pour toute question ou intervention."
        },
        {
          q: "Puis-je bénéficier d'aides pour mes travaux ?",
          a: "Oui, selon votre situation et le type de travaux, vous pouvez bénéficier d'aides comme MaPrimeRénov', l'éco-PTZ, les CEE (Certificats d'Économie d'Énergie) ou la TVA réduite à 5,5%. Nous vous accompagnons dans ces démarches."
        },
        {
          q: "Êtes-vous certifiés RGE ?",
          a: "Nous travaillons avec des partenaires certifiés RGE (Reconnu Garant de l'Environnement), ce qui vous permet de bénéficier des aides à la rénovation énergétique pour vos travaux d'isolation."
        }
      ]
    }
  ];

  return (
    <>
      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1A3A5C 100%)`, padding: "180px 32px 100px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <SectionLabel>FAQ</SectionLabel>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 50, color: C.white, marginBottom: 20 }}>
            Questions fréquentes
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 18, lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
            Retrouvez les réponses aux questions les plus posées par nos clients sur nos services, tarifs et interventions.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section style={{ padding: "100px 32px", background: C.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {faqs.map((cat, catIndex) => (
            <div key={catIndex} style={{ marginBottom: 64 }}>
              <h2 style={{ 
                fontFamily: "'DM Serif Display', serif", 
                fontSize: 28, 
                color: C.navy, 
                marginBottom: 24,
                paddingBottom: 16,
                borderBottom: `2px solid ${C.accent}`
              }}>
                {cat.category}
              </h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {cat.questions.map((faq, i) => (
                  <details key={i} style={{
                    background: C.lightBg,
                    borderRadius: 16,
                    border: `1px solid ${C.border}`,
                    overflow: "hidden"
                  }}>
                    <summary style={{
                      padding: "24px 28px",
                      fontSize: 17,
                      fontWeight: 600,
                      color: C.navy,
                      cursor: "pointer",
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      {faq.q}
                      <span style={{ fontSize: 20, color: C.accent, fontWeight: 700, marginLeft: 16 }}>+</span>
                    </summary>
                    <div style={{
                      padding: "0 28px 24px",
                      fontSize: 15,
                      color: C.textMed,
                      lineHeight: 1.8
                    }}>
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div style={{ 
            background: C.lightBg, 
            borderRadius: 24, 
            padding: "48px 40px", 
            textAlign: "center",
            marginTop: 64 
          }}>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: C.navy, marginBottom: 16 }}>
              Vous avez une autre question ?
            </h3>
            <p style={{ color: C.textMed, fontSize: 16, lineHeight: 1.7, marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
              Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans votre projet.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Btn onClick={() => setPage("contact")}>Nous contacter →</Btn>
              <a href="tel:0363110467" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: C.white, color: C.navy, border: `2px solid ${C.navy}`,
                borderRadius: 50, padding: "15px 28px", fontWeight: 600, fontSize: 15, textDecoration: "none"
              }}>
                📞 03 63 11 04 67
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ========== APP PRINCIPAL ========== */

export default function NovalisSite() {
  const [page, setPage] = useState("accueil");
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const h = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      if (currentY < 50) {
        setHeaderVisible(true);
      } else if (currentY < lastScrollY.current) {
        setHeaderVisible(true);
      } else if (currentY > lastScrollY.current + 5) {
        setHeaderVisible(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", color: C.text, overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Outfit:wght@300;400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::selection { background: ${C.accentLight}; color: ${C.navy}; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroTextIn { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes promoPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }

        .desktop-nav { display: flex; }
        .mobile-menu-btn { display: none !important; }

        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .hero-badge { display: none !important; }
          .step-line { display: none !important; }
          h1 { font-size: 36px !important; }
          h2 { font-size: 30px !important; }
        }
        @media (max-width: 768px) {
          .stats-row { flex-direction: column !important; gap: 28px !important; }
          .stats-divider { display: none !important; }
        }

        /* Bouton flottant appel */
        .floating-call-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 999;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: floatPulse 2s ease-in-out infinite;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .floating-call-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 28px rgba(37, 211, 102, 0.5);
        }
        @keyframes floatPulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4); }
          50% { box-shadow: 0 4px 30px rgba(37, 211, 102, 0.6), 0 0 0 8px rgba(37, 211, 102, 0.15); }
        }

        /* Page Contact responsive */
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .contact-form-card {
            padding: 28px 20px !important;
          }
          .contact-form-grid {
            grid-template-columns: 1fr !important;
          }
          .contact-hero {
            padding: 140px 20px 60px !important;
          }
          .contact-hero h1 {
            font-size: 32px !important;
          }
          .contact-section {
            padding: 40px 16px !important;
          }
          .contact-sidebar {
            order: -1;
          }
        }
      `}</style>

      <SEOHead page={page} />
      <Header page={page} setPage={setPage} scrolled={scrolled} headerVisible={headerVisible} />

      <main key={page} style={{ animation: "fadeIn 0.4s ease" }}>
        {page === "accueil" && <PageAccueil setPage={setPage} />}
        {page === "services" && <PageServices setPage={setPage} />}
        {page === "apropos" && <PageAPropos setPage={setPage} />}
        {page === "faq" && <PageFAQ setPage={setPage} />}
        {page === "contact" && <PageContact />}
        {page === "avis" && <PageAvis setPage={setPage} />}
        {page === "mentions" && <PageMentions />}
        {page === "confidentialite" && <PageConfidentialite />}
        {/* Pages SEO locales (invisibles dans le menu) */}
        {page === "menuisier-montbeliard" && <PageSEOVille villeSlug="menuisier-montbeliard" setPage={setPage} />}
        {page === "menuisier-belfort" && <PageSEOVille villeSlug="menuisier-belfort" setPage={setPage} />}
        {page === "menuisier-besancon" && <PageSEOVille villeSlug="menuisier-besancon" setPage={setPage} />}
        {page === "menuisier-mulhouse" && <PageSEOVille villeSlug="menuisier-mulhouse" setPage={setPage} />}
        {page === "menuisier-hericourt" && <PageSEOVille villeSlug="menuisier-hericourt" setPage={setPage} />}
        {page === "menuisier-delle" && <PageSEOVille villeSlug="menuisier-delle" setPage={setPage} />}
      </main>

      <Footer setPage={setPage} />

      {/* Bouton flottant appel */}
      <a href="tel:0363110467" className="floating-call-btn" title="Appelez-nous" aria-label="Appeler Novalis">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      </a>
    </div>
  );
}
