import React from 'react';
import Hero from '../../components/homePageReleted/Hero';
import PopularServices from '../../components/homePageReleted/PopularServices';
import WhyChooseUs from '../../components/homePageReleted/WhyChooseUs';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <PopularServices></PopularServices>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;