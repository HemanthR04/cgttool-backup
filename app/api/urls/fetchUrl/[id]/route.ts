import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { connectToDB } from "@/dbConfig/dbConfig";
import ApplicationModel from "@/models/application.model";
import URLS from "@/models/url.model";
import { Types } from "mongoose";



interface ErrorResponse {
    error: string;
  }
  
  export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
      connectToDB();
  
      if (!id || !Types.ObjectId.isValid(id)) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid or missing userId" }),
          { status: 400 }
        );
      }
  
      await connectToDB();
  
    
  
      const urls = await URLS.find({  application : id });
      return new NextResponse(JSON.stringify(urls), { status: 200 });
    } catch (error) {
      return new NextResponse("Error in fetching urls" + error, { status: 500 });
    }
  }