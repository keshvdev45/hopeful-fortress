import DOMPurify from 'dompurify';

interface SafeHtmlProps {
  html: string;
  className?: string;
  allowedTags?: string[];
}

export function SafeHtml({ 
  html, 
  className = '',
  allowedTags = ['p', 'a', 'strong', 'em', 'ul', 'li', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
}: SafeHtmlProps) {
  const cleanHtml = DOMPurify.sanitize(html, { 
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: ['href', 'target', 'rel']
  });
  
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHtml }} 
    />
  );
}