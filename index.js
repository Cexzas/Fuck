const { default: makeWASocket, DisconnectReason, makeInMemoryStore, useMultiFileAuthState, jidDecode, Browsers } = require('@whiskeysockets/baileys')
const fs = require('fs')
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, sleep } = require('./Database/myfunction');

const logger = require("./Database/logger.js");

async function connectToWhatsApp () { 
const store = makeInMemoryStore({ 
        logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
})
const { state, saveCreds } = await useMultiFileAuthState('./Database/session/session/session')
    const sock = makeWASocket({ 
        auth: state,
        printQRInTerminal: true, 
        logger: pino({ level: "fatal" }), 
        browser: ['Ubuntu', 'Edge', '5.1.0'],
        emitOwnEvents: false, 
        markOnlineOnConnect: true,
        syncFullHistory: false,
        fireInitQueries: false
    })
    
    store.bind(sock.ev)
    sock.public = true
    sock.serializeM = (m) => smsg(sock, m, store);
    sock.ev.on ('creds.update', saveCreds);
    sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update
      if (connection === "close") {
      const errorStatusCode = lastDisconnect.error.output?.payload?.statusCode;
      const errorMessage = lastDisconnect.error.output?.payload?.message;
      if (errorStatusCode === 515) {
        logger("error", "KONEKSI", errorMessage);
        connectToWhatsApp();
      }
      if (errorStatusCode === 503) {
        logger("error", "KONEKSI", errorMessage);
        if (errorMessage === "Stream Errored (unknown)") {
          return process.exit();
        }
      }
      if (errorStatusCode === 500) {
        logger("error", "KONEKSI", errorMessage);
        connectToWhatsApp();
      }
      if (errorStatusCode === 440) {
        logger("error", "KONEKSI", errorMessage);
        process.exit();
      }
      if (errorStatusCode === 428) {
        logger("error", "KONEKSI", errorMessage);
        connectToWhatsApp();
      }
      if (errorStatusCode === 408) {
        logger("error", "KONEKSI", errorMessage);
        connectToWhatsApp();
      }
      if (errorStatusCode === 401) {
        logger("error", "KONEKSI", errorMessage);
        sock.logout();
        connectToWhatsApp();
      }
      console.log(lastDisconnect.error);
    } else if(connection === 'open') {
            console.log('opened connection')
        }
    })
    
    sock.ev.on('group-participants.update', async (anu) => { 
    console.log(anu) 
    try { 
    let metadata = await sock.groupMetadata(anu.id) 
    let participants = anu.participants 
    for (let num of participants) { 
    try { 
    ppuser = await sock.profilePictureUrl(num, 'image') 
    } catch (err) { 
    ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60' 
    } 
    try { 
    ppgroup = await sock.profilePictureUrl(anu.id, 'image') 
    } catch (err) { 
    ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60' 
    } 
    memb = metadata.participants.length 
    XeonWlcm = await getBuffer(ppuser) 
    XeonLft = await getBuffer(ppuser) 
    if (anu.action == 'add') { 
    const xeonbuffer = await getBuffer(ppuser) 
    let xeonName = num 
    const xmembers = metadata.participants.length 
    sock.sendMessage(anu.id, { text: `hi yang baru bergabung ${xeonName.split("@")[0]}\n\nDilarang kirim sticker/link\n\nVideo Biasanya Runtime Malem Dikirim 99 video, Standby group` }) 
    } 
   } 
  } catch (err) {
console.log(err) 
 }
})
    
    sock.ev.on('messages.upsert', async chatUpdate => {
        try {
            mek = chatUpdate.messages[0]
            if (!mek.message) return
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            if (mek.key && mek.key.remoteJid === 'status@broadcast') return
            if (!sock.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
            m = smsg(sock, mek, store)
            require('./sock')(sock, m, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    })
    
    sock.decodeJid = (jid) => {
    if (!jid) return jid; 
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {}; 
      return decode.user && decode.server && decode.user + '@' + decode.server || jid;
    } else return jid;
  }; 
  sock.ev.on('contacts.update', update => { 
    for (let contact of update) {
      let id = sock.decodeJid(contact.id); 
      if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
    }
   });
   
   sock.sendText = (jid, text, quoted = '', options) => sock.sendMessage(jid, { text: text, ...options }, { quoted })
   
   sock.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => { 
   let quoted = message.msg ? message.msg : message 
   let mime = (message.msg || message).mimetype || '' 
   let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0] 
   const stream = await downloadContentFromMessage(quoted, messageType) 
   let buffer = Buffer.from([]) 
   for await(const chunk of stream) { 
   buffer = Buffer.concat([buffer, chunk]) 
   } 
   let type = await FileType.fromBuffer(buffer) 
   trueFileName = attachExtension ? (filename + '.' + type.ext) : filename 
   await fs.writeFileSync(trueFileName, buffer) 
   return trueFileName 
 }
}

connectToWhatsApp()