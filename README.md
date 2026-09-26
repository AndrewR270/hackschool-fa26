# Hack School 2026

A Wordle clone constructed for ACM Hack School 2026.

## Client Instructions

Run `npm install`!

Run inside client directory: `npm run dev`

The runs the project on localhost:3000.

## Backend (Server) Setup

Run inside server directory: 
`npm start`


## Git Commands

Clone a repo to local: `git clone [URL]`

Check branch: `git branch -v`
Make new branch: `git checkout -b [name]`
Switch branch: `git checkout [name]`
Merge branch: `git merge [name]`

Check remote: `git remote -v`
Update from remote: `git pull origin [branch]`

Add changes:
`git add .`
`git commit -m “[tag]: [msg]”`
`git push origin HEAD`

Revert to last commit:
`git fetch origin`
`git reset --hard origin/[branch]`

Commit tags:
- feat: Added some new functionality to the code
- fix: Solved a bug
- docs: Updated comments or the README
- refactor: Changed structure without altering behavior
- chore: Minor cleanliness, like adding .gitignore

## Frontend Architecture

    client/
    
        app/ -> the file router for our app
            globals.css -> .css styles for the app
            layout.tsx -> formatting which applies to all pages in the folder
            page.tsx -> the page which exists at [URL]/. Wrapper for our game.

        components/ -> contains TSX code for display
            Board/
                Board.tsx -> a vertical set of rows.
                Row.tsx -> a horizontal set of tiles.
                Tile.tsx -> a letter card with flipping and coloring.
            Keyboard/
                Board.tsx -> a vertical set of rows.
                Row.tsx -> a horizontal set of keys.
                Tile.tsx -> a key card which changes based on passed board state.
            Game.tsx -> main component for our game, organizes all components and logic
            Toast.tsx -> component for popup messages

        lib/ -> contains purely non-UI code files
            canvas-confetti.d.ts -> make confetti JS library TS-safe
            date.ts -> get today's date
            types.ts -> defines prop types which are used by multiple components
            wordList.ts -> list of possible solution words
            wordOfTheDay.ts -> chooses the solution word based on days since epoch