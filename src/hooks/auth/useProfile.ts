import axios from "@/lib/axios"
import { useToast } from "@chakra-ui/react"
import { useCallback, useState } from "react"

const useProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
  })
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const toast = useToast()

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoadingProfile(true)
      const profile = await axios.get("/auth/profile")
      setProfile(profile.data)
    } catch (error: any) {
      toast({
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    } finally {
      setIsLoadingProfile(false)
    }
  }, [])

  return { profile, fetchProfile, isLoadingProfile }
}

export default useProfile
