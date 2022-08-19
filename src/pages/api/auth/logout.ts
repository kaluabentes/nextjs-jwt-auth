import type { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"
import Cookies from "cookies"

import prisma from "@/lib/prisma"
import verifyAuth from "@/utils/auth/verifyAuth"

const JWT_SECRET = process.env.JWT_SECRET!

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return res.status(405).send({
      error: "methodNotAllowed",
    })
  }

  try {
    const token = req.cookies["refreshToken"]
    const refreshToken = await prisma.userRefreshToken.findFirst({
      where: {
        token,
      },
    })
    if (refreshToken) {
      const response = await prisma.userRefreshToken.delete({
        where: {
          id: refreshToken?.id,
        },
      })
      return res.json(response)
    }

    return res.json("Refresh token does not exist")
  } catch (error: any) {
    console.log(error.message)
    return res.status(400).send(error.message)
  }
}
