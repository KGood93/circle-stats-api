# Circle Time Stats

Circle Time Stats is an easy way to keep track of the attendance for meetup events.

## Motivation

Developed for a meetup I volunteer. A simple and easy way to count attendees as they arrive and elegantly display the resulting data.

## Demo
- [Live Demo](https://circle-stats-app.goodreaukath.now.sh)

## Installing
Install the dependencies and devDependencies and start the server.
```
npm install  
npm start
```

## Testing
To run back-end tests run ```npm test``` in terminal.

## Schema

### Circle Meetups
```
(
    meetup_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    meetup_name TEXT NOT NULL,
    meetup_note TEXT
);
```

### Circle Stats
```
(
    date TIMESTAMP DEFAULT now() not NULL,
    meet_id INTEGER REFERENCES circle_meetups(meetup_id),
    location TEXT,
    attendance INTEGER,
    notes TEXT
);
```

## API Overview
```
/api
.
|__ /meetup
|   |__ GET
|   |    |__ /
|__ /stats
|    |__ GET
|    |    |__ /
|    |__ POST
|    |    |__ /      
```

### GET ```/api/meetup/```
```
// res.body
[
  {
    meetup_id: Number,
    meetup_name: String,
    meetup_note: String
  }  
]
```

### GET ```/api/stats/```
```
// res.body
[
  {
    date: Date
    meet_id: Number,
    location: String,
    attendance: String,
    notes: String
  }
]
```

### POST ```/api/stats/```
```
// req.body
{
    meet_id: Number,
    location: String,
    attendance: String,
    notes: String
}
```

## Screenshots
Meetup Selection Page:
![Image of Circle Time Stats Meetup Selection Page](https://github.com/KGood93/circle-stats-app/blob/master/src/Screenshots/MeetingSelection.jpg)

Launch Page with Previous Meetups:
![Image of Circle Time Stats Launch Page with Previous Meetups](https://github.com/KGood93/circle-stats-app/blob/master/src/Screenshots/LaunchPrev.jpg)

Launch Page for First Meetup:
![Image of Circle Time Stats Launch Page for First Meetup](https://github.com/KGood93/circle-stats-app/blob/master/src/Screenshots/LaunchFirst.jpg)

Door Counter Top of Page:
![Image of Circle Time Stats Door Counter Top of Page](https://github.com/KGood93/circle-stats-app/blob/master/src/Screenshots/Count1.jpg)

Door Counter Bottom of Page:
![Image of Circle Time Stats Door Counter Bottom of Page](https://github.com/KGood93/circle-stats-app/blob/master/src/Screenshots/Count2.jpg)

Stats Page:
![Image of Circle Time Stats Stats Page](https://github.com/KGood93/circle-stats-app/blob/master/src/Screenshots/StatsPage.jpg)

## Built With

### Front-End
- React
- HTML 5
- CSS 3

### Back-End
- PostgreSQL
- Node
- Express
- Knex

### Testing
- Mocha
- Chai 
- Jest
- Enzyme

## Features
- Add stats for new meetup dates
- View stats for meetups using both a graph and table