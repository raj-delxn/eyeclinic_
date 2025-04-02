import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logout successful" });

    // 🔹 Properly expire the token (ensuring it's removed from browser)
    response.cookies.set("token", "", { 
      expires: new Date(0), 
      httpOnly: true, 
      path: "/", 
      maxAge: 0 
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
