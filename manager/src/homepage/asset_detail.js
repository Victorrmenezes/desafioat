import React, { Component,useEffect, useState } from "react";
import backendUrl from "../Config";
import axios from "axios";
import { useParams } from "react-router-dom";


class AssetDetail extends Component {
  state = { 
      details: []
   };

  //  handleAdd = async asset => {
  //      asset.user = 1;
  //      asset.asset = asset.id;
  //      console.log(asset);
  //      await axios.post(`${backendUrl}/manager/add/`,asset);
       
  //     const marketAssets =this.state.marketAssets.filter(a => a.id !== asset.id);
       
  //      this.setState({marketAssets})
  //  }
  
  async componentDidMount() {

    // const id = this.props.match.params.id;
    const id=70;
    const {data: details} = await axios.get(`${backendUrl}/manager/detail/${id}`);
    this.setState({details})
    console.log(details)
  };

  render() { 
      return (
          <div>
              {this.state.details.map( row =>(
                  <div>
                    {row.asset.code}
                  </div>
              ) )}
          </div>
      );
  }
}

export default AssetDetail;