import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title:'ReviewIQ | Customer Intelligence', description:'AI-powered customer feedback analysis and product review aggregation.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }