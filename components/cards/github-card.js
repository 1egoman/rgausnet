import React, { Component, Fragment } from 'react';

import { black, blue } from '../../variables.json';

const GithubEmbed = ({data}) => {
  return (
    <Fragment>
      <a className="github-card-link" target="_blank" href={data.html_url}>
        <div className="github-card">
          <span className="github-card-header">{data.name}</span>
          <div className="github-card-desc">{data.description}</div>
          <div className="github-card-footer">
            <span className="github-card-footer-item">Learn more</span>
            <span className="github-card-footer-platform">Github</span>
          </div>
        </div>
      </a>
      <style jsx>{`
        .github-card-link {
          text-decoration none;
          color: ${black};
        }
        .github-card {
          width: 490px;
          background-color: #fff;
          border-radius: 3px;
          border: 1px solid #dbdbdb;

          padding-top: 20px;

          margin-bottom: 20px;
          cursor: pointer;

          transition: all 100ms ease-in-out;
          opacity: 0.75;
          user-select: none;
        }
        .github-card:hover { opacity: 1; }
        .github-card:active, .github-card:focus { opacity: 0.8; }
        .github-card-header {
          font-size: 24px;
          font-weight: 600;
          padding-left: 15px;
          padding-right: 15px;
          text-decoration: none;
        }
        .github-card-desc {
          margin-top: 16px;
          padding-left: 16px;
          padding-right: 16px;
          text-decoration: none;
        }
        .github-card-footer {
          margin-top: 16px;
          margin-bottom: 4px;
          padding-left: 16px;
          padding-right: 16px;
          font-size: 18px;
          line-height: 36px;

          display: flex;
          flex-direction: row;
        }
        .github-card-footer-item {
          margin-right: 10px;
          color: ${blue};
          font-weight: 600;
        }
        .github-card-footer-platform {
          margin-left: auto;
          font-weight: 600;
        }
      `}</style>
    </Fragment>
  );
}

export default GithubEmbed;
