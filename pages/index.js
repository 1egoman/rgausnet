import React, { Component, Fragment } from 'react';
import Head from '../components/head';
import A from '../components/a';
import Masonry from 'react-masonry-component';

import { black, blue, grayLight } from '../variables.json';

const SOCIAL_CARDS = [
  ...require('../media/instagram.json').map(entry => ({
    ...entry,
    type: 'instagram',
    id: entry.node.shortcode,
    timestamp: new Date(entry.node.taken_at_timestamp * 1000).toISOString(),
  })),
  ...require('../media/github.json').map(entry => ({
    ...entry,
    type: 'github',
    id: entry.id,
    timestamp: entry.created_at,
  })),
  ...require('../media/twitter.json').map(entry => ({
    ...entry,
    type: 'twitter',
    timestamp: new Date(entry.created_at).toISOString(),
    id: entry.id_str,
  })),
].sort((a, b) => {
  return a.timestamp < b.timestamp;
});

const MasonryContext = React.createContext();

const Hero = () => (
  <Fragment>
    <div className="hero-wrapper">
      <div className="hero">
        <img className="hero-image" src="/static/me.png" />
        <h1 className="hero-title">I'm <span>Ryan</span>.</h1>
        <p className="hero-desc">
          I'm a software developer at <A target="_blank" href="https://density.io">Density</A>{' '}
          and I build stuff in my spare time.
        </p>
        <p className="hero-social">
          <span className="hero-social-link">
            <A href="mailto:rsg1egoman@gmail.com">Email</A>
          </span>
          <span className="hero-social-link">
            <A target="_blank" href="https://github.com/1egoman">Github</A>
          </span>
          <span className="hero-social-link">
            <A target="_blank" href="https://twitter.com/rgausnet">Twitter</A>
          </span>
          <span className="hero-social-link">
            <A target="_blank" href="https://instagram.com/rgausgaus">Instagram</A>
          </span>
        </p>
        <p className="hero-desc">
          <A onClick={() => console.log('bla')}>Read more</A>
        </p>
      </div>
    </div>
    <style jsx>{`
      .hero-wrapper {
        padding-top: 64px;
        padding-left: 10px;
        padding-right: 10px;
      }
      .hero {
        max-width: 530px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;

        display: flex;
        flex-direction: column;
      }
      .hero-image {
        margin-left: auto;
        margin-right: auto;
        width: 214px;
        height: 214px;
      }
      .hero-title {
        font-weight: 400;
        margin-top: 5px;
        margin-bottom: 8px;
      }
      .hero-title > span {
        font-weight: 600;
      }
      .hero-desc {
        margin-top: 8px;
        margin-bottom: 8px;
        font-size: 20px;
      }
      .hero-social {
        font-size: 14px;
        margin-top: 8px;
        margin-bottom: 8px;
      }
      .hero-social-link {
        margin-right: 10px;
      }
    `}</style>
  </Fragment>
);

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

class TwitterEmbed extends Component {
  componentDidMount() {
    if (window.twttr) {
      // Twitter is loaded.
      this.hydrateEmbed();
    } else {
      // Wait for twitter to load
      const inverval = setInterval(() => {
        if (window.twttr) {
          this.hydrateEmbed();
          window.clearInterval(inverval);
        }
      }, 250);
    }
  }

  hydrateEmbed = () => {
    const { id } = this.props;
    window.twttr.widgets.createTweetEmbed(id, this.widget).then(() => {
      setTimeout(() => {
        this.parentComponent.masonry.performLayout();
      }, 500)
    })
  }

  render() {
    return (
      <MasonryContext.Consumer children={cmp => {
        this.parentComponent = cmp;
        return (
          <div style={{width: 490, marginBottom: 10}} ref={r => { this.widget = r; }}>
          </div>
        )
      }} />
    );
  }
}

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

const ProjectList = ({visible, children}) => {
  return (
    <Fragment>
      <div className="projects-container">
        <div className="projects-tab-row">
          <div className="projects-tab-name">Recent Projects</div>
        </div>
        <div className={`projects-content-wrapper ${visible ? 'visible' : ''}`}>
          <div className="projects-content">
            <Masonry
              className="projects-masonry"
              options={{
                columnWidth: 490,
                gutter: 20,
                fitWidth: true,
                transitionDuration: '0.2s',
              }}
              ref={r => { this.masonry = r; }}
            >
              <MasonryContext.Provider value={this}>
                {children}
              </MasonryContext.Provider>
            </Masonry>
          </div>
        </div>
      </div>
      <style jsx>{`
        .projects-container {
          width: 100%;
          background-color: ${grayLight};
          margin-top: 42px;

          position: relative;
          min-height 300px;
        }
        .projects-tab-row {
          position: absolute;
          width: 100%;
          top: -21px;

          display: flex;
          flex-direction: row;
        }
        .projects-tab-name {
          display: inline-block;
          font-size: 20px;
          font-weight: 600;
          border-radius: 4px;

          background-color: ${grayLight};
          line-height: 42px;

          padding-left: 42px;
          padding-right: 42px;
          margin-left: auto;
          margin-right: auto;
        }
        .projects-content-wrapper {
          padding-top: 42px;
          padding-left: 10px;
          padding-right: 10px;
        }
        .projects-content {
          width: 100%;
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto;
        }
        :global(.projects-masonry) {
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </Fragment>
  );
}

const Home = () => {
  return (
    <div>
      <Head title="Ryan Gaus" />

      <Hero />

      <ProjectList>
        {SOCIAL_CARDS.map(entry => {
          switch (entry.type) {
          case 'github':
            if (!entry.fork && entry.description && entry.description.length > 0) {
              return <GithubEmbed
                key={entry.id}
                data={entry}
              />;
            } else {
              return null;
            }
          case 'instagram':
            return <InstagramEmbed
              key={entry.id}
              data={entry}
            />;
          case 'twitter':
            return <TwitterEmbed key={entry.id} id={entry.id} />;
          default:
            return null;
          }
        })}
      </ProjectList>
    </div>
  );
}

export default Home
