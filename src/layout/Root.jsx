import React from 'react';
import Navbar from '../components/shered/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/shered/Footer';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;