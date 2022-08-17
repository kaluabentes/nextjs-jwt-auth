import type { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"

import prisma from "@/lib/prisma"
import verifyAuth from "@/utils/auth/verifyAuth"

const JWT_SECRET = process.env.JWT_SECRET!

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).send("Method not allowed")
  }

  if (!req.headers["authorization"]) {
    return res.status(401).send({
      error: "missing token",
    })
  }

  try {
    const { user, message } = await verifyAuth(req.headers["authorization"]!)

    if (message) {
      return res.status(401).send({
        error: message,
      })
    }

    return res.send(user)
  } catch (error: any) {
    return res.status(400).send(error)
  }
}
