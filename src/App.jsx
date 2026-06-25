import { useState } from "react";

const COLORS = {
  bg: "#0b0b07",
  bgCard: "#141410",
  bgCardBorder: "rgba(249,249,249,0.1)",
  accent: "#FFDE00",
  white: "#f9f9f9",
  whitePure: "#ffffff",
  muted: "rgba(249,249,249,0.55)",
  mutedMore: "rgba(249,249,249,0.3)",
};

const CONDITIONS = [
  { id: "diabetes", label: "Diabetes Tipo 2", icon: "🩸" },
  { id: "hipertension", label: "Hipertensión", icon: "❤️" },
  { id: "colesterol", label: "Colesterol Alto", icon: "💊" },
  { id: "celiaco", label: "Celiaquía", icon: "🌾" },
  { id: "lactosa", label: "Intolerancia a Lactosa", icon: "🥛" },
  { id: "vegano", label: "Dieta Vegana", icon: "🥦" },
  { id: "renal", label: "Enfermedad Renal", icon: "🫘" },
  { id: "tiroides", label: "Hipotiroidismo", icon: "🦋" },
];

const RECIPES = [
  {
    id: 1,
    title: "Bowl de Quinoa con Vegetales Asados",
    time: "25 min",
    calories: 320,
    tags: ["diabetes", "hipertension", "vegano"],
    image: "https://clipara.b-cdn.net/clubb-images/d769c39d-50e7-40bd-aa68-ae5ab7f15289.png?width=1200&height=1200",
    difficulty: "Fácil",
    protein: "14g",
    carbs: "42g",
    fat: "8g",
    description: "Quinoa con pimiento, calabacín y tomate cherry. Rica en proteína vegetal y fibra.",
  },
  {
    id: 2,
    title: "Salmón al Horno con Espárragos",
    time: "20 min",
    calories: 410,
    tags: ["hipertension", "colesterol", "tiroides"],
    image: "https://clipara.b-cdn.net/clubb-images/e01fa052-c9b1-4796-8e4b-b0c2523ffb58.png?width=1200&height=1200",
    difficulty: "Fácil",
    protein: "38g",
    carbs: "8g",
    fat: "22g",
    description: "Filete de salmón con espárragos al limón. Alto en omega-3 y bajo en sodio.",
  },
  {
    id: 3,
    title: "Tortilla de Avena sin Gluten",
    time: "10 min",
    calories: 280,
    tags: ["celiaco", "diabetes"],
    image: "https://clipara.b-cdn.net/clubb-images/25d69189-9a1e-4ee8-98d4-3d6494e5fe23.png",
    difficulty: "Muy Fácil",
    protein: "12g",
    carbs: "35g",
    fat: "9g",
    description: "Tortilla suave sin gluten con espinacas y huevo. Perfecta para el desayuno.",
  },
  {
    id: 4,
    title: "Crema de Lentejas Roja",
    time: "30 min",
    calories: 350,
    tags: ["vegano", "colesterol", "renal"],
    image: "https://via.placeholder.com/600x400/1a1a14/FFDE00?text=Crema+Lentejas",
    difficulty: "Fácil",
    protein: "18g",
    carbs: "48g",
    fat: "5g",
    description: "Sopa cremosa de lentejas rojas con cúrcuma y jengibre anti-inflamatorio.",
  },
  {
    id: 5,
    title: "Ensalada Niçoise Ligera",
    time: "15 min",
    calories: 295,
    tags: ["hipertension", "colesterol", "lactosa"],
    image: "https://via.placeholder.com/600x400/1a1a14/FFDE00?text=Ensalada+Nicoise",
    difficulty: "Fácil",
    protein: "22g",
    carbs: "18g",
    fat: "14g",
    description: "Atún, judías verdes, huevo y tomate. Sin lácteos y baja en sodio.",
  },
  {
    id: 6,
    title: "Poke Bowl de Tofu",
    time: "20 min",
    calories: 370,
    tags: ["vegano", "celiaco", "tiroides"],
    image: "https://via.placeholder.com/600x400/1a1a14/FFDE00?text=Poke+Bowl",
    difficulty: "Media",
    protein: "20g",
    carbs: "50g",
    fat: "10g",
    description: "Bowl hawaiano vegano con tofu marinado, arroz integral y alga wakame.",
  },
];

