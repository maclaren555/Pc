import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PerformanceProvider } from "@/components/PerformanceProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Игровые ПК - Продажа кастомных компьютеров из Б/У запчастей",
  description: "Занимаемся продажей игровых ПК на Авито из Б/У запчастей. Подберем любой компьютер под ваши задачи. Всегда на связи, отдаем только чистый и проверенный компьютер.",
  keywords: ["игровые ПК", "компьютеры", "б/у запчасти", "кастомные ПК", "авито", "gaming pc", "custom pc"],
  authors: [{ name: "Gaming PC Sales" }],
  openGraph: {
    title: "Игровые ПК - Продажа кастомных компьютеров",
    description: "Подберем любой компьютер под ваши задачи из Б/У запчастей. Всегда на связи, отдаем только чистый и проверенный компьютер.",
    type: "website",
    locale: "ru_RU",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover', // For devices with notches
  themeColor: '#000000',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-background text-foreground overflow-x-hidden`}
        style={{
          // iOS Safari viewport height fix
          minHeight: '-webkit-fill-available',
          // Prevent horizontal scroll
          overflowX: 'hidden',
          // Better touch scrolling
          WebkitOverflowScrolling: 'touch',
          // Prevent bounce scrolling
          overscrollBehavior: 'none',
        }}
      >
        <ThemeProvider
          defaultTheme="dark"
          storageKey="gaming-pc-theme"
          attribute="class"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <PerformanceProvider>
            {children}
          </PerformanceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
