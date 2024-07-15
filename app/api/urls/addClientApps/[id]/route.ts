import { connectToDB } from "@/dbConfig/dbConfig";
import URLS from "@/models/url.model";
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

    const url = await URLS.findOne({ _id: id });
    console.log(url)
    if (!url) {
      const errorResponse: ErrorResponse = { error: "URL not found" };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    const reqBody = await request.json();
    const { clientAppName, clientAppURL } = reqBody;

    if (!clientAppName || !clientAppURL) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing clientAppName/clientAppURL " }),
        { status: 400 }
      );
    }

    // Check if url already exists
    const clientUrl = await URLS.find({'clientApps.name': clientAppName, 'clientApps.url': clientAppURL});
    console.log(clientUrl)
    
    if(clientUrl.length != 0){
      const errorResponse: ErrorResponse = { error: "ClientApp already exists" };
      return NextResponse.json(errorResponse, { status: 404 });
    }
        
    console.log(reqBody);

    const addClientApp = await url.clientApps.push({ name: clientAppName,
              url: clientAppURL,
            } );
    await url.save();

    return NextResponse.json({
      message: "Client Interfacing App added successfully",
      success: true,
      addClientApp,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
