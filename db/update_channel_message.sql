WITH
new_message AS (
    UPDATE cell_channel_messages
    SET text = ${text}, updated = CURRENT_TIMESTAMP
    WHERE id = ${message_id} AND author_id = ${author_id}
    RETURNING id, text, timestamp, author_id, channel_id, updated
),
allowed_channels AS (
    SELECT channel_id AS id FROM cell_channel_memberships
    WHERE member_id = ${author_id}
)
SELECT
n.id AS new_message_id,
n.text AS new_message_text,
n.author_id AS new_message_author_id,
n.timestamp AS new_message_timestamp,
n.updated AS new_message_updated,
m.id, m.text, m.timestamp, m.author_id, m.updated
FROM cell_channel_messages m
FULL OUTER JOIN new_message n ON n.channel_id = m.channel_id
WHERE (
    m.channel_id = (SELECT channel_id FROM cell_channel_messages WHERE id = ${message_id})
    AND
    m.channel_id IN (SELECT id FROM allowed_channels)
)
ORDER BY m.timestamp;
