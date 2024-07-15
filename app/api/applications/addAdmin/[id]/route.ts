import { connectToDB } from "@/dbConfig/dbConfig";
import ApplicationModel from "@/models/application.model";
import { NextRequest, NextResponse } from "next/server";

interface ErrorResponse {
  error: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    connectToDB();

    const applicationDetails = await ApplicationModel.findOne({ _id: id });

    if (!applicationDetails) {
      const errorResponse: ErrorResponse = { error: "Application not found" };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    const reqBody = await request.json();

    
    const { admins } = reqBody;
    if (!admins) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing admin Name" }),
        { status: 400 }
      );
    }
     // Check if admin already exists
     if (applicationDetails.admins.includes(admins)) {
      const errorResponse: ErrorResponse = { error: "Admin already exists" };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    console.log(reqBody);

    const updatedApp = await applicationDetails.admins.push(admins);
    await applicationDetails.save();

    return NextResponse.json({
      message: "Admin added successfully",
      success: true,
      updatedApp,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
