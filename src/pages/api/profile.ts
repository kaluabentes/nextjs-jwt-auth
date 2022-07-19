import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const authHeader = String(req.headers["authorization"]);
  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
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
    });

    return res.send(user);
  } catch (error: any) {
    return res.status(400).send(error);
  }
};
