import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/user.model";

export async function POST(request: NextRequest) {
  try {
    const { email, name, password } = await request.json();
    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = await User.create({
      email,
      name,
      password,
    });

    return NextResponse.json(
      { message: "User created successfully ", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
