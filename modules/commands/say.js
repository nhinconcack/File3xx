const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const GOOGLE_API_KEY = "AIzaSyCbGKcWjxChlBpRkVMMP4Jm-k7EUv5ndY8"; // 👈 key giả, bạn thay key thật vào đây

module.exports.config = {
    name: "say",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Modded by ChatGPT for Duc Lê",
    description: "Đọc văn bản bằng giọng chị GG (Google TTS vi-VN-Standard-B)",
    commandCategory: "Tiện ích",
    usages: "[text]",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
    try {
        if (!args[0]) return api.sendMessage("Vui lòng nhập nội dung để đọc.", event.threadID, event.messageID);

        const text = args.join(" ");
        if (text.length > 5000) return api.sendMessage("Vui lòng nhập dưới 5000 ký tự.", event.threadID, event.messageID);

        const response = await axios.post(
            `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_API_KEY}`,
            {
                input: { text },
                voice: {
                    languageCode: "vi-VN",
                    name: "vi-VN-Standard-B"
                },
                audioConfig: {
                    audioEncoding: "MP3",
                    speakingRate: 1.0
                }
            }
        );

        const audioContent = response.data.audioContent;
        if (!audioContent) return api.sendMessage("❌ Lỗi khi gọi Google TTS.", event.threadID, event.messageID);

        const audioPath = path.resolve(__dirname, "cache", `sayggTTS_${event.threadID}_${event.senderID}.mp3`);
        fs.writeFileSync(audioPath, Buffer.from(audioContent, "base64"));

        return api.sendMessage({ attachment: fs.createReadStream(audioPath) }, event.threadID, () => fs.unlinkSync(audioPath));

    } catch (e) {
        console.error("❌ [ERROR] Khi gọi Google TTS:", e.response ? e.response.data : e);
        return api.sendMessage("Đã xảy ra lỗi khi gọi Google TTS.", event.threadID, event.messageID);
    }
};