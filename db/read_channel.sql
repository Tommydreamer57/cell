SELECT
cell_channels.id AS channel_id,
cell_users.id AS member_id,
cell_channel_messages.id AS message_id,
first_name, last_name, username, email, admin, organization_id, name, created_by, created_on, private, text, timestamp
FROM cell_channels
LEFT OUTER JOIN cell_channel_memberships ON cell_channel_memberships.channel_id = cell_channels.id
LEFT OUTER JOIN cell_users ON cell_users.id = cell_channel_memberships.member_id
LEFT OUTER JOIN cell_channel_messages ON cell_channel_messages.author_id = cell_users.id AND cell_channel_messages.channel_id = cell_channels.id
WHERE cell_channels.id = ${channel_id};