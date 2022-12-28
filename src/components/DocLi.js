import React from "react";
import { Link } from "react-router-dom";

const DocLi = () => {
  return (
    <div>
      <h1>Documents</h1>
      <hr />
      <ul>
        <li>
          <Link to={"/doc?q=08011"} >Sample document1.pdf</Link>
        </li>
        <li>
          <Link to={"/doc?q=07937"} >Sample document2.pdf</Link>
        </li>
        <li>
          <Link to={"/doc?q=07931"} >Sample document3.pdf</Link>
        </li>
      </ul>
    </div>
  );
};

export default DocLi;
