import { Routes, Route } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import LoginPage from '../Pages/LoginPage'
import TicketeriaPage from "../Pages/TicketeriaPage"
import ContactoPage from '../Pages/ContactoPage'
import CrearTicketPage from "../Pages/CrearTicketPage"
import TicketPage from "../Pages/TicketPage"
import AdminPage from "../Pages/AdminPage" // Importante importar esto

function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/TicketeriaPage" element={<TicketeriaPage />} />
      <Route path='/Contacto' element={<ContactoPage />}/>
      <Route path='/CrearTicketPage' element={<CrearTicketPage />}/>
      <Route path='/TicketPage' element={<TicketPage />}/>
      <Route path='/AdminPage' element={<AdminPage />}/> {/* Nueva ruta */}
    </Routes>
  )
}
export default Rutas;