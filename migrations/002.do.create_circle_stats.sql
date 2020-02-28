CREATE TABLE circle_stats (
    date TIMESTAMP DEFAULT now() not NULL,
    meet_id INTEGER REFERENCES circle_meetups(meetup-id),
    location TEXT,
    at_count INTEGER
);
