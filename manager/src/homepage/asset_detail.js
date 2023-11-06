import React, { useEffect, useState } from "react";
import backendUrl from "../Config";
import axios from "axios";
import { Link } from "react-router-dom";

function AssetDetail() {
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

      return(
        <div  style={{maxHeight: '400px', width: '700px'}}>
            <Link to={`/homepage`}>Voltar</Link>
            {/* <table className="table" width='15px'>
                    <thead>
                        <tr>
                            <th>Símbolo</th>
                            <th>Nome</th>
                            <th>Low Tunnel</th>
                            <th>Top Tunnel</th>
                            <th>Monitoramento (min)</th>
                            <th>Detalhes</th>
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
                            <td key={row.id}><button className='btn btn-primary btn-sm'>
                            <Link to={`/detail/${row.id}`} style={{color:'white'}}>
                              Editar
                            </Link>
                              </button></td>
                            
                            <td key={row.id}><button onClick={ () => handleDelete(row.id)} className='btn btn-secondary btn-sm'>Excluir</button></td>
                        </tr>
                      ))}
                        
                    </tbody>
                </table> */}

        </div>
      )
};

export default AssetDetail;