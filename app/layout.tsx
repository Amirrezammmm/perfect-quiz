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
      <body className="font-sans overflow-hidden" dir="rtl">

        <div className="flex h-screen w-full overflow-hidden">

          <Sidebar />

          <div className="flex flex-1 min-w-0 flex-col h-screen">

            <Header />

            <main className="flex-1 overflow-y-auto p-6">
              {children}
            </main>

          </div>

        </div>

      </body>
    </html>
  )
}
