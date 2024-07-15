import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import ApplicationModel from '@/models/application.model';
import { connectToDB } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {
  try {
    connectToDB();
    const application = await ApplicationModel.find()
    return NextResponse.json({
      message: "Applications found",
      apps: application,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
