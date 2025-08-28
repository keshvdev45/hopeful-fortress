import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { loadConfig } from '@/lib/config';
import type { SiteConfig, DonationTier } from '@/types/config';
import { Heart, Users, BookOpen, Stethoscope, X, Check, IndianRupee } from 'lucide-react';

interface DonateModalProps {
  trigger?: React.ReactNode;
}

export function DonateModal({ trigger }: DonateModalProps) {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [selectedTier, setSelectedTier] = useState<DonationTier | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadConfig().then(setConfig).catch(console.error);
  }, []);

  const handleDonate = async (tier: DonationTier) => {
    if (!config) return;
    
    setIsProcessing(true);
    setSelectedTier(tier);

    try {
      // This would typically call your backend endpoint
      const response = await fetch(config.donation.stripeCheckout.serverEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: tier.amount,
          currency: config.donation.currency,
          recurring: tier.recurring,
          description: tier.label,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId, url } = await response.json();
      
      // For now, we'll simulate the redirect
      // In production, you'd redirect to Stripe Checkout:
      // window.location.href = url;
      
      // Simulation for demo
      setTimeout(() => {
        alert(`Redirecting to secure payment for: ${tier.label} - ₹${tier.amount}`);
        setIsProcessing(false);
        setIsOpen(false);
      }, 2000);

    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment processing failed. Please try again.');
      setIsProcessing(false);
    }
  };

  if (!config) return null;

  const getIcon = (tier: DonationTier) => {
    if (tier.label.toLowerCase().includes('school') || tier.label.toLowerCase().includes('education')) {
      return BookOpen;
    }
    if (tier.label.toLowerCase().includes('health') || tier.label.toLowerCase().includes('meal')) {
      return Stethoscope;
    }
    return Users;
  };

  const defaultTrigger = (
    <Button variant="donate" size="lg" className="group">
      <Heart className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
      Donate Now
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 text-primary">
              <Heart className="h-6 w-6 text-secondary" />
              <span>Support Our Mission</span>
            </div>
            <p className="text-base font-normal text-muted-foreground">
              Your contribution directly impacts lives in rural communities
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Impact Summary */}
          <div className="bg-gradient-subtle p-6 rounded-xl">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">₹500</div>
                <div className="text-sm text-muted-foreground">Educates 5 children</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">₹2,000</div>
                <div className="text-sm text-muted-foreground">Feeds a classroom</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-tertiary">₹10,000</div>
                <div className="text-sm text-muted-foreground">Sponsors a year</div>
              </div>
            </div>
          </div>

          {/* Donation Tiers */}
          <div className="grid md:grid-cols-2 gap-4">
            {config.donation.tiers.map((tier, index) => {
              const Icon = getIcon(tier);
              const isSelected = selectedTier?.amount === tier.amount;
              
              return (
                <Card 
                  key={tier.amount}
                  className={`relative cursor-pointer transition-all duration-200 hover:shadow-cool ${
                    isSelected ? 'ring-2 ring-primary shadow-cool' : ''
                  }`}
                  onClick={() => setSelectedTier(tier)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          tier.recurring ? 'bg-gradient-success' : 'bg-gradient-warm'
                        }`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <IndianRupee className="h-4 w-4 text-primary" />
                            <span className="text-xl font-bold text-primary">
                              {tier.amount.toLocaleString()}
                            </span>
                            {tier.recurring && (
                              <span className="text-xs bg-tertiary/10 text-tertiary px-2 py-1 rounded-full">
                                Monthly
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <h4 className="font-semibold text-foreground">
                      {tier.label}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {tier.impact}
                    </p>
                    
                    <Button 
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      className="w-full"
                      disabled={isProcessing}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDonate(tier);
                      }}
                    >
                      {isProcessing && selectedTier?.amount === tier.amount ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>Donate ₹{tier.amount.toLocaleString()}</>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Security & Trust */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-tertiary rounded-full"></div>
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span>Tax Deductible</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>100% Transparent</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}