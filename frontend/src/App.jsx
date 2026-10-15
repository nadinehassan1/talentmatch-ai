
import { useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [cv, setCv] = useState("");
  const [job, setJob] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyzeCV(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cv_text: cv,
          job_description: job,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Analysis failed.");
      }

      setResult(data);
    } catch (err) {
      setError(
        `${err.message}. Check that your FastAPI server is running.`
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app">
      <nav className="navbar">
        <a className="brand" href="/">
          <span className="brand-icon">T</span>
          TalentMatch <span className="ai">AI</span>
        </a>
        <span className="nav-label">AI Career Assistant</span>
      </nav>

      <section className="hero">
        <span className="eyebrow">YOUR NEXT OPPORTUNITY STARTS HERE</span>
        <h1>
          Your skills.
          <br />
          <span>Your next opportunity.</span>
        </h1>
        <p>
          Compare your CV with any job description using AI.
          Discover your strengths, identify skill gaps, and
          get practical recommendations.
        </p>
      </section>

      <form className="input-grid" onSubmit={analyzeCV}>
        <label className="panel">
          <span className="panel-heading">
            <span className="step">01</span>
            Your CV
          </span>
          <span className="hint">
            Paste your experience, education, projects, and skills.
          </span>
          <textarea
            value={cv}
            onChange={(e) => setCv(e.target.value)}
            placeholder="Paste your CV text here..."
            minLength={50}
            maxLength={20000}
            required
          />
          <span className="counter">{cv.length} characters</span>
        </label>

        <label className="panel">
          <span className="panel-heading">
            <span className="step">02</span>
            Job description
          </span>
          <span className="hint">
            Paste the responsibilities and required qualifications.
          </span>
          <textarea
            value={job}
            onChange={(e) => setJob(e.target.value)}
            placeholder="Paste the target job description here..."
            minLength={30}
            maxLength={12000}
            required
          />
          <span className="counter">{job.length} characters</span>
        </label>

        <button
          className="analyze-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Analyzing with Gemini..." : "✦ Analyze my match"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {result && (
        <section className="results">
          <span className="eyebrow">YOUR MATCH REPORT</span>
          <h2>Here's your analysis</h2>
          <p className="summary">{result.summary}</p>

          <div className="result-grid">
            <ResultCard
              title="Matched skills"
              items={result.matched_skills}
              type="matched"
            />
            <ResultCard
              title="Skill gaps"
              items={result.missing_skills}
              type="missing"
            />
          </div>

          <ResultCard
            title="Supporting evidence"
            items={result.evidence}
            type="evidence"
          />
          <ResultCard
            title="Recommended next steps"
            items={result.recommendations}
            type="recommendations"
          />

          <p className="disclaimer">
            AI-generated guidance, not a hiring decision.
            Verify the analysis before acting on it.
          </p>
        </section>
      )}

      <footer>TalentMatch AI · Built with React, FastAPI & Gemini</footer>
    </main>
  );
}

function ResultCard({ title, items = [], type }) {
  return (
    <section className={`result-card ${type}`}>
      <h3>{title}</h3>
      {items.length ? (
        <ul>
          {items.map((item, index) => (
            <li key={`${item}-${index}`}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No items returned.</p>
      )}
    </section>
  );
}

export default App;
