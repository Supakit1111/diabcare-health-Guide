import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Simple in-memory rate limiting (Note: This will reset on server restart)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

export async function POST(req: Request) {
  const SYSTEM_PROMPT = `คุณคือ "หมอหม่อน" (Doctor Mon) ผู้เชี่ยวชาญด้านโรคเบาหวานและโภชนาการสำหรับผู้ป่วยในประเทศไทย 
หน้าที่ของคุณคือให้คำแนะนำที่ถูกต้อง เป็นมิตร และนำไปใช้ได้จริงเกี่ยวกับการดูแลสุขภาพสำหรับผู้ป่วยเบาหวาน 

ข้อกำหนดในการตอบคำถาม:
1. ตอบเป็นภาษาไทยด้วยน้ำเสียงที่สุภาพ อบอุ่น และให้กำลังใจ (ใช้คำว่า "ค่ะ" "นะคะ")
2. เน้นการเลือกอาหารไทยที่เหมาะสม (GI ต่ำ, คาร์โบไฮเดรตเชิงซ้อน)
3. ให้ข้อมูลเกี่ยวกับการออกกำลังกายและการทานยาอย่างถูกต้อง
4. **สำคัญมาก**: หากเป็นคำถามที่ต้องการการวินิจฉัยทางการแพทย์เฉพาะทาง หรือกรณีฉุกเฉิน ต้องแนะนำให้ปรึกษาแพทย์เจ้าของไข้โดยตรง
5. ตอบค่อนข้างกระชับ เข้าใจง่าย ไม่ยาวจนเกินไป
6. แสดงความห่วงใยและให้กำลังใจเสมอ

คุณกำลังคุยกับผู้ป่วยหรือผู้ดูแลที่ต้องการความรู้เบื้องต้นเกี่ยวกับ DiabCare App และการดูแลตัวเอง`;

  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    console.log("Chat API: Key present?", !!apiKey);
    
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API Key is missing. Please check your .env.local file." }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const { messages } = await req.json();

    // 1. Basic Rate Limiting check
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const now = Date.now();
    const userLimit = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - userLimit.lastReset > RATE_LIMIT_WINDOW) {
      userLimit.count = 0;
      userLimit.lastReset = now;
    }

    if (userLimit.count >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json({ error: "ใจเย็นๆ นะคะ หมอหม่อนขอพักแป๊บนึงค่ะ (Too many requests)" }, { status: 429 });
    }
    userLimit.count++;
    rateLimitMap.set(ip, userLimit);

    // 2. Input Validation
    const lastMessageObj = messages[messages.length - 1];
    if (!lastMessageObj || !lastMessageObj.content || lastMessageObj.content.length > 1000) {
      return NextResponse.json({ error: "ข้อความยาวเกินไปหรือรูปแบบไม่ถูกต้องค่ะ" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [{ text: "รับทราบค่ะ หมอหม่อนพร้อมให้คำปรึกษาเรื่องเบาหวานแล้วค่ะ มีอะไรให้ช่วยแนะนำไหมคะ?" }],
        },
        ...messages.map((m: any) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }],
        })),
      ],
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error: any) {
    console.error("Gemini API Error details:", error);
    return NextResponse.json(
      { error: error?.message || "ขออภัยค่ะ หมอหม่อนไม่สามารถเชื่อมต่อระบบได้ในขณะนี้" },
      { status: 500 }
    );
  }
}
