import '@fontsource-variable/vazirmatn';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import './home-extras.css';

export const metadata: Metadata = {
  title: 'AUREN SKIN | فصل تازه مراقبت از پوست',
  description: 'اورن اسکین؛ تجربه‌ای متفاوت از مراقبت تخصصی پوست، با ترکیب علم و زیبایی.',
  applicationName: 'Auren Skin',
  robots: { index: false, follow: false }, // Demo; enable after launching the real store.
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#981013',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
