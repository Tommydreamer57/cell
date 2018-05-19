INSERT INTO cell_users
(first_name, last_name, username, email, admin, hash)
VALUES
(${first_name}, ${last_name}, ${username}, ${email}, false, ${hash})
RETURNING id, first_name, last_name, username, email, admin;