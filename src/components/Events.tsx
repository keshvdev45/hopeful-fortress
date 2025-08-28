import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { loadConfig } from '@/lib/config';
import type { SiteConfig } from '@/types/config';
import { Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react';

export function Events() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    loadConfig().then(setConfig).catch(console.error);
  }, []);

  if (!config) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventStatus = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { status: 'Past', color: 'text-muted-foreground' };
    if (diffDays === 0) return { status: 'Today', color: 'text-secondary' };
    if (diffDays <= 7) return { status: `${diffDays} days`, color: 'text-primary' };
    return { status: `${diffDays} days`, color: 'text-foreground' };
  };

  return (
    <section id="events" className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16 fade-in">
          <div className="flex items-center justify-center space-x-2 text-primary font-medium">
            <Calendar className="h-5 w-5 text-secondary" />
            <span className="text-sm uppercase tracking-wider">Upcoming Events</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-heading">
            Join Our
            <span className="text-primary block">Community Events</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Be part of the change. Participate in our community events and witness 
            the impact of collective action in transforming lives.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {config.events.map((event, index) => {
            const eventStatus = getEventStatus(event.date);
            
            return (
              <Card 
                key={event.id}
                className="group card-hover bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-primary rounded-full pulse-glow"></div>
                      <span className={`text-sm font-medium ${eventStatus.color}`}>
                        {eventStatus.status === 'Past' ? 'Completed' : `In ${eventStatus.status}`}
                      </span>
                    </div>
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                  
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {event.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-foreground font-medium">
                        {formatDate(event.date)}
                      </span>
                    </div>
                    
                    <div className="flex items-start space-x-3 text-sm">
                      <MapPin className="h-4 w-4 text-secondary mt-0.5" />
                      <span className="text-foreground">
                        {event.location}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 space-y-3">
                    {event.rsvp && eventStatus.status !== 'Past' && (
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="w-full group"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        RSVP Now
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    )}
                    
                    <Button 
                      variant="minimal" 
                      size="sm" 
                      className="w-full"
                    >
                      Learn More
                    </Button>
                  </div>

                  {/* Event Type Badge */}
                  <div className="pt-2">
                    <span className="inline-block bg-gradient-subtle px-3 py-1 rounded-full text-xs text-foreground border border-border/50">
                      {event.title.includes('Health') ? '🏥 Health' :
                       event.title.includes('Education') ? '📚 Education' :
                       event.title.includes('Training') ? '🎓 Training' : '🤝 Community'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6 fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-warm p-8 rounded-2xl shadow-warm">
            <div className="max-w-2xl mx-auto space-y-4">
              <h3 className="text-2xl font-bold text-secondary-foreground">
                Want to Organize an Event?
              </h3>
              <p className="text-secondary-foreground/90">
                Help us expand our reach by organizing events in your community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg" className="bg-secondary-foreground/10 border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary group">
                  <Calendar className="h-5 w-5 mr-2" />
                  Plan an Event
                </Button>
                <Button variant="minimal" size="lg" className="text-secondary-foreground border-secondary-foreground/30 hover:bg-secondary-foreground/10 group">
                  Contact Us
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