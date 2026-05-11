import React, { useState } from 'react';

function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.target);
    formData.append("access_key", "e72fee4f-75b9-4bff-9aa8-e1b354e12279");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Success!");
        // Redirects to your custom confirmation page
        window.location.href = "/submit";
      } else {
        console.log("Error", data);
        setResult("Error! Try again.");
      }
    } catch (error) {
      console.log("Error", error);
      setResult("Check connection.");
    }
  };

  return (
    <section className="page fade-in" style={{ display: 'block' }}>
      <div className="page-header">
        <h2>Contact & Queries</h2>
        <p>Have questions about our robot, outreach, or sponsorships? Drop us a line.</p>
      </div>

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
        <form onSubmit={onSubmit} className="contact-form">
          <input type="hidden" name="subject" value="New Website Inquiry [SWERVO 26256]" />

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '8px' }}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="John Doe"
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-dark)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '8px' }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="john@example.com"
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-dark)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '8px' }}>Message / Query</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              placeholder="How can we help?"
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-dark)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
            ></textarea>
          </div>

          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', borderRadius: '6px', fontSize: '16px' }}
          >
            {result ? result : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;