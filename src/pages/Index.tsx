import React, { useState, useEffect, Suspense } from 'react';
import { Hero } from '../components/Hero';
import { Programs } from '../components/Programs';
import { Impact } from '../components/Impact';
import { Events } from '../components/Events';
import { DonateModal } from '../components/DonateModal';
import { LoadingSpinner } from '../components/LoadingSpinner';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time to ensure smooth experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Hero />
      <Programs />
      <Impact />
      <Events />
    </Suspense>
  );
};

export default Index;
