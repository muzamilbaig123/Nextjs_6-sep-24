import Link from "next/link"
export default function Navbar () {
    return (
        <ul style={{backgroundColor: "#000", color: "#fff", display: "flex", justifyContent: "center", gap: "40px", padding: "12px"}}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/counter">Counter</Link></li>
        </ul>
    )
}