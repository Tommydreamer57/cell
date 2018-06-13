
-- drop tables

DROP TABLE IF EXISTS cell_direct_message_group_messages;
DROP TABLE IF EXISTS cell_direct_message_group_memberships;
DROP TABLE IF EXISTS cell_organization_memberships;
DROP TABLE IF EXISTS cell_direct_message_groups;
DROP TABLE IF EXISTS cell_channel_memberships;
DROP TABLE IF EXISTS cell_channel_messages;
DROP TABLE IF EXISTS cell_channels;
DROP TABLE IF EXISTS cell_organizations;
DROP TABLE IF EXISTS cell_users;

-- create tables

CREATE TABLE cell_users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    username VARCHAR(40) UNIQUE,
    email VARCHAR(60) UNIQUE,
    admin BOOLEAN,
    hash VARCHAR(60)
);

CREATE TABLE cell_organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) UNIQUE,
    created_by INTEGER REFERENCES cell_users(id) NOT NULL,
    created_on DATE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cell_organization_memberships (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER REFERENCES cell_organizations(id) NOT NULL,
    member_id INTEGER REFERENCES cell_users(id) NOT NULL,
    last_visited TIMESTAMP DEFAULT NULL
);

CREATE TABLE cell_channels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    organization_id INTEGER REFERENCES cell_organizations(id) NOT NULL,
    created_by INTEGER REFERENCES cell_users(id) NOT NULL,
    created_on DATE DEFAULT CURRENT_TIMESTAMP,
    private BOOLEAN
);

CREATE TABLE cell_channel_memberships (
    id SERIAL PRIMARY KEY,
    channel_id INTEGER REFERENCES cell_channels(id) NOT NULL,
    member_id INTEGER REFERENCES cell_users(id) NOT NULL,
    last_visited TIMESTAMP DEFAULT NULL
);

CREATE TABLE cell_channel_messages (
    id SERIAL PRIMARY KEY,
    channel_id INTEGER REFERENCES cell_channels(id) NOT NULL,
    author_id INTEGER REFERENCES cell_users(id) NOT NULL,
    text VARCHAR(5000) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT NULL
);

CREATE TABLE cell_direct_message_groups (
    id SERIAL PRIMARY KEY,
    created_on DATE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cell_direct_message_group_memberships (
    id SERIAL PRIMARY KEY,
    direct_message_group_id INTEGER REFERENCES cell_direct_message_groups(id) NOT NULL,
    member_id INTEGER REFERENCES cell_users(id) NOT NULL
);

CREATE TABLE cell_direct_message_group_messages (
    id SERIAL PRIMARY KEY,
    direct_message_group_id INTEGER REFERENCES cell_direct_message_groups(id) NOT NULL,
    author_id INTEGER REFERENCES cell_users(id) NOT NULL,
    text VARCHAR(5000) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT NULL    
);

-- insert data

INSERT INTO cell_users
(first_name, last_name, username, email, admin)
VALUES
('Thomas', 'Lowry', 'Tommydreamer57', 'minilao94@yahoo.com', true),
('Mike', 'Lowry', 'Tromballer92', 'tromballer92@yahoo.com', false),
('Collin', 'Lowry', 'Flavius', 'flavius@yahoo.com', false),
('Carson', 'Lowry', 'Plebius', 'plebius@yahoo.com', false),
('Garry', 'Lowry', 'Masterlao66', 'masterlao66@yahoo.com', false),
('Amy', 'Lowry', 'boo', 'bluetimes4@yahoo.com', false),
('Court', 'Eccles', 'court', 'court@devmountain.com', false),
('Doug', 'Maxfield', 'dougglez', 'dougglez@devmountain.com', false),
('Mikhail', 'Korotkov', 'misha', 'misha@yahoo.com', false);

INSERT INTO cell_organizations
(name, created_by)
VALUES
('Lowry Family', 5),
('DevMountain', 1),
('BYU', 1),
('UVU', 2),
('Provo', 8),
('Utah', 5),
('Georgia', 3);

INSERT INTO cell_organization_memberships
(organization_id, member_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(2, 1),
(2, 7),
(2, 8),
(2, 9);

INSERT INTO cell_channels
(organization_id, name, created_by, private)
VALUES
(1, 'bros', 2, true),
(1, 'the-fam', 6, false),
(2, 'wpr36', 1, false),
(2, 'wpr36-crew', 8, true),
(1, 'lobby', 5, false),
(2, 'lobby', 1, false);

INSERT INTO cell_channel_memberships
(channel_id, member_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(3, 1),
(3, 7),
(3, 8),
(3, 9),
(4, 1),
(4, 7),
(4, 8);

INSERT INTO cell_direct_message_groups
(created_on)
VALUES
(current_timestamp),
(current_timestamp),
(current_timestamp),
(current_timestamp),
(current_timestamp),
(current_timestamp),
(current_timestamp);

INSERT INTO cell_direct_message_group_memberships
(member_id, direct_message_group_id)
VALUES
(1, 1),
(2, 1),
(1, 2),
(3, 2),
(1, 3),
(4, 3),
(1, 4),
(5, 4),
(1, 5),
(6, 5),
(1, 6),
(7, 6),
(8, 6);

SELECT * FROM cell_users;
