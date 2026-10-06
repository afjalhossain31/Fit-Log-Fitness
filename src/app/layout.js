import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Components & Context Import
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer"; // Ekhane Footer import kora hoyeche
import { PlanProvider } from "@/context/PlanContext"; 
import { Toaster } from "react-hot-toast"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FitLog Fitness",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Ekhane suppressHydrationWarning add kora hoyeche */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        
        {/* Context Provider */}
        <PlanProvider>
          <Navbar />
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              style: {
                background: '#18181b',
                color: '#fff',
                border: '1px solid #27272a',
              }
            }} 
          />
          {children}
        </PlanProvider>
        
        {/* Notun Footer component ekhane add kora hoyeche */}
        <Footer />
        
      </body>
    </html>
  );
}