import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner"
const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Next Interview App",
  description: "next gen app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <Toaster />
          <div>

            {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
