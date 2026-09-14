import { getPrismaClient } from '../prisma';
import { SiteConfigData } from './types';
import { DEFAULT_SITE_CONFIG } from './defaults';

// In-memory runtime cache / fallback when database is not yet connected
let inMemoryConfig: SiteConfigData = JSON.parse(JSON.stringify(DEFAULT_SITE_CONFIG));

function mergeConfigs(saved: Partial<SiteConfigData> | null | undefined): SiteConfigData {
  if (!saved) return JSON.parse(JSON.stringify(DEFAULT_SITE_CONFIG));

  const savedColorsAny = (saved.colors || {}) as any;
  const themeMode: 'dark' | 'light' =
    saved.themeMode || savedColorsAny.mode || DEFAULT_SITE_CONFIG.themeMode;

  return {
    themeMode,
    brand: {
      ...DEFAULT_SITE_CONFIG.brand,
      ...(saved.brand || {}),
    },
    colors: {
      light: {
        ...DEFAULT_SITE_CONFIG.colors.light,
        ...(saved.colors?.light || {}),
      },
      dark: {
        ...DEFAULT_SITE_CONFIG.colors.dark,
        ...(saved.colors?.dark || {}),
      },
    },
    typography: {
      ...DEFAULT_SITE_CONFIG.typography,
      ...(saved.typography || {}),
    },
    layout: {
      borderRadius: {
        ...DEFAULT_SITE_CONFIG.layout.borderRadius,
        ...(saved.layout?.borderRadius || {}),
      },
      shadows: {
        ...DEFAULT_SITE_CONFIG.layout.shadows,
        ...(saved.layout?.shadows || {}),
      },
      spacingScale: saved.layout?.spacingScale ?? DEFAULT_SITE_CONFIG.layout.spacingScale,
      heroBackground: saved.heroBackground || saved.layout?.heroBackground || DEFAULT_SITE_CONFIG.layout.heroBackground,
      navbarStyle: saved.navbarStyle || saved.layout?.navbarStyle || DEFAULT_SITE_CONFIG.layout.navbarStyle,
    },
    heroBackground: saved.heroBackground || saved.layout?.heroBackground || DEFAULT_SITE_CONFIG.layout.heroBackground,
    navbarStyle: saved.navbarStyle || saved.layout?.navbarStyle || DEFAULT_SITE_CONFIG.layout.navbarStyle,
    projects: (saved as any)?.projects && Array.isArray((saved as any).projects) && (saved as any).projects.length > 0
      ? (saved as any).projects
      : DEFAULT_SITE_CONFIG.projects,
    clientStories: (saved as any)?.clientStories && Array.isArray((saved as any).clientStories) && (saved as any).clientStories.length > 0
      ? (saved as any).clientStories
      : DEFAULT_SITE_CONFIG.clientStories,
    updatedAt: saved.updatedAt || new Date().toISOString(),
  };
}

export async function getSiteConfig(): Promise<SiteConfigData> {
  const prisma = getPrismaClient();

  if (!prisma) {
    return inMemoryConfig;
  }

  try {
    const record = await prisma.siteConfig.findUnique({
      where: { id: 'default' },
    });

    if (!record) {
      // Initialize the database with default config
      try {
        await prisma.siteConfig.create({
          data: {
            id: 'default',
            brand: DEFAULT_SITE_CONFIG.brand as any,
            colors: DEFAULT_SITE_CONFIG.colors as any,
            typography: DEFAULT_SITE_CONFIG.typography as any,
            layout: DEFAULT_SITE_CONFIG.layout as any,
          },
        });
      } catch (createErr) {
        console.warn('Could not seed default siteConfig row:', createErr);
      }
      return inMemoryConfig;
    }

    const merged = mergeConfigs({
      brand: record.brand as any,
      colors: record.colors as any,
      typography: record.typography as any,
      layout: record.layout as any,
      projects: (record as any).projects as any,
      clientStories: (record as any).clientStories as any,
      updatedAt: record.updatedAt.toISOString(),
    });

    inMemoryConfig = merged;
    return merged;
  } catch (error) {
    console.warn('Prisma query failed, falling back to in-memory config:', error);
    return inMemoryConfig;
  }
}

