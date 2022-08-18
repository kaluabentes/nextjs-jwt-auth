import axios from "@/lib/axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const INITIAL_STATE = {
  id: -1,
  name: "",
  email: "",
  role: "",
  store: {
    id: -1,
    name: "",
  },
}

const useAuth = () => {
  const authHeader =
    (axios.defaults.headers.common["Authorization"] as String) || ""
  const token = authHeader.replace("Bearer ", "")
  const [profile, setProfile] = useState(INITIAL_STATE)
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const isLoggedIn = profile.id !== -1
  const router = useRouter()

  const logout = async () => {
    setIsLoggingOut(true)
    axios.defaults.headers.common["Authorization"] = ""
    await axios.patch("auth/logout")
    setIsLoggingOut(false)
    router.push("/auth/signin")
  }

  const verifyLogin = async () => {
    try {
      setIsLoadingProfile(true)
      const response = await axios.get("/auth/profile")
      setProfile(response.data)
    } catch (error: any) {
      const status = error.response.status

      if (status === 401) {
        try {
          const refresh = await axios.post("/auth/refresh-token")
          const { token } = refresh.data

          if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
            const response = await axios.get("/auth/profile")
            setProfile(response.data)
          } else {
            router.push("/auth/signin")
          }
        } catch (error: any) {
          const status = error.response.status

          if (status === 401) {
            router.push("/auth/signin")
          }
        }
      }
    } finally {
      setIsLoadingProfile(false)
    }
  }

  useEffect(() => {
    verifyLogin()
  }, [])

  return { token, isLoggedIn, profile, isLoadingProfile, logout, isLoggingOut }
}

export default useAuth
