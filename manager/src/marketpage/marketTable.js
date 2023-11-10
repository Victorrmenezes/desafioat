import React, { Component } from 'react';
import axios, { HttpStatusCode } from 'axios'
import backendUrl from "../Config";
import { Link } from 'react-router-dom';

class MarketTable extends Component {
    state = { 
        marketAssets: []
     };

     handleAdd = async asset => {
         asset.user = 1;
         asset.asset = asset.id;
         console.log(asset);
         await axios.post(`${backendUrl}/manager/add/`,asset);
         
        const marketAssets =this.state.marketAssets.filter(a => a.id !== asset.id);
         
         this.setState({marketAssets})
     }

    async componentDidMount() {
        const {data: marketAssets} = await axios.get(`${backendUrl}/manager/market/`);
        this.setState({marketAssets})
    };

    render() { 
        return (
            <div>
                <table className='table'>
                <thead>
                          <tr>
                              <th>Símbolo</th>
                              <th>Nome</th>
                              <th>Industria</th>
                              <th>Low Tunnel</th>
                              <th>Top Tunnel</th>
                              <th>Monitoramento (min)</th>
                              <th>Add</th>
                          </tr>
                      </thead>
                      <tbody>
                {this.state.marketAssets.map( row =>(
                    <tr key = {row.id}>
                        <td>{row.code}</td>
                        <td>{row.name}</td>
                        <td>{row.industry}</td>
                        <td><input type='number' onChange={(e) => row.low_tunnel=parseInt(e.target.value)}></input></td>
                        <td><input type='number' onChange={(e) => row.top_tunnel=parseInt(e.target.value)}></input></td>
                        <td><input type='number' onChange={(e) => row.refresh_time=parseInt(e.target.value)}></input></td>
                        <td><button onClick={() => {this.handleAdd(row)}}>Adicionar</button></td>
                    </tr>

                ) )}
                      </tbody>
                </table>
            </div>
        );
    }
}

export default MarketTable;