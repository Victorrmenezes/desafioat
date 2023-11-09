import React, { Component,useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyTable from './my_table';

function HomePage() {
    return (
        <div>
            OLÁ
        <MyTable/>
        </div>
    );

};


export default HomePage;