import React, { useEffect, useState } from "react";
import backendUrl from "../Config";
import axios from "axios";
import { Link } from "react-router-dom";

function Table() {
    const [reversedData, setData] = useState([]);
    const [assetsData, setAsset] = useState([]);
    const [lowTunnel, setLowTunnel] = useState([]);
    const [topTunnel, setTopTunnel] = useState([]);
    const [refreshTime, setRefreshTime] = useState([]);

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
      fetch(`${backendUrl}/manager/market/`, {})
          .then((response) => response.json())
          .then((data) => {
            if (Array.isArray(data)) {
              // Verify that data is an array
              setAsset(data.reverse()); // Populate the state variable with fetched data
            } else {
              console.error("Data is not an array:", data);
            }
          })
          .catch((error) => {
            console.error("Error fetching orders:", error);
          });
      }, []);

      const handleDelete = (id) => {
        console.log(id);
          // axios
          // .delete(`${backendUrl}/manager/delete/${id}/`)
          // .then((response) =>{
          //   if (response.status ===204) {
          //     const updatedData = reversedData.filter(
          //       (order) => order.id !== id
          //     );
          //     setData(updatedData)
          //   } else {
          //     console.error("Error deleting order:", response);
          //   }})
          // .catch((error) => {
          //   console.error('Error deleting order:', error)
          // })

      }

      const handleAdd = (id) => {
        console.log(id);
        
        const formData = new FormData();
        formData.append("asset", id);
        formData.append("low_tunnel", lowTunnel);
        formData.append("top_tunnel", topTunnel);
        formData.append("refresh_time", refreshTime);
        
        console.log(formData);
        try {
          const response = fetch(`${backendUrl}/manager/add/`, {
            method: "POST",
            body: formData,
          });
    
          if (response.status === 201) {
            alert("Ordem criada com sucesso");
          } else {
            alert("Erro ao criar ordem");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("Erro ao criar ordem");
        }
      }
      return(
        <div>
          <div  style={{maxHeight: '400px',overflowY:'scroll', width: '900px'}}>
              <table className="table" width='15px'>
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
                          <tr key={row.id}>
                              <td>{row.asset.code}</td>
                              <td>{row.asset.name}</td>
                              <td>{row.low_tunnel}</td>
                              <td>{row.top_tunnel}</td>
                              <td>{row.refresh_time}</td>
                              <td><button className='btn btn-primary btn-sm'>
                              <Link to={`/detail/${row.id}`} style={{color:'white'}}>
                                Editar
                              </Link>
                                </button></td>
                              
                              <td key={row.id}><button onClick={ () => handleDelete(row.id)} className='btn btn-secondary btn-sm'>Excluir</button></td>
                          </tr>
                        ))}
                          
                      </tbody>
                  </table>

          </div>
          <br/>
          <div  style={{maxHeight: '400px',overflowY:'scroll', width: '900px'}}>
              <table className="table" width='15px'>
                      <thead>
                          <tr>
                              <th>Símbolo</th>
                              <th>Nome</th>
                              <th>Low Tunnel</th>
                              <th>Top Tunnel</th>
                              <th>Monitoramento</th>
                              <th>Adicionar</th>
                          </tr>
                      </thead>
                      <tbody>
                        {assetsData.map( (row) => (
                          <tr key={row.id}>
                              <td >{row.code}</td>
                              <td >{row.name}</td>                             
                              <td ><input onChange={(e) => setLowTunnel(e.target.value)} type="number"></input></td>                             
                              <td ><input onChange={(e) => setTopTunnel(e.target.value)} type="number"></input></td>                             
                              <td ><input onChange={(e) => setRefreshTime(e.target.value)} type="number"></input></td>                             
                                                                                       
                              <td ><button onClick={ () => handleAdd(row.id)} className='btn btn-primary btn-sm'>Adicionar</button></td>
                          </tr>
                        ))}
                          
                      </tbody>
                  </table>

          </div>
        </div>
      )
};

export default Table;