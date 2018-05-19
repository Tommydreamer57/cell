SELECT id, first_name, last_name, email, username, admin
FROM cell_users
WHERE username = ${username}
AND hash = ${hash};