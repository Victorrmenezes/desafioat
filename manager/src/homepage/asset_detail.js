import React, { Component,useEffect, useState } from "react";
import backendUrl from "../Config";
import axios from "axios";
import { Link } from "react-router-dom";
import MyTable from "./my_table";

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

  async componentDidMount(id) {
      const {data: details} = await axios.get(`${backendUrl}/manager/detail/${60}`);
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