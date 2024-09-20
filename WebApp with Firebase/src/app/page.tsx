"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { auth, fireStore } from "@/firebase/firebaseconfig"
import { doc ,getDoc, setDoc } from "firebase/firestore"
import type { User } from "firebase/auth"

export default function Home () {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if(user){
        if(user.emailVerified){

          const userDoc = await getDoc(doc(fireStore, "users", user.uid));

          if(!userDoc.exists()){
            // retrive user data from local storage
            const registrationData = localStorage.getItem("RegistrationData");
            const {
              firstName = "",
              lastName = "",
              gender = "",
            } = registrationData ? JSON.parse(registrationData) : {};
            
            await setDoc(doc(fireStore, "users", user.uid), {
              firstName,
              lastName,
              gender,
              email: user.email
            });
            // clear registration data from local storage
            localStorage.removeItem("registrationData");
          }
          setUser(user)
          router.push("/dashboard");

        }
        else{
          setUser(null)
          router.push("/login");
        }
      }
      else{
        setUser(null)
        router.push("/login");
      }
      setLoading(false);

    });
    return () => unsubscribe();

  }, [router]);


  if(loading){
    return <p>Loading...</p>
  }

  return (
    <>

      {/* <h1 className="font-bold text-4xl text-center">Home Page</h1> */}
      {user ? "Redirecting To Dashboard..." : "redirecting to login..."}

    </>
  )
}