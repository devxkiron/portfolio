import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { getSiteConfig } from "@/lib/theme-config/service";
import { generateThemeCss } from "@/lib/theme-config/css-generator";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  const brandName = siteConfig.brand?.name || "Portfolio";
  const tagline = siteConfig.brand?.tagline || "High-Performance AI Engineering & Products";

  return {
    title: `${brandName} | ${tagline}`,
    description: tagline,
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteConfig = await getSiteConfig();
  const themeCss = generateThemeCss(siteConfig);
  const activeTheme = siteConfig.themeMode || 'dark';

  return (
    <html
      lang="en"
      data-theme={activeTheme}
      suppressHydrationWarning
      className={`${fontVariables} ${activeTheme === 'dark' ? 'dark' : ''} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.setAttribute('data-theme','${activeTheme}');if('${activeTheme}'==='dark'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}})();`,
          }}
        />
        <style id="dynamic-theme-tokens" dangerouslySetInnerHTML={{ __html: themeCss }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
