import React, { Component } from 'react'
import { uena } from '@utils/index';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: JSON.stringify(props.error) };
  }

  componentDidCatch(error) {
    this.setState({ error: JSON.stringify(error) })
  }

  render() {
    if (this.state.error) {
      const message = process.env.NODE_ENV === 'development' ? this.state.error : uena(this.state.error)
      return(
      <div className="container-error">
        <h1>500 Server Error (TF-Center)</h1>
        <p>Sorry, something went wrong. <br /> A team of hightly trained monkeys has been dispatched to deal this situation.</p>
        <p>{message}</p>
      </div>)
    }
    return this.props.children;
  }
}

export default ErrorBoundary
