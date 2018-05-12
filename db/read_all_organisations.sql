WITH membership_count AS (
    SELECT organisation_id AS id, count(*) AS membership_count FROM cell_organisation_memberships
    GROUP BY organisation_id
)
SELECT cell_organisations.id, name, created_by, created_on, membership_count.membership_count FROM cell_organisations
JOIN cell_organisation_memberships
ON cell_organisation_memberships.organisation_id = cell_organisations.id
JOIN cell_users
ON cell_users.id = cell_organisation_memberships.member_id
JOIN membership_count ON membership_count.id = cell_organisations.id
WHERE cell_users.id = ${user_id};