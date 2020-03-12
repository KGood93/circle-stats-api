CREATE TABLE circle_stats (
    date TIMESTAMP DEFAULT now() not NULL,
    meet_id INTEGER REFERENCES circle_meetups(meetup_id),
    location TEXT,
    attendance INTEGER,
    notes TEXT
);
