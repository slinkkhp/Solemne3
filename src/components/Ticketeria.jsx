import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Ticketeria(){
 const navigate = useNavigate();   
 const tickets = [
    {
    id: "TK001",
    zona: "Bodega",
    tipo: "Iluminación",
    prioridad: "Rojo",
    estado: "Abierto",
    descripcion: "Luminaria quemada"
    },
    {
      id: "TK002",
      zona: "Escalera Mecánica",
      tipo: "Mecánica",
      prioridad: "Rojo",
      estado: "Pendiente"
    },
    {
      id: "TK003",
      zona: "Bodega",
      tipo: "Electricidad",
      prioridad: "Amarillo",
      estado: "En Proceso"
    }
  ];
  
  return (
    <main className="ticketeria">

      <h1>Sistema de Tickets de Infraestructura</h1>

      <section className="dashboard">

        <div className="card">
          <h3>Tickets Abiertos</h3>
          <p>15</p>
        </div>

        <div className="card">
          <h3>Riesgo Alto</h3>
          <p>2</p>
        </div>

        <div className="card">
          <h3>Resueltos</h3>
          <p>48</p>
        </div>

      </section>
          <section>
      <div className="header-tickets">
        <h2>Listado de Tickets</h2>

        <div className="button-container">
          <button
            type="button"
            onClick={() => navigate("/CrearTicketPage")}
          >
            Tickets +
          </button>
        </div>
      </div>
    </section>
      <section className="tickets-container">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Zona</th>
              <th>Tipo Falla</th>
              <th>Prioridad</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>

            {tickets.map((ticket) => (

              <tr key={ticket.id}>
                <td>
                  {ticket.id === "TK001" ? (
                    <Link to="/TicketPage">
                      {ticket.id}
                    </Link>
                  ) : (
                    ticket.id
                  )}
                </td>
                <td>{ticket.zona}</td>
                <td>{ticket.tipo}</td>

                <td>
                  <span className={`prioridad ${ticket.prioridad.toLowerCase()}`}>
                    {ticket.prioridad}
                  </span>
                </td>

                <td>{ticket.estado}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </section>

    </main>
  );
}

export default Ticketeria