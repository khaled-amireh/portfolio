export default function HeroAtmosphere() {
  return <div className="hero-atmosphere" aria-hidden="true">
    <div className="hero-grid" />
    <div className="hero-light" />
    <svg className="hero-field-lines" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
      <path d="M780 80h120l75 75v110m330 90h-95l-70 70v120m-510 120h120l70-70h100M1000 800v-80l90-90h170" />
      <circle cx="975" cy="265" r="3" /><circle cx="1140" cy="545" r="3" /><circle cx="920" cy="595" r="3" />
    </svg>
    <div className="hero-vignette" />
  </div>
}
