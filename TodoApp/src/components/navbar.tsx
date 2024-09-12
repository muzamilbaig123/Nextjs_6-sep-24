import Link from "next/link"
export default function Navbar () {
    return (
        <>
            <nav className="bg-blue-800 flex justify-between">
                    <div className="logo">
                        <h2 className="text-white text-3xl p-4 font-bold cursor-cell underline">Muzamil Todo</h2>
                    </div>
                    <ul className="flex gap-12 text-white p-5">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="#">About Us</Link></li>
                        <li><Link href="#">Gallery</Link></li>
                        <li><Link href="#">Contact Us</Link></li>
                    </ul>
            </nav>
          
        </>
    )
}