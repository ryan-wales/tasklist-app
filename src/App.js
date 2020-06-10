import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";

// import global components
import Footer from "./global/footer";
import Header from "./global/header";

//import components
import Tasklist from "./components/tasklist";

function App() {
  return (
    <div>
      <Router>
        <Header />

        {
          // main app routing
        }

        <section>
          <div className="container">
            <div className="columns">
              <div className="column">
                <Route path="/" exact component={Tasklist} />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
