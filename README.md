# TalentMatch AI — CV-to-Job Matching System

TalentMatch AI is a full-stack application that uses a large language model (LLM) to analyze a candidate's CV against a job description.

The goal is to help candidates understand how their skills align with a role, identify potential skill gaps, and receive suggestions for improving their applications.

## Features

- **AI-powered CV analysis:** Uses Google's Gemini API to analyze CVs against job descriptions.
- **Skill matching:** Identifies skills that match the job requirements.
- **Skill gap analysis:** Highlights required skills that are not demonstrated in the CV.
- **Evidence and recommendations:** Provides supporting evidence and suggestions based on the analysis.
- **Full-stack architecture:** Connects a React frontend to a Python FastAPI backend.
- **Structured responses:** Uses a defined response schema to organize the LLM's output.

## Tech Stack

- Python
- FastAPI
- Google Gemini API
- React
- Vite
- JavaScript
- CSS

## Architecture

1. The user enters a CV and job description in the React interface.
2. The frontend sends the information to the FastAPI backend.
3. The backend sends a prompt to the Gemini API.
4. Gemini returns a structured analysis.
5. The frontend displays the matching skills, missing skills, evidence, and recommendations.

## Getting Started

### Prerequisites

- Python 3.10 or newer
- Node.js and npm
- A Google Gemini API key

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd talentmatch-ai
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the URL of your GitHub repository.

### 2. Set up the Python backend

Create and activate a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate
```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

### 3. Configure the API key

Create a `.env` file in the project root:

```text
GEMINI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your own Gemini API key. Never commit or share this file.

### 4. Start the backend

```bash
python -m uvicorn main:app
```

The API will be available at:

`http://127.0.0.1:8000`

Interactive API documentation:

`http://127.0.0.1:8000/docs`

### 5. Start the frontend

Open a second terminal:

```bash
cd talentmatch-ai/frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually:

`http://localhost:5173`

## Project Status

The core CV-to-job matching workflow is implemented. Further work may include a more comprehensive evaluation suite, retrieval-augmented generation (RAG), and additional testing.

## Security

API keys and other secrets should be stored in environment variables and excluded from version control.

## Disclaimer

This project provides AI-generated guidance. Its results may be incomplete or inaccurate and should not be treated as a definitive hiring decision.

