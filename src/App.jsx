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
    phone: inputs[1].value,
    city: inputs[2].value
  };

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxNio5ux9Z6tZJsixKV3sLtfhnh6aYpSiHMc1ANd8Aj0eSfoxcLXDfj-zBwgs5ZUo83Gw/exec",
      {
        method: "POST",
        body: JSON.stringify(data)
      }
    );

    const result = await response.json();

    if (result.duplicate) {
      alert("REGISTRATION ALREADY SUBMITTED\n\nThis phone number has already been registered for Trends MMNE Fashion Week 2026.");
      return;
    }

    if (result.success) {
      setSubmitted(true);
    }
  } catch (error) {
    console.error("RSVP submission failed:", error);
    alert("Something went wrong. Please try again.");
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
  <div className="tagline-main">YOUTH FASHION MOVEMENT</div>
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

  <div className="event-time">
    <strong>10th OCT 2026</strong>
    <span>|</span>
    <strong>6 PM ONWARDS</strong>
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

            <label>PHONE NUMBER</label>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              required
            />

            <label>CITY</label>
            <textarea
              placeholder="Enter Your City"
              rows="3"
              required
            />

            <button type="submit">SUBMIT</button>
          </form>
        ) : (
          <div className="success">
          <h2>WELCOME TO THE SHOW</h2>

<p>
  Thank you for joining us at <strong>Trends MMNE Fashion Week 2026</strong>.
  <br />
 We look forward to welcoming you to
<br />
<strong>Northeast India’s Biggest Youth Fashion Movement</strong>.
</p>

</div>
        )}
      </div>
    </div>
  );
}

export default App;