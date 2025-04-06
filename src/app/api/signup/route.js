// /app/api/signup/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { name, email, password } = await req.json();

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already exists" }), { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password, // You should hash this in production!
      },
    });

    return new Response(JSON.stringify({ message: "User created", user: newUser }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
