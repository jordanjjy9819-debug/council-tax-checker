// ============================================
// RESULTS COMPONENT
// This component shows the user what discounts they might qualify for.
// It receives the answers and calls calculateEligibility to get results.
//
// Props:
//   - answers: object of all user's answers
//   - onRestart: function to call when user clicks "Start again"
// ============================================

import { calculateEligibility } from '../utils/eligibility';

function Results({ answers, onRestart }) {
  // Calculate which discounts the user might be eligible for
  const discounts = calculateEligibility(answers);

  return (
    <div>
      <h1>Your results</h1>

      {discounts.length > 0 ? (
        <>
          {/* If discounts found, show them */}
          <p>Based on your answers, you may be eligible for the following:</p>

          <ul className="results-list">
            {discounts.map((discount, index) => (
              <li key={index} className="result-item">
                <span className="discount-badge">{discount.amount}</span>
                <h3>{discount.name}</h3>
                <p>{discount.explanation}</p>
              </li>
            ))}
          </ul>

          {/* Warning / disclaimer box */}
          <div className="warning-text">
            <strong>Important:</strong> This is an estimate only. You will need
            to apply through your local council and provide evidence of your
            circumstances. Your actual eligibility may differ.
          </div>
        </>
      ) : (
        /* If no discounts found, show a helpful message */
        <div className="no-results">
          <h2>No discounts identified</h2>
          <p>
            Based on your answers, you may not be eligible for a Council Tax
            discount. However, this checker only covers the most common
            discounts. Contact your local council for a full assessment.
          </p>
        </div>
      )}

      {/* Start again button */}
      <button
        className="govuk-button govuk-button-secondary"
        onClick={onRestart}
      >
        Start again
      </button>
    </div>
  );
}

export default Results;