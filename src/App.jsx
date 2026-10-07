import './App.css'

function App() {
  return (
    <>
    {/* Phase banneer tells users this is a prototype */}
    <div className="phase-banner">
      <div className="phase-banner-inner">
        <span className="phase-tag">Prototype</span>
      </div>
    </div>

    {/* Main content area */}
    <div className="app-container">
      <h1>Check your council tax eligibility</h1>
      <p>
        Answer a few questions to see if you might qualify for council tax discount.
      </p>
    </div>
    </>
    
  );
}

export default App
