import { Toaster } from '@/components/ui/sonner';
import { APP_DESCRIPTION, APP_NAME } from '@/constants';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: { template: `%s | ${APP_NAME}`, default: APP_NAME },
  description: APP_DESCRIPTION
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" disableTransitionOnChange enableSystem={false} defaultTheme="light">
          {children}
          <Toaster richColors expand />
        </ThemeProvider>
      </body>
    </html>
  );
}
