WITH new_organisation AS (
    INSERT INTO cell_organisations
    (name, created_by)
    VALUES
    ${name}, ${user_id}
    RETURNING
    id, name, created_by
),
new_organisation_member AS (
    INSERT INTO cell_organisation_memberships
    (organisation_id, member_id)
    SELECT id, created_by
    FROM new_organisation
    RETURNING
    organisation_id, member_id
)
SELECT * FROM new_organisation o
JOIN new_organisation_member m ON o.created_by = m.id;