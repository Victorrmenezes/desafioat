import './App.css';
import React, { Component,useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AssetDetail from './homepage/asset_detail';
import HomePage from './homepage/homepage';
import NavBar from './components/navBar';
import MarketTable from './marketpage/marketTable';

function App() {
    return (
      <BrowserRouter>
      <NavBar/>
      <div style={{padding:'20px', width:'1000px'}}>
        <Routes>
          <Route exact path='/homepage' element={<HomePage/>}/>
          <Route path='/detail/:userAssetId' element={<AssetDetail/>}/>
          <Route path='/market' element={<MarketTable/>}/>
        </Routes>
      </div>
      </BrowserRouter>
    );

};


export default App;