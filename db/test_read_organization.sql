UPDATE cell_organization_memberships
SET
previous_last_visited = last_visited,
last_visited = CURRENT_TIMESTAMP
WHERE member_id = 1
AND organization_id = 2; -- organization_id

UPDATE cell_channel_memberships
SET
previous_last_visited = last_visited,
last_visited = CURRENT_TIMESTAMP
WHERE member_id = 1
AND channel_id = 3; -- channel_id

WITH
organizations AS (
    SELECT
    -- ORGANIZATIONS
    cell_organizations.id AS organization_id,
    cell_organizations.name AS organization_name,
    cell_organizations.created_by AS organization_owner_id,
    cell_organizations.created_on AS organization_timestamp,
    -- CHANNELS
    cell_channels.id AS organization_channel_id,
    -- MEMBERS
    cell_organization_memberships.member_id AS organization_member_id
    FROM cell_organizations
    LEFT JOIN cell_channels ON cell_channels.organization_id = cell_organizations.ID
    LEFT JOIN cell_organization_memberships ON cell_organization_memberships.organization_id = cell_organizations.id
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
    LEFT JOIN cell_channel_memberships ON cell_channel_memberships.channel_id = cell_channels.id
    WHERE cell_channels.private = false OR cell_channels.id IN (SELECT channel_id FROM cell_channel_memberships WHERE member_id = 1)
),
visits AS (
    SELECT
    last_visited AS channel_last_visited,
    previous_last_visited AS channel_previous_last_visited,
    channel_id
    FROM cell_channel_memberships
    WHERE member_id = 1
),
messages AS (
    SELECT
    -- MESSAGES
    id AS message_id,
    text AS message_text,
    timestamp AS message_timestamp,
    updated AS message_updated,
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
-- ORGANIZATIONS
FROM organizations
-- CHANNELS
LEFT OUTER JOIN channels
ON channels.channel_id = organizations.organization_channel_id
AND channels.channel_member_id = organizations.organization_member_id
-- VISITS
LEFT OUTER JOIN visits
ON visits.channel_id = channels.channel_id
-- MESSAGES
LEFT OUTER JOIN messages
ON messages.message_channel_id = channels.channel_id
AND messages.message_author_id = channels.channel_member_id
-- MEMBERS
JOIN members
ON members.member_id = organizations.organization_member_id
WHERE organization_id = 3 -- organization_id
OR organization_id IN (SELECT organization_id FROM cell_channels WHERE cell_channels.id = 3) -- channel_id
ORDER BY messages.message_timestamp;