import { NextApiRequest, NextApiResponse } from 'next';
import mongoose, { Types } from 'mongoose';
import ApplicationModel from '@/models/application.model';
import User from '@/models/user.model'
import { connectToDB } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        { status: 400 }
      );
    }

    connectToDB();

    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    
    const application = await ApplicationModel.find({ admins: [new Types.ObjectId(userId)] })
    return NextResponse.json({
      message: "Applications found",
      apps: application,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
