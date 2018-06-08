WITH membership_count AS (
    SELECT organization_id AS id, count(*) AS membership_count FROM cell_organization_memberships
    GROUP BY organization_id
)
SELECT cell_organizations.id, name, created_by, created_on, membership_count.membership_count FROM cell_organizations
LEFT JOIN cell_users
ON cell_users.id = cell_organizations.created_by
LEFT JOIN membership_count ON membership_count.id = cell_organizations.id;