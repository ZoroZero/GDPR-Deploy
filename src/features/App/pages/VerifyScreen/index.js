import React, { useEffect, useState } from "react";
import Loading from "components/Loading";
import axios from "axios/auth.instance";
import "./index.scss";

export const VerifyAcc = (props) => {
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(
          `/api/users/confirm/${props.match.params.verifyToken}`
        );
        if (res.data.success) {
          setLoading(false);
          setIsSuccess(true);
        } else {
          setLoading(false);
          setIsSuccess(false);
        }
      } catch (error) {
        setLoading(false);
        setIsSuccess(false);
      }
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (isSuccess) {
    return (
      <div>
        <div
          className="swal2-icon swal2-success swal2-animate-success-icon"
          style={{ display: "flex" }}
        >
          <div
            className="swal2-success-circular-line-left"
            style={{ backgroundColor: "rgb(255, 255, 255)" }}
          ></div>
          <span className="swal2-success-line-tip"></span>
          <span className="swal2-success-line-long"></span>
          <div className="swal2-success-ring"></div>
          <div
            className="swal2-success-fix"
            style={{ backgroundColor: "rgb(255, 255, 255)" }}
          ></div>
          <div
            className="swal2-success-circular-line-right"
            style={{ backgroundColor: "rgb(255, 255, 255)" }}
          ></div>
        </div>
        <div
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-around",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div className="container">
            <div className="row text-center">
              <div className="col-sm-12 col-sm-offset-3">
                <h2 style={{ color: "#0fad00" }}>Success</h2>

                <p style={{ fontSize: "20px", color: "#5C5C5C" }}>
                  Thank you for verifying the registration. Hope our service
                  will be valued to you.
                </p>
                <p style={{ fontSize: "20px", color: "#5C5C5C" }}>
                  Please go back now and login.
                </p>
                <a href="/login" className="btn btn-outline-success">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div
        className="swal2-icon swal2-error swal2-animate-error-icon"
        style={{ display: "flex" }}
      >
        <span className="swal2-x-mark">
          <span className="swal2-x-mark-line-left"></span>
          <span className="swal2-x-mark-line-right"></span>
        </span>
      </div>
      <div
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "space-around",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div className="container">
          <div className="row text-center">
            <div
              className="col-sm-12 col-sm-offset-3"
              style={{ alignContent: "center" }}
            >
              <h2 style={{ color: "red" }}>Fail</h2>

              <p style={{ fontSize: "20px", color: "#5C5C5C" }}>
                Something went wrong, we can not verify your account.
              </p>
              <p style={{ fontSize: "20px", color: "#5C5C5C" }}>
                Please go back now and try again.
              </p>
              <a href="/login" className="btn btn-outline-danger">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
