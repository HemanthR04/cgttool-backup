import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { connectToDB } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/user.model';



export async function GET(request: NextRequest) {
  try {
    connectToDB();
    const users = await User.find()
    return NextResponse.json({
      message: "Users found",
      users: users,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
