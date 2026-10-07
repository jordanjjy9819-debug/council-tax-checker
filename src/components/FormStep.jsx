// ============================================
// FORM STEP COMPONENT
// This component renders a single question.
// It receives the question data, the current answer, and a callback
// to report when the user changes their answer.
// ============================================

function FormStep({ question, answer, onChange, error }) {
  // This function decides which type of input to render
  // based on the question's type property
  const renderInput = () => {
    switch (question.type) {
      // ----- RADIO BUTTONS (single choice) -----
      case 'radio':
        return (
          <div className="radio-group">
            {question.options.map((option) => (
              <label
                key={option}
                className={`radio-option ${answer === option ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={answer === option}
                  onChange={() => onChange(option)}
                />
                {option}
              </label>
            ))}
          </div>
        );

      // ----- NUMBER INPUT -----
      case 'number':
        return (
          <input
            type="number"
            className="number-input"
            value={answer || ''}
            onChange={(e) => onChange(e.target.value)}
            min="1"
            max="20"
          />
        );

      // ----- CHECKBOXES (multiple choice) -----
      case 'checkbox':
        // For checkboxes, answer is an array of selected options
        // If no answer yet, use an empty array
        const selectedOptions = answer || [];
        return (
          <div className="checkbox-group">
            {question.options.map((option) => (
              <label
                key={option}
                className={`radio-option ${selectedOptions.includes(option) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      // Add this option to the selected list
                      onChange([...selectedOptions, option]);
                    } else {
                      // Remove this option from the selected list
                      onChange(selectedOptions.filter((o) => o !== option));
                    }
                  }}
                />
                {option}
              </label>
            ))}
          </div>
        );

      // ----- UNKNOWN TYPE -----
      default:
        return null;
    }
  };

  // The main render — label, hint, error message, and input
  return (
    <div className={`form-group ${error ? 'error' : ''}`}>
      <label className="form-label">{question.question}</label>
      {question.hint && <p className="form-hint">{question.hint}</p>}
      {error && <p className="error-message">{error}</p>}
      {renderInput()}
    </div>
  );
}

export default FormStep;