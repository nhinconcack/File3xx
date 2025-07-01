module.exports.config = {
  name: "vdgai",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ta", // đổi từ qt thành ta
  description: "Gái xinh noprefix",
  commandCategory: "No Prefix",
  usages: "gái",
  cooldowns: 0,
};

module.exports.run = async function ({ api, event }) {
  return api.sendMessage("Bạn hãy nhắn từ khóa như 'gái', 'gái xinh' để nhận ảnh nhé~", event.threadID, event.messageID);
};

module.exports.handleEvent = async function ({ api, event }) {
  const triggers = ["vdgai", "gai", "gái", "Vdgai", "gái xinh"];
  if (!triggers.some(t => event.body?.toLowerCase().includes(t.toLowerCase()))) return;

  const name = await api.getUserInfo(event.senderID).then(res => res[event.senderID].name);

  const attachment = global.ta && global.ta.length > 0 ? global.ta.splice(0, 1) : [];

  return api.sendMessage({
    body: `Mê gái vừa thôi ${name}!!`,
    attachment
  }, event.threadID, event.messageID);
};