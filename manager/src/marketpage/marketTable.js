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
                              <th>Low Tunnel</th>
                              <th>Top Tunnel</th>
                              <th>Monitoramento (min)</th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                {this.state.marketAssets.map( row =>(
                    <tr key = {row.id}>
                        <td>{row.code}</td>
                        <td>{row.name}</td>
                        <td><input type='number' onChange={(e) => row.low_tunnel=parseFloat(e.target.value)}></input></td>
                        <td><input type='number' onChange={(e) => row.top_tunnel=parseFloat(e.target.value)}></input></td>
                        <td><select onChange={(e) => row.refresh_time=parseInt(e.target.value)}>
                            <option value={1} >1</option>
                            <option value={2} >2</option>
                            <option value={5} >5</option>
                            <option value={10} >10</option>
                            <option value={15} >15</option>
                            <option value={30} >30</option>
                            <option value={60} >60</option>
                            </select></td>
                        {/* <td><input type='number' onChange={(e) => row.refresh_time=parseInt(e.target.value)}></input></td> */}
                        <td><button className='btn btn-primary' onClick={() => {this.handleAdd(row)}}>Adicionar</button></td>
                    </tr>

                ) )}
                      </tbody>
                </table>
            </div>
        );
    }
}

export default MarketTable;