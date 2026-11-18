import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'AUREN SKIN | فصل تازه مراقبت از پوست', description: 'اورن اسکین؛ تجربه‌ای متفاوت از مراقبت تخصصی پوست، با ترکیب علم و زیبایی.', robots: { index: false, follow: false } };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#981013' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="fa" dir="rtl"><body>{children}</body></html>; }
