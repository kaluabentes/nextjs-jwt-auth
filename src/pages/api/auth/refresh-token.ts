import type { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"
import Cookies from "cookies"

import prisma from "@/lib/prisma"
import verifyAuth from "@/utils/auth/verifyAuth"

const JWT_SECRET = process.env.JWT_SECRET!

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed")
  }

  try {
    const token = req.cookies["refreshToken"]

    const refreshToken = await prisma.userRefreshToken.findFirst({
      where: {
        token,
      },
      include: {
        user: {
          include: {
            store: true,
          },
        },
      },
    })

    if (!refreshToken) {
      return res.status(401).send({ message: "invalidToken" })
    }

    const { user } = refreshToken
    const { store } = user
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      storeName: store.name,
    }

    const jwtToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "15m",
    })

    /* Refresh token */
    const newRefreshToken = uuidv4()
    const cookies = Cookies(req, res)
    cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "lax",
    })
    await prisma.userRefreshToken.create({
      data: {
        token: newRefreshToken,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })
    await prisma.userRefreshToken.delete({
      where: {
        id: refreshToken.id,
      },
    })

    res.json({
      token: jwtToken,
    })
  } catch (error: any) {
    console.log(error.message)
    return res.status(400).send(error.message)
  }
}
