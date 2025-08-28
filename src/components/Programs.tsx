import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { loadConfig } from '@/lib/config';
import type { SiteConfig } from '@/types/config';
import { ArrowRight, Users, MapPin, TrendingUp } from 'lucide-react';
import healthImage from '@/assets/program-health.jpg';
import livelihoodImage from '@/assets/program-livelihood.jpg';
import heroImage from '@/assets/hero-education.jpg';

const imageMap = {
  '/src/assets/hero-education.jpg': heroImage,
  '/src/assets/program-health.jpg': healthImage,
  '/src/assets/program-livelihood.jpg': livelihoodImage,
};

export function Programs() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    loadConfig().then(setConfig).catch(console.error);
  }, []);

  if (!config) return null;

  return (
    <section id="programs" className="py-20 section-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16 fade-in">
          <div className="flex items-center justify-center space-x-2 text-primary font-medium">
            <TrendingUp className="h-5 w-5 text-secondary" />
            <span className="text-sm uppercase tracking-wider">Our Impact Programs</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-heading">
            Transforming Communities
            <span className="text-primary block">Through Action</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our comprehensive programs address the core needs of rural communities, 
            creating sustainable change through education, health, and livelihood initiatives.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {config.programs.map((program, index) => (
            <Card 
              key={program.id} 
              className="group card-hover bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={imageMap[program.image as keyof typeof imageMap]}
                  alt={program.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
                
                {/* Stats Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-lg font-bold text-primary">
                          {program.stats.beneficiaries.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {program.stats.metric}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {program.stats.locations}
                        </div>
                        <div className="text-xs text-muted-foreground">locations</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {program.summary}
                  </p>
                  <p className="text-foreground/80 text-sm leading-relaxed">
                    {program.description}
                  </p>
                </div>

                <Button 
                  variant="minimal" 
                  className="group w-full justify-between"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6 fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-hero p-8 rounded-2xl shadow-cool">
            <div className="max-w-2xl mx-auto space-y-4">
              <h3 className="text-2xl font-bold text-primary-foreground">
                Ready to Make a Difference?
              </h3>
              <p className="text-primary-foreground/90">
                Join our mission to transform lives through sustainable community programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="group">
                  <Users className="h-5 w-5 mr-2" />
                  Volunteer Today
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary group"
                >
                  Support Our Work
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}