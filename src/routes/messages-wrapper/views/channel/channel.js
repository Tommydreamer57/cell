import React from 'react';
// UTILS
import { GET, UTILS } from '../../../../http';
// STYLES
import { StyleSheet } from 'aphrodite-jss';
import wrapper from '../../../../styles/components';
import p from '../../../../styles/presets';

export default function create(update) {
    // TRACK INTERVALS
    const intervals = [];
    // COMPONENT
    return {
        // DATA
        data(model) {
            const getOrganization = () => GET.organizationByChannel(update, model.router.match.params.id);
            getOrganization();
            intervals.push(setInterval(getOrganization, 5000));
        },
        // CLEAR
        clear(model) {
            while (intervals.length) clearInterval(intervals.pop());
        },
        view(model) {
            let {
                organization: {
                    channels,
                    members: organizationMembers
                }
            } = model;
            let channel = channels.find(({ id }) => id == model.router.match.params.id);
            let channelMembers = organizationMembers.filter(({ id }) => channel.members.includes(id));
            return (
                <Channel id="channel" >
                    <h2>Members</h2>
                    {channelMembers.map(member => (
                        <div className='member' key={member.username} >
                            <h5>{member.first_name} {member.last_name}</h5>
                            <h5>@{member.username}</h5>
                        </div>
                    ))}
                </Channel>
            );
        }
    };
}

const styles = StyleSheet.create({
    channel: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4rem',
        '& h2': {
            marginBottom: 24
        },
        '& .member': {
            margin: '4px 0',
            padding: '6px 10px',
            border: `1px solid ${p.color}`,
            borderRadius: 5,
            display: 'flex',
            justifyContent: 'space-between',
            width: '50%'
        }
    }
});

const Channel = wrapper('section', styles.channel);
