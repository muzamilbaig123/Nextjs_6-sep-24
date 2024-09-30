"use client"
import { auth, fireStore } from "@/firebase/firebaseconfig"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { User } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { getStorage, ref } from "firebase/storage";


export default function Dashborad () {
    const [user, setUser] = useState<User | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState("");
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const userDoc = await getDoc(doc(fireStore, "users", user.uid));
                if(userDoc.exists()){
                    const userData = userDoc.data();
                    setUserName(`${userData.firstName} ${userData.lastName} `);
                 }  //child if start
            } 
              //parent if end 
            else{
                router.push("/login")
            }  
            setLoading(false)
        });

        return () => unsubscribe()

    }, [router])
   


    const handleLogout = async () => {
        try{
            await signOut(auth);
            router.push("/login")
        } catch(error) {
            console.log("Logout error: ", error)
        }
    }

    const handleChangePassword = () => {
        router.push("/passwordchange")
    }
    if(loading) {
        return <p>Loading...</p>
    }




    return (
        <>
        <div className="min-h-screen bg-gray-100 bg-gradient-to-b from-gray-600 to-black">
            <nav>
                <h1 style={{textAlign: "center"}}>Dashboard</h1>
            </nav>
            <main>
                {userName && (<h1>Welcome, {userName}</h1>)};
                <div>
                <button onClick={handleLogout} className="bg-red-600 text-white">Logout</button>
                <button onClick={handleChangePassword} className="bg-blue-600">change password</button>

                </div>
            </main>
            <label>Upload: <input type="file" 
                onChange={((e) => { 
                let files = e.target.files
                if(files) setFile(file[0])
                    console.log(file)
                // const spaceRef = ref(storage, 'images/space.jpg');   
             })}
             
             /></label>
        </div> 
        </>
    )
}


