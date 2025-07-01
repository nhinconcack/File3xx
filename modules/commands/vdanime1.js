module.exports.config = {
 name: "vdanime",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "ta",
 description: "Gái xinh noprefix",
 commandCategory: "No Prefix",
 usages: "gái",
 cooldowns: 0,
};

module.exports.run = async function ({ api, event }) {
 return api.sendMessage("Bạn hãy nhắn từ khóa như 'gái', 'gái xinh' để nhận ảnh nhé~", event.threadID, event.messageID);
};

module.exports.handleEvent = async function ({ api, event }) {
 const triggers = ["vdanime", "anime", "anm", "gáianine", "animegai"];
 if (!triggers.some(t => event.body?.toLowerCase().includes(t.toLowerCase()))) return;

 const name = await api.getUserInfo(event.senderID).then(res => res[event.senderID].name);

 if (!global.taanime || global.taanime.length === 0) {
 return api.sendMessage("Hiện tại chưa có Vd anime nào được tải lên!", event.threadID, event.messageID);
 }

 const attachment = global.taanime.splice(0, 1);

 return api.sendMessage({
 body: `🎬 Video Anime Của Bạn Nè ${name}!!`,
 attachment
 }, event.threadID, event.messageID);
};