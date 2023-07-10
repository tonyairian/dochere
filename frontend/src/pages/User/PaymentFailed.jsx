import React from "react";

const PaymentFailed = () => {
  return (
    <>
      <div className="containerrr">
        <div className="ui middle aligned center aligned grid">
          <div className="ui eight wide column">
            <form className="ui large form">
              <div className="ui icon negative message">
                <i className="warning icon"></i>
                <div className="content">
                  <div className="header">Oops! Something went wrong.</div>
                  <p>While trying to reserve money from your account</p>
                </div>
              </div>

              <a href="/" className="ui large teal submit fluid button">
                Try again
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentFailed;
