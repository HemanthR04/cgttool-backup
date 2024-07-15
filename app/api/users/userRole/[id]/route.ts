import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

interface ErrorResponse {
  error: string;
}

const ObjectId = require("mongoose").Types.ObjectId;

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  try {
    connectToDB();

    const newRole = 'secondaryadmin';
      const user = await User.findOne({ _id: id });
      
    if (!user) {
      const errorResponse: ErrorResponse = { error: "User not found" };
      return NextResponse.json(errorResponse, { status: 404 });
    }
    
    if(user.role === "user"){
      const updatedUser = await User.findByIdAndUpdate(
        { _id: new ObjectId(id) },
        { role: newRole },
        { new: true }
    );

    if (!updatedUser) {
        const errorResponse: ErrorResponse = { error: "User not found or didn't update user successfully." };
        return NextResponse.json(errorResponse, { status: 404 });
      }

    return NextResponse.json({
      message: "User updated successfully",
      success: true,
      updatedUser,
    });
    } else{
      return NextResponse.json({
        message: "User is already an admin",
        success: false,
      });
    }
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
