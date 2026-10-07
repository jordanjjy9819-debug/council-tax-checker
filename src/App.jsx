// ============================================
// MAIN APP COMPONENT
// This manages:
//   - Which step the user is on (currentStep)
//   - All the user's answers (answers)
//   - Validation errors (errors)
//   - Whether to show the results page (showResults)
//
// It imports the questions data, the FormStep component,
// and the Results component.
// ============================================

import { useState } from 'react';
import { questions } from './data/questions';
import FormStep from './components/FormStep';
import Results from './components/Results';
import './App.css';

function App() {
  // ----- STATE -----
  // currentStep: which question are we on? (0 = first, 1 = second, etc.)
  const [currentStep, setCurrentStep] = useState(0);

  // answers: all the user's answers stored in one object
  // Example: { singleAdult: 'Yes', student: 'No', benefits: ['Universal Credit'] }
  const [answers, setAnswers] = useState({});

  // errors: validation errors for the current step
  // Example: { singleAdult: 'Please select an answer.' }
  const [errors, setErrors] = useState({});

  // showResults: whether we've reached the results page
  const [showResults, setShowResults] = useState(false);

  // ----- VISIBLE QUESTIONS -----
  // Some questions are conditional — they only show based on previous answers.
  // We filter the questions array to only include visible ones.
  // This is COMPUTED each time the component renders (not stored in state).
  // That's the React way: derive values from state, don't store them separately.
  const visibleQuestions = questions.filter((q) => {
    // If the question has no showIf function, always show it
    if (!q.showIf) return true;
    // Otherwise, call showIf with the current answers
    return q.showIf(answers);
  });

  // The current question object
  const currentQuestion = visibleQuestions[currentStep];

  // Total number of visible questions (for the progress indicator)
  const totalSteps = visibleQuestions.length;

  // ----- HANDLE ANSWER CHANGE -----
  // Called when the user selects an answer or types in a field
  const handleAnswer = (value) => {
    // Update the answers object with the new value
    setAnswers({ ...answers, [currentQuestion.id]: value });
    // Clear any error for this question — the user is now answering it
    setErrors({ ...errors, [currentQuestion.id]: null });
  };

  // ----- VALIDATION -----
  // Check the current question has a valid answer before moving on
  const validateStep = () => {
    const newErrors = {};
    const answer = answers[currentQuestion.id];

    if (currentQuestion.type === 'radio' && !answer) {
      newErrors[currentQuestion.id] = 'Please select an answer.';
    }

    if (currentQuestion.type === 'number' && (!answer || answer < 1)) {
      newErrors[currentQuestion.id] = 'Please enter a valid number (1 or more).';
    }

    if (currentQuestion.type === 'checkbox' && (!answer || answer.length === 0)) {
      newErrors[currentQuestion.id] = 'Please select at least one option.';
    }

    setErrors(newErrors);
    // Return true if there are no errors (OK to proceed)
    return Object.keys(newErrors).length === 0;
  };

  // ----- NAVIGATION -----
  // Go to the next step or show results
  const handleNext = () => {
    // Don't proceed if validation fails
    if (!validateStep()) return;

    // If there are more questions, go to the next one
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // If this was the last question, show the results page
      setShowResults(true);
    }
  };

  // Go back to the previous step
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Restart the checker — clear everything
  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setErrors({});
    setShowResults(false);
  };

  // ----- RENDER: RESULTS PAGE -----
  if (showResults) {
    return (
      <>
        <div className="phase-banner">
          <div className="phase-banner-inner">
            <span className="phase-tag">Prototype</span>
            This is a prototype — not an official government service.
          </div>
        </div>
        <div className="app-container">
          <Results answers={answers} onRestart={handleRestart} />
        </div>
      </>
    );
  }

  // ----- RENDER: SAFETY CHECK -----
  // If there's no current question (shouldn't happen, but good to guard)
  if (!currentQuestion) {
    return (
      <div className="app-container">
        <h1>Check your Council Tax discount eligibility</h1>
        <p>Something went wrong. Please refresh the page.</p>
      </div>
    );
  }

  // ----- RENDER: QUESTION PAGE -----
  return (
    <>
      {/* Phase banner */}
      <div className="phase-banner">
        <div className="phase-banner-inner">
          <span className="phase-tag">Prototype</span>
          This is a prototype — not an official government service.
        </div>
      </div>

      {/* Main content */}
      <div className="app-container">
        <h1>Check your Council Tax discount eligibility</h1>

        {/* Progress indicator */}
        <p className="step-indicator">
          Step {currentStep + 1} of {totalSteps}
        </p>

        {/* Back link — only show if not on the first question */}
        {currentStep > 0 && (
          <a
            href="#"
            className="back-link"
            onClick={(e) => {
              e.preventDefault(); // Stop the link from navigating
              handleBack();
            }}
          >
            ← Back
          </a>
        )}

        {/* The current question */}
        <FormStep
          question={currentQuestion}
          answer={answers[currentQuestion.id]}
          onChange={handleAnswer}
          error={errors[currentQuestion.id]}
        />

        {/* Continue / See results button */}
        <button className="govuk-button" onClick={handleNext}>
          {currentStep === totalSteps - 1 ? 'See results' : 'Continue'}
        </button>
      </div>
    </>
  );
}

export default App;