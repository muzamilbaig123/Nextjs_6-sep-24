"use client"
import { auth, fireStore } from "@/firebase/firebaseconfig"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function LogIn() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const router = useRouter();

    // Marking the formHandler as async
    const formHandler = async (ele: FormEvent) => {
        ele.preventDefault();
        setErr(null);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, pass);
            const user = userCredential.user;

            if (user.emailVerified) {
                // Retrieve user data from local storage
                const registrationData = localStorage.getItem("registrationData");
                const {
                    firstName = "",
                    lastName = "",
                    gender = ""
                } = registrationData ? JSON.parse(registrationData) : {};

                // Check if user data exists in Firestore
                const userDoc = await getDoc(doc(fireStore, "users", user.uid));
                if (!userDoc.exists()) {
                    await setDoc(doc(fireStore, "users", user.uid), {
                        firstName,
                        lastName,
                        gender,
                        email: user.email,
                    });
                }

                // Redirect to dashboard
                router.push("/dashboard");
            } else {
                setErr("Please verify your email before logging in");
            }

        } catch (error) {
            if (error instanceof Error) {
                setErr(error.message);
            } else {
                setErr("An Unknown Error Occurred");
            }
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-600 to-black justify-center items-center h-screen w-screen flex flex-col relative">
            <h2 className="text-4xl font-medium text-white mb-10">Muzamil Baig</h2>
            <div className="p-5 border border-gray-300 rounded">

                {/* form start*/}
                <form onSubmit={formHandler} className="m-auto w-[50%] border p-10 bg-slate-800 text-blue-300" >
            

                <label className="ml- relative top-4">
                    Email: <input type="email"
                    placeholder="Email" 
                    value={email}
                    onChange={((e) => {setEmail(e.target.value)})}
                    className="border"
                    />
                </label>

                <label className=" relative top-4">
                    Password: <input type="password"
                    placeholder="Password" 
                    value={pass}
                    onChange={((e) => {setPass(e.target.value)})}
                    className="border"
                    />
                </label>

                <button type="submit" className="border-red-50 border-2 p-2 mt-10 ">login</button>
                {err && <p className="text-red-700">{err}</p>}
            </form>
                {/* form end */}

                <p className="text-sm font-medium text-gray-300 space-y-6 px-6 pb-4">
                    Don't Have An account?{" "}
                    <Link href="/register" className="text-blue-700 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}
