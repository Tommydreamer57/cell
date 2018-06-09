WITH new_channel AS (
    INSERT INTO cell_channels
    (organization_id, created_by, name, private)
    VALUES
    (${organization_id}, ${created_by}, ${name}, ${_private})
    RETURNING
    id, name, organization_id, created_by AS owner_id, created_on AS timestamp, private
),
new_channel_member AS (
    INSERT INTO cell_channel_memberships
    (channel_id, member_id)
    SELECT id, owner_id FROM new_channel
    RETURNING
    member_id, channel_id
)
SELECT * FROM new_channel
JOIN new_channel_member ON new_channel_member.channel_id = new_channel.id;