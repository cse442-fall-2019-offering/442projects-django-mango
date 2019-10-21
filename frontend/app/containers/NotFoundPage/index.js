import React from 'react';
import './style.css';

export default function NotFound() {
  return (
    <span>
      <div className="background">
        <div className="centerbox">
          <h1>Django Mango</h1>
          <h2>404 Error.</h2>
          <h2 href="/">The requested URL was not found on this server.</h2>
          <a className="link" href="/">
            Return to Login.
          </a>
        </div>
      </div>
    </span>
  );
}
