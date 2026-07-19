import { useState } from "react";
import ColorCollections from "./components/ColorCollections.jsx";
import Hero from "./components/Hero.jsx";
import RealResultsSection from "./components/RealResultsSection.jsx";
import MainLayout from "../../../layouts/MainLayout.jsx";
import ScrollFeaturesSection from "./components/ScrollFeaturesSection.jsx";

export default function Landing() {
  const [activeColor, setActiveColor] = useState(0);

  return (
    <MainLayout>
       <Hero /> 
      <ScrollFeaturesSection activeColor={activeColor} />
      <RealResultsSection activeColor={activeColor} setActiveColor={setActiveColor} />
      <ColorCollections />
    </MainLayout>
  );
}
