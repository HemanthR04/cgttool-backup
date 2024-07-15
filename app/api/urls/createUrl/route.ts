import { connectToDB } from "@/dbConfig/dbConfig";
import ApplicationModel from "@/models/application.model";
import URL from "@/models/url.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  connectToDB();
  try {
    const reqBody = await request.json();
    const { type, link, clientApps, application, environment } = reqBody;

    console.log(reqBody);

    //check if app already exists
    const urlLink = await URL.findOne({ link });

    if (urlLink) {
      return NextResponse.json(
        { error: "URL already exists" },
        { status: 400 }
      );
    }

    const newURL = new URL({
      type,
      link,
      clientApps,
      application,
      environment,
    });

    const saveURL = await newURL.save();
    console.log(saveURL);

    return NextResponse.json({
      message: "URL created successfully",
      success: true,
      saveURL,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
