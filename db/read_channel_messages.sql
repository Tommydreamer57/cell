SELECT channel_id, created_on, cell_channel_messages.id AS message_id, author_id, text, timestamp, cell_users.id AS user_id, first_name, last_name, username, email, admin
FROM cell_channels
JOIN cell_channel_messages
ON cell_channel_messages.channel_id = cell_channels.id
JOIN cell_users ON cell_channel_messages.author_id = cell_users.id
WHERE channel_id = ${id};