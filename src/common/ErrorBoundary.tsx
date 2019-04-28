import React from "react";
/**
 * Error boundary is implemented with class because there's no equivalent hook for componentDidCatch yet
 * https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes
 */
export class ErrorBoundary extends React.Component {
  state = {
    error: null
  };
  componentDidCatch() {
    this.setState({ error: true });
  }
  render() {
    if (this.state.error) {
      return (
        <div className="middle">
          Unexpected error. Please contact your system administrator.
        </div>
      );
    }
    return <>{this.props.children}</>;
  }
}
