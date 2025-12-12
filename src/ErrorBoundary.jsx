// src/ErrorBoundary.jsx
import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    this.setState({ error, info })
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
          <h1>Runtime error — see console</h1>
          <pre style={{ whiteSpace: 'pre-wrap', color: 'red' }}>
            {this.state.error && this.state.error.toString()}
          </pre>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.info && this.state.info.componentStack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
