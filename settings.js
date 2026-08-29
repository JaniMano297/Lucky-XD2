
const fs = require('fs');
const path = require('path');
const { getConfig } = require('./lib/configdb');
const settings = require('./settingss');

if (fs.existsSync(path.resolve('config.env'))) {
  require('dotenv').config({ path: path.resolve('config.env') });
}

// Helper to convert "true"/"false" strings to actual boolean
function convertToBool(text, trueValue = 'true') {
  return text === trueValue;
}

module.exports = {
  // ===== BOT CORE SETTINGS =====
  SESSION_ID: settings.SESSION_ID || process.env.SESSION_ID || "starcore~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0hxa1VwdXphaXN1Zm1venpHZDZaOVNUV3dEbm5XdFhodXlLb20yNFZWUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUhOQ1NSVHFxZXBKQktrQktoTDBFQkp3TTBaVVhLS1BCKzl1V2R5YXBHST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXSW5Wb3NBb0ZnK0xpSWNnUzlIQ28rNFIvU25STlJyTG9uVm0wcjF0eTJVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCQmlYZDFaWnRrTTE1c1NWZ29hVTRaR0VRdlBNMGF0a0xaZ1JBbTFvYUFFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFNQWt5bTYybWxtdlN6UlN4MWJRUW5VZHNTWTNNR3dJYXlwSkVCZitaMjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRiQWRxV0plY3JaWWFWVVV4R09iMXU1REluZTRUL1JXaE9VaTdLWk94V2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0ZVbktSVkRUaDhlYWh3OHBUZThlYi9LYnJscEhzaitVMEVhWklCVS9uYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZy9YK1ptZG16V1VsWEpBdmtIamhFQW5XTmFjdkdFVzdWV2dpWVJqNVZ6TT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRSVHp2cXBJSWhBcldGbHA3dkh0UTVRb0M2KzZZcFdvT2JCYXZRSnBDbGdoQnNjSXJ1MTAwelQ5cFMyRmJTd05PQ2pnUGZaRmFyL3U1UE16UUVTbkJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQyLCJhZHZTZWNyZXRLZXkiOiJqQUVpQUYzYVYvVy9ucno5N09xTUtNNjdHQURZZkRXTWdJeElEZ2lwVVM0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzA3MTYwODU3NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBQzIxQkE3M0YzMUM0OTJBNDg5NkZCNzc4RTI3NzQ2NiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzg3OTg2NDQ2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MjMwNzE2MDg1NzZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUM3MDA0OTBGNkVGNTVDNDU3QjZBOTI4QzE0OEVFOEMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc4Nzk4NjQ0Nn0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMDcxNjA4NTc2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkFDMzAxRDY5QkVCN0U1N0ZEODMxRUNEOTQ3Mjc2M0NEIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3ODc5ODY0NDd9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImxoY1g3QTZmUkFlQ0c1bGtMcENwU0EiLCJwaG9uZUlkIjoiZjY2Nzc0MGItYzhhYi00OTRjLTg0ZDYtNjcxMmI4MDE0ZGJlIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFwK01CSUJLRU9wc3N3MDQ1amRBa0l2dSs0UT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJySWt2OHV0dXhHTjhhRHhCZjAxcWN4RUM5cnM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTVJNQUxWSU4iLCJtZSI6eyJpZCI6IjkyMzA3MTYwODU3NjozQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjA3MTcyODgxMzk1ODM1OjNAbGlkIiwibmFtZSI6IkZhaXphbiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSkdtazY0Q0VQMkR5dFFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoibWNkYXA4aXBpYXV5TGYyQSs3Z3RzTlZFaHp5dm94K3U1U2tFK0xjbnZSRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNyt1Z1ZHTW14KzhQaHJrWG95bGhtdXBnZkRKaHVTNkIrVzRzRzUwQ0NrU0JmQ2tSRDlsNVp2L0hja2cvVUpTeC9obUNIRGRaNDNRRTEzS092UEorREE9PSIsImRldmljZVNpZ25hdHVyZSI6IkZXdC91bld2TUw0VmYzM2tHZVlJY3pKSXArQ2lnMG1VWUxCd081SWNLeWJMbExVNnE1UjNlZXV6ZGxiTmR0NlR3aTh2K1ZlZmcyN3d6cGZ0WUxBZEJRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMDcxNjA4NTc2OjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWm5IV3FmSXFZbXJzaTM5Z1B1NExiRFZSSWM4cjZNZnJ1VXBCUGkzSjcwUiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSUNBZ1MifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzg3OTg2NDQ0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUs2WSJ9Jj7w+AB3c3SjDNiZ0UTiST9Cq2t84+vjLWShf9Q3SqZ6OlHi/r6xO494gQE5yGZh6hBBEYL1C7hZh8jT5jnduWd0bGyHJsZzl3VpTVmnFtRGSjl2zX4WS92d/Kl1n4NfrNSD4R15zlMRduB9MmD4Ozb7FudMPCxZ5kO0Zhubap2856o1/gMEW+5aOUYtp+Wffd4nVhueFxed51Vi3z+XUdnStLqU+jwiSulS8OVmQcYomvv0a80xON8ZRD0Hj+SWKreve8na67F7Q865vOFXx8RudLObs+jPwgviXvWbn+H93RlkqnlE0CfrOeLTpnwGh78zjH45nyIqE1JzQnLtu2iv+8+hr94ySu8K7T7EjvXGebFwNudpof2gHbGm32XG0cSmfEhpEpfNKHtCR/YilLwX5aTLKRZWzHF5mh8UF7njpatzPl7nLl53Es0RE5GbPN9WbkprKes1NeMoTj1bzEL9YxZtaxsKR8WU4sl7icr9hG/fSY6Ipaywcqex8CgkJcUAIpztK+JrJDAP1qjzyC6ENdkNTTRRNaiZSsm6ScXZhKdP05edVqYjTJgUt4Pi4aWJq+8gSGICeZh4oC+TNc0Iy0K1QUMEQFUP/6MQQpauibb303nh2CAJOCHtIyjzPov5v6fgk9LytTum9Tz+gPiACV+SwjSnEaFr2MZQqJF+EKGRGkBVADGBfoY0BEkA9USkr0sbRG5ve6n3RlfJI5GQxB8vAD+0AFY45nZFZiFFGWVO578a3uUWGef0sRBUMQP/7iGJmVOUVh+bGo8KLKfe/r9w9+PZyPKMRxAVRgzI3kKgmGuXplWn83nWpmqBmhBj7nec/FL+E9H+YKzjEs22XAaQM5pMX6aEZdW2XNoBT3V3Ow9NLKNp/+AQSoIKvPrSDMc3N0Lp0JNHTBseizrgRcuyuUqbjYwVWt6PnkuBd3h1M5quty5GbjUSiJ8/RZtnNbTvYIjQY1XIRmK++bbtKHaAh8VGEP/d7M2CpwktmvtqIb1yRnC9H0cm5PbLdiq0jwrlPbESLpUkiZsHXd+Lban4VQqm4nXxubVzLZj9pNOZuEponGr5zYzE+MEb4l9rEx8a+XCj/C1DvVfwYYPRY/hb1//+ncG+8+X8x9+BvEr5fkX7ZRP6ezl1tg3dyEFJgfh9tSWF4mR9vyFCKtAlIecn2L+bnM2OB+/zEEeQxpkJEEqACmPsmwD4aAZGUfWCsNsj80MzTLMrRw3w8ew4Jqn0vg4AQVFCY5UFlZkceKIEjc/W8sJ9jzOQcAAA==",
  PREFIX: getConfig("PREFIX") || "." || settings.PREFIX,
  CHATBOT: getConfig("CHATBOT") || "on",
  BOT_NAME: process.env.BOT_NAME || getConfig("BOT_NAME") || "ʟᴜᴄᴋʏ-xᴅ",
  MODE: getConfig("MODE") || process.env.MODE || "public",
  REPO: process.env.REPO || "https://github.com/Tomilucky218/Lucky-XD2",
  BAILEYS: process.env.BAILEYS || "@whiskeysockets/baileys",

  // ===== OWNER & DEVELOPER SETTINGS =====
  OWNER_NUMBER: settings.OWNER_NUMBER || process.env.OWNER_NUMBER || "923071608576",
  OWNER_NAME: process.env.OWNER_NAME || getConfig("OWNER_NAME") || "ʟᴜᴄᴋʏ ➋➊➑",
  DEV: process.env.DEV || "256789966218",
  DEVELOPER_NUMBER: '256789966218@s.whatsapp.net',
  MENU_AUDIO_URL: process.env.MENU_AUDIO_URL || 'https://files.catbox.moe/3v5i11.mp3',
NEWSLETTER_JID: process.env.NEWSLETTER_JID || '120363420656466131@newsletter',

  // ===== AUTO-RESPONSE SETTINGS =====
  AUTO_REPLY: process.env.AUTO_REPLY || "false",
  AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
  AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*Just seen ur status 😆 🤖*",
  READ_MESSAGE: process.env.READ_MESSAGE || "false",
  REJECT_MSG: process.env.REJECT_MSG || "*📵 Calls are not allowed on this number unless you have permission. 🚫*",
  ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/4itzeu.jpg",
  LIVE_MSG: process.env.LIVE_MSG || "> ʙᴏᴛ ɪs sᴘᴀʀᴋɪɴɢ ᴀᴄᴛɪᴠᴇ ᴀɴᴅ ᴀʟɪᴠᴇ\n\n\nᴋᴇᴇᴘ ᴜsɪɴɢ ✦ʟᴜᴄᴋʏ xᴅ✦ ғʀᴏᴍ ʟᴜᴄᴋʏ ᴛᴇᴄʜ ʜᴜʙ  ɪɴᴄ⚡\n\n\n*© ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ - ᴍᴅ\n\n> ɢɪᴛʜᴜʙ :* github.com/Tomilucky218/Lucky-XD2",

  // ===== REACTION & STICKER SETTINGS =====
  AUTO_REACT: process.env.AUTO_REACT || "false",
  OWNER_REACT: process.env.OWNER_REACT || "false",
  CUSTOM_REACT: process.env.CUSTOM_REACT || "false",
  CUSTOM_REACT_EMOJIS: getConfig("CUSTOM_REACT_EMOJIS") || process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",
  STICKER_NAME: process.env.STICKER_NAME || "ᴋʜᴀɴ-ᴍᴅ",
  AUTO_STICKER: process.env.AUTO_STICKER || "false",

  // ===== MEDIA & AUTOMATION =====
  AUTO_RECORDING: process.env.AUTO_RECORDING || "false",
  AUTO_TYPING: process.env.AUTO_TYPING || "false",
  MENTION_REPLY: process.env.MENTION_REPLY || "false",
  MENU_IMAGE_URL: getConfig("MENU_IMAGE_URL") || "https://files.catbox.moe/4itzeu.jpg",

  // ===== SECURITY & ANTI-FEATURES =====
  ANTI_DELETE: process.env.ANTI_DELETE || "true",
  ANTI_CALL: process.env.ANTI_CALL || "false",
  ANTI_BAD_WORD: process.env.ANTI_BAD_WORD || "false",
  ANTI_LINK: process.env.ANTI_LINK || "true",
  ANTI_VV: process.env.ANTI_VV || "true",
  DELETE_LINKS: process.env.DELETE_LINKS || "false",
  ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "inbox",
  ANTI_BOT: process.env.ANTI_BOT || "true",
  PM_BLOCKER: process.env.PM_BLOCKER || "true",

  // ===== BOT BEHAVIOR & APPEARANCE =====
  DESCRIPTION: process.env.DESCRIPTION || "*© Powered By Lucky Tech Hub*",
  PUBLIC_MODE: process.env.PUBLIC_MODE || "true",
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
  AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "false",
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
  AUTO_BIO: process.env.AUTO_BIO || "false",
  WELCOME: process.env.WELCOME || "false",
  GOODBYE: process.env.GOODBYE || "false",
  ADMIN_ACTION: process.env.ADMIN_ACTION || "false",
  version: process.env.version || "1.5.0",
  TIMEZONE: settings.TIMEZONE || process.env.TIMEZONE || "Africa/Kampala",

  // ===== CATEGORY-SPECIFIC IMAGE URLs =====
  MENU_IMAGES: {
    '1': process.env.DOWNLOAD_MENU_IMAGE || "https://files.catbox.moe/4itzeu.jpg", // Download Menu
    '2': process.env.GROUP_MENU_IMAGE || "https://files.catbox.moe/4itzeu.jpg",   // Group Menu
    '3': process.env.FUN_MENU_IMAGE || "https://files.catbox.moe/4itzeu.jpg",       // Fun Menu
    '4': process.env.OWNER_MENU_IMAGE || "https://files.catbox.moe/4itzeu.jpg",   // Owner Menu
    '5': process.env.AI_MENU_IMAGE || "https://files.catbox.moe/4itzeu.jpg",         // AI Menu
    '6': process.env.ANIME_MENU_IMAGE || "https://files.catbox.moe/4itzeu.jpg",   // Anime Menu
    '7': process.env.CONVERT_MENU_IMAGE || "https://files.catbox.moe/4itzeu.jpg", // Convert Menu
    '8': process.env.OTHER_MENU_IMAGE || "https://files.catbox.moe/4itzeu.jpg",   // Other Menu
    '9': process.env.REACTION_MENU_IMAGE || "https://files.catbox.moe/4itzeu.jpg", // Reaction Menu
    '10': process.env.MAIN_MENU_IMAGE || "https://files.catbox.moe/4itzeu.jpg",    // Main Menu
    '11': process.env.LOGO_MAKER_MENU_IMAGE || "https://files.catbox.moe/4itzeu.jpg", // Logo Maker Menu
    '12': process.env.SETTINGS_MENU_IMAGE || "https://files.catbox.moe/4itzeu.jpg", // Settings Menu
    '13': process.env.AUDIO_MENU_IMAGE || "https://files.catbox.moe/4itzeu.jpg",  // Audio Menu
    '14': process.env.PRIVACY_MENU_IMAGE || "https://files.catbox.moe/4itzeu.jpg" // Privacy Menu
  }
};
