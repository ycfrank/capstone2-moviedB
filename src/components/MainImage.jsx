import React from "react";
import { Typography } from "@material-ui/core";

const MainImage = ({ image, title, text }) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0)
            39%,rgba(0,0,0,0)
            41%,rgba(0,0,0,0.65)
            100%),
        url('${image}')`,
        // backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        position: "relative",
      }}
    >
      <div>
        <div
          style={{
            position: "absolute",
            maxWidth: "900px",
            bottom: "4rem",
            marginLeft: "2rem",
          }}
        >
          <Typography
            style={{ fontSize: "2rem", fontWeight: "700", color: "#fff" }}
          >
            {title}
          </Typography>
          <p style={{ fontSize: "1.5rem", fontWeight: "500", color: "#fff" }}>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainImage;
