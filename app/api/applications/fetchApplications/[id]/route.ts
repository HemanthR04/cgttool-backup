import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { connectToDB } from "@/dbConfig/dbConfig";
import ApplicationModel from "@/models/application.model";



interface ErrorResponse {
    error: string;
  }
  
  export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
      connectToDB();
  
      const applicationDetails = await ApplicationModel.findOne({ _id: id }).populate("admins")
      console.log(applicationDetails) 
  
      if (!applicationDetails) {
        const errorResponse: ErrorResponse = { error: 'Application not found' };
        return NextResponse.json(errorResponse, { status: 404 });
      }
  
      return NextResponse.json({ applicationDetails }, { status: 200 });
    } catch (error) {
      console.error(error);
      const errorResponse: ErrorResponse = { error: 'Internal server error' };
      return NextResponse.json(errorResponse, { status: 500 });
    }
  }