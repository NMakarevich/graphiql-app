'use client';

import { Component, ErrorInfo } from 'react';
import { IProps, IState } from './types';

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): IState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    throw new Error(
      `ErrorBoundary caught an error:\n ${error.message},\n ${errorInfo}`
    );
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong...</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
