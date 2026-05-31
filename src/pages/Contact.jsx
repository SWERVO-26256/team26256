<div
  className="card"
  style={{
    maxWidth: "650px",
    margin: "0 auto",
    padding: "40px",
    borderRadius: "24px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)"
  }}
>
  <form onSubmit={onSubmit} className="contact-form">
    <input
      type="hidden"
      name="subject"
      value="New Website Inquiry [SWERVO 26256]"
    />

    <div className="form-group">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        placeholder="John Doe"
        className="contact-input"
      />
    </div>

    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        placeholder="john@example.com"
        className="contact-input"
      />
    </div>

    <div className="form-group">
      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        name="message"
        rows="6"
        required
        placeholder="Tell us how we can help..."
        className="contact-input contact-textarea"
      />
    </div>

    <input
      type="checkbox"
      name="botcheck"
      className="hidden"
      style={{ display: "none" }}
    />

    <button type="submit" className="contact-btn">
      Send Message
    </button>

    {result && (
      <p
        style={{
          marginTop: "16px",
          textAlign: "center",
          color: "#a1a1aa",
          fontSize: "14px"
        }}
      >
        {result}
      </p>
    )}
  </form>
</div>
