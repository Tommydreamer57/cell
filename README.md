
# Cell - Clone of Slack.com

Live at >>> [https://cell.thomaslowry.me](https://cell.thomaslowry.me)

## Technologies Used

 - Meiosis
 - React
 - History
 - SlateJS
 - Aphrodite-JSS
 - Node
 - Express
 - Bcrypt
 - PostgreSQL

## Meiosis Architecture

This project utilizes an adaptation of the Meiosis pattern for managing state. A single top-level function written in vanilla JavaScript with no imported libraries controls the updating of the model and rerendering of the view.

This adaptation is much simpler than the one found in the official [Meiosis Documentation](https://meiosis.js.org/), and it allows for very quick integration of middleware (I am working on converting this code into a node module called mitosisjs - hence, the multiple files with similar names).

I wrote a [demo on this adaptation](https://github.com/Tommydreamer57/meiosis-demo), if you're interested in taking a look.

## Custom Routing with History

Instead of using `react-router-dom`, the routing in this project is handled by a small library I built as a Meiosis middleware. The middleware uses the `history` library to listen for changes in the url and update the model accordingly. As a middleware it makes sure that the correct components are rendered inside each route.

This routing library contains Meiosis-switch, -route, and -link components that are used to control which components are rendered (I am very pleased with how the switch component turned out. The link component, however, I am unsatisfied with and would like to clean up a bit).

## Development Middlewares

In development mode this project uses a couple other Meiosis middlewares to assist with debugging.
 - `watch-updates` tracks the changes made to the model with each update - recursively comparing keys in the new model against the old model to log exactly what changed. If no changes are found, then it uses `console.trace()` to track the origin of the unnecessary update.
 - `freeze` 'freezes' the model after each update, making it immutable so that no keys can be added, changed, or deleted, anywhere inside the model. This forces me to treat the model as immutable and alerts me immediately if I ever try to mutate it directly.

## Highly Modularized Structure

In Meiosis, each component has direct access to the entire `model` of the application, as well as to the `update` function that updates the model. This allows for a highly organized component tree. My favorite part about this is that I am able to keep **all** of the http requests for the entire React application in one folder (`src/http`). Each function in this folder contains not only the code to execute an http request, but also the code to update the model and rerender the view when the request is resolved. The function simply has to be imported into the component that needs it and invoked.

## CSS in JS

This project utilizes the libraries `aphrodite` and `aphrodite-jss` for 100% of the styling. There are therefore **no** CSS files in the entire project. It allowed easy use of variables across the entire app, as well as very simple nested selection similar to SCSS.

## SlateJS

SlateJS is a super cool text-editing library for React that is 100% customizable. The input for writing a new message the inputs for editing a previous message are built with Slate.

<!-- This was my first time using CSS in JS, so, to be honest, I am not impressed with the implementation here.  -->

## Node & Express

Following the modular pattern used in Meiosis on the front end, I organized the server also in a different way than I have ever done in the past. I am very pleased with the organization of the code in both the front and back end as it has made development so much easier than in previous, less organized projects. When something breaks or isn't working as expected, I can quickly and easily navigate to the files affected.

## Bcrypt

For the sake of simple authentication, I used the library `bcryptjs` to salt and hash passwords. It was surprizingly easy to implement. Although only signup, login, and logout features are currently integrated into the UI, the server also allows secure updating of passwords by providing the previous username and password and the new password. All authentication is handled on the back end, so a user must be logged in and a member of an organization to see any of that oragnization's channels, members, and messages.

## Screenshots

### Landing

<kbd>
<img src="https://github.com/Tommydreamer57/cell/blob/master/screenshots/landing.PNG?raw=true">
</kbd>

### Dashboard

<kbd>
<img src="https://github.com/Tommydreamer57/cell/blob/master/screenshots/dashboard.PNG?raw=true">
</kbd>

### Sign Up

<kbd>
<img src="https://github.com/Tommydreamer57/cell/blob/master/screenshots/signin.PNG?raw=true">
</kbd>

### Messages

<kbd>
<img src="https://github.com/Tommydreamer57/cell/blob/master/screenshots/messages.PNG?raw=true">
</kbd>
