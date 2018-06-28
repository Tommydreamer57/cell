INSERT INTO cell_channel_messages
(text, author_id, channel_id, timestamp)
VALUES
(${text}, ${author_id}, ${channel_id}, ${timestamp});

SELECT id, text, timestamp, author_id, channel_id
FROM cell_channel_messages
WHERE channel_id = ${channel_id};