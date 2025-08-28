import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { loadConfig } from '@/lib/config';
import type { SiteConfig } from '@/types/config';
import { TrendingUp, Users, MapPin, Heart, Award, Target } from 'lucide-react';

export function Impact() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    loadConfig().then(setConfig).catch(console.error);
  }, []);

  if (!config) return null;

  const impactIcons = [Users, Heart, Award, Target];

  return (
    <section id="impact" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16 fade-in">
          <div className="flex items-center justify-center space-x-2 text-primary font-medium">
            <TrendingUp className="h-5 w-5 text-secondary" />
            <span className="text-sm uppercase tracking-wider">Our Impact</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-heading">
            Measuring What
            <span className="text-primary block">Matters Most</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Every number tells a story of transformation. See how your support 
            creates lasting change in rural communities across India.
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {config.impact.stats.map((stat, index) => {
            const Icon = impactIcons[index % impactIcons.length];
            return (
              <Card 
                key={stat.label}
                className="text-center p-6 card-hover bg-card/80 backdrop-blur-sm border-border/50 fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0 space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-hero rounded-full flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                      {stat.value.toLocaleString()}{stat.unit}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Detailed Impact Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-primary/5 to-primary-glow/5 border-primary/20 card-hover fade-in">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Community Reach</h3>
                  <p className="text-sm text-primary">47 Villages Transformed</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Our programs have reached remote villages across 8 states in India, 
                bringing essential services to underserved communities.
              </p>
              <div className="pt-2">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>Progress</span>
                  <span>94%</span>
                </div>
                <div className="w-full bg-primary/10 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-[94%] transition-all duration-1000"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20 card-hover fade-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Health Impact</h3>
                  <p className="text-sm text-secondary">8,200+ Lives Touched</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Mobile health camps and regular screenings have provided 
                essential healthcare services to thousands of families.
              </p>
              <div className="pt-2">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>Health Coverage</span>
                  <span>87%</span>
                </div>
                <div className="w-full bg-secondary/10 rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full w-[87%] transition-all duration-1000"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-tertiary/5 to-tertiary/10 border-tertiary/20 card-hover fade-in" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-tertiary/10 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-tertiary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Education Success</h3>
                  <p className="text-sm text-tertiary">98% Retention Rate</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Children in our education programs show remarkable improvement 
                in learning outcomes and school attendance.
              </p>
              <div className="pt-2">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>Success Rate</span>
                  <span>98%</span>
                </div>
                <div className="w-full bg-tertiary/10 rounded-full h-2">
                  <div className="bg-tertiary h-2 rounded-full w-[98%] transition-all duration-1000"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}