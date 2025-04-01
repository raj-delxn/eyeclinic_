import { NextResponse } from "next/server";

export async function POST() {
  try {
    // 🔹 Clear the authentication cookie
    const response = NextResponse.json({ message: "Logout successful" });
    response.cookies.set("token", "", { expires: new Date(0), httpOnly: true , path: "/", });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
