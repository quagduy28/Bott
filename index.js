const express = require('express');
const mineflayer = require("mineflayer");

const app = express();
app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(3000, () => console.log('Web server online'));

function startBot() {
  const bot = mineflayer.createBot({
    host: "191.96.231.5", // ví dụ: 'mc.server.com'
    port: 11539, // mặc định là 25565
    username: "Ronaldo", // tên bot cho server crack
    // password: 'mật_khẩu' // nếu cần login (premium)
  });

  bot.on("spawn", () => {
    console.log("✅ Bot đã vào server");

    // Nhảy nhẹ để tránh bị kick vì AFK
    setInterval(() => {
      bot.setControlState("jump", true);
      setTimeout(() => bot.setControlState("jump", false), 500);
    }, 10000);
    // Chat tự động mỗi 60 giây
    setInterval(() => {
      const messages = [
        "Siuuuuuuuuuuu",
        "Messi is the GOAT",
        "Chi xinh nhấttttt",
        "Vấp cỏ kiếm pennnnn",
        "Pen tài ơi !!!!!!",
      ];

      // Chọn ngẫu nhiên 1 tin nhắn
      const msg = messages[Math.floor(Math.random() * messages.length)];
      bot.chat(msg);
    }, 60000); // 60000 ms = 60 giây
  });

  bot.on("end", () => {
    console.log("🔁 Mất kết nối - tự động reconnect...");
    setTimeout(startBot, 5000);
  });

  bot.on("error", (err) => {
    console.log("❌ Lỗi bot:", err);
  });
}

startBot();
