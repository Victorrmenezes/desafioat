import React, { Component } from 'react';
import axios, { HttpStatusCode } from 'axios'
import backendUrl from "../Config";
import { Link } from 'react-router-dom';

class MyTable extends Component {
    state = { 
        myAssets: []
     };

    async componentDidMount() {
        const {data: myAssets} = await axios.get(`${backendUrl}/manager/manager/`);
        this.setState({myAssets})
        console.log({myAssets})
    };

     handleDelete = async myAsset => {
        await axios.delete(`${backendUrl}/manager/delete/${myAsset.id}`);
        console.log(myAsset)
        const myAssets =this.state.myAssets.filter(a => a.id !== myAsset.id);

        this.setState({myAssets})

    }

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
                              <th>Detalhes</th>
                              <th>Excluir</th>
                          </tr>
                      </thead>
                      <tbody>
                {this.state.myAssets.map( row =>(
                    <tr key = {row.id}>
                        <td>{row.asset.code}</td>
                        <td>{row.asset.name}</td>
                        <td>{row.low_tunnel}</td>
                        <td>{row.top_tunnel}</td>
                        <td>{row.refresh_time}</td>
                        <td><Link to={`/detail/${row.id}`}><button>Detalhes</button></Link></td>
                        <td><button onClick={() => this.handleDelete(row)}>Excluir</button></td>
                    </tr>

                ) )}
                      </tbody>
                </table>
            </div>
        );
    }
}

export default MyTable;