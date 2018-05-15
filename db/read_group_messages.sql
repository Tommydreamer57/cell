SELECT direct_message_group_id, created_on, cell_direct_message_group_messages.id AS message_id, author_id, text, timestamp, cell_users.id AS user_id, first_name, last_name, username, email, admin
FROM cell_direct_message_groups
JOIN cell_direct_message_group_messages
ON cell_direct_message_group_messages.direct_message_group_id = cell_direct_message_groups.id
JOIN cell_users ON cell_direct_message_group_messages.author_id = cell_users.id
WHERE direct_message_group_id = ${id};