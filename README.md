# Github Issues 
This is a react native project where user should be able to provide GitHub organization, repository and author (optional) and fetch issues from Github
### Description
When user provide GitHub organization, repository and author (optional) and click on the search button then all the related issues will display in the list with the paggination
### Feature

1. Search issues by GitHub organization, repository and author (optional).
2. Search results will display with paggination.
3. Page <current page> of <total pages> with display on the header
4. Api error handling
5. Use hooks for wrting components

## Tech stack 
- React Native
- Redux
- @reduxjs/toolkit (1.5.0)
- TypeScript
- "@testing-library/jest-native"
- "@testing-library/react-native"

## Installation
### Running client and server:
Open a terminal window
1. Clone repo
2. `cd fetch-github-issue && yarn or npm i`
3. `cd ios && pod install && cd ..`
4. To run on ios: `yarn ios` 
4. To run on android: `yarn android` 