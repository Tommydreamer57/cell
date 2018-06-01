WITH
channel AS (
    DELETE FROM cell_channel_messages
    WHERE id = ${message_id} AND author_id = ${author_id}
    RETURNING channel_id
),
allowed_channels AS (
    SELECT channel_id AS id FROM cell_channel_memberships
    WHERE member_id = ${author_id}
)
SELECT id, text, timestamp, author_id, channel_id
FROM cell_channel_messages
WHERE (
    channel_id = (SELECT channel_id FROM cell_channel_messages WHERE id = ${message_id})
    AND
    channel_id IN (SELECT id FROM allowed_channels)
)
AND (
    id != ${message_id}
    OR
    author_id != ${author_id}
)
ORDER BY timestamp;