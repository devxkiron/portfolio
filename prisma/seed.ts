import { PrismaClient } from '@prisma/client';
import { DEFAULT_SITE_CONFIG } from '../src/lib/theme-config/defaults';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial site design system config into Neon Postgres...');

  const config = await prisma.siteConfig.upsert({
    where: { id: 'default' },
    create: {
      id: 'default',
      brand: DEFAULT_SITE_CONFIG.brand as any,
      colors: DEFAULT_SITE_CONFIG.colors as any,
      typography: DEFAULT_SITE_CONFIG.typography as any,
      layout: DEFAULT_SITE_CONFIG.layout as any,
    },
    update: {
      brand: DEFAULT_SITE_CONFIG.brand as any,
      colors: DEFAULT_SITE_CONFIG.colors as any,
      typography: DEFAULT_SITE_CONFIG.typography as any,
      layout: DEFAULT_SITE_CONFIG.layout as any,
    },
  });

  console.log('Successfully seeded site configuration:', config.id);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
