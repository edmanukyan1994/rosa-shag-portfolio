import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  brand?: string;
  link?: string;
  budget?: string;
  prefill?: string;
  website?: string;
};

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as ContactPayload;

    if (data.website) {
      return NextResponse.json({ ok: true });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json({ error: "Telegram не настроен на сервере" }, { status: 503 });
    }

    const lines = [
      "📩 Новая заявка с сайта Rosa_shag",
      "",
      data.prefill && `💬 ${data.prefill}`,
      data.name && `👤 Имя: ${data.name}`,
      data.brand && `🏷 Бренд: ${data.brand}`,
      data.link && `🔗 Продукт: ${data.link}`,
      data.budget && `💰 Бюджет: ${data.budget}`,
    ].filter(Boolean);

    if (lines.length <= 2) {
      return NextResponse.json({ error: "Заполните хотя бы одно поле" }, { status: 400 });
    }

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join("\n"),
      }),
    });

    if (!tgRes.ok) {
      console.error("Telegram API error:", await tgRes.text());
      return NextResponse.json({ error: "Не удалось отправить заявку" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
