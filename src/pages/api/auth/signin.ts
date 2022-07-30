import type { NextApiRequest, NextApiResponse } from "next"
import * as Yup from "yup"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import prisma from "@/lib/prisma"

const JWT_SECRET = process.env.JWT_SECRET!

const signinFormValidationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed")
  }

  try {
    await signinFormValidationSchema.validate(req.body)

    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    })

    if (!user) {
      return res.status(400).json({
        error: "USER_NOT_EXIST",
      })
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) {
      return res.status(400).json({
        error: "INVALID_PASSWORD",
      })
    }

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      storeName: req.body.storeName,
    }

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "15m",
    })

    res.json({
      token,
    })
  } catch (error: any) {
    res.status(400).json(error.message)
  }
}
