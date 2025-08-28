import React from 'react';
import { Hero } from '../components/Hero';
import { Programs } from '../components/Programs';
import { Impact } from '../components/Impact';
import { Events } from '../components/Events';
import { DonateModal } from '../components/DonateModal';

const Index = () => {
  return (
    <>
      <Hero />
      <Programs />
      <Impact />
      <Events />
    </>
  );
};

export default Index;
