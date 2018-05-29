WITH membership_count AS (
    SELECT organisation_id AS id, count(*) AS membership_count FROM cell_organisation_memberships
    GROUP BY organisation_id
)
SELECT cell_organisations.id, name, created_by, created_on, membership_count.membership_count FROM cell_organisations
JOIN cell_users
ON cell_users.id = cell_organisations.created_by
JOIN membership_count ON membership_count.id = cell_organisations.id;