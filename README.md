#Redit Viewer

I've chosen to use the react boilerplate maintained by Max Stoiber,  as I always create projects using this boilplate. The avantages of using this is one is that it is highly scalable and has scripts to generates a lot of the, ahem,  boilerplate, for react, redux, and sagas.

Plus we get webpack, jest, code coverage, linting, and bundle anaylisys already configure.

If you are curious:  [React Boilerplate] (https://www.reactboilerplate.com/)

##Code and conventions
I am going to use Javascript,  instead of TypeScript.  My reasoning is quite simple, the boilerplate uses Javascript, and I have been recently using Flow JS professionally.  Given time, I can convert to use Typescript for 'type safing' the code.

##Getting Started

In a console terminal

```console
npm ci
```

or if not using nodejs latest

```console
npm install
```

You may use either but using npm installs the dependencies quicker as it references the package-lock.json and is much quicker than evaluating individual library dependencies. Quicker for CI builds.

```console
npm run start
```

Navigate to a browser window and go to:
[http://localhost:3000](http://localhost:3000)


#Generation scripts
```console
npm run generate
```
Use arrow keys to select what you want to create.

#Assumptions
1. No internationalization required
2. No mention of posting replies to redits so assuming that post data to redits is not required.  I guess that would mean we would need the ReditAPI and it is not to be used.


#App Architecture / Structure

Immutability:  Document immer,  they may not be familiar
