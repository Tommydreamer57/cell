INSERT INTO cell_organisation_memberships
(organisation_id, member_id)
VALUES
(${organisation_id}, ${user_id});

INSERT INTO cell_channel_memberships
(channel_id, member_id)
SELECT id, ${user_id} AS member_id FROM cell_channels
WHERE organisation_id = ${organisation_id} AND name = 'lobby';

WITH organisations AS (
    SELECT organisation_id, member_id AS user_id
    FROM cell_organisation_memberships
),
channels AS (
    SELECT organisation_id, channel_id, member_id AS user_id
    FROM cell_channel_memberships
    JOIN cell_channels ON cell_channels.id = cell_channel_memberships.channel_id
)
SELECT cell_users.id, first_name, last_name, username, email, admin, organisations.organisation_id, channel_id FROM cell_users
LEFT JOIN organisations ON organisations.user_id = cell_users.id
LEFT JOIN channels ON channels.user_id = cell_users.id AND channels.organisation_id = organisations.organisation_id
WHERE cell_users.id = ${user_id};