import React from 'react';

interface State {
  hasError: boolean;
  error: any;
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, info: any) {
    // Log error
    console.error('ErrorBoundary caught:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <h1 className="text-3xl font-bold text-red-600 mb-2">Something went wrong.</h1>
          <pre className="text-sm text-gray-700 bg-gray-100 p-4 rounded mb-4">{String(this.state.error)}</pre>
          <button onClick={() => window.location.reload()} className="text-teal-700 underline">Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}
