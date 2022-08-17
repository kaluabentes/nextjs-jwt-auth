import axios from "axios"

const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/auth/signin"
    }
  }
)

export default client
