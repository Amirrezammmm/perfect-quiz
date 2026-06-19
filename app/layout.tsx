import "./globals.css"
import Sidebar from "@/components/layout/Sidebar"
import Header from "@/components/layout/Header"
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" className={cn("font-sans", geist.variable)}>
      <body>

        <div className="flex">

          <Sidebar />

          <div className="flex-1">

            <Header />

            <main className="p-6">
              {children}
            </main>

          </div>

        </div>

      </body>
    </html>
  )
}
