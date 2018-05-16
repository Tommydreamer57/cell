module.exports = {
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
        console.log(arr);
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