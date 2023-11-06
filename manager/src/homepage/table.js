import React, { useEffect, useState } from "react";
import backendUrl from "../Config";
import axios from "axios";

function Table() {
    const [reversedData, setData] = useState([]);

    useEffect(() => {
        fetch(`${backendUrl}/manager/manager/`, {})
          .then((response) => response.json())
          .then((data) => {
            if (Array.isArray(data)) {
              // Verify that data is an array
              setData(data.reverse()); // Populate the state variable with fetched data
            } else {
              console.error("Data is not an array:", data);
            }
          })
          .catch((error) => {
            console.error("Error fetching orders:", error);
          });
      }, []);

      const handleDelete = (id)=> {
        console.log(id);
          axios
          .delete(`${backendUrl}/manager/delete/${id}/`)
          .then((response) =>{
            if (response.status ===204) {
              const updatedData = reversedData.filter(
                (order) => order.id !== id
              );
              setData(updatedData)
            } else {
              console.error("Error deleting order:", response);
            }
          })

      }

      return(
        <div  style={{maxHeight: '400px',overflowY:'scroll', width: '700px'}}>
            <table className="table" width='15px'>
                    <thead>
                        <tr>
                            <th>Símbolo</th>
                            <th>Nome</th>
                            <th>Low Tunnel</th>
                            <th>Top Tunnel</th>
                            <th>Monitoramento (min)</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                      {reversedData.map( (row) => (
                        <tr >
                            <td key={row.id}>{row.asset.code}</td>
                            <td key={row.id}>{row.asset.name}</td>
                            <td key={row.id}>{row.low_tunnel}</td>
                            <td key={row.id}>{row.top_tunnel}</td>
                            <td key={row.id}>{row.refresh_time}</td>
                            <td key={row.id}><button onClick={ () => handleDelete(row.id)} className='btn btn-secondary btn-sm'>Excluir</button></td>
                        </tr>
                      ))}
                        
                    </tbody>
                </table>

        </div>
      )
};

export default Table;