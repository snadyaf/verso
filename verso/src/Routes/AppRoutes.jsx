// AppRoutes.jsx
import { Routes, Route } from "react-router";
import Biblioteca from "../Pages/Biblioteca";
import Explorar from "../Pages/Explorar";
import Hero from "../Components/Hero/Hero";
import CTA from "../Components/CTA/CTA";

export default function AppRoutes(){
  return(
    <Routes>
      <Route path="/" element={<><Hero /><CTA /></>} />
      <Route path="/explorar" element={<Explorar />} />
      <Route path="/biblioteca" element={<Biblioteca />} />
    </Routes>
  )
}