export async function updateSiteConfig(partial: Partial<SiteConfigData>): Promise<SiteConfigData> {
  const current = await getSiteConfig();
  const updated: SiteConfigData = {
    themeMode: partial.themeMode || current.themeMode || DEFAULT_SITE_CONFIG.themeMode,
    brand: {
      ...current.brand,
      ...(partial.brand || {}),
    },
    colors: {
      light: {
        ...current.colors.light,
        ...(partial.colors?.light || {}),
      },
      dark: {
        ...current.colors.dark,
        ...(partial.colors?.dark || {}),
      },
    },
    typography: {
      ...current.typography,
      ...(partial.typography || {}),
    },
    layout: {
      borderRadius: {
        ...current.layout.borderRadius,
        ...(partial.layout?.borderRadius || {}),
      },
      shadows: {
        ...current.layout.shadows,
        ...(partial.layout?.shadows || {}),
      },
      spacingScale: partial.layout?.spacingScale ?? current.layout.spacingScale,
      heroBackground: partial.heroBackground || partial.layout?.heroBackground || current.layout.heroBackground,
      navbarStyle: partial.navbarStyle || partial.layout?.navbarStyle || current.layout.navbarStyle,
    },
    heroBackground: partial.heroBackground || partial.layout?.heroBackground || current.layout.heroBackground,
    navbarStyle: partial.navbarStyle || partial.layout?.navbarStyle || current.layout.navbarStyle,
    projects: partial.projects !== undefined ? partial.projects : current.projects || DEFAULT_SITE_CONFIG.projects,
    clientStories: partial.clientStories !== undefined ? partial.clientStories : current.clientStories || DEFAULT_SITE_CONFIG.clientStories,
    updatedAt: new Date().toISOString(),
  };

  inMemoryConfig = updated;

  const prisma = getPrismaClient();
  if (prisma) {
    try {
      const colorsPayload = {
        light: updated.colors.light,
        dark: updated.colors.dark,
        mode: updated.themeMode,
      };

      await prisma.siteConfig.upsert({
        where: { id: 'default' },
        create: {
          id: 'default',
          brand: updated.brand as any,
          colors: colorsPayload as any,
          typography: updated.typography as any,
          layout: updated.layout as any,
          projects: updated.projects as any,
          clientStories: updated.clientStories as any,
        },
        update: {
          brand: updated.brand as any,
          colors: colorsPayload as any,
          typography: updated.typography as any,
          layout: updated.layout as any,
          projects: updated.projects as any,
          clientStories: updated.clientStories as any,
        },
      });
    } catch (error) {
      console.warn('Prisma upsert failed, updated in-memory only:', error);
    }
  }

  return updated;
}

export async function resetSiteConfig(): Promise<SiteConfigData> {
  inMemoryConfig = JSON.parse(JSON.stringify(DEFAULT_SITE_CONFIG));
  inMemoryConfig.updatedAt = new Date().toISOString();

  const prisma = getPrismaClient();
  if (prisma) {
    try {
      const colorsPayload = {
        light: DEFAULT_SITE_CONFIG.colors.light,
        dark: DEFAULT_SITE_CONFIG.colors.dark,
        mode: DEFAULT_SITE_CONFIG.themeMode,
      };

      await prisma.siteConfig.upsert({
        where: { id: 'default' },
        create: {
          id: 'default',
          brand: DEFAULT_SITE_CONFIG.brand as any,
          colors: colorsPayload as any,
          typography: DEFAULT_SITE_CONFIG.typography as any,
          layout: DEFAULT_SITE_CONFIG.layout as any,
          projects: DEFAULT_SITE_CONFIG.projects as any,
          clientStories: DEFAULT_SITE_CONFIG.clientStories as any,
        },
        update: {
          brand: DEFAULT_SITE_CONFIG.brand as any,
          colors: colorsPayload as any,
          typography: DEFAULT_SITE_CONFIG.typography as any,
          layout: DEFAULT_SITE_CONFIG.layout as any,
          projects: DEFAULT_SITE_CONFIG.projects as any,
          clientStories: DEFAULT_SITE_CONFIG.clientStories as any,
        },
      });
    } catch (error) {
      console.warn('Prisma reset failed, reset in-memory only:', error);
    }
  }

  return inMemoryConfig;
}
