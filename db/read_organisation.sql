WITH organisation_count AS (
    SELECT organisation_id AS id, count(*) AS organisation_count FROM cell_organisation_memberships
    WHERE organisation_id = ${organisation_id}
    GROUP BY organisation_id
), channel_count AS (
    SELECT channel_id AS id, count(*) AS channel_count FROM cell_channel_memberships
    GROUP BY channel_id
)
SELECT
cell_organisations.id AS organisation_id,
cell_organisations.name AS organisation_name,
cell_organisations.created_by AS organisation_owner_id,
cell_organisations.created_on AS organisation_timestamp,
cell_channels.id AS channel_id,
cell_channels.name AS channel_name,
cell_channels.created_on AS channel_timestamp,
cell_channels.created_by AS channel_owner_id,
cell_users.id AS user_id,
private, first_name, last_name, username, email, admin, organisation_count, channel_count
FROM cell_organisations
JOIN cell_channels ON cell_channels.organisation_id = cell_organisations.id
JOIN cell_channel_memberships ON cell_channel_memberships.channel_id = cell_channels.id
JOIN cell_users ON cell_channel_memberships.member_id = cell_users.id
JOIN organisation_count ON organisation_count.id = cell_organisations.id
JOIN channel_count ON channel_count.id = cell_channels.id
WHERE organisation_id = ${organisation_id};