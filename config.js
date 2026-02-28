// Configuration du bot
const config = {
  // Préfixes des commandes
  prefixes: ['!', '.', '√'],
  
  // Propriétaire du bot (numéros avec indicatif, sans +)
  OWNER_NUMBER: '24177994005',
  
  // Liste des admins (numéros autorisés à utiliser certaines commandes)
  adminNumbers: [
    '24177994005',
    '24177994005'
  ],
  
  // Paramètres généraux
  botName: 'MONSTER MD',
  ownerName: 'NO NAME',
  version: '2.0.0',
  
  // Médias pour le menu
  menuMedia: {
    image: 'https://files.catbox.moe/8ifxde.jpg',
    audio: 'https://files.catbox.moe/f1a6hn.mp3',  // Nouveau lien audio
    newsletter: '120363405309191358@newsletter',
    newsletterName: '🫟𝗠𝗢𝗡𝗦𝗧𝗘𝗥 𝗠𝗗🫟',
    sourceUrl: 'https://whatsapp.com/channel/0029Vb7Ly2eA89MhgneDh33T',
    reaction: '🤖'
  },
  
  // Token pour l'API Telegram
  telegramBotToken: '8102747933:AAGM2ySdz8qi8wAy5S8Zz2wXreW2I1e8-zw',
  
  // Messages par défaut
  messages: {
    onlyOwner: "❌ Cette commande est réservée as no name ou d'autres propriétaire.",
    onlyAdmin: "❌ Cette commande est réservée as no name ou d'autres autre administrateurs.",
    onlyGroup: '❌ Cette commande ne peut être utilisée que dans les groupes.',
    error: '❌ Une erreur est survenue.'
  }
};

export default config;