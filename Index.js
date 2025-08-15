js
require('dotenv').config();
const { Client, GatewayIntentBits, PermissionsBitField, Collection, MessageActionRow, MessageButton } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const prefix = '-';
client.commands = new Collection();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Helper to check admin perms
function isAdmin(member) {
  return member.permissions.has(PermissionsBitField.Flags.Administrator);
}

client.on('messageCreate', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  // بينج
  if (cmd === 'بينج') {
    return message.reply('pong!');
  }

  // قفل الشات
  if (cmd === 'قفل') {
    if (!isAdmin(message.member)) return message.reply('ما عندكش صلاحيات.');
    await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: false });
    return message.reply('تم قفل الشات.');
  }
if (cmd === 'فتح') 
    if (!isAdmin(message.member)) return message.reply('ما عندكش صلاحيات.');
    await message.channel.permissionOverwrites.edit(message.guild.roles.everyone,  SendMessages: true );
    return message.reply('تم فتح الشات.');
  

  // لعبة روليت (حظ)
  if (cmd === 'روليت') 
    const chance = Math.random();
    if (chance < 0.3) return message.reply('خسرت 😢');
    else return message.reply('ربحت 🎉');
  

  // لعبة ريبلكا (حقيقة أو تحدي)
  if (cmd === 'ريبلكا') 
    const options = ['حقيقة', 'تحدي'];
    const choice = options[Math.floor(Math.random() * options.length)];
    return message.reply(`اختار لك: *{choice}*`);
  }

  // لعبة تخمين الأعلام (بسيط)
  if (cmd === 'تخمين') {
    const flags = {
      مصر: '🇪🇬',
      السعودية: '🇸🇦',
      الامارات: '🇦🇪',
      تركيا: '🇹🇷',
      فرنسا: '🇫🇷',
    };
    const countries = Object.keys(flags);
    const picked = countries[Math.floor(Math.random() * countries.length)];
    message.channel.send(`ما هو علم: *${picked}* ؟ أكتب اسم البلد بسرعة!`);
    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector({ filter, time: 15000, max: 1 });

    collector.on('collect', m => {
      if (m.content.toLowerCase() === picked.toLowerCase()) {
else 
        m.reply(`غلط! الصح هو:{picked} flags[picked]`);
      );
  

  // فتح تذكرة (سهل مثال)
  if (cmd === 'فتح_تذكرة') 
    const channel = await message.guild.channels.create(`ticket-{message.author.username}`, {
      type: 0, // text channel
      permissionOverwrites: [
        {
          id: message.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: message.author.id,
          allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
        },
      ],
    });
    return message.reply(`تم فتح تذكرتك في channel`);
  

  // إغلاق تذكرة (يغلق القناة لو اسمها فيها ticket)
  if (cmd === 'اغلاق_تذكرة') 
    if (!message.channel.name.startsWith('ticket-'))
      return message.reply('هذه ليست تذكرة.');
    await message.channel.delete();
  

  // بينج (Ping)
  if (cmd === 'بينج') 
    return message.reply(`البوت شغال، وقت الاستجابة:{client.ws.ping}ms`);
  }

  // مافيا (نرد عشوائي)
  if (cmd === 'مافيا') {
    const roll = Math.floor(Math.random() * 6) + 1;
    return message.reply(`رميت نرد وطلعت: ${roll}`);
  }

  // بدء جيف اواي
  if (cmd === 'بدء_جيف_اواي') {
    if (!isAdmin(message.member)) return message.reply('ما عندكش صلاحيات.');
    let prize = args.join(' ');
if (!prize) prize = 'جائزة عشوائية';
    const giveawayMsg = await message.channel.send(`🎉 *جيف اواي بدأ على:*{prize} \nاضغط 🎉 للمشاركة!`);
    await giveawayMsg.react('🎉');

    setTimeout(async () => {
      const usersReacted = (await giveawayMsg.reactions.cache.get('🎉').users.fetch()).filter(u => !u.bot);
      if (usersReacted.size === 0) {
        message.channel.send('ما فيش مشاركين في الجيف اواي!');
        return;
      }
      const winner = usersReacted.random();
      message.channel.send(`الفائز هو: ${winner}`);
    }, 60000); // 60 ثانية
  }

  // إنهاء جيف اواي (مسح الرسالة)
  if (cmd === 'انهاء_جيف_اواي') {
    if (!isAdmin(message.member)) return message.reply('ما عندكش صلاحيات.');
    return message.reply('لتنهي الجيف اواي، امسح الرسالة يدوياً.');
  }
});

client.login(process.env.TOKEN);

