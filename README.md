# Redit Viewer

## Getting Started

In a console terminal

```console
npm ci
```

or if not using nodejs latest

```console
npm install
```

You may use either but using 'npm ci' installs the dependencies quicker as it references the package-lock.json and is much quicker than evaluating individual library dependencies. Quicker for CI builds.

```console
npm run start
```

Navigate to a browser window and go to:
[http://localhost:3000](http://localhost:3000)


# Generation scripts
```console
npm run generate
```
Use arrow keys to select what you want to create.

## Assumptions
1.  There was no mention of linking to the actual Reddit post to view the inline comments so I chose not to do this given the time contraints.
2. I noticed that on Reddit they prepend '/u' to all user names on the posts.  I did not do this because I think the '/u' implies a common user and may be different for other roles, such as moderators.
3. The project requirements the gives an example to use the news Reddit site for JSON fetching.  I used that also,  but i am going to assume we do not have implement the ability to switch to different Reddits.
4. The project requirements implies a refresh after every minute.  I was not sure if we are suppose to retrieve new posts every minute, or just refresh the existing data set.  I implemented the refresh with new data being added to the top of the page
5. The requirement to page 25 at  a time I am going to assume a "Load More" button will be fine,  I think given more time an infinite scroll would likely be a better UX.

## Code and conventions
I am going to use Javascript,  instead of TypeScript.  My reasoning is quite simple, the boilerplate uses Javascript, and I have been recently using Flow JS professionally.  Given time, I can convert to use Typescript for 'type safing' the code.

I am using ESLint and Prettier libraries to ensure the code for the whole app is formatted and structured the same way.

## Boilerplate
Many people choose Create react App, but I like to use the react boilerplate maintained by Max Stoiber, as I always create projects using this boilplate. The avantages of using this is one is that it is highly scalable and has scripts to generates a lot of the, ahem,  boilerplate, for react, redux, and sagas.

Plus we get webpack, jest, code coverage, linting, and bundle anaylisys already configured.

If you are curious:  [React Boilerplate] (https://www.reactboilerplate.com/)


# Application Structure

The App container is used to hook into the application the routes and main header.  The fors page in the routes is the RedditViewerPage

The first page is the redditViewer container that uses redux actions, sagas, and reducers to facilitate fetching the data 


