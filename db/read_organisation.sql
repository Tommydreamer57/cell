WITH
organisations AS (
    SELECT
    -- ORGANISATIONS
    cell_organisations.id AS organisation_id,
    cell_organisations.name AS organisation_name,
    cell_organisations.created_by AS organisation_owner_id,
    cell_organisations.created_on AS organisation_timestamp,
    -- CHANNELS
    cell_channels.id AS organisation_channel_id,
    -- MEMBERS
    cell_organisation_memberships.member_id AS organisation_member_id
    FROM cell_organisations
    JOIN cell_channels ON cell_channels.organisation_id = cell_organisations.ID
    JOIN cell_organisation_memberships ON cell_organisation_memberships.organisation_id = cell_organisations.id
),
channels AS (
    SELECT
    -- CHANNELS
    cell_channels.id AS channel_id,
    cell_channels.name AS channel_name,
    cell_channels.created_on AS channel_timestamp,
    cell_channels.created_by AS channel_owner_id,
    cell_channels.private AS channel_private,
    -- MEMBERS
    cell_channel_memberships.member_id AS channel_member_id
    FROM cell_channels
    JOIN cell_channel_memberships ON cell_channel_memberships.channel_id = cell_channels.id
    WHERE cell_channels.private = false OR cell_channels.id IN (SELECT channel_id FROM cell_channel_memberships WHERE member_id = ${user_id})
),
messages AS (
    SELECT
    -- MESSAGES
    id AS message_id,
    text AS message_text,
    timestamp AS message_timestamp,
    author_id AS message_author_id,
    channel_id AS message_channel_id
    FROM cell_channel_messages
),
members AS (
    SELECT
    id AS member_id,
    first_name AS member_first_name,
    last_name AS member_last_name,
    username AS member_username,
    email AS member_email
    FROM cell_users
)
SELECT *
-- ORGANISATIONS
FROM organisations
-- CHANNELS
LEFT OUTER JOIN channels
ON channels.channel_id = organisations.organisation_channel_id
AND channels.channel_member_id = organisations.organisation_member_id
-- MESSAGES
LEFT OUTER JOIN messages
ON messages.message_channel_id = channels.channel_id
AND messages.message_author_id = channels.channel_member_id
-- MEMBERS
JOIN members
ON members.member_id = organisations.organisation_member_id
WHERE organisation_id = ${organisation_id}
OR organisation_id IN (SELECT organisation_id FROM cell_channels WHERE cell_channels.id = ${channel_id})
ORDER BY messages.message_timestamp;