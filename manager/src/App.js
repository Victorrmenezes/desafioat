import './App.css';
import React, { Component,useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AssetDetail from './homepage/asset_detail';
import HomePage from './homepage/homepage';
import NavBar from './components/navBar';

function App() {
    return (
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route exact path='/homepage' element={<HomePage/>}/>
          <Route path='/detail/*' element={<AssetDetail/>}/>
          <Route path='/market' element={<AssetDetail/>}/>
        </Routes>
      </BrowserRouter>
    );

};


export default App;