import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let body: { name?: string; email?: string; message?: string } = {};

    try {
      body = await req.json();
    } catch {
      // Fallback: Attempt text parse or form data if needed
      try {
        const text = await req.text();
        body = JSON.parse(text);
      } catch {
        return NextResponse.json(
          { error: "Invalid JSON format. Please provide valid contact fields." },
          { status: 400 }
        );
      }
    }

    const { name, email, message } = body;

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill out all required fields (name, email, and message)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Forward to Web3Forms for delivery to mbanait43@gmail.com
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "e85e49cf-93d3-4a11-85b5-2cb3daebcba0",
          to_email: "mbanait43@gmail.com",
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          subject: `New Portfolio Message from ${name.trim()}`,
          from_name: "Mayur Banait Portfolio",
        }),
      });
    } catch (e) {
      console.warn("External email dispatch note:", e);
    }

    // Log the message cleanly to server console
    console.log("=== [NEW CONTACT FORM MESSAGE RECEIVED] ===");
    console.log("Timestamp:", new Date().toISOString());
    console.log("From:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    console.log("Target:", "mbanait43@gmail.com");
    console.log("============================================");

    return NextResponse.json(
      {
        success: true,
        message: "Message sent to Mayur! 🚀",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error handling contact message:", err);
    return NextResponse.json(
      { error: "Internal server error occurred while sending your message." },
      { status: 500 }
    );
  }
}
