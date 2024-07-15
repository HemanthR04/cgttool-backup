import { NextResponse } from "next/server";
import { connectToDB } from "@/dbConfig/dbConfig";

import { Types } from "mongoose";
import URLS from "@/models/url.model";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const name = searchParams.get('name');
   

    if (!id || !Types.ObjectId.isValid(id)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        { status: 400 }
      );
    }

    await connectToDB();

  

    const urls = await URLS.find({  application : id , environment : name});
    return new NextResponse(JSON.stringify(urls), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching urls" + error, { status: 500 });
  }
};

