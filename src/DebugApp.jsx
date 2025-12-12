// src/DebugApp.jsx
import React from 'react'
import ErrorBoundary from './ErrorBoundary'
import App from './App'

export default function DebugApp() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  )
}
