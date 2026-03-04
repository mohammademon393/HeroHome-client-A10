import React from 'react';
import Hero from '../../components/homePageReleted/Hero';
import PopularServices from '../../components/homePageReleted/PopularServices';
import WhyChooseUs from '../../components/homePageReleted/WhyChooseUs';
import Testimonials from '../../components/homePageReleted/Testimonials';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <PopularServices></PopularServices>
            <WhyChooseUs></WhyChooseUs>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;