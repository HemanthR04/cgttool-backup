import { connectToDB } from "@/dbConfig/dbConfig";
import ApplicationModel from "@/models/application.model";
import URL from "@/models/url.model";
import { NextRequest, NextResponse } from "next/server";

interface ErrorResponse {
  error: string;
}

export async function PATCH(
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

    console.log(reqBody);

    //check if admin already exists
    const user = await ApplicationModel.findOne({ admins });

    if (user) {
      return NextResponse.json(
        { error: "Admin already exists" },
        { status: 400 }
      );
    }

    if (!admins) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing admin Name" }),
        { status: 400 }
      );
    }

    const updatedApp = await ApplicationModel.findByIdAndUpdate(
      id,
      { admins },
      { new: true }
    );

    return NextResponse.json({
      message: "Application updated successfully",
      success: true,
      updatedApp,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
