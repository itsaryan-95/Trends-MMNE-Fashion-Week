import { useState } from "react";
import "./App.css";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const form = e.target;
    const inputs = form.querySelectorAll("input, textarea");

    const name = inputs[0].value.trim();
    const code = inputs[1].value.trim().toUpperCase();
    const city = inputs[2].value.trim();

    const url =
      "https://script.google.com/macros/s/AKfycbxlCEBaE0535hDHtcoYS0qiF3HAVTY4UymmUGJi18Nu9ZUQVvq_ZmOrqIf3VrV_6EUjeQ/exec" +
      "?name=" +
      encodeURIComponent(name) +
      "&code=" +
      encodeURIComponent(code) +
      "&city=" +
      encodeURIComponent(city);

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (result.invalid) {
        setError(
          "INVALID INVITATION CODE\nPlease check your invitation code and try again."
        );
        return;
      }

      if (result.used) {
        setError(
          "INVITATION ALREADY USED\nThis invitation code has already been registered."
        );
        return;
      }

      if (result.success) {
        setSubmitted(true);
        return;
      }

      setError(result.message || "Something went wrong. Please try again.");
    } catch (error) {
      setError("Unable to submit your RSVP.\nPlease try again.");
    }
  };

  return (
    <div className="page">
      <div className="invitation">

        <div className="eyebrow">YOU ARE INVITED TO</div>

        <img
          src="/mmne-logo.png"
          alt="MMNE Fashion Week 2026"
          className="mmne-logo"
        />

        <div className="tagline">
          <div>NORTH EAST INDIA’S BIGGEST</div>

          <div className="tagline-main">
            YOUTH FASHION MOVEMENT
          </div>
        </div>

        <div className="date-spacer"></div>

        <div className="event-time">
          <strong>10th OCT 2026</strong>
          <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <strong>6 PM ONWARDS</strong>
        </div>

        <div className="details">
          <div className="venue-block">
            <strong>VENUE</strong>

            <img
              src="/radisson-logo.jpg"
              alt="Radisson Blu"
              className="radisson-logo"
            />
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="rsvp-form">

            <label>YOUR NAME</label>

            <input
              type="text"
              placeholder="Enter Your Name"
              required
            />

            <label>INVITATION CODE</label>

            <input
              type="text"
              placeholder="Enter Your Invitation Code"
              maxLength="8"
              required
            />

            <label>CITY</label>

            <textarea
              placeholder="Enter Your City"
              rows="3"
              required
            />

            {error && (
              <div className="form-error">
                {error.split("\n").map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            )}

            <button type="submit">
              SUBMIT
            </button>

          </form>
        ) : (
          <div className="success">
            <h2>WELCOME TO THE SHOW</h2>

            <p>
              Thank you for joining us at{" "}
              <strong>Trends MMNE Fashion Week 2026</strong>.
              <br />
              We look forward to welcoming you to
              <br />
              <strong>
                Northeast India’s Biggest Youth Fashion Movement
              </strong>.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;