import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { loadConfig } from '@/lib/config';
import type { SiteConfig } from '@/types/config';
import { ArrowRight, Play, Heart, Users, BookOpen } from 'lucide-react';
import { DonateModal } from './DonateModal';
import heroImage from '@/assets/hero-education.jpg';

export function Hero() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    loadConfig().then(setConfig).catch(console.error);
  }, []);

  if (!config) return null;

  const currentVariant = config.hero.variants[config.hero.variant] || config.hero.variants.emotional;

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-subtle overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl floating-element"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl floating-element" style={{ animationDelay: '-3s' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-8 fade-in">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-primary font-medium">
                <Heart className="h-5 w-5 text-secondary" />
                <span className="text-sm uppercase tracking-wider">Making a Difference</span>
              </div>
              
              <h1 className="hero-heading">
                {currentVariant.headline}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                {currentVariant.sub}
              </p>

              {/* Impact Stats */}
              <div className="flex flex-wrap gap-6 py-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">15,482</div>
                  <div className="text-sm text-muted-foreground">Lives Changed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">47</div>
                  <div className="text-sm text-muted-foreground">Villages Reached</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-tertiary">125</div>
                  <div className="text-sm text-muted-foreground">Active Volunteers</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <DonateModal 
                trigger={
                  <Button 
                    variant="donate" 
                    size="lg"
                    className="group"
                  >
                    <Heart className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                    {currentVariant.ctaPrimary}
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                }
              />
              <Button 
                variant="outline" 
                size="lg"
                className="group"
              >
                <Users className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                {currentVariant.ctaSecondary}
              </Button>
              <Button 
                variant="minimal" 
                size="lg"
                className="group"
              >
                <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Story
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-tertiary rounded-full"></div>
                <span>Transparent Operations</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span>Community Led</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>Measurable Impact</span>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-2xl shadow-elegant">
                <img
                  src={heroImage}
                  alt={config.hero.alt}
                  className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -bottom-4 -left-4 bg-background/90 backdrop-blur-sm p-4 rounded-xl shadow-cool border border-border/50">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-success rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-tertiary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Education First</div>
                    <div className="text-sm text-muted-foreground">5,432 children learning</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-background/90 backdrop-blur-sm p-4 rounded-xl shadow-warm border border-border/50">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-warm rounded-lg flex items-center justify-center">
                    <Heart className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Health Care</div>
                    <div className="text-sm text-muted-foreground">8,200+ treated</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}