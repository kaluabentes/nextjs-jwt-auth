import type { NextApiRequest, NextApiResponse } from "next"
import * as Yup from "yup"
import bcrypt from "bcrypt"

import prisma from "@/lib/prisma"

const JWT_SECRET = process.env.JWT_SECRET!

const changePasswordSchema = Yup.object({
  password: Yup.string().required(),
  token: Yup.string().required(),
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).send({
      error: "methodNotAllowed",
    })
  }

  try {
    await changePasswordSchema.validate(req.body)

    const changePasswordToken = await prisma.userChangePasswordToken.findFirst({
      where: {
        token: req.body.token,
      },
    })

    if (!changePasswordToken) {
      return res.status(400).send({
        error: "tokenNotFound",
      })
    }

    const password = await bcrypt.hash(req.body.password, 10)

    await prisma.user.update({
      where: {
        id: changePasswordToken.userId,
      },
      data: {
        password,
      },
    })

    await prisma.userChangePasswordToken.delete({
      where: {
        id: changePasswordToken.id,
      },
    })

    res.status(200).json({ message: "ok" })
  } catch (error: any) {
    console.log(error.message)
    return res.status(400).send(error.message)
  }
}
