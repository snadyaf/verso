import { Routes, Route } from "react-router";

import Explorar from "../Pages/Explorar";

export default function AppRoutes(){
  return(
    <Routes>
      <Route path="/" element={<Explorar />} />
    </Routes>
  )
}