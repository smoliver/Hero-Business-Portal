import React from 'react';

const ErrorSubmit = ({ className, open, errors, cta, key, target, id }) => {
  let feedback;
  if (target && target === id && !open) {
    // Request closed
    let errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      let firstError = errors[errorKeys[0]];
      if (!typeof firstError === Array) {
        firstError = [firstError];
      }
      feedback = <span className="error">{firstError}</span>;
    }
  }
  return (
    <div className={`error-submit ${className}`}>
      <input type="submit" value={cta} disabled={open} />
      {feedback}
    </div>
  );
}

export default ErrorSubmit;