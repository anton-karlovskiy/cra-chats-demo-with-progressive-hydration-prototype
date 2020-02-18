
import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import getApp from "./App";

// Our app component tree looks like this:
// - App
//    - Sidebar
//    - Content
//
// Our initial HTML contains them all.
// However, on the client, we'll load their code piece by piece.
//
// The point of this demo is to show that in Concurrent Mode,
// React can make Sidebar/Content interactive the moment their
// code arrives--without waiting for the whole JS bundle to load.

// Do a full server render to fill the HTML.
doServerRender();

// Start hydration as soon as we have the App component.
// Note this doesn't *need* Sidebar or Content code to load yet.
doClientRender();

function doServerRender() {
  const App = getApp(
    // Pretend we're on the server, and have all the code
    // to render the app (including Content and Sidebar).
    false
  );
  const rootElement = document.getElementById(
    "root"
  );
  // Just fill the initial HTML. As if it's server rendered.
  rootElement.innerHTML = ReactDOMServer.renderToString(
    <App />
  );
}

function doClientRender() {
  const App = getApp(
    // Make Content and Sidebar code unavailable on first
    // client-side render, as if they're still loading over network.
    true
  );
  const rootElement = document.getElementById(
    "root"
  );
  // Start hydrating the app. Note that in Concurrent Mode,
  // we don't need *all* code to be loaded. Notice how if
  // you press "Load Sidebar JS code", you can interact
  // with the Sidebar even though the Content component
  // hasn't loaded its code yet.
  ReactDOM.createRoot(rootElement, {
    hydrate: true
  }).render(<App />);
}
