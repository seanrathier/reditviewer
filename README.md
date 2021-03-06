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


## Issues encountered

1. When trying to get the same thumbnail size as the actual Reddit post, I tried to get the resolution via the JSON records 'preview > images > sources > resolution' property.  The problem is we cannot access the image url in the preview property. So I tried to take the thumbnail property url, and attempted to apply the sizes in the preview property, but it would skew the image resoltion.  I settled on the default size of the thumbnails.  It does not look great,  but it satisfies the requirement.
2. I was having some issues unit testing the sagas,  so they are currently included but skipped. 

## Code and conventions

I am going to use Javascript,  instead of TypeScript.  My reasoning is quite simple, the boilerplate uses Javascript, and I have been recently using Flow JS professionally.  Given time, I can convert to use Typescript for 'type safing' the code.

I am using ESLint and Prettier libraries to ensure the code for the whole app is formatted and structured the same way.

I've implemented the application UI using React hooks.  I am still fairly new to React hooks,  and find the code more intuitive when reading.

Using redux to store application state to ensure there is a single source of truth, and state is read only.

Redux sagas are used to facilitate side effects, such as fetching Reddit data, and changing state while fetching data.

I've implemented to Redux store using Immer JS to ensure immutable state, an alternative the Immutable JS. I find it's easier to apply state changes using draft and produce.

## Boilerplate
Many people choose create-react-app, but I like to use the react boilerplate maintained by Max Stoiber, as I always create projects using this boilplate. The avantages of using this is one is that it is highly scalable and has scripts to generates a lot of the, ahem,  boilerplate, for react, redux, and sagas.

Plus we get webpack, jest, code coverage, linting, and bundle anaylisys already configured.

If you are curious:  [React Boilerplate] (https://www.reactboilerplate.com/)


## Application Structure and Patterns

### app > containers > App
The App container is used to hook into the application the routes and main header.  The first page in the route is the RedditViewer, and this will be accessed via the base domain or  '/'.  

The App container uses a React Loadable instance of the RedditViewer.  Given that this was a lager app, we would need to code split the bundled code and using React Loadable allows Webpack to code split the bundles by component. At runtime the application will inject this into the browser when needed, and it give us better performance because only what is needed is parsed, compiled and executed by the browser.  

### app > containers > RedditViewer

The RedditViewer page is the main container that connects to redux store, and dispatches actions to load initial data and refesh the data every minute.  The data request dispatches are initiated using React's useEffect hook.

For the sake of showing that I understand Redux without hooks I implemented the connect higher order component, and mapped state to props, and mapped dispatch the props. We can also use the redux hook useSelect to get the reducer state.

The RedditViewer renders a button at the bottom of the page to load 25 more Reddit posts. 

### app > containers > RedditViewer > components > RedditItemsList

I prefer to locate components that are domain specific to the container within the same directory.  Only shared components across container domains should go into a glocal component directory.

The RedditItemsList is a functional component that accepts an array of Reddit derived objects as props.  The RedditItemsList does a map of the array and returns a list of RedditItem(s) and renders them.

### app > containers > RedditViewer > components > RedditItem

This is the component that renders the individual Reddit posts.  It accepts a property which is an individual Reddit post.

1. It shortens the url using regex to the domain of the link.
2. Uses moment-mini to get the time from the utc date the post was created.
3. Figures out if 'Comment' or 'Comments' should be used fot the comment link.
4. Adds the number of comments with a link to the Reddit post.
5. Shows the post title that links to the Reddit post (permalink).
6. Shows the thumbnai if there is one present.

### app > containers > RedditViewer > actions

The actions in this file are used to dispatch messages to the redux middleware.  These actions can be handled by either sagas, or reducers. The action can pass a payload to the redux middleware.

The getSubredditData action is the initial call to request data from Reddit.  The options have one property, refresh: boolean

The subredditFetching action is dispatched while the application is fetching data from Reddit call to request data from Reddit.

This subredditFetchSuccess action is dispatched when the application has sucessfully fetched the data from Reddit call to request data from Reddit. The subReddit payload is the raw data retreived from Reddit.  The options is what is passed to us from the initia request getSubredditData

The subredditFetchError action is dispatched when an error occurs while fetching data from Reddit.

### app > containers > RedditViewer > sagas

This is the redux middleware that allows us to handle side efects.  Classic example of saga side effects,  show and hide a loading animation while fetching data.

There is one main sagas for this app, getSubReddits function generator.  The function is executed for on the latest (TAKE_LATEST) request with the type SUBREDDIT_DATA_REQUEST.

```javascript
    yield takeLatest(SUBREDDIT_DATA_REQUEST, getSubReddits);
```

In this saga we determine if we should be querying for older, or newer Reddit data.  After building a url we fetch data from Reddits,  and if that is sucessfull we dispatch an action SUBREDDIT_DATA_FETCH_SUCCESS with the data payload.  The reducer will recceive the data and change the state.

See comments in code for detailed explanation.

### app > containers > RedditViewer > reducer
The reducer is the single source of truth for application state,  it is immutable.

This is the final step in our request for data.  The reducer is sent messages and the type this one is looking for is SUBREDDIT_DATA_FETCH_SUCCESS, this means we have new data.

The reducer determines if we should be appending the data (older Reddits), or pre-pending the data (new Reddits).  We also keep track of the first and last reddit to send on the next fetch for data.

See comments in code for detailed explanation.
