# README

## Chess With Friends

### This is a web application which allows users to create chess goals for themselves, add their friends to their friends list, and record the games they have played. It comes equipt with a chess computer to play against to improve your skill at chess!

### https://chess-with-friends.herokuapp.com/#/

## Technologies

### This app is build with a rails backend and a react/redux front end. The chess engine runs entirely on javascript.

## Features

### Users can create, edit, and destroy goals for themselves, send friend requests which can be accepted or denied, and play games which are automatically recorded upon game completion.

#### The major issue with this was actually CSS styling and conditionals for when and what to display where. I wanted to use one root CSS *thing* for all of my boxes in order to have it uniform but also keep the code base clean and without repetition. This meant I had to figure out how to nest several flex displays and use percentage values for all widths and heights of elements. The conditionals were solved, essentially, by most of the elements always being on the page and only displaying and fetching certain components based on which values are in the current state shape.

### Users can play against a chess computer which thinks 2 moves ahead to practice and improve (the computer is limited to two moves for faster performance).

#### This required a significant amount of refactoring and modification in order to impliment. The way the Board class is structured, I built its movement and state changing methods almost entirely out of nested objects. This made it very efficient for finding a player's moves and making them on the board object as well as removing any chance of re-calculating positions or piece moves that have already been calculated and dont need re-evaluation. However, this made the ai interaction quite difficult as with so many moving parts, reversing a move the ai has checked became a very difficult process. I resolved this by creating a new board object before checking (with deeply duplicated values from the origional board) and tacking those properties back onto the new board state after moving to artificially reverse a move. The actual base logic for the ai is a fairly simple recursive loop where the computer will check all of its potential moves and rank the state of the game upon that move (the ranking is just based upon pieces on the board). The harder logic for it was implimenting alpha beta pruning for each move in order to increase efficiency by removing any paths that did not need to be traversed.
