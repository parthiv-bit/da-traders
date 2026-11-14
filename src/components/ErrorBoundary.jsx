import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Caught runtime error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-paint-surface flex items-center justify-center p-6 text-paint-charcoal">
          <div className="max-w-md w-full bg-white rounded-4xl p-8 border border-paint-border shadow-card text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-2xl text-paint-charcoal">
                Something went wrong
              </h2>
              <p className="text-xs text-paint-muted mt-1 leading-relaxed">
                We encountered an unexpected issue while rendering this page.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={this.handleReload}
                className="px-6 py-3 rounded-2xl bg-paint-terracotta hover:bg-[#5E0E00] text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

