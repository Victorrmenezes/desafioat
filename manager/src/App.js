import './App.css';
import React, { Component,useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Table from './homepage/table';

function App() {
    return (
      <BrowserRouter>
        <h1>Lista de ativos</h1>
        <Routes>
          <Route exact path='/' element={<Table/>}/>
        </Routes>
      </BrowserRouter>
    );

};


export default App;