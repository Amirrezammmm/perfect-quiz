import Link from "next/link";

export default function Sidebar(){
    return (
        <aside className="w-64 h-screen bg-gray-900 text-white p-5">
            <h2 className="text-xl font-bold mb-6">Perfect Quiz</h2>
            <nav className="flex flex-col gap-4 text-right">
                <Link href="/" className="hover:text-yellow-400">
                داشبورد
                </Link>

                <Link href="/questions" className="hover:text-yellow-400">
                همه سوالات
                </Link>

                <Link href="/categories/ideological" className="hover:text-yellow-400">
                عقیدتی
                </Link>

                <Link href="/categories/political" className="hover:text-yellow-400">
                سیاسی
                </Link>

                <Link href="/exam" className="hover:text-yellow-400">
                آزمون
                </Link>
            </nav>
        </aside>
    )
}