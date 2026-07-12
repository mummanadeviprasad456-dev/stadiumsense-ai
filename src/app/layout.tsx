import type { Metadata } from 'next';
import './globals.css';
import { StadiumProvider } from '@/context/StadiumContext';

export const metadata: Metadata = {
  title: 'StadiumSense AI – Smart Stadium Operations | FIFA World Cup 2026',
  description:
    'StadiumSense AI is the official smart stadium operations and fan experience platform for FIFA World Cup 2026. Navigate MetLife Stadium with AI-powered crowd management, accessibility tools, multilingual support, and real-time emergency guidance.',
  keywords: [
    'FIFA World Cup 2026', 'StadiumSense AI', 'Smart Stadium', 'AI Assistant',
    'Crowd Management', 'MetLife Stadium', 'Fan Experience', 'Accessibility',
    'Google Gemini', 'Emergency Management'
  ],
  authors: [{ name: 'StadiumSense AI Team' }],
  openGraph: {
    title: 'StadiumSense AI – FIFA World Cup 2026 Smart Operations Hub',
    description: 'AI-powered stadium navigation, crowd intelligence, and multilingual fan assistance.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0d1117" />
      </head>
      <body className="min-h-screen antialiased">
        <StadiumProvider>
          {children}
        </StadiumProvider>
      </body>
    </html>
  );
}
