function assign(regex, obj, ...except) {
    let newObj = {};
    for (let key in obj) {
        if (key.match(regex) && !except.includes(key.replace(regex, ''))) {
            newObj[key.replace(regex, '')] = obj[key];
        }
    }
    return newObj;
}

function remove(regex, obj) {
    let newObj = {};
    for (let key in obj) {
        if (!key.match(regex)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}

module.exports = {
    convertUpdatedMessages(arr) {
        return arr.map(message => {
            if (message.id === message.new_message_id) {
                return assign(/^new_message_/, message);
            } else return remove(/^new_message/, message);
        });
    },
    convertUser(arr) {
        let user = assign(/^/, arr[0], 'organisation_id', 'channel_id');
        user.organisations = arr
            .reduce((organisations, obj) => {
                if (obj.organisation_id && !organisations.some(org => org === obj.organisation_id)) {
                    organisations.push(obj.organisation_id);
                }
                return organisations;
            }, []);
        user.channels = arr
            .reduce((channels, obj) => {
                if (obj.channel_id && !channels.some(channel => channel === obj.channel_id)) {
                    channels.push(obj.channel_id);
                }
                return channels;
            }, []);
        return user;
    },
    convertEntireOrganisation(arr) {
        // ORGANISATION
        let organisation = assign(/^organisation_/, arr[0], 'channel_id', 'member_id');
        // MEMBERS
        organisation.members = arr
            .reduce((members, obj) => {
                if (!members.some(member => member.id === obj.member_id)) {
                    let newMember = assign(/^member_/, obj);
                    members.push(newMember);
                }
                return members;
            }, []);
        // CHANNELS
        organisation.channels = arr
            .reduce((channels, obj) => {
                if (obj.channel_id && !channels.some(channel => channel.id === obj.channel_id)) {
                    let newChannel = assign(/^channel_/, obj, 'member_id');
                    // MEMBERS
                    newChannel.members = arr
                        .reduce((members, { channel_id, member_id }) => {
                            if (!members.includes(member_id) && channel_id === newChannel.id) {
                                members.push(member_id);
                            }
                            return members;
                        }, []);
                    // MESSAGES
                    newChannel.messages = arr
                        .reduce((messages, obj) => {
                            if (obj.channel_id === newChannel.id && obj.message_id && !messages.some(message => message.id === obj.message_id)) {
                                messages.push(assign(/^message_/, obj, 'channel_id'));
                            }
                            return messages;
                        }, []);
                    channels.push(newChannel);
                }
                return channels;
            }, []);
        // ORGANISATION
        return organisation;
    },
    convertOrganisation(arr) {
        // MEMBERS
        let members = arr.reduce((members, {
            // DESTRUCTURE
            user_id,
            first_name,
            last_name,
            username,
            email,
            admin
        }) => {
            // DO NOT ADD DUPLICATES
            if (!members.some(member => member.id === user_id)) {
                members.push({
                    id: user_id,
                    first_name,
                    last_name,
                    username,
                    email,
                    admin,
                    channels: []
                });
            }
            // RETURN ALL
            return members;
        }, []);
        // CHANNELS
        let channels = arr.reduce((channels, {
            // DESTRUCTURE
            user_id,
            channel_id,
            channel_name: name,
            channel_timestamp: timestamp,
            channel_owner_id: owner_id,
            channel_count: member_count,
            private
        }) => {
            // FIND MEMEBER
            let member = members.find(member => member.id === user_id);
            // ADD CHANNEL ID TO MEMBER CHANNELS
            member.channels.push(channel_id);
            // FIND CHANNEL
            let channel = channels.find(channel => channel.id === channel_id);
            // DO NOT ADD DUPLICATES
            if (channel) {
                // ADD USER ID TO CHANNEL MEMBERS
                channel.members.push(user_id);
            } else {
                // ADD CHANNEL
                channel = {
                    id: channel_id,
                    name,
                    timestamp,
                    owner_id,
                    private,
                    member_count,
                    members: [user_id]
                };
                channels.push(channel);
            }
            // RETURN ALL
            return channels;
        }, []);
        // ORGANISATION
        let {
            organisation_id: id,
            organisation_name: name,
            organisation_timestamp: timestamp,
            organisation_owner_id: owner_id,
            organisation_count: member_count
        } = arr[0];
        return {
            id,
            name,
            timestamp,
            owner_id,
            member_count,
            channels,
            members
        };
    },
    convertChannel(arr) {
        // MEMBERS
        let members = arr.reduce((members, {
            // DESTRUCTURE
            member_id,
            first_name,
            last_name,
            username,
            email,
            admin
        }) => {
            // DO NOT ADD DUPLICATES
            if (!members.some(member => member.id === member_id)) {
                members.push({
                    id: member_id,
                    first_name,
                    last_name,
                    username,
                    email,
                    admin
                });
            }
            return members;
        }, []);
        // MESSAGES
        let messages = arr.filter(({ message_id }) => message_id).map(({
            message_id,
            member_id,
            first_name,
            last_name,
            username,
            email,
            admin,
            text,
            timestamp
        }) => ({
            id: message_id,
            member_id,
            first_name,
            last_name,
            username,
            email,
            admin,
            text,
            timestamp
        }))
        // CHANNEL
        let {
            organisation_id,
            channel_id,
            name,
            created_by,
            created_on,
            private
        } = arr[0];
        return {
            organisation_id,
            id: channel_id,
            name,
            created_by,
            created_on,
            private,
            members,
            messages
        };
    }
}