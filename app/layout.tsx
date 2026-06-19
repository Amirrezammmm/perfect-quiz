import "./globals.css"
import Sidebar from "@/components/layout/Sidebar"
import Header from "@/components/layout/Header"
import { cn } from "@/lib/utils"

import { Geist, Vazirmatn } from "next/font/google"

const vazir = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazir",
})

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fa"
      className={cn(vazir.variable, geist.variable)}
    >
      <body className="font-sans" dir="rtl">

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
