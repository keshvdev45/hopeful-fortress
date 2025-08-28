import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { loadConfig } from '@/lib/config';
import type { SiteConfig } from '@/types/config';
import { Menu, X, Heart, Users, BookOpen, Calendar } from 'lucide-react';

export function Header() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    loadConfig().then(setConfig).catch(console.error);
  }, []);

  if (!config) return null;

  const navigation = [
    { name: 'Programs', href: '#programs', icon: BookOpen },
    { name: 'Impact', href: '#impact', icon: Heart },
    { name: 'Events', href: '#events', icon: Calendar },
    { name: 'Team', href: '#team', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold text-foreground">
                {config.site.name}
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">
                {config.site.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors group"
                >
                  <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.name}</span>
                </a>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" size="sm">
              Volunteer
            </Button>
            <Button variant="donate" size="sm">
              Donate Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="space-y-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                );
              })}
              <div className="flex flex-col space-y-3 pt-4">
                <Button variant="outline" className="w-full">
                  Volunteer With Us
                </Button>
                <Button variant="donate" className="w-full">
                  Donate Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}