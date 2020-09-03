import React from "react";
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

HomePage.propTypes = {};

function HomePage(props) {
  return (
    <div>
      <Helmet>
        <title>Home</title>
        <meta
          name="description"
          content="A very simple app for the internship program at NP"
        />
      </Helmet>
      Home
    </div>
  );
}

export default HomePage;
