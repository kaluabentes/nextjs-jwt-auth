import type { NextApiRequest, NextApiResponse } from "next"
import * as Yup from "yup"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"
import Cookies from "cookies"

import prisma from "@/lib/prisma"

const JWT_SECRET = process.env.JWT_SECRET!

const signupFormValidationSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  storeName: Yup.string().required(),
  password: Yup.string().required(),
  repeatPassword: Yup.string()
    .required()
    .test("match-password", "The passwords must match", (value, context) => {
      return context.parent.password === value
    }),
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).send({
      error: "methodNotAllowed",
    })
  }

  try {
    await signupFormValidationSchema.validate(req.body)

    const password = await bcrypt.hash(req.body.password, 10)
    const emailExists = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    })

    if (emailExists) {
      return res.status(400).send({
        error: "emailInUse",
      })
    }

    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password,
        store: {
          create: {
            name: req.body.storeName,
          },
        },
      },
    })
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      storeName: req.body.storeName,
    }
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "15m",
    })

    /* Refresh token */
    const refreshToken = uuidv4()
    const cookies = Cookies(req, res)
    cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
    })
    await prisma.userRefreshToken.create({
      data: {
        token: refreshToken,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })

    res.json({
      token,
    })
  } catch (error: any) {
    res.status(400).json(error.message)
  }
}
