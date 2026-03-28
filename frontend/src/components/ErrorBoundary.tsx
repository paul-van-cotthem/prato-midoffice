import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
          <h1 className="text-3xl font-bold mb-4 text-rose-500">Oeps! Er ging iets mis.</h1>
          <p className="mb-6 max-w-md">De applicatie kon een actie niet voltooien. Er is een technisch logbericht aangemaakt.</p>
          <div className="p-4 bg-slate-200 dark:bg-slate-900 rounded-lg text-left text-sm font-mono overflow-auto max-w-2xl border border-slate-300 dark:border-slate-800">
            <p className="font-bold mb-2 text-rose-400">Technical Diagnostic Info:</p>
            <pre className="whitespace-pre-wrap text-slate-400">{this.state.error?.message}</pre>
            <p className="mt-4 text-xs text-slate-500 italic">Please share this info with Antigravity for a quick fix.</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-8 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors cursor-pointer"
          >
            Systeem Herstarten
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
