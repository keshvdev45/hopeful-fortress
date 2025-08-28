# Fathers Vision - NGO Website

A secure, beautiful, and professional website for the Fathers Vision NGO, built with modern web technologies and enterprise-grade security practices.

## 🚀 Key Features

- **🎨 Beautiful Design System**: Comprehensive design tokens with HSL colors, gradients, and animations
- **🔒 Enterprise Security**: CSP headers, input sanitization, and security best practices  
- **📱 Fully Responsive**: Mobile-first design that works perfectly on all devices
- **⚡ High Performance**: Optimized images, lazy loading, and smooth animations
- **🌍 SEO Optimized**: Complete meta tags, structured data, and semantic HTML
- **♿ Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation
- **🎯 Centralized Config**: Single JSON file controls all content and settings

## 🏗️ Architecture

### Design System (`src/index.css` + `tailwind.config.ts`)
All visual elements use semantic tokens from a centralized design system:
- **Colors**: Primary (hope blue), Secondary (warm orange), Tertiary (growth green)  
- **Gradients**: Hero, warm, success, and subtle background gradients
- **Shadows**: Brand-colored shadows (cool, warm, elegant)
- **Typography**: Inter for headings, Roboto for body text
- **Animations**: Floating elements, fade-ins, hover effects

### Configuration System (`public/site-config.json`)
Everything is driven by a single configuration file:
- Site metadata and branding
- Hero content variants  
- Donation tiers and amounts
- Program descriptions
- Team member info
- Contact information

### Component Architecture
- **Header**: Navigation with mobile-responsive menu
- **Hero**: Dynamic content with floating animations and impact stats
- **Programs**: Interactive cards showing education, health, and livelihood programs
- **Impact**: Animated statistics and progress indicators  
- **DonateModal**: Secure donation interface (Stripe-ready)
- **Footer**: Complete contact info and newsletter signup

## 🔄 Content Management

### Update Site Content
1. Edit `public/site-config.json` to change any content
2. Deploy - changes appear immediately (no code changes needed)

### Configuration Examples
```json
{
  "hero": {
    "variant": "emotional",
    "variants": {
      "emotional": {
        "headline": "Every child deserves education. Every community deserves hope.",
        "sub": "Join local volunteers to provide education & health services...",
        "ctaPrimary": "Donate Now",
        "ctaSecondary": "Volunteer With Us"
      }
    }
  },
  "donation": {
    "tiers": [
      {
        "amount": 500,
        "label": "School supplies for 5 children", 
        "impact": "Provides notebooks, pencils, and learning materials",
        "recurring": false
      }
    ]
  }
}
```

## 🔒 Security Implementation

### Headers (Implemented in `index.html`)
```html
<!-- Content Security Policy -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://js.stripe.com; connect-src 'self' https://api.stripe.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; frame-src https://checkout.stripe.com; object-src 'none';" />

<!-- Security Headers -->  
<meta http-equiv="X-Content-Type-Options" content="nosniff" />
<meta http-equiv="X-Frame-Options" content="DENY" />
<meta name="referrer" content="no-referrer-when-downgrade" />
```

### Input Sanitization (`SafeHtml` component)
```typescript
import DOMPurify from 'dompurify';

export function SafeHtml({ html }: { html: string }) {
  const cleanHtml = DOMPurify.sanitize(html, { 
    ALLOWED_TAGS: ['p', 'a', 'strong', 'em', 'ul', 'li', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  });
  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
}
```

### Donation Security
- Stripe Checkout integration (PCI compliant)
- Server-side payment processing
- No sensitive data stored in client code

## 🚀 Deployment

### Quick Deploy
```bash
npm run build
# Deploy dist/ folder to your hosting provider
```

### Production Checklist
- [ ] Configure server-side Stripe webhook endpoints
- [ ] Set up Sentry error monitoring  
- [ ] Enable HTTPS and HSTS headers
- [ ] Configure CDN with security headers
- [ ] Set up backup and monitoring
- [ ] Test donation flow end-to-end

## 🛠️ Development

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Design System
- **UI Components**: Shadcn/ui (customized)
- **Icons**: Lucide React
- **Security**: DOMPurify + CSP + Input validation
- **Payments**: Stripe Checkout (ready to integrate)

### Development Commands
```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production  
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

### Project Structure
```
src/
├── assets/          # Generated images (hero, programs)
├── components/      # Reusable UI components
│   ├── ui/         # Shadcn base components  
│   ├── Header.tsx  # Navigation component
│   ├── Hero.tsx    # Hero section with animations
│   ├── Programs.tsx # Program showcase
│   ├── Impact.tsx   # Impact statistics
│   ├── DonateModal.tsx # Secure donation interface
│   └── Footer.tsx   # Footer with links
├── lib/            # Utilities and config loader
├── pages/          # Page components  
├── types/          # TypeScript definitions
└── index.css       # Design system tokens
```

## 🎨 Customization

### Colors & Branding
Edit CSS custom properties in `src/index.css`:
```css
:root {
  --primary: 214 95% 52%;     /* Hope blue */
  --secondary: 25 95% 53%;    /* Warm orange */ 
  --tertiary: 142 76% 47%;    /* Growth green */
}
```

### Button Variants
Custom button styles using the design system:
```typescript
<Button variant="hero">Hero CTA</Button>
<Button variant="donate">Donate Now</Button> 
<Button variant="success">Success Action</Button>
```

## 📊 Impact Metrics

The website showcases real impact:
- **15,482** lives changed across **47 villages**
- **5,432** children educated
- **8,200+** people received health services  
- **1,850** people trained in livelihood skills
- **125** active volunteers

## 🤝 Contributing

This codebase follows security best practices:
- All user input is sanitized
- CSP prevents XSS attacks
- No sensitive keys in client code
- Responsive and accessible design
- Type-safe TypeScript throughout

---

**Built with ❤️ for rural communities • Secure • Transparent • Impactful**