WITH new_organisation AS (
    INSERT INTO cell_organisations
    (name, created_by)
    VALUES
    (${name}, ${user_id})
    RETURNING
    id, name, created_by, created_on
),
new_channel AS (
    INSERT INTO cell_channels
    (organisation_id, name, created_by, private)
    SELECT id, 'lobby' AS name, ${user_id} AS created_by, false AS private FROM new_organisation
    RETURNING id
),
new_channel_member AS (
    INSERT INTO cell_channel_memberships
    (channel_id, member_id)
    SELECT id, ${user_id} AS member_id FROM new_channel
),
new_organisation_member AS (
    INSERT INTO cell_organisation_memberships
    (organisation_id, member_id)
    SELECT id, created_by
    FROM new_organisation
    RETURNING
    organisation_id, member_id, 1 AS membership_count
)
SELECT o.id, o.name, o.created_by, o.created_on, m.membership_count  FROM new_organisation o
LEFT JOIN new_organisation_member m ON m.organisation_id = o.id;