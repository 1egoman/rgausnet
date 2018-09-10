import React, { Fragment } from 'react';

import { black, blue } from '../../variables.json';

const InstagramEmbed = ({data}) => {
  return (
    <Fragment>
      <a className="instagram-card-link" target="_blank" href={`https://www.instagram.com/p/${data.node.shortcode}`}>
        <div className="instagram-card">
          <img className="instagram-card-img" src={data.node.display_url} />
          <div className="instagram-card-desc">
            {(() => {
              if (data.node.edge_media_to_caption.edges[0]) {
                return data.node.edge_media_to_caption.edges[0].node.text.split(' ').map((word, index) => {
                  if (word.startsWith('#')) {
                    return <strong key={`${word}+${index}`}>{word} </strong>;
                  } else {
                    return <Fragment key={`${word}+${index}`}>{word} </Fragment>;
                  }
                })
              } else {
                return null;
              }
            })()}
          </div>
          <div className="instagram-card-footer">
            <span className="instagram-card-footer-item">Learn more</span>
            <span className="instagram-card-footer-platform">Instagram</span>
          </div>
        </div>
      </a>
      <style jsx>{`
        .instagram-card-link {
          text-decoration none;
          color: ${black};
        }
        .instagram-card {
          width: 490px;
          background-color: #fff;
          border-radius: 3px;
          border: 1px solid #dbdbdb;

          margin-bottom: 20px;
          cursor: pointer;
          transition: all 100ms ease-in-out;
          user-select: none;
        }
        .instagram-card:active, .instagram-card:focus {
          opacity: 0.8;
        }
        .instagram-card-img {
          width: 490px;
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
        }
        .instagram-card-desc {
          margin-top: 16px;
          padding-left: 16px;
          padding-right: 16px;
          text-decoration: none;
        }
        .instagram-card-desc > strong {
          font-weight: 600;
        }
        .instagram-card-footer {
          margin-top: 16px;
          margin-bottom: 4px;
          padding-left: 16px;
          padding-right: 16px;
          font-size: 18px;
          line-height: 36px;

          display: flex;
          flex-direction: row;
        }
        .instagram-card-footer-item {
          margin-right: 10px;
          color: ${blue};
          font-weight: 600;
        }
        .instagram-card-footer-platform {
          margin-left: auto;
          font-weight: 600;
        }
      `}</style>
    </Fragment>
  );
}

export default InstagramEmbed;
