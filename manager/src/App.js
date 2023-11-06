import './App.css';
import React, { Component,useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Table from './homepage/table';
import AssetDetail from './homepage/asset_detail';

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/homepage' element={<Table/>}/>
          <Route path='/detail/*' element={<AssetDetail/>}/>
        </Routes>
      </BrowserRouter>
    );

};


export default App;