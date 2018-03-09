# Puzzle Swap

### Live project
See this project live [here](http://melena-suliteanu-puzzleswap.surge.sh/)

## Description

The goal of this project was to make something I'm excited about that pulls together everything I've learned in Mod 3. 
I chose to make an application for people who love jigsaw puzzles and don't have anything to do with ones they've completed. An unauthenticated user is able to view all puzzles. A user can sign up or log in to claim or post a puzzle. The post puzzle form takes a title, an image (that can be cropped to a specific aspect ratio), number of pieces, and number of pieces missing. A user can unlist their own puzzles from the main page. To claim a puzzle, user clicks claim on the puzzle itself which starts a message with the owner. They can then message back and forth to come to an agreement about handoff.

## Implementation

This project uses React, Redux, Router, and react-image-crop on the frontend with Firebase realtime database, authentication, and cloud storage for data storage.
Puzzle icon is by [Freepik](https://www.flaticon.com/authors/freepik) at flaticon, recolored by me.

## Design

#### Main Page
![Main page](https://i.imgur.com/0qYfFIWl.png)

#### Post Puzzle Form
![Post Puzzle Form](https://i.imgur.com/audlEjKl.png)

#### Message Inbox
![Inbox](https://i.imgur.com/9alScRql.png)

#### Message Thread
![Message Thread](https://i.imgur.com/tUEc6FYl.png)

#### Login Page
![Login Page](https://i.imgur.com/6IU6n3Hl.png)

* [Original Assignment](http://frontend.turing.io/projects/self-directed-project.html)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of a guide to performing common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

