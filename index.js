const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('for you to use an ability', { type: 'WATCHING' });
});

client.on('message', async (msg) => {
    if (msg.channel.id === '744012452311859211') {
        if (msg.content.toLowerCase() === 'f') {
            const invites = await msg.guild.fetchInvites();
            if (invites && invites.size > 0) {
                const invite = invites.find((inv) => inv.maxAge === 0);
                if (msg.member.kickable) {
                    try {
                        if (invite) await msg.author.send(invite.url);
                        await msg.author.send('*flashed*');
                        await msg.member.kick('flashed');
                        msg.channel.send('*flashed*');
                    } catch (e) {
                        msg.channel.send('You may be too powerful to flash :(');
                    }
                } else {
                    msg.channel.send('You are too powerful to flash :(');
                }
            }
        } else if (msg.content.toLowerCase() === 'q') {
            msg.channel.send('sorry, lux does not have a q');
        } else if (msg.content.toLowerCase() === 'd') {
            const otherSummoners = [
                ['smite', 'smitten', 'smited'], // other
                ['heal', 'healthy', 'healed'], // self
                ['ghost', 'a ghost', 'ghosted'], // self
                ['barrier', 'shielded', 'barrier activated'], // self
                ['exhaust', 'exhausted', 'exhausted'], // other
                ['ignite', 'burning', 'ignited'], // other
                ['cleanse', 'clean', 'cleansed'], // self
                ['teleport', 'is here now', 'teleported'], // object
            ];
            const summoner = otherSummoners[Math.floor(Math.random() * otherSummoners.length)];

            switch (summoner[0]) {
                case 'heal':
                case 'ghost':
                case 'barrier':
                    try {
                        await msg.member.setNickname(summoner[1].substring(0, 32));
                        await msg.channel.send(`*${summoner[2]}*`);
                    } catch (e) {
                        msg.channel.send(`You may be too powerful to ${summoner[0]} :(`);
                    }
                    break;
                case 'cleanse':
                    try {
                        await msg.member.roles.remove(msg.member.roles.cache);
                        await msg.member.setNickname(summoner[1].substring(0, 32));
                        await msg.channel.send(`*${summoner[2]}*`);
                    } catch (e) {
                        msg.channel.send(`You may be too powerful to ${summoner[0]} :(`);
                    }
                    break;
                case 'smite':
                case 'exhaust':
                case 'ignite':
                    try {
                        await msg.channel.send(`who would you like to ${summoner[0]}?`);
                        msg.channel.awaitMessages(
                            (message) => message.mentions.members
                                && message.mentions.members.size > 0
                                && message.member.id === msg.member.id, {
                                max: 1,
                                time: 30000,
                                errors: ['time'],
                            },
                        ).then(async (collected) => {
                            const mentioned = Array.from(
                                Array.from(collected.values())[0].mentions.members.values(),
                            )[0];
                            if (mentioned) {
                                try {
                                    await mentioned.setNickname(summoner[1].substring(0, 32));
                                    await msg.channel.send(`*${summoner[2]} <@!${mentioned.id}>*`);
                                } catch (e) {
                                    msg.channel.send(`That user may be too powerful to ${summoner[0]} :(`);
                                }
                            }
                        }).catch(() => msg.channel.send(`you must provide someone to ${summoner[0]}`));
                    } catch (e) {
                        msg.channel.send(`I may be too weak to ${summoner[0]} :(`);
                    }
                    break;
                case 'teleport':
                    await msg.channel.send(`where would you like to ${summoner[0]}?`);
                    msg.channel.awaitMessages(
                        (message) => message.mentions.channels
                            && message.mentions.channels.size > 0
                            && message.member.id === msg.member.id, {
                            max: 1,
                            time: 30000,
                            errors: ['time'],
                        },
                    ).then(async (collected) => {
                        const mentioned = Array.from(
                            Array.from(collected.values())[0].mentions.channels.values(),
                        )[0];
                        if (mentioned) {
                            try {
                                await msg.channel.send(`*${summoner[2]} to <#${mentioned.id}>*`);
                                await mentioned.send(`<@!${msg.member.id}> ${summoner[1]}`);
                            } catch (e) {
                                msg.channel.send(`I can't ${summoner[0]} there :(`);
                            }
                        }
                    }).catch(() => msg.channel.send(`you must provide somewhere to ${summoner[0]}`));
                    break;
                default:
                    break;
            }
        } else if (msg.content.toLowerCase() === 'j' || msg.content.toLowerCase() === 'l' || msg.content.toLowerCase() === 'm' || msg.content.toLowerCase() === 't') {
            msg.channel.send('what on earth are your keybinds???');
        } else if (msg.content.toLowerCase() === 'r') {
            const ultMessages = [
                'DEMACIA!',
                'JUSTICE!!!',
                'BY THE LIGHT!',
                'in my sights...',
                'uh uh uh...',
                'TRUE POWER',
                'BEHOLD',
                'time for a reckoning...',
                'it ain\'t luck, it\'s destiny',
                'shark!',
                'feeding time!',
                'i\'m not done yet...',
                'prepare for your finale',
                'iiiii bet you taste like chicken...',
            ];

            const ult = ultMessages[Math.floor(Math.random() * ultMessages.length)];
            msg.channel.send(ult);
        } else if (msg.content.toLowerCase() === 'e') {
            msg.channel.send('https://img.vashevko.com/klMfhI.gif');
        } else if (msg.content.toLowerCase() === 'w') {
            msg.channel.send('well darn i didn\'t come up with a joke for that one');
        }
    } else if (['f', 'd', 'q', 'r', 'e', 'w', 'j', 'l', 'm', 't'].includes(msg.content.toLowerCase())) {
        msg.channel.send('<#744012452311859211> pls or ian will kill me');
    }
});

client.login('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
