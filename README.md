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
3. The project requirements the gives an example to use the news Reddit site for JSON fetching.  I used the same Reddit space,  but i am going to assume we do not have implement the ability to switch to different Reddits.
4. The project requirements implies a refresh after every minute.  I was not sure if we are suppose to retrieve new posts every minute, or just refresh the existing data set.  I implemented the refresh with new data being added to the top of the page
5. The requirement to page 25 at  a time I am going to assume a "Load More" button will be fine,  I think given more time an infinite scroll would likely be a better UX.

## Issues encountered

1. When trying to get the same thumbnail size as the actual Reddit post, I tried to get the resolution via the JSON records 'preview > images > sources > resolution' property.  The problem is we cannot access the image url in the preview property. So I tried to take the thumbnail property url, and attempted to apply the sizes in the preview property, but it would skew the image resoltion.  I settled on the default size of the thumbnails.  It does not look great,  but it satisfies the requirement.

## Code and conventions

I am going to use Javascript,  instead of TypeScript.  My reasoning is quite simple, the boilerplate uses Javascript, and I have been recently using Flow JS professionally.  Given time, I can convert to use Typescript for 'type safing' the code.

I am using ESLint and Prettier libraries to ensure the code for the whole app is formatted and structured the same way.

I've implemented the application UI using React hooks.  I wam still fairly new to React hooks,  and find the code more intuitive when reading.

Redux to store application state to ensure there is a single source of truth, and state is read only.

Redux sagas are used to facilitate side effects, such as fetching Reddit data, and changing state while fetching data.

I've implemented to Redux store using Immer JS to ensure immutable state, an alternative the Immutable JS. I find it's easier to apply state changes using draft and

## Boilerplate
Many people choose create-react-app, but I like to use the react boilerplate maintained by Max Stoiber, as I always create projects using this boilplate. The avantages of using this is one is that it is highly scalable and has scripts to generates a lot of the, ahem,  boilerplate, for react, redux, and sagas.

Plus we get webpack, jest, code coverage, linting, and bundle anaylisys already configured.

If you are curious:  [React Boilerplate] (https://www.reactboilerplate.com/)


## Application Structure and Patterns

### app > containers > App
The App container is used to hook into the application the routes and main header.  The first page in the route is the RedditViewer, and this will be accessed via the base domain or  '/'.  

The App container uses a React Loadable instance of the RedditViewer.  Given that this was a lager app, we would need to code split the bundled code and using React Loadable allows Webpack to code split the bundles by component. At runtime the application will inject this into the browser when needed, and it give us better performance because only what is needed is parsed, compiled and executed by the browser.  

### app > containers > RedditViewer

The RedditViewer page is the main container that connects to redux store, and dipatches actions to load initial data and refesh the data every minute.  The data request dispatches are initiated using React's useEffect hook.

For the sake of showing that I understand Redux without hooks I implemented the connect higher order component, and mapped state to props, and mapped dispatch the props.

The RedditViewer renders a button at the bottom of the page to load 25 more Reddit posts. 


### app > containers > RedditViewer > components > RedditItemsList

I prefer to locate components that are domain specific to the container within the same directory.  Only shared components across container domains shold go into a glocal component directory.

The RedditItemsList is a functional component that accepts an array of Reddit objects as props.  The RedditItemsList does a map of the array and returns a list of RedditItem(s) and renders them.

### app > containers > RedditViewer > components > RedditItem

This is the component that renders the individual Reddit posts.  It accepts a property which is an individual Reddit post.

1. It shortens the url using regex to the domain of the link.
2. Uses moment-mini to get the time from the utc date the post was created
3. Figures out if 'Comment' or 'Comments' should be used fot the comment link
4. Adds the number of comments with a link to the Reddit post
5. Shows the post title that links to the Reddit post (permalink)
6. Shows the thumnai if there is one present.

### app > containers > RedditViewer > actions

The actions in this file are used to dispatch messages to the redux middleware.  These actions can be handled by either sagas, or reducers. The action can pass a payload

The getSubredditData action is the initial call to request data from Reddit.  The options have one property, refresh: boolean

The subredditFetching action is dispatched while the application is fetching data from Reddit call to request data from Reddit.

This subredditFetchSuccess action is dispatched when the application has sucessfully fetched the data from Reddit call to request data from Reddit. The subReddit payload is the raw data retreived from Reddit.  The options is what is passed to us from the initia request getSubredditData

The subredditFetchError action is dispatched when an error occurs while fetching data from Reddit.

