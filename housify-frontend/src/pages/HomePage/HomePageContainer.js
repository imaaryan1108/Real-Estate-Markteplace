import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../../common/components/Navbar/Navbar';
import Apartments from './components/Apartments';
import HomePage from './components/HomePage';

function HomePageContainer() {
  return (
    <>
      <Helmet>
        <title>Housify</title>
      </Helmet>
      <Navbar />
      <HomePage />
      <Apartments />
    </>
  );
}

export default HomePageContainer;