const NAV_ITEMS = [
  { id: "inicio", label: "Inicio" },
  { id: "recetas", label: "Recetas" },
  { id: "tracker", label: "Mi Perfil" },
  { id: "planes", label: "Planes" },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredRecipe, setHoveredRecipe] = useState(null);
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [trackerStep, setTrackerStep] = useState(1);
  const [userProfile, setUserProfile] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    goal: "",
  });
  const [profileSaved, setProfileSaved] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [activeFilter, setActiveFilter] = useState("todos");

  const toggleCondition = (id) => {
    setSelectedConditions((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleSave = (id) => {
    setSavedRecipes((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const filteredRecipes = RECIPES.filter((r) => {
    if (activeFilter === "todos") return true;
    if (activeFilter === "guardadas") return savedRecipes.includes(r.id);
    if (selectedConditions.length > 0 && activeFilter === "recomendadas") {
      return r.tags.some((t) => selectedConditions.includes(t));
    }
    return r.tags.includes(activeFilter);
  });

  const navigate = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = () => {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  // ─── STYLES ───────────────────────────────────────────────
  const styles = {
    root: {
      minHeight: "100vh",
      backgroundColor: COLORS.bg,
      fontFamily: "'Inter', 'Archivo Black', sans-serif",
      color: COLORS.white,
      overflowX: "hidden",
    },
    // NAV
    nav: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      backgroundColor: COLORS.bg,
      height: 70,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      borderBottom: `1px solid ${COLORS.bgCardBorder}`,
    },
    navLogo: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      cursor: "pointer",
    },
    navLogoImg: {
      width: 42,
      height: 42,
      borderRadius: 10,
      background: COLORS.accent,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20,
    },
    navLogoText: {
      fontFamily: "'Archivo Black', sans-serif",
      fontWeight: 700,
      fontSize: 18,
      color: COLORS.white,
      letterSpacing: "-0.3px",
    },
    navLinks: {
      display: "flex",
      gap: 4,
    },
    navLink: (active) => ({
      padding: "8px 16px",
      borderRadius: 10,
      cursor: "pointer",
      fontFamily: "Inter, sans-serif",
      fontSize: 14,
      fontWeight: 600,
      color: active ? COLORS.bg : COLORS.white,
      background: active ? COLORS.accent : "transparent",
      border: "none",
      transition: "all 0.2s ease",
    }),
    hamburger: {
      display: "flex",
      flexDirection: "column",
      gap: 5,
      cursor: "pointer",
      padding: 8,
    },
    hamburgerLine: {
      width: 22,
      height: 2,
      background: COLORS.white,
      borderRadius: 2,
      transition: "all 0.2s ease",
    },
    mobileMenu: {
      position: "fixed",
      top: 70,
      left: 0,
      right: 0,
      backgroundColor: COLORS.bgCard,
      zIndex: 99,
      padding: "16px 0",
      borderBottom: `1px solid ${COLORS.bgCardBorder}`,
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    },
    mobileMenuItem: (active) => ({
      display: "block",
      width: "100%",
      padding: "14px 24px",
      fontFamily: "Inter, sans-serif",
      fontSize: 16,
      fontWeight: 600,
      color: active ? COLORS.accent : COLORS.white,
      background: "transparent",
      border: "none",
      textAlign: "left",
      cursor: "pointer",
      borderLeft: active ? `3px solid ${COLORS.accent}` : "3px solid transparent",
      transition: "all 0.15s ease",
    }),
    // MAIN CONTENT
    main: {
      paddingTop: 70,
      minHeight: "100vh",
    },
    // HERO
    hero: {
      position: "relative",
      padding: "80px 24px 60px",
      background: `linear-gradient(135deg, #0b0b07 0%, #1a1a10 50%, #0b0b07 100%)`,
      overflow: "hidden",
    },
    heroBg: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 2,
      background: COLORS.bgCardBorder,
      opacity: 0.1,
      zIndex: 1,
    },
    heroGlow: {
      position: "absolute",
      top: "20%",
      right: "-10%",
      width: 400,
      height: 400,
      background: `radial-gradient(circle, rgba(255,222,0,0.08) 0%, transparent 70%)`,
      pointerEvents: "none",
    },
    heroContent: {
      maxWidth: 700,
      position: "relative",
      zIndex: 2,
    },
    heroBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      background: "rgba(255,222,0,0.12)",
      border: `1px solid rgba(255,222,0,0.3)`,
      borderRadius: 100,
      padding: "6px 14px",
      fontSize: 12,
      fontWeight: 600,
      color: COLORS.accent,
      marginBottom: 24,
      fontFamily: "Inter, sans-serif",
      letterSpacing: "0.5px",
      textTransform: "uppercase",
    },
    heroTitle: {
      fontFamily: "'Archivo Black', sans-serif",
      fontSize: "clamp(36px, 6vw, 64px)",
      fontWeight: 700,
      lineHeight: 1.1,
      color: COLORS.whitePure,
      marginBottom: 20,
      margin: "0 0 20px 0",
    },
    heroAccent: {
      color: COLORS.accent,
    },
    heroSubtitle: {
      fontFamily: "Inter, sans-serif",
      fontSize: 18,
      fontWeight: 400,
      lineHeight: "136%",
      color: "rgba(249,249,249,0.75)",
      marginBottom: 36,
      maxWidth: 520,
      margin: "0 0 36px 0",
    },
    heroBtns: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
    },
    btnPrimary: {
      padding: "14px 28px",
      background: COLORS.accent,
      color: COLORS.bg,
      border: "none",
      borderRadius: 12,
      fontFamily: "Inter, sans-serif",
      fontSize: 15,
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.2s ease",
      letterSpacing: "-0.2px",
    },
    btnSecondary: {
      padding: "14px 28px",
      background: "transparent",
      color: COLORS.white,
      border: `1px solid ${COLORS.bgCardBorder}`,
      borderRadius: 12,
      fontFamily: "Inter, sans-serif",
      fontSize: 15,
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    heroStats: {
      display: "flex",
      gap: 32,
      marginTop: 48,
      paddingTop: 32,
      borderTop: `1px solid ${COLORS.bgCardBorder}`,
      flexWrap: "wrap",
    },
    heroStat: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
    },
    heroStatNum: {
      fontFamily: "'Archivo Black', sans-serif",
      fontSize: 28,
      fontWeight: 700,
      color: COLORS.accent,
      lineHeight: 1,
    },
    heroStatLabel: {
      fontFamily: "Inter, sans-serif",
      fontSize: 13,
      color: COLORS.muted,
    },
    // CONDITIONS SECTION
    section: {
      padding: "60px 24px",
    },
    sectionHeader: {
      marginBottom: 32,
    },
    sectionLabel: {
      fontFamily: "Inter, sans-serif",
      fontSize: 12,
      fontWeight: 600,
      color: COLORS.accent,
      letterSpacing: "1px",
      textTransform: "uppercase",
      marginBottom: 8,
    },
    sectionTitle: {
      fontFamily: "'Archivo Black', sans-serif",
      fontSize: "clamp(24px, 4vw, 40px)",
      fontWeight: 700,
      color: COLORS.white,
      lineHeight: 1.2,
      margin: "0 0 8px 0",
    },
    sectionDesc: {
      fontFamily: "Inter, sans-serif",
      fontSize: 16,
      color: COLORS.muted,
      lineHeight: "150%",
      maxWidth: 500,
    },
    conditionsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
      gap: 12,
      marginBottom: 32,
    },
    conditionCard: (selected) => ({
      padding: "16px",
      borderRadius: 14,
      border: selected ? `2px solid ${COLORS.accent}` : `1px solid ${COLORS.bgCardBorder}`,
      background: selected ? "rgba(255,222,0,0.08)" : COLORS.bgCard,
      cursor: "pointer",
      transition: "all 0.2s ease",
      display: "flex",
      flexDirection: "column",
      gap: 8,
    }),
    conditionIcon: {
      fontSize: 24,
    },
    conditionLabel: (selected) => ({
      fontFamily: "Inter, sans-serif",
      fontSize: 13,
      fontWeight: 600,
      color: selected ? COLORS.accent : COLORS.white,
      lineHeight: "130%",
    }),
    // RECIPE GRID
    recipeFilters: {
      display: "flex",
      gap: 8,
      marginBottom: 24,
      overflowX: "auto",
      paddingBottom: 8,
      scrollbarWidth: "none",
    },
    filterChip: (active) => ({
      padding: "8px 16px",
      borderRadius: 100,
      border: active ? `1px solid ${COLORS.accent}` : `1px solid ${COLORS.bgCardBorder}`,
      background: active ? "rgba(255,222,0,0.12)" : "transparent",
      color: active ? COLORS.accent : COLORS.muted,
      fontFamily: "Inter, sans-serif",
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
      whiteSpace: "nowrap",
      transition: "all 0.2s ease",
      flexShrink: 0,
    }),
    recipesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: 20,
    },
    recipeCard: (hovered) => ({
      borderRadius: 16,
      border: `1px solid ${hovered ? "rgba(255,222,0,0.25)" : COLORS.bgCardBorder}`,
      background: COLORS.bgCard,
      overflow: "hidden",
      cursor: "pointer",
      transition: "all 0.25s ease",
      transform: hovered ? "translateY(-4px)" : "translateY(0)",
      boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.4)" : "none",
    }),
    recipeImg: {
      width: "100%",
      height: 180,
      objectFit: "cover",
      display: "block",
    },
    recipeBody: {
      padding: 16,
    },
    recipeTime: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      fontSize: 12,
      color: COLORS.muted,
      fontFamily: "Inter, sans-serif",
      marginBottom: 8,
    },
    recipeTitle: {
      fontFamily: "'Archivo Black', sans-serif",
      fontSize: 16,
      fontWeight: 700,
      color: COLORS.white,
      margin: "0 0 8px 0",
      lineHeight: "130%",
    },
    recipeDesc: {
      fontFamily: "Inter, sans-serif",
      fontSize: 13,
      color: COLORS.muted,
      lineHeight: "150%",
      margin: "0 0 12px 0",
    },
    recipeMacros: {
      display: "flex",
      gap: 8,
      marginBottom: 12,
    },
    macroChip: {
      padding: "4px 8px",
      borderRadius: 6,
      background: "rgba(255,255,255,0.06)",
      fontSize: 11,
      fontFamily: "Inter, sans-serif",
      color: COLORS.muted,
      fontWeight: 500,
    },
    recipeFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    recipeCalories: {
      fontFamily: "Inter, sans-serif",
      fontSize: 13,
      fontWeight: 700,
      color: COLORS.accent,
    },
    saveBtn: (saved) => ({
      width: 32,
      height: 32,
      borderRadius: 8,
      border: saved ? `1px solid ${COLORS.accent}` : `1px solid ${COLORS.bgCardBorder}`,
      background: saved ? "rgba(255,222,0,0.12)" : "transparent",
      color: saved ? COLORS.accent : COLORS.muted,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14,
      transition: "all 0.15s ease",
      flexShrink: 0,
    }),
    recipeTags: {
      display: "flex",
      gap: 4,
      flexWrap: "wrap",
      marginBottom: 12,
    },
    tag: {
      padding: "3px 8px",
      borderRadius: 100,
      background: "rgba(255,222,0,0.1)",
      border: "1px solid rgba(255,222,0,0.2)",
      fontSize: 10,
      fontFamily: "Inter, sans-serif",
      fontWeight: 600,
      color: COLORS.accent,
      textTransform: "uppercase",
      letterSpacing: "0.3px",
    },
    // EXPANDED MODAL
    modalOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.75)",
      zIndex: 200,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    },
    modal: {
      background: "#141410",
      borderRadius: 20,
      border: `1px solid ${COLORS.bgCardBorder}`,
      maxWidth: 520,
      width: "100%",
      maxHeight: "85vh",
      overflowY: "auto",
      boxShadow: "0 24px 80px rgba(0,0,0,0.8)",
    },
    modalImg: {
      width: "100%",
      height: 220,
      objectFit: "cover",
      borderRadius: "20px 20px 0 0",
    },
    modalBody: {
      padding: 24,
    },
    modalClose: {
      position: "absolute",
      top: 16,
      right: 16,
      width: 36,
      height: 36,
      borderRadius: 10,
      background: "rgba(0,0,0,0.5)",
      border: "none",
      color: COLORS.white,
      cursor: "pointer",
      fontSize: 18,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modalImgWrap: {
      position: "relative",
    },
    // TRACKER
    trackerCard: {
      background: COLORS.bgCard,
      border: `1px solid ${COLORS.bgCardBorder}`,
      borderRadius: 20,
      padding: 28,
      maxWidth: 600,
      margin: "0 auto",
    },
    trackerSteps: {
      display: "flex",
      gap: 8,
      marginBottom: 28,
    },
    trackerStep: (active, done) => ({
      flex: 1,
      height: 4,
      borderRadius: 4,
      background: done ? COLORS.accent : active ? "rgba(255,222,0,0.4)" : COLORS.bgCardBorder,
      transition: "all 0.3s ease",
    }),
    label: {
      fontFamily: "Inter, sans-serif",
      fontSize: 13,
      fontWeight: 600,
      color: COLORS.muted,
      marginBottom: 8,
      display: "block",
    },
    input: {
      width: "100%",
      padding: "12px 14px",
      background: "rgba(255,255,255,0.05)",
      border: `1px solid ${COLORS.bgCardBorder}`,
      borderRadius: 10,
      color: COLORS.white,
      fontFamily: "Inter, sans-serif",
      fontSize: 15,
      outline: "none",
      boxSizing: "border-box",
      marginBottom: 16,
      transition: "border-color 0.2s ease",
    },
    select: {
      width: "100%",
      padding: "12px 14px",
      background: "#1a1a14",
      border: `1px solid ${COLORS.bgCardBorder}`,
      borderRadius: 10,
      color: COLORS.white,
      fontFamily: "Inter, sans-serif",
      fontSize: 15,
      outline: "none",
      boxSizing: "border-box",
      marginBottom: 16,
      cursor: "pointer",
    },
    formRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
    },
    // PLANES
    planesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: 20,
      maxWidth: 900,
      margin: "0 auto",
    },
    planCard: (hovered, featured) => ({
      padding: 28,
      borderRadius: 20,
      border: featured ? `2px solid ${COLORS.accent}` : `1px solid ${COLORS.bgCardBorder}`,
      background: featured ? "rgba(255,222,0,0.06)" : COLORS.bgCard,
      cursor: "pointer",
      transition: "all 0.25s ease",
      transform: hovered ? "translateY(-4px)" : "translateY(0)",
      position: "relative",
    }),
    planBadge: {
      position: "absolute",
      top: -12,
      left: "50%",
      transform: "translateX(-50%)",
      background: COLORS.accent,
      color: COLORS.bg,
      padding: "4px 14px",
      borderRadius: 100,
      fontSize: 11,
      fontWeight: 700,
      fontFamily: "Inter, sans-serif",
      whiteSpace: "nowrap",
    },
    planPrice: {
      fontFamily: "'Archivo Black', sans-serif",
      fontSize: 40,
      fontWeight: 700,
      color: COLORS.white,
      marginBottom: 4,
    },
    planPriceSub: {
      fontFamily: "Inter, sans-serif",
      fontSize: 13,
      color: COLORS.muted,
      marginBottom: 20,
    },
    planFeature: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 10,
      fontFamily: "Inter, sans-serif",
      fontSize: 14,
      color: COLORS.white,
    },
    planFeatureIcon: {
      color: COLORS.accent,
      flexShrink: 0,
    },
    // DIVIDER
    divider: {
      height: 1,
      background: COLORS.bgCardBorder,
      margin: "0 24px",
    },
    // SUCCESS TOAST
    toast: {
      position: "fixed",
      bottom: 24,
      left: "50%",
      transform: "translateX(-50%)",
      background: COLORS.accent,
      color: COLORS.bg,
      padding: "12px 24px",
      borderRadius: 12,
      fontFamily: "Inter, sans-serif",
      fontSize: 14,
      fontWeight: 700,
      zIndex: 300,
      boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
      pointerEvents: "none",
    },
    // EMPTY STATE
    emptyState: {
      textAlign: "center",
      padding: "60px 20px",
    },
    emptyIcon: {
      fontSize: 48,
      marginBottom: 16,
    },
    emptyText: {
      fontFamily: "Inter, sans-serif",
      fontSize: 16,
      color: COLORS.muted,
    },
    // FOOTER
    footer: {
      padding: "40px 24px",
      borderTop: `1px solid ${COLORS.bgCardBorder}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 16,
    },
    footerLogo: {
      fontFamily: "'Archivo Black', sans-serif",
      fontSize: 16,
      fontWeight: 700,
      color: COLORS.white,
    },
    footerText: {
      fontFamily: "Inter, sans-serif",
      fontSize: 13,
      color: COLORS.muted,
    },
  };

  // ─── COMPONENTS ───────────────────────────────────────────

  const renderNav = () => (
    <>
      <nav style={styles.nav}>
        <div style={styles.navLogo} onClick={() => navigate("inicio")}>
          <div style={styles.navLogoImg}>🥗</div>
          <span style={styles.navLogoText}>Vital Recipes</span>
        </div>
        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 4, "@media(max-width:700px)": { display: "none" } }} className="desktop-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              style={styles.navLink(activeSection === item.id)}
              onClick={() => navigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="hamburger-btn"
          aria-label="Menú"
        >
          <span style={styles.hamburgerLine}></span>
          <span style={styles.hamburgerLine}></span>
          <span style={styles.hamburgerLine}></span>
        </button>
      </nav>
      {mobileMenuOpen && (
        <div style={styles.mobileMenu}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              style={styles.mobileMenuItem(activeSection === item.id)}
              onClick={() => navigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );

  const renderHero = () => (
    <div style={styles.hero}>
      <div style={styles.heroBg} />
      <div style={styles.heroGlow} />
      <div style={styles.heroContent}>
        <div style={styles.heroBadge}>
          ⚡ Recetas listas en 5 minutos
        </div>
        <h1 style={styles.heroTitle}>
          Recetas saludables<br />
          para <span style={styles.heroAccent}>tu condición médica</span>
        </h1>
        <p style={styles.heroSubtitle}>
          Vital Recipes analiza tus condiciones de salud y genera recetas personalizadas,
          nutritivas y deliciosas — todas listas en cinco minutos.
        </p>
        <div style={styles.heroBtns}>
          <button
            style={styles.btnPrimary}
            onClick={() => navigate("tracker")}
          >
            Crear mi perfil →
          </button>
          <button
            style={styles.btnSecondary}
            onClick={() => navigate("recetas")}
          >
            Ver recetas
          </button>
        </div>
        <div style={styles.heroStats}>
          <div style={styles.heroStat}>
            <span style={styles.heroStatNum}>+200</span>
            <span style={styles.heroStatLabel}>Recetas disponibles</span>
          </div>
          <div style={styles.heroStat}>
            <span style={styles.heroStatNum}>8</span>
            <span style={styles.heroStatLabel}>Condiciones médicas</span>
          </div>
          <div style={styles.heroStat}>
            <span style={styles.heroStatNum}>5 min</span>
            <span style={styles.heroStatLabel}>Tiempo promedio</span>
          </div>
        </div>
      </div>
      {/* Hero image */}
      <div style={{
        marginTop: 48,
        borderRadius: 20,
        overflow: "hidden",
        border: `1px solid ${COLORS.bgCardBorder}`,
        maxWidth: 700,
      }}>
        <img
          src="https://clipara.b-cdn.net/clubb-images/d769c39d-50e7-40bd-aa68-ae5ab7f15289.png?width=1200&height=1200"
          alt="Receta saludable"
          style={{ width: "100%", display: "block", maxHeight: 320, objectFit: "cover" }}
        />
      </div>
    </div>
  );

  const renderConditionsSection = () => (
    <div style={{ ...styles.section, background: "#0e0e09" }}>
      <div style={styles.sectionHeader}>
        <div style={styles.sectionLabel}>Personalización</div>
        <h2 style={styles.sectionTitle}>¿Cuál es tu condición?</h2>
        <p style={styles.sectionDesc}>
          Selecciona tus condiciones médicas o preferencias dietéticas para recibir recetas adaptadas a ti.
        </p>
      </div>
      <div style={styles.conditionsGrid}>
        {CONDITIONS.map((c) => (
          <div
            key={c.id}
            style={styles.conditionCard(selectedConditions.includes(c.id))}
            onClick={() => toggleCondition(c.id)}
          >
            <span style={styles.conditionIcon}>{c.icon}</span>
            <span style={styles.conditionLabel(selectedConditions.includes(c.id))}>{c.label}</span>
          </div>
        ))}
      </div>
      {selectedConditions.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            style={{ ...styles.btnPrimary }}
            onClick={() => { navigate("recetas"); setActiveFilter("recomendadas"); }}
          >
            Ver mis recetas recomendadas ({selectedConditions.length} seleccionadas)
          </button>
        </div>
      )}
    </div>
  );

  const renderFeaturedRecipes = () => {
    const featured = RECIPES.slice(0, 3);
    return (
      <div style={styles.section}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={styles.sectionLabel}>Destacadas</div>
            <h2 style={{ ...styles.sectionTitle, marginBottom: 0 }}>Recetas populares</h2>
          </div>
          <button style={styles.btnSecondary} onClick={() => navigate("recetas")}>Ver todas →</button>
        </div>
        <div style={styles.recipesGrid}>
          {featured.map((recipe) => (
            <div
              key={recipe.id}
              style={styles.recipeCard(hoveredRecipe === recipe.id)}
              onMouseEnter={() => setHoveredRecipe(recipe.id)}
              onMouseLeave={() => setHoveredRecipe(null)}
              onClick={() => setExpandedRecipe(recipe)}
            >
              <img src={recipe.image} alt={recipe.title} style={styles.recipeImg} />
              <div style={styles.recipeBody}>
                <div style={styles.recipeTime}>⏱ {recipe.time} · {recipe.difficulty} · {recipe.calories} kcal</div>
                <h3 style={styles.recipeTitle}>{recipe.title}</h3>
                <p style={styles.recipeDesc}>{recipe.description}</p>
                <div style={styles.recipeMacros}>
                  <span style={styles.macroChip}>Prot: {recipe.protein}</span>
                  <span style={styles.macroChip}>Carb: {recipe.carbs}</span>
                  <span style={styles.macroChip}>Gras: {recipe.fat}</span>
                </div>
                <div style={styles.recipeFooter}>
                  <span style={styles.recipeCalories}>{recipe.calories} kcal</span>
                  <button
                    style={styles.saveBtn(savedRecipes.includes(recipe.id))}
                    onClick={(e) => { e.stopPropagation(); toggleSave(recipe.id); }}
                  >
                    {savedRecipes.includes(recipe.id) ? "★" : "☆"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderRecipesPage = () => {
    const filterOptions = [
      { id: "todos", label: "Todas" },
      { id: "recomendadas", label: "Recomendadas" },
      { id: "guardadas", label: "Guardadas" },
      ...CONDITIONS.slice(0, 5).map((c) => ({ id: c.id, label: c.label })),
    ];
    return (
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionLabel}>Recetario</div>
          <h2 style={styles.sectionTitle}>Todas las recetas</h2>
        </div>
        <div style={styles.recipeFilters}>
          {filterOptions.map((f) => (
            <button
              key={f.id}
              style={styles.filterChip(activeFilter === f.id)}
              onClick={() => setActiveFilter(f.id)}
            >
              {f.label}
              {f.id === "guardadas" && savedRecipes.length > 0 && (
                <span style={{ marginLeft: 4, background: COLORS.accent, color: COLORS.bg, borderRadius: 100, padding: "1px 6px", fontSize: 10, fontWeight: 700 }}>
                  {savedRecipes.length}
                </span>
              )}
            </button>
          ))}
        </div>
        {activeFilter === "recomendadas" && selectedConditions.length === 0 && (
          <div style={{ padding: "16px", background: "rgba(255,222,0,0.08)", border: `1px solid rgba(255,222,0,0.2)`, borderRadius: 12, marginBottom: 20 }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: COLORS.accent, margin: 0 }}>
              💡 Selecciona tus condiciones en "Inicio" para ver recomendaciones personalizadas.
            </p>
          </div>
        )}
        {filteredRecipes.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🍽️</div>
            <p style={styles.emptyText}>No hay recetas en esta categoría aún.</p>
          </div>
        ) : (
          <div style={styles.recipesGrid}>
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                style={styles.recipeCard(hoveredRecipe === recipe.id)}
                onMouseEnter={() => setHoveredRecipe(recipe.id)}
                onMouseLeave={() => setHoveredRecipe(null)}
                onClick={() => setExpandedRecipe(recipe)}
              >
                <img src={recipe.image} alt={recipe.title} style={styles.recipeImg} />
                <div style={styles.recipeBody}>
                  <div style={styles.recipeTime}>⏱ {recipe.time} · {recipe.difficulty}</div>
                  <h3 style={styles.recipeTitle}>{recipe.title}</h3>
                  <p style={styles.recipeDesc}>{recipe.description}</p>
                  <div style={styles.recipeTags}>
                    {recipe.tags.slice(0, 2).map((t) => (
                      <span key={t} style={styles.tag}>
                        {CONDITIONS.find((c) => c.id === t)?.label || t}
                      </span>
                    ))}
                  </div>
                  <div style={styles.recipeMacros}>
                    <span style={styles.macroChip}>Prot: {recipe.protein}</span>
                    <span style={styles.macroChip}>Carb: {recipe.carbs}</span>
                    <span style={styles.macroChip}>Gras: {recipe.fat}</span>
                  </div>
                  <div style={styles.recipeFooter}>
                    <span style={styles.recipeCalories}>{recipe.calories} kcal</span>
                    <button
                      style={styles.saveBtn(savedRecipes.includes(recipe.id))}
                      onClick={(e) => { e.stopPropagation(); toggleSave(recipe.id); }}
                    >
                      {savedRecipes.includes(recipe.id) ? "★" : "☆"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderTrackerPage = () => (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <div style={styles.sectionLabel}>Mi Perfil</div>
        <h2 style={styles.sectionTitle}>Configura tu perfil de salud</h2>
        <p style={styles.sectionDesc}>
          Ingresa tus datos para recibir recetas completamente personalizadas.
        </p>
      </div>
      <div style={styles.trackerCard}>
        {/* Progress steps */}
        <div style={styles.trackerSteps}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={styles.trackerStep(trackerStep === s, trackerStep > s)} />
          ))}
        </div>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: COLORS.muted, marginBottom: 20 }}>
          Paso {trackerStep} de 3
        </p>
        {trackerStep === 1 && (
          <>
            <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 20, color: COLORS.white, marginBottom: 20, marginTop: 0 }}>
              Datos personales
            </h3>
            <label style={styles.label}>Nombre</label>
            <input
              style={styles.input}
              name="name"
              value={userProfile.name}
              onChange={handleProfileChange}
              placeholder="Tu nombre"
            />
            <div style={styles.formRow}>
              <div>
                <label style={styles.label}>Edad</label>
                <input
                  style={styles.input}
                  name="age"
                  value={userProfile.age}
                  onChange={handleProfileChange}
                  placeholder="Años"
                  type="number"
                />
              </div>
              <div>
                <label style={styles.label}>Objetivo</label>
                <select
                  style={styles.select}
                  name="goal"
                  value={userProfile.goal}
                  onChange={handleProfileChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="perder_peso">Perder peso</option>
                  <option value="mantener">Mantener peso</option>
                  <option value="ganar_masa">Ganar masa muscular</option>
                  <option value="salud_general">Salud general</option>
                </select>
              </div>
            </div>
            <div style={styles.formRow}>
              <div>
                <label style={styles.label}>Peso (kg)</label>
                <input
                  style={styles.input}
                  name="weight"
                  value={userProfile.weight}
                  onChange={handleProfileChange}
                  placeholder="70"
                  type="number"
                />
              </div>
              <div>
                <label style={styles.label}>Altura (cm)</label>
                <input
                  style={styles.input}
                  name="height"
                  value={userProfile.height}
                  onChange={handleProfileChange}
                  placeholder="170"
                  type="number"
                />
              </div>
            </div>
            <button
              style={{ ...styles.btnPrimary, width: "100%", marginTop: 8 }}
              onClick={() => setTrackerStep(2)}
            >
              Siguiente →
            </button>
          </>
        )}
        {trackerStep === 2 && (
          <>
            <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 20, color: COLORS.white, marginBottom: 8, marginTop: 0 }}>
              Condiciones médicas
            </h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: COLORS.muted, marginBottom: 20 }}>
              Selecciona todas las que apliquen para personalizar tus recetas.
            </p>
            <div style={{ ...styles.conditionsGrid, gridTemplateColumns: "1fr 1fr", marginBottom: 24 }}>
              {CONDITIONS.map((c) => (
                <div
                  key={c.id}
                  style={styles.conditionCard(selectedConditions.includes(c.id))}
                  onClick={() => toggleCondition(c.id)}
                >
                  <span style={styles.conditionIcon}>{c.icon}</span>
                  <span style={styles.conditionLabel(selectedConditions.includes(c.id))}>{c.label}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                style={{ ...styles.btnSecondary, flex: 1 }}
                onClick={() => setTrackerStep(1)}
              >
                ← Atrás
              </button>
              <button
                style={{ ...styles.btnPrimary, flex: 2 }}
                onClick={() => setTrackerStep(3)}
              >
                Siguiente →
              </button>
            </div>
          </>
        )}
        {trackerStep === 3 && (
          <>
            <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 20, color: COLORS.white, marginBottom: 20, marginTop: 0 }}>
              Resumen de tu perfil
            </h3>
            {[
              { label: "Nombre", value: userProfile.name || "—" },
              { label: "Edad", value: userProfile.age ? `${userProfile.age} años` : "—" },
              { label: "Peso / Altura", value: userProfile.weight && userProfile.height ? `${userProfile.weight}kg / ${userProfile.height}cm` : "—" },
              { label: "Objetivo", value: userProfile.goal || "—" },
              { label: "Condiciones", value: selectedConditions.length > 0 ? CONDITIONS.filter((c) => selectedConditions.includes(c.id)).map((c) => c.label).join(", ") : "Ninguna seleccionada" },
            ].map((row) => (
              <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${COLORS.bgCardBorder}` }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: COLORS.muted }}>{row.label}</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: COLORS.white, fontWeight: 600, textAlign: "right", maxWidth: "60%" }}>{row.value}</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <button
                style={{ ...styles.btnSecondary, flex: 1 }}
                onClick={() => setTrackerStep(2)}
              >
                ← Atrás
              </button>
              <button
                style={{ ...styles.btnPrimary, flex: 2 }}
                onClick={() => { handleProfileSave(); navigate("recetas"); setActiveFilter("recomendadas"); }}
              >
                Guardar y ver recetas ✓
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderPlanesPage = () => {
    const plans = [
      {
        name: "Básico",
        price: "Gratis",
        priceSub: "para siempre",
        features: [
          "Acceso a 50 recetas",
          "1 condición médica",
          "Filtros básicos",
          "Guardar hasta 10 recetas",
        ],
        cta: "Comenzar gratis",
        featured: false,
      },
      {
        name: "Pro",
        price: "€9",
        priceSub: "por mes",
        features: [
          "Acceso a +200 recetas",
          "Condiciones ilimitadas",
          "Plan semanal personalizado",
          "Lista de compras automática",
          "Macros detallados",
          "Sin publicidad",
        ],
        cta: "Comenzar prueba gratuita",
        featured: true,
        badge: "Más popular",
      },
      {
        name: "Familiar",
        price: "€19",
        priceSub: "por mes",
        features: [
          "Todo en Pro",
          "Hasta 5 perfiles",
          "Recetas para toda la familia",
          "Soporte prioritario",
          "Acceso anticipado",
        ],
        cta: "Comenzar prueba gratuita",
        featured: false,
      },
    ];
    return (
      <div style={styles.section}>
        <div style={{ ...styles.sectionHeader, textAlign: "center" }}>
          <div style={styles.sectionLabel}>Precios</div>
          <h2 style={{ ...styles.sectionTitle, textAlign: "center" }}>Elige tu plan</h2>
          <p style={{ ...styles.sectionDesc, margin: "0 auto", textAlign: "center" }}>
            Comienza gratis. Sube de plan cuando necesites más recetas y funciones.
          </p>
        </div>
        <div style={styles.planesGrid}>
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              style={styles.planCard(hoveredPlan === i, plan.featured)}
              onMouseEnter={() => setHoveredPlan(i)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.badge && <div style={styles.planBadge}>{plan.badge}</div>}
              <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 14, color: COLORS.muted, marginBottom: 12, marginTop: plan.badge ? 12 : 0 }}>
                {plan.name}
              </p>
              <div style={styles.planPrice}>{plan.price}</div>
              <p style={styles.planPriceSub}>{plan.priceSub}</p>
              <div style={{ borderTop: `1px solid ${COLORS.bgCardBorder}`, paddingTop: 16, marginBottom: 20 }}>
                {plan.features.map((f) => (
                  <div key={f} style={styles.planFeature}>
                    <span style={styles.planFeatureIcon}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <button
                style={plan.featured ? styles.btnPrimary : styles.btnSecondary}
                // TODO: conectar con sistema de pagos (Stripe)
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderModal = () => {
    if (!expandedRecipe) return null;
    const r = expandedRecipe;
    return (
      <div style={styles.modalOverlay} onClick={() => setExpandedRecipe(null)}>
        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div style={styles.modalImgWrap}>
            <img src={r.image} alt={r.title} style={styles.modalImg} />
            <button style={styles.modalClose} onClick={() => setExpandedRecipe(null)}>✕</button>
          </div>
          <div style={styles.modalBody}>
            <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
              {r.tags.map((t) => (
                <span key={t} style={styles.tag}>
                  {CONDITIONS.find((c) => c.id === t)?.icon} {CONDITIONS.find((c) => c.id === t)?.label || t}
                </span>
              ))}
            </div>
            <h2 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 22, color: COLORS.white, margin: "0 0 8px 0" }}>
              {r.title}
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: COLORS.muted, marginBottom: 20, lineHeight: "150%" }}>
              {r.description}
            </p>
            {/* Macros */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 20 }}>
              {[
                { label: "Calorías", value: `${r.calories}`, unit: "kcal" },
                { label: "Proteína", value: r.protein, unit: "" },
                { label: "Carbs", value: r.carbs, unit: "" },
                { label: "Grasas", value: r.fat, unit: "" },
              ].map((m) => (
                <div key={m.label} style={{ textAlign: "center", padding: 12, background: "rgba(255,255,255,0.04)", borderRadius: 10 }}>
                  <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 16, color: COLORS.accent, fontWeight: 700 }}>{m.value}</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: COLORS.muted, marginTop: 2 }}>{m.label}{m.unit && ` (${m.unit})`}</div>
                </div>
              ))}
            </div>
            {/* TODO: Agregar pasos de preparación detallados desde base de datos */}
            <div style={{ background: "rgba(255,222,0,0.06)", border: `1px solid rgba(255,222,0,0.2)`, borderRadius: 12, padding: 16, marginBottom: 20 }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: COLORS.accent, margin: 0, fontWeight: 600 }}>
                📋 Preparación
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: COLORS.muted, margin: "8px 0 0 0", lineHeight: "155%" }}>
                {/* TODO: cargar pasos reales desde API de recetas */}
                1. Prepara todos los ingredientes frescos. 2. Sigue las instrucciones de cocción rápida. 3. Sirve inmediatamente para máximo sabor y nutrientes.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                style={{ ...styles.saveBtn(savedRecipes.includes(r.id)), width: "auto", padding: "10px 20px", fontSize: 14, flex: 1 }}
                onClick={() => toggleSave(r.id)}
              >
                {savedRecipes.includes(r.id) ? "★ Guardada" : "☆ Guardar receta"}
              </button>
              <button style={{ ...styles.btnPrimary, flex: 1 }} onClick={() => setExpandedRecipe(null)}>
                ← Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFooter = () => (
    <footer style={styles.footer}>
      <div>
        <div style={styles.footerLogo}>🥗 Vital Recipes</div>
        <p style={{ ...styles.footerText, marginTop: 4 }}>Nutrición inteligente para tu salud.</p>
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {["Inicio", "Recetas", "Mi Perfil", "Planes"].map((l) => (
          <span key={l} style={{ ...styles.footerText, cursor: "pointer" }}>{l}</span>
        ))}
      </div>
      <p style={styles.footerText}>© 2024 Vital Recipes. Todos los derechos reservados.</p>
    </footer>
  );

  // ─── RENDER ───────────────────────────────────────────────
  return (
    <div style={styles.root}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: #0b0b07; }
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&display=swap');
        .desktop-nav { display: flex; }
        .hamburger-btn { display: none; }
        @media (max-width: 700px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        input:focus { border-color: #FFDE00 !important; }
        select:focus { border-color: #FFDE00 !important; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0b0b07; }
        ::-webkit-scrollbar-thumb { background: rgba(255,222,0,0.3); border-radius: 3px; }
        button:active { transform: scale(0.97); }
      `}</style>

      {renderNav()}

      <main style={styles.main}>
        {activeSection === "inicio" && (
          <>
            {renderHero()}
            <div style={styles.divider} />
            {renderConditionsSection()}
            <div style={styles.divider} />
            {renderFeaturedRecipes()}
            {/* CTA Banner */}
            <div style={{ margin: "0 24px 60px", padding: "40px 32px", background: `linear-gradient(135deg, rgba(255,222,0,0.12) 0%, rgba(255,222,0,0.04) 100%)`, border: `1px solid rgba(255,222,0,0.25)`, borderRadius: 20, textAlign: "center" }}>
              <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "clamp(20px, 4vw, 32px)", color: COLORS.white, marginBottom: 12 }}>
                ¿Listo para comer mejor?
              </h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: COLORS.muted, marginBottom: 24 }}>
                Crea tu perfil de salud en 2 minutos y recibe recetas adaptadas a ti.
              </p>
              <button style={styles.btnPrimary} onClick={() => navigate("tracker")}>
                Empezar ahora → 
              </button>
            </div>
          </>
        )}
        {activeSection === "recetas" && renderRecipesPage()}
        {activeSection === "tracker" && renderTrackerPage()}
        {activeSection === "planes" && renderPlanesPage()}
      </main>

      {renderFooter()}
      {renderModal()}

      {/* Toast */}
      {profileSaved && (
        <div style={styles.toast}>✓ Perfil guardado correctamente</div>
      )}
    </div>
  );
}