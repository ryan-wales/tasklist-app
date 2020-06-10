import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <section className="hero is-info">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column">
                <Link to="/">
                  <h1 className="title">AppyApp</h1>
                </Link>
                <h2 className="subtitle">Making your life easier everyday!</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
