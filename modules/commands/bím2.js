module.exports.config = {
  name: "bím",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Sửa bởi ChatGPT",
  description: "Random Ảnh",
  commandCategory: "Ảnh",
  usages: "bím",
  cooldowns: 2,
  dependencies: {
    "axios": ""
  }
};

module.exports.run = async ({ api, event, Currencies }) => {
  const axios = global.nodemodule["axios"];
  
  var link = [
    "https://i.imgur.com/U3ZNbYF.jpeg",
    "https://i.imgur.com/0Z6U0Vs.jpeg",
    "https://i.imgur.com/cX9wD3S.jpeg",
    "https://i.imgur.com/H3PW7VX.jpeg",
    "https://i.imgur.com/3poR7BN.jpeg",
    "https://i.imgur.com/aS3XQyW.jpeg",
    "https://i.imgur.com/RcVhFNB.jpeg",
    "https://i.imgur.com/IeqxXOf.jpeg",
    "https://i.imgur.com/7iqWXkl.jpeg",
    "https://i.imgur.com/MhRZmch.jpeg",
    "https://i.imgur.com/U3ZNbYF.jpeg",
    "https://i.imgur.com/0Z6U0Vs.jpeg",
    "https://i.imgur.com/cX9wD3S.jpeg",
    "https://i.imgur.com/H3PW7VX.jpeg",
    "https://i.imgur.com/3poR7BN.jpeg",
    "https://i.imgur.com/aS3XQyW.jpeg",
    "https://i.imgur.com/RcVhFNB.jpeg",
    "https://i.imgur.com/IeqxXOf.jpeg",
    "https://i.imgur.com/7iqWXkl.jpeg",
    "https://i.imgur.com/MhRZmch.jpeg"
    // Nếu muốn bạn có thể copy thêm ra để đủ số link như list cũ của bạn.
  ];

  var data = await Currencies.getData(event.senderID);
  var money = data.money;

  if (money < 1000) {
    return api.sendMessage("Bạn cần 1000 VND để xem ảnh.", event.threadID, event.messageID);
  } else {
    Currencies.setData(event.senderID, { money: money - 1000 });

    const url = link[Math.floor(Math.random() * link.length)];
    try {
      const response = await axios.get(url, { responseType: 'stream' });

      return api.sendMessage({
        body: `Những Chiếc Bím 🐧\n» Bạn vừa trừ 1000 VND «`,
        attachment: response.data
      }, event.threadID);
    } catch (err) {
      console.error("Lỗi tải ảnh:", err.message);
      return api.sendMessage("Không tải được ảnh, có thể link bị lỗi!", event.threadID);
    }
  }
};