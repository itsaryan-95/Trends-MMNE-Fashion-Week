import { useState } from "react";
import "./App.css";

function App() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const form = e.target;
  const inputs = form.querySelectorAll("input, textarea");

  const data = {
    name: inputs[0].value,
    companion: inputs[1].value,
    phone: inputs[2].value,
    address: inputs[3].value
  };

  await fetch("https://script.google.com/macros/s/AKfycbxNio5ux9Z6tZJsixKV3sLtfhnh6aYpSiHMc1ANd8Aj0eSfoxcLXDfj-zBwgs5ZUo83Gw/exec", {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data)
  });

  setSubmitted(true);
};

  return (
    <div className="page">
      <div className="invitation">
        <div className="eyebrow">YOU ARE INVITED TO</div>

        <h1>
          Trends MMNE
          <br />
          <span>FASHION WEEK</span>
        </h1>

        <div className="year">2026</div>

        <div className="details">
          <div>
            <strong>10 OCTOBER</strong>
            <span>5 PM ONWARDS</span>
          </div>

          <div>
            <strong>RADISSON BLU</strong>
            <span>GUWAHATI</span>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="rsvp-form">
            <h2>RSVP</h2>

            <label>YOUR NAME</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              required
            />

            <label>COMPANION NAME (+1 IF ANY)</label>
            <input
              type="text"
              placeholder="Enter Companion Name (optional)"
            />

            <label>PHONE NUMBER</label>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              required
            />

            <label>ADDRESS</label>
            <textarea
              placeholder="Enter Your Address"
              rows="3"
              required
            />

            <button type="submit">CONFIRM RSVP</button>
          </form>
        ) : (
          <div className="success">
          <h2>RSVP CONFIRMED</h2>

  <p>Thank you for confirming your attendance.</p>

</div>
        )}
      </div>
    </div>
  );
}

export default App;