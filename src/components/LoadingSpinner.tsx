import React from 'react';
import { Heart } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto floating-element">
            <Heart className="h-8 w-8 text-primary-foreground pulse-glow" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Loading Fathers Vision</h2>
          <p className="text-muted-foreground">Preparing to change lives...</p>
        </div>
        <div className="w-64 h-1 bg-muted rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-hero rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}