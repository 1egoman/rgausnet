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

class InstagramEmbed extends Component {
  state = { complete: false }

  componentDidMount() {
    if (window.instgrm) {
      // Instagram is loaded.
      this.hydrateEmbed();
    } else {
      // Wait for instagram to load
      const inverval = setInterval(() => {
        if (window.instgrm) {
          this.hydrateEmbed();
          window.clearInterval(inverval);
        }
      }, 250);
    }
  }

  hydrateEmbed = () => {
    setTimeout(() => {
      instgrm.Embeds.process(this.widget);
      const interval = window.setInterval(() => {
        const child = this.container && this.container.children[0];
        if (child && child.tagName === 'IFRAME') {
          window.clearInterval(interval);
          child.onload = () => {
            this.setState({complete: true}, () => {
              this.parentComponent.masonry.performLayout();
              this.props.onComplete();
            });
          }
        }
      }, 500);
    }, 250);
  }

  render() {
    const { id } = this.props;
    return <MasonryContext.Consumer children={cmp => {
      this.parentComponent = cmp;
      return (
        <div style={
          this.state.complete ? {width: 490, marginBottom: 8} : {width: 490, height: 0}
        } ref={r => { this.container = r; }}>
          <blockquote
            className="instagram-media"
            ref={r => { this.widget = r; }}
            data-instgrm-captioned
            data-instgrm-permalink={`https://www.instagram.com/p/${id}/?utm_source=ig_embed`}
            data-instgrm-version="9"
            style={{width: 490}}
          ></blockquote>
        </div>
      );
    }} />
  }
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
        this.props.onComplete();
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
          <span className="github-card-header">{data.name}&nbsp;&nbsp;{data.stargazers_count} stars</span>
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
        }
        .github-card:active, .github-card:focus {
          opacity: 0.8;
        }
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
          padding-top: 30px;
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

class Home extends Component {
  state = {
    loadedNumber: 0,
  }

  componentDidMount() {
    this.setState({
      loadedNumber: SOCIAL_CARDS.filter(i => i.type === 'github').length,
    });
  }

  render() {
    return (
      <div>
        <Head title="Ryan Gaus" />

        <Hero />

        <ProjectList visible={this.state.loadedNumber === SOCIAL_CARDS.length}>
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
                id={entry.id}
                onComplete={() => {
                  this.setState(oldState => ({loadedNumber: oldState.loadedNumber + 1}));
                }}
              />;
            default:
              return null;
            }
          })}
          <TwitterEmbed onComplete={() => 0} />
        </ProjectList>
      </div>
    )
  }
}

export default Home
