// commands/merci.js
const merciCommand = {
  name: 'merci',
  description: 'Remercie les personnes qui contribuent au bot',
  aliases: ['thanks', 'credits', 'remerciements'],
  category: 'informations',
  restrictions: {},
  
  execute: async ({ msg, client, sender, args, isGroup, isOwner, isAdmin, pushname, prefix, config }) => {
    
    const NEWSLETTER_ID = config.menuMedia.newsletter.replace('@newsletter', '');
    const newsletterJid = config.menuMedia.newsletter;
    const newsletterName = config.menuMedia.newsletterName || "Merci Channel";
    const IMAGE_URL = config.menuMedia.image;
    const SOURCE_URL = config.menuMedia.sourceUrl;

    // ===== DÉCOR MODIFIABLE =====
    // ↓↓↓ TU PEUX MODIFIER LES NOMS ICI ↓↓↓
    const merciText = `
╭━━━〔 𝗠𝗘𝗥𝗖𝗜 𝗔̀ 𝗧𝗢𝗨𝗦 〕━━━┈⪨
┇┏───♦︎
┃│ 👤 Demandé par : ${pushname}
┃│ 🙏 Remerciements spéciaux
┇┗───♦︎
╰━━━━━━━━━━━━━━━┈⪨

┌── ✦ *CONTRIBUTEURS* ✦
├ 👑 NO name– Créateur & Développeur
├ 🧪 blood Angels le grand geni 
├ 🛡️ Druzz mon bon grand frère 
└────────────────
si tu veux être sité faut donner money ou paid si tu n'a pas compris.
┌── ✦ *REMERCIEMENTS* ✦
├ 💝 À tous les utilisateurs
├ 🌟 Aux testeurs et rapporteurs de bugs
├ 🔧 À la communauté WhatsApp
└────────────────

┌── ✦ *INFORMATIONS* ✦
├ 🤖 Bot : ${config.botName}
├ 📦 Version : ${config.version}
├ 📢 Newsletter : @${NEWSLETTER_ID}
└────────────────

> *ʙʏ 𝚠𝚊𝚝𝚜𝚊𝚙𝚙 𝚘𝚏𝚏𝚒𝚌𝚒𝚎𝚕*
    `;

    try {
      // Réaction
      await client.sendMessage(sender, { 
        react: { text: "🙏", key: msg.key } 
      });

      // Bannière publicitaire
      const externalAdReply = {
        title: `🙏 ${pushname} • REMERCIEMENTS 🙏`,
        body: `${config.botName}`,
        thumbnailUrl: IMAGE_URL,
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: SOURCE_URL
      };

      // Envoi du message
      await client.sendMessage(sender, {
        text: merciText,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: externalAdReply,
          forwardedNewsletterMessageInfo: {
            newsletterJid: newsletterJid,
            newsletterName: newsletterName,
            serverMessageId: -1
          }
        },
        mentions: [sender]
      }, { quoted: msg });

      // Réaction finale
      await client.sendMessage(sender, { 
        react: { text: "✅", key: msg.key } 
      });

    } catch (error) {
      console.error('❌ Erreur merci:', error);
      await client.sendMessage(sender, { 
        text: '❌ Une erreur est survenue.' 
      });
    }
  }
};

export default merciCommand;