// src/app/api/auth/login/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  // Simulate login validation
  if (body.email === "test@example.com" && body.password === "password") {
    return NextResponse.json({ success: true, token: "dummy-token" });
  }

  return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
}
