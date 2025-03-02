import type { NextApiRequest, NextApiResponse } from 'next';
import { generateUsername } from 'unique-username-generator';

import { prisma } from '@/prisma';

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  const { publicKey, email, firstName, lastName } = req.body;
  const username = generateUsername('-', 4, 24);
  try {
    const result = await prisma.user.create({
      data: {
        publicKey,
        email,
        firstName,
        lastName,
        username,
      },
    });
    res.status(200).json(result);
  } catch (error: any) {
    if (error.code === 'P2002') {
      try {
        const currentUser = await prisma.user.findUnique({
          where: {
            email,
          },
          select: {
            email: true,
            publicKey: true,
          },
        });
        res.status(400).json({
          error,
          user: currentUser,
          message: 'Error occurred while adding a new user.',
        });
      } catch (err) {
        res.status(400).json({
          error: err,
          message: 'Error occurred while adding a new user.',
        });
      }
    } else {
      res.status(400).json({
        error,
        message: 'Error occurred while adding a new user.',
      });
    }
  }
}
