import type { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"
import Cookies from "cookies"
import * as Yup from "yup"
import nodemailer from "nodemailer"

import prisma from "@/lib/prisma"
import verifyAuth from "@/utils/auth/verifyAuth"
import smtp from "@/config/smtp"
import SMTPTransport from "nodemailer/lib/smtp-transport"

const JWT_SECRET = process.env.JWT_SECRET!

const forgotPasswordSchema = Yup.object({
  email: Yup.string().email().required(),
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).send({
      error: "methodNotAllowed",
    })
  }

  try {
    await forgotPasswordSchema.validate(req.body)

    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    })

    if (!user) {
      return res.status(400).send({
        error: "userNotFound",
      })
    }

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: false,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    } as SMTPTransport.Options)

    const token = uuidv4()
    await prisma.userChangePasswordToken.create({
      data: {
        token,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })

    const msg = {
      to: req.body.email,
      from: "no-reply@vexmo.com.br",
      subject: `Cashtron - Alterar senha`,
      html: `
        <p>Para criar uma nova senha <a href="${process.env.CLIENT_URL}/auth/change-password?token=${token}">clique aqui</a></p>
      `,
    }

    await transporter.sendMail(msg)
    res.status(200).json({ message: "ok" })
  } catch (error: any) {
    console.log(error.message)
    return res.status(400).send(error.message)
  }
}
