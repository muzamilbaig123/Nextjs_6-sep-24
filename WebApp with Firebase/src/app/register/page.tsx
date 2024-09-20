"use client"
import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { auth } from "@/firebase/firebaseconfig"
import { error } from "console"



export default function Register () {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpass, setConfirmpass] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    // const rout = useRouter()


    const registerFormHandler = async (ele: FormEvent) => {
        ele.preventDefault();
        setErr(null);
        setMessage(null);

        if(password !== confirmpass){
            setErr("Password Do Not Match")
            return;
        }
        try{

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await sendEmailVerification(user);

            // Temporarily store user data in local storage
            localStorage.setItem(
                "registrationData",
                JSON.stringify({
                    firstName,
                    lastName,
                    gender,
                    email
                })
            ); 
            setMessage("Regsitraion Succesfully please check your email for verification");

            // clear form field
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setGender("");
            setConfirmpass("");
        }catch(error){
         if(error instanceof Error){
            setErr(error.message)
         }   
         else{
            setErr("An Unknow error occured")
         }
        }

    }

        
    return (
        <>
            <form onSubmit={registerFormHandler} className="m-auto w-[50%] border p-10 bg-slate-800 text-blue-300" >
                <h1 className="text-center text-3xl mb-4">Register</h1>
                <label>
                    FirstName: <input type="text"
                    placeholder="First Name" 
                    value={firstName}
                    onChange={((e) => {setFirstName(e.target.value)})}
                    className="border"
                    />
                </label>
                
                <label className="ml-4">
                    LastName: <input type="text"
                    placeholder="Last Name" 
                    value={lastName}
                    onChange={((e) => {setLastName(e.target.value)})}
                    className="border "
                    />
                </label>

                <label className="ml-4 relative top-4">
                    Email: <input type="email"
                    placeholder="Email" 
                    value={email}
                    onChange={((e) => {setEmail(e.target.value)})}
                    className="border"
                    />
                </label>

                <label className="ml-4 relative top-4">
                    Password: <input type="password"
                    placeholder="Password" 
                    value={password}
                    onChange={((e) => {setPassword(e.target.value)})}
                    className="border"
                    />
                </label>
                
                <label className="mb-12 relative top-8">
                    Confirm Password: <input type="password"
                    placeholder="Password" 
                    value={confirmpass}
                    onChange={((e) => {setConfirmpass(e.target.value)})}
                    className="border"
                    />
                </label>

                <label className="ml-4 block mt-10">
                    Gender: <select
                            value={gender}
                            onChange={(e) => {setGender(e.target.value)}}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </label>

                <button type="submit" className="border-red-50 border-2 p-2 mt-10 ">Sign Up</button>
                {err && <p className="text-red-700">{err}</p>}
                {message && <p className="text-green-500">{message}</p>}
            </form>
        
        </>
    )
}