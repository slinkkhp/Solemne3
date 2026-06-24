import { useState } from "react";

function AdminDashboard() {
  const [tipoConsulta, setTipoConsulta] = useState("Diarios");
  // Estado para controlar qué ticket se está resolviendo (si es null, la ventana está cerrada)
  const [ticketSeleccionado, setTicketSeleccionado] = useState(null);
  // Estado para capturar el texto del mensaje al técnico
  const [mensajeTecnico, setMensajeTecnico] = useState("");
  
  // Lista maestra de todos los tickets con un campo "periodo" para poder filtrarlos
  const todosLosTickets = [
    // Tickets Diarios
    { id: "TK001", zona: "Bodega", falla: "Iluminación principal", prioridad: "Rojo", periodo: "Diarios" },
    { id: "TK002", zona: "Cajas", falla: "Corte de energía terminal 3", prioridad: "Rojo", periodo: "Diarios" },
    { id: "TK003", zona: "Pasillos", falla: "Baldosa suelta", prioridad: "Verde", periodo: "Diarios" },
    
    // Tickets Semanales
    { id: "TK004", zona: "Acceso", falla: "Puerta automática trabada", prioridad: "Amarillo", periodo: "Semanales" },
    { id: "TK005", zona: "Estacionamiento", falla: "Barrera de salida no eleva", prioridad: "Amarillo", periodo: "Semanales" },
    
    // Tickets Mensuales
    { id: "TK006", zona: "Sala Ventas", falla: "Climatización sector lácteos", prioridad: "Verde", periodo: "Mensuales" },
    { id: "TK007", zona: "Servicios", falla: "Mantención de ascensor", prioridad: "Rojo", periodo: "Mensuales" },
    
    // Tickets Anuales
    { id: "TK008", zona: "Fachada", falla: "Pintura exterior y letreros", prioridad: "Verde", periodo: "Anuales" },
  ];

  // 1. FILTRADO DINÁMICO: Filtra los tickets según el periodo seleccionado en los botones
  const ticketsFiltrados = todosLosTickets.filter(
    (ticket) => ticket.periodo === tipoConsulta
  );

  // Función al hacer click en "Resolver"
  const handleAbrirModal = (ticket) => {
    setTicketSeleccionado(ticket);
    setMensajeTecnico(""); // Limpia el mensaje anterior
  };

  // Función al enviar el mensaje al técnico
  const handleEnviarMensaje = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    
    if (!mensajeTecnico.trim()) {
      alert("Por favor, escribe un mensaje antes de enviar.");
      return;
    }

    // Alerta solicitada
    alert("¡Mensaje enviado!");

    // Cerramos la ventana limpiando el ticket seleccionado
    setTicketSeleccionado(null);
    setMensajeTecnico("");
  };

  return (
    <main className="admin-dashboard">
      <h1>Panel de Administración</h1>
      
      {/* Sección de Filtros */}
      <section className="consultas-container">
        <h2>Reportes de Infraestructura</h2>
        <div className="btn-group">
          {["Diarios", "Semanales", "Mensuales", "Anuales"].map((tipo) => (
            <button 
              key={tipo} 
              onClick={() => setTipoConsulta(tipo)}
              className={tipoConsulta === tipo ? "active" : ""}
            >
              {tipo}
            </button>
          ))}
        </div>
      </section>

      {/* Sección de Tickets Filtrados */}
      <section className="tickets-gestion">
        <h2>Tickets Pendientes ({tipoConsulta})</h2>
        
        {ticketsFiltrados.length === 0 ? (
          <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>
            No hay tickets pendientes para este período.
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Zona</th>
                <th>Falla</th>
                <th>Prioridad</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {ticketsFiltrados.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.zona}</td>
                  <td>{t.falla}</td>
                  <td>
                    <span className={`badge ${t.prioridad.toLowerCase()}`}>
                      {t.prioridad}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn-resolver"
                      onClick={() => handleAbrirModal(t)}
                    >
                      Resolver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* 2. VENTANA MODAL (Solo se muestra si hay un ticket seleccionado) */}
      {ticketSeleccionado && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Resolver Ticket: {ticketSeleccionado.id}</h3>
            <p><strong>Ubicación:</strong> {ticketSeleccionado.zona} | <strong>Problema:</strong> {ticketSeleccionado.falla}</p>
            
            <form onSubmit={handleEnviarMensaje}>
              <label htmlFor="mensaje-input">Mensaje para el Técnico:</label>
              <textarea
                id="mensaje-input"
                rows="4"
                placeholder="Escribe las instrucciones detalladas del requerimiento aquí..."
                value={mensajeTecnico}
                onChange={(e) => setMensajeTecnico(e.target.value)}
                required
              />
              
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-cancelar" 
                  onClick={() => setTicketSeleccionado(null)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-enviar">
                  Enviar Mensaje
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default AdminDashboard;