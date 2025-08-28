import type { SiteConfig } from '../types/config';

let configCache: SiteConfig | null = null;

export async function loadConfig(): Promise<SiteConfig> {
  if (configCache) {
    return configCache;
  }

  try {
    const response = await fetch('/site-config.json', {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to load site config: ${response.status}`);
    }
    
    const config = (await response.json()) as SiteConfig;
    configCache = config;
    return config;
  } catch (error) {
    console.error('Error loading site config:', error);
    throw new Error('Failed to load site configuration');
  }
}

export function clearConfigCache(): void {
  configCache = null;
}