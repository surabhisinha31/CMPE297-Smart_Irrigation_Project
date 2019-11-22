import { Link } from "react-router-dom";
import React, { Component } from "react";
import graph from "./giphy.gif";
import "./card.css";
import "./styles.css";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="parallax"></div>
        <div
          className="text-section"
          style={{
            display: "flex",
            padding: "100px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h1 style={{ color: "white", fontSize: "60px", zIndex: "2" }}>
            Smart Irrigation System
          </h1>
          <p
            style={{
              color: "white",
              fontFamily: "Palatino Linotype",
              fontSize: "40px",
              textAlign: "center",
              zIndex: "2",
              padding: "50px 20px",
              width: "80%"
            }}
          >
            A much efficient and cost effective system for the farmers to
            monitor the various environmental parameters such as temperature,
            relative humidity and moisture required for the growth of crops.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <div
            className="col-md-6"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "27px",
                  color: "black",
                  textAlign: "center",
                  fontWeight: "300"
                }}
              >
                For irrigation planning, a cluster of soil moisture sensors
                estimate soil water content by measurement of the soil bulk
                permittivity. The results are represented in the form of graphs
                showing average humidity levels in soil on the basis of per day
                or per week. These graphs help us understand the pattern for
                optimal plant growth.
              </p>
            </div>
            <button
              className="btn btn-secondary col-md-6"
              style={{
                background: "black",
                color: "white",
                borderColor: "white",
                width: "300px",
                height: "70px",
                fontSize: "25px",
                marginTop: "50px",
                borderRadius: "6px",
                padding: "10px 10px"
              }}
            >
              <span>View Dashboard</span>
              <svg
                fill="white"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20px"
                height="20px"
                viewBox="0 0 451.846 451.847"
                style={{
                  enableBackground: "new 0 0 451.846 451.847",
                  marginLeft: "20px"
                }}
              >
                <g>
                  <path
                    d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744
		L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284
		c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"
                  />
                </g>
              </svg>
            </button>
          </div>
          <div
            style={{
              marginTop: "90px",
              width: "500px",
              height: "500px"
            }}
          >
            <img
              src={graph}
              width="80%"
              height="80%"
              style={{ borderRadius: "50%" }}
            ></img>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
