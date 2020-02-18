
import React from "react";

// This is a setup function that simulates client/server setup.
// On the server, it simulates Sidebar and Content being available right away.
// On the client, it simulates them resolving over network (when you press a button).
export default function getApp(isSimulatingNetwork) {
  let Sidebar;
  let Content;
  if (isSimulatingNetwork) {
    // Artificially delay the components, as if we fetch code over network.
    Sidebar = React.lazy(
      () =>
        new Promise(resolve => {
          // Triggered from buttons in public/index.html
          window.resolveSidebar = () => {
            resolve({ default: RealSidebar });
          };
        })
    );
    Content = React.lazy(
      () =>
        new Promise(resolve => {
          // Triggered from buttons in public/index.html
          window.resolveContent = () => {
            resolve({ default: RealContent });
          };
        })
    );
  } else {
    // On the server, we have the components ready right away.
    Sidebar = RealSidebar;
    Content = RealContent;
  }

  function RealSidebar() {
    const [count, setCount] = React.useState(0);
    const [didHydrate, setDidHydrate] = React.useState(false);
    React.useEffect(() => {
      // Make it easy to see when the code has loaded.
      setDidHydrate(true);
    }, []);

    return (
      <div
        style={{
          background: didHydrate
            ? "rgba(0, 255, 0, 0.1)"
            : "rgba(255, 0, 0, 0.1)",
          border: "1px solid grey",
          margin: 10,
          padding: 10
        }}>
        <h1>
          Sidebar ({didHydrate ? "Hydrated with JS" : "Initial HTML"})
        </h1>
        <button onClick={() => setCount(c => c + 1)}>
          Clicked on sidebar {count} times
        </button>
      </div>
    );
  }

  function RealContent() {
    const [count, setCount] = React.useState(0);
    const [didHydrate, setDidHydrate] = React.useState(false);
    React.useEffect(() => {
      // Make it easy to see when the code has loaded.
      setDidHydrate(true);
    }, []);

    return (
      <div
        style={{
          background: didHydrate
            ? "rgba(0, 255, 0, 0.1)"
            : "rgba(255, 0, 0, 0.1)",
          border: "1px solid grey",
          margin: 10,
          padding: 10
        }}>
        <h1>
          Content ({didHydrate ? "Hydrated with JS" : "Initial HTML"})
        </h1>
        <button onClick={() => setCount(c => c + 1)}>
          Clicked on content {count} times
        </button>
      </div>
    );
  }

  function App() {
    return (
      <div
        className="App"
        style={{
          border: "1px solid grey",
          margin: 10,
          padding: 10
        }}>
        <h1>React Progressive Hydration Demo*</h1>
        <h3>
          <i>
            * very experimental — likely contains bugs.
          </i>
        </h3>
        <h2>
          This app is server-rendered to HTML.{" "}Concurrent Mode lets us hydrate parts of UI without waiting for <i>all</i> JS to load.
        </h2>
        <React.Suspense fallback={<h2>Loading sidebar...</h2>}>
          <Sidebar />
        </React.Suspense>
        <br />
        <React.Suspense fallback={<h2>Loading content...</h2>}>
          <Content />
        </React.Suspense>
      </div>
    );
  }

  return App;
}
