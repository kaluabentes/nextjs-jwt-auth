import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!

const verifyAuth = async (authHeader: string, roles = ["USER", "ADMIN"]) => {
  const token = authHeader.replace("Bearer ", "")
  const decoded = jwt.verify(token, JWT_SECRET)
  const user = await prisma.user.findFirst({
    where: {
      id: Number(decoded.sub),
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      store: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  if (!user) {
    return {
      message: "userNotExist",
      user: null,
    }
  }

  if (!roles.includes(user?.role!)) {
    return {
      message: "userNotHavePermission",
      user: null,
    }
  }

  return {
    message: null,
    user,
  }
}

export default verifyAuth
