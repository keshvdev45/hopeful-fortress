import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { loadConfig } from '@/lib/config';
import type { SiteConfig } from '@/types/config';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, ArrowRight } from 'lucide-react';

export function Footer() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    loadConfig().then(setConfig).catch(console.error);
  }, []);

  if (!config) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mb-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
          <p className="text-background/80 mb-6 max-w-2xl mx-auto">
            Get updates on our programs, impact stories, and opportunities to make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-foreground bg-background/90 border border-background/20 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Button variant="secondary" className="px-6">
              Subscribe
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-background" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{config.site.name}</h3>
                <p className="text-sm text-background/70">{config.site.tagline}</p>
              </div>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              Empowering rural communities through sustainable programs in education, 
              health, and livelihood development.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-3 pt-2">
              <a 
                href={config.contact.socialMedia.facebook}
                className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href={config.contact.socialMedia.twitter}
                className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href={config.contact.socialMedia.instagram}
                className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-background">Quick Links</h4>
            <nav className="space-y-3">
              {['Programs', 'Impact', 'Events', 'Team', 'About Us'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  className="block text-background/70 hover:text-background transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h4 className="font-semibold text-background">Our Programs</h4>
            <nav className="space-y-3">
              {config.programs.map((program) => (
                <a
                  key={program.id}
                  href={`#programs`}
                  className="block text-background/70 hover:text-background transition-colors text-sm"
                >
                  {program.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-background">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-0.5 text-background/70" />
                <span className="text-background/80">{config.contact.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-background/70" />
                <a 
                  href={`tel:${config.contact.phone}`}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  {config.contact.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-background/70" />
                <a 
                  href={`mailto:${config.contact.email}`}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  {config.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/60 text-sm">
              © {currentYear} {config.site.name}. All rights reserved.
            </p>
            
            <div className="flex space-x-6 text-sm">
              <a href="#privacy" className="text-background/60 hover:text-background transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-background/60 hover:text-background transition-colors">
                Terms of Service
              </a>
              <a href="#transparency" className="text-background/60 hover:text-background transition-colors">
                Transparency Report
              </a>
            </div>
          </div>
          
          <div className="text-center pt-4">
            <p className="text-background/50 text-xs">
              Made with ❤️ for rural communities • Built with modern security standards
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}