import { NextResponse } from "next/server";
import webpush from "web-push";

export async function POST(req: Request) {
  webpush.setVapidDetails(
    "mailto:fion_leo@live.com.my",
    process.env.VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
  );

  try {
    const body = await req.json();
    const { subscription, title, message, url } = body;

    const payload = JSON.stringify({ 
      title: title || "New Alert", 
      body: message || "No content provided", 
      url: url || "/" 
    });

    await webpush.sendNotification(subscription, payload);

    return NextResponse.json({ success: true });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: error.statusCode || 500 }
    );
  }
}