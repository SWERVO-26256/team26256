import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.target);
    formData.append("access_key", "e72fee4f-75b9-4bff-9aa8-e1b354e12279");

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully!");
        window.location.href = "/submit";
      } else {
        setResult("Failed to send message.");
      }
    } catch (error) {
      setResult("Connection error. Please try again.");
    }
  };

  return (
    <section className="contact-page">
      <div className="contact-header">
        <span className="contact-badge">📩 Get In Touch</span>

        <h2>Contact & Queries</h2>

        <p>
          Have questions about our robot, outreach initiatives, competitions,
          or sponsorship opportunities? We'd love to hear from you.
        </p>
      </div>

      <div className="contact-card">
        <form onSubmit={onSubmit} className="contact-form">
          <input
            type="hidden"
            name="subject"
            value="New Website Inquiry [SWERVO 26256]"
          />

          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="input-group">
            <label>Message</label>
            <textarea
              name="message"
              rows="6"
              placeholder="Tell us how we can help..."
              required
            />
          </div>

          <input
            type="checkbox"
            name="botcheck"
            style={{ display: "none" }}
          />

          <button type="submit" className="contact-btn">
            Send Message →
          </button>

          {result && (
            <p className="contact-status">
              {result}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;
