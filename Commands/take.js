// commands/take.js
import { downloadMediaMessage } from '@whiskeysockets/baileys';
import webp from 'node-webpmux';
import crypto from 'crypto';

const takeCommand = {
    name: 'take',
    description: 'Voler un sticker en modifiant son nom de pack',
    aliases: ['steal', 'rename'],
    category: 'stickers',
    restrictions: {}, // Commande publique

    execute: async ({ msg, client, sender, args, isGroup, isOwner, isAdmin, pushname, prefix, config }) => {
        const NEWSLETTER_ID = config.menuMedia.newsletter.replace('@newsletter', '');
        const newsletterJid = config.menuMedia.newsletter;
        const newsletterName = config.menuMedia.newsletterName || "Take Channel";

        try {
            // Vérifier si c'est une réponse à un sticker
            const quotedMessage = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
            
            if (!quotedMessage?.stickerMessage) {
                return await client.sendMessage(sender, { 
                    text: `❌ Réponds à un sticker avec ${prefix}take <nom du pack>` 
                });
            }

            // Récupérer le nom du pack (avec valeur par défaut)
            const packname = args.length > 0 ? args.join(' ') : 'ＮＯ　ＮＡＭＥ  ࿐بلا اسم ';

            // ===== 1. RÉACTION =====
            await client.sendMessage(sender, { 
                react: { text: "👁️", key: msg.key } 
            });

            // Message de chargement (simple)
            const loadingMsg = await client.sendMessage(sender, {
                text: `⏳ Traitement du sticker...`
            });

            try {
                // Télécharger le sticker
                const stickerBuffer = await downloadMediaMessage(
                    {
                        key: {
                            remoteJid: sender,
                            fromMe: false,
                            id: msg.message?.extendedTextMessage?.contextInfo?.stanzaId
                        },
                        message: quotedMessage,
                        messageType: 'stickerMessage'
                    },
                    'buffer',
                    {},
                    {
                        logger: console,
                        reuploadRequest: client.updateMediaMessage
                    }
                );

                if (!stickerBuffer) {
                    throw new Error("Impossible de télécharger le sticker");
                }

                // Ajouter les métadonnées avec webpmux
                const img = new webp.Image();
                await img.load(stickerBuffer);

                // Créer les métadonnées
                const metadata = {
                    'sticker-pack-id': crypto.randomBytes(32).toString('hex'),
                    'sticker-pack-name': packname,
                    'emojis': ['🤖']
                };

                // Créer le buffer exif
                const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
                const jsonBuffer = Buffer.from(JSON.stringify(metadata), 'utf8');
                const exif = Buffer.concat([exifAttr, jsonBuffer]);
                exif.writeUIntLE(jsonBuffer.length, 14, 4);

                // Ajouter l'exif
                img.exif = exif;

                // Obtenir le buffer final
                const finalBuffer = await img.save(null);

                // Supprimer le message de chargement
                await client.sendMessage(sender, { delete: loadingMsg.key });

                // ===== 2. ENVOYER UNIQUEMENT LE STICKER AVEC NEWSLETTER =====
                await client.sendMessage(sender, {
                    sticker: finalBuffer,
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: newsletterJid,
                            newsletterName: newsletterName,
                            serverMessageId: -1
                        }
                    }
                }, { quoted: msg });

                // Réaction finale
                await client.sendMessage(sender, { 
                    react: { text: "✅", key: msg.key } 
                });

                console.log(`✅ Sticker volé par ${pushname}: ${packname}`);

            } catch (error) {
                console.error('Erreur traitement sticker:', error);
                await client.sendMessage(sender, { 
                    text: '❌ Erreur lors du traitement du sticker.',
                    edit: loadingMsg.key
                });
            }

        } catch (error) {
            console.error('❌ Erreur take:', error);
            await client.sendMessage(sender, { 
                text: '❌ Erreur lors de l\'exécution de la commande.' 
            });
            await client.sendMessage(sender, { 
                react: { text: "❌", key: msg.key } 
            });
        }
    }
};

export default takeCommand;