INSERT INTO cell_organization_memberships
(organization_id, member_id)
VALUES
(${organization_id}, ${user_id});

INSERT INTO cell_channel_memberships
(channel_id, member_id)
SELECT id, ${user_id} AS member_id FROM cell_channels
WHERE organization_id = ${organization_id} AND name = 'lobby';

WITH organizations AS (
    SELECT organization_id, member_id AS user_id
    FROM cell_organization_memberships
),
channels AS (
    SELECT organization_id, channel_id, member_id AS user_id
    FROM cell_channel_memberships
    JOIN cell_channels ON cell_channels.id = cell_channel_memberships.channel_id
)
SELECT cell_users.id, first_name, last_name, username, email, admin, organizations.organization_id, channel_id FROM cell_users
LEFT JOIN organizations ON organizations.user_id = cell_users.id
LEFT JOIN channels ON channels.user_id = cell_users.id AND channels.organization_id = organizations.organization_id
WHERE cell_users.id = ${user_id};