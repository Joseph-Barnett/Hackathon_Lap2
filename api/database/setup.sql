DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS entries;

CREATE TABLE post (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (100) NOT NULL,
    content VARCHAR (500) NOT NULL,
    PRIMARY KEY (post_id)
);

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

CREATE TABLE entries(
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(30) UNIQUE NOT NULL,
    entry_date DATE,
    entry_time TIME,
    entry VARCHAR(500),
    PRIMARY KEY (id)
);

INSERT INTO entries
    (name, entry_date, entry_time, entry)
VALUES
    ('Example', '2021-11-23', '12:34:56', 'This is an example entry.'),
    ('Example2', '2023-12-23', '17:02:51', 'This is an example entry.'),
    ('Example3', '2022-11-12', '18:24:11', 'This is an example entry.');
