import { NextResponse } from "next/server";

// ตรวจสอบว่าเป็น Vercel Cron Job ที่ถูกต้อง
export const dynamic = "force-dynamic";

export async function GET(request) {
  // ตรวจสอบ Authorization header จาก Vercel Cron (ข้ามตอน dev)
  const isDev = process.env.NODE_ENV === "development";
  const authHeader = request.headers.get("authorization");
  if (!isDev && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const LINE_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

  if (!LINE_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: "LINE_CHANNEL_ACCESS_TOKEN is not set" },
      { status: 500 }
    );
  }

  // กำหนดเวลาปัจจุบัน (เวลาประเทศไทย)
  const now = new Date();
  const thailandTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" })
  );
  const currentHour = thailandTime.getHours();
  const currentMinute = thailandTime.getMinutes();
  const currentTime = `${currentHour.toString().padStart(2, "0")}:${currentMinute
    .toString()
    .padStart(2, "0")}`;

  // รองรับ test mode: ใช้ ?test=HH:mm เพื่อทดสอบเวลาต่างๆ
  const { searchParams } = new URL(request.url);
  const testTime = searchParams.get("test");
  const timeToCheck = testTime || currentTime;

  // กำหนดข้อความแจ้งเตือนตามช่วงเวลา
  let message = "";

  switch (timeToCheck) {
    case "06:30":
      message = "🌅 สวัสดีตอนเช้าค่ะ\nอย่าลืมรับประทานยาและตรวจระดับน้ำตาลนะคะ 💊";
      break;
    case "07:00":
      message = "⏰ ถึงเวลารับประทานยา (ก่อนอาหารเช้า) แล้วนะคะ";
      break;
    case "07:55":
      message = "🔔 อีก 5 นาที อย่าลืมเตรียมรับประทานยา (หลังอาหารเช้า) นะคะ";
      break;
    case "08:00":
      message = "⏰ ถึงเวลารับประทานยา (หลังอาหารเช้า) แล้วนะคะ";
      break;
    case "11:55":
      message = "🔔 อีก 5 นาที อย่าลืมเตรียมรับประทานยา (หลังอาหารกลางวัน) นะคะ";
      break;
    case "12:00":
      message = "⏰ ถึงเวลารับประทานยา (หลังอาหารกลางวัน) แล้วนะคะ";
      break;
    case "15:30":
      message = "⏰ ถึงเวลารับประทานยา (ก่อนอาหารเย็น) แล้วนะคะ";
      break;
    case "16:55":
      message = "🔔 อีก 5 นาที อย่าลืมเตรียมรับประทานยา (หลังอาหารเย็น) นะคะ";
      break;
    case "17:00":
      message = "⏰ ถึงเวลารับประทานยา (หลังอาหารเย็น) แล้วนะคะ";
      break;
    case "18:00":
      message = "🏃‍♀️ อย่าลืมออกกำลังกายเบาๆ เพื่อสุขภาพนะคะ 💪";
      break;
    default:
      // ไม่อยู่ในช่วงเวลาแจ้งเตือน
      return NextResponse.json({
        success: true,
        message: "ไม่อยู่ในช่วงเวลาแจ้งเตือน",
        currentTime: timeToCheck,
      });
  }

  try {
    // ส่ง Broadcast message ไปยังผู้ติดตามทุกคน
    const response = await fetch("https://api.line.me/v2/bot/message/broadcast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        messages: [
          {
            type: "text",
            text: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("LINE API Error:", errorData);
      return NextResponse.json(
        { error: "Failed to send LINE message", details: errorData },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "ส่งแจ้งเตือนสำเร็จ",
      currentHour,
      sentMessage: message,
    });
  } catch (error) {
    console.error("Error sending reminder:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
