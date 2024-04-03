import React, { useState } from 'react';
import './RequestConfirmation.css';

const RequestConfirmation = () => {
  // State variable to toggle the display of terms of service
  const [showTerms, setShowTerms] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted. You will be sent an email about the confirmation soon. Thank you!');
  };

  // RequestConfirmation component JSX
  return (
    <div className="request-confirmation">
      <h2>Request Confirmation</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Phone Number:
          <input type="tel" name="phone" required />
        </label>
        <label>
          Community Name:
          <input type="text" name="communityName" required />
        </label>
        <label>
          Community Code (Optional):
          <input type="text" name="communityCode" />
        </label>
        
        {/* Expandable Terms of Service Section */}
        <div className="terms-service">
          <button type="button" onClick={() => setShowTerms(!showTerms)} className="terms-toggle">
            {showTerms ? "Hide Terms of Service" : "View Terms of Service"}
          </button>
          {showTerms && (
            <div className="terms-content">
              {/* Terms of Service */}
              <p>
                By agreeing to these terms, you are allowing us to send you emails (can be turned off) and are agreeing to not submit any malicious content and/or inappropriate content.
              </p>
              <p>
                Please read these terms carefully...
              </p>
              {/* End of Terms of Service content */}
            </div>
          )}
          <label>
            <input type="checkbox" id="terms" required />
            I agree to the Terms of Service.
          </label>
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default RequestConfirmation;
