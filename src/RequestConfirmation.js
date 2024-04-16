import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './RequestConfirmation.css';

const RequestConfirmation = () => {
  const [showTerms, setShowTerms] = useState(false); 

  const [state, handleSubmit] = useForm("mrgnonlp");

  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }

  return (
    <div className="request-confirmation">
      <h2>Request Confirmation</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" name="name" required />

        <label htmlFor="email">Email:</label>
        <input id="email" type="email" name="email" required />
        <ValidationError prefix="Email" field="email" errors={state.errors} />

        <label htmlFor="phone">Phone Number:</label>
        <input id="phone" type="tel" name="phone" required />

        <label htmlFor="communityName">Community Name:</label>
        <input id="communityName" type="text" name="communityName" required />

        <label htmlFor="communityCode">Community Code (Optional):</label>
        <input id="communityCode" type="text" name="communityCode" />

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

        <button type="submit" disabled={state.submitting} className="submit-btn">
          {state.submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default RequestConfirmation;
