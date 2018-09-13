import React, { Component, Fragment } from 'react';
import Head from '../components/head';
import A from '../components/a';
import Masonry from 'react-masonry-component';

import { black, blue, grayLight } from '../variables.json';

import InstagramCard from '../components/cards/instagram-card';
import GithubCard from '../components/cards/github-card';

import instagramData from '../media/instagram.json';
import githubData from '../media/github.json';
import twitterData from '../media/twitter.json';
if (!Array.isArray(instagramData)) { throw new Error('media/instagram.json does not contain an array!'); }
if (!Array.isArray(githubData)) { throw new Error('media/github.json does not contain an array!'); }
if (!Array.isArray(twitterData)) { throw new Error('media/twitter.json does not contain an array!'); }

const SOCIAL_CARDS = [
  ...instagramData.map(entry => ({
    ...entry,
    type: 'instagram',
    id: entry.node.shortcode,
    timestamp: new Date(entry.node.taken_at_timestamp * 1000).toISOString(),
  })),
  ...githubData.map(entry => ({
    ...entry,
    type: 'github',
    id: entry.id,
    timestamp: entry.created_at,
  })),
  ...twitterData.map(entry => ({
    ...entry,
    type: 'twitter',
    timestamp: new Date(entry.created_at).toISOString(),
    id: entry.id_str,
  })),
].sort((a, b) => {
  return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
});

const MasonryContext = React.createContext();

const Hero = ({showReadMore, onClickReadMore}) => (
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
        <p className="hero-desc" style={showReadMore ? {display: 'block'} : {display: 'none'}}>
          <A onClick={onClickReadMore}>Read more</A>
        </p>
      </div>
    </div>
    <style jsx>{`
      .hero-wrapper {
        padding-top: 64px;
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 5px;
        background-color: ${showReadMore ? '#FFF' : '#F8F8F8'};
        transition: all 250ms ease-in-out;
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
        line-height: 28px;
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
          <div style={{
            width: '100%',
            maxWidth: 490,
            marginBottom: 10,
          }} ref={r => { this.widget = r; }}>
          </div>
        )
      }} />
    );
  }
}

const TARGET_PROJECT_LIST_WIDTH_PX = 490;
class ProjectList extends Component {
  state = {
    projectListWidth: typeof document !== 'undefined' ?
      Math.min(TARGET_PROJECT_LIST_WIDTH_PX, document.body.clientWidth-20) : /* on page */
      TARGET_PROJECT_LIST_WIDTH_PX, /* when initially server-side rendered */
  }

  lastResizeTimeout = null
  onResize = () => {
    this.setState({
      projectListWidth: typeof document !== 'undefined' ?
        Math.min(TARGET_PROJECT_LIST_WIDTH_PX, document.body.clientWidth-20) : /* on page */
        TARGET_PROJECT_LIST_WIDTH_PX, /* when initially server-side rendered */
    }, () => {
      // Once done resizing, re-run masonry
      this.lastResizeTimeout && window.clearTimeout(this.lastResizeTimeout);
      this.lastResizeTimeout = window.setTimeout(() => {
        this.masonry.performLayout();
      }, 250);
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  render() {
    const { visible, children } = this.props;
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
                  columnWidth: this.state.projectListWidth,
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
            width: 100vw;
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
}

const HeroReadMore = ({visible}) => (
  <Fragment>
    <div className="hero-read-more-wrapper">
      <div className="hero-read-more">
        <p className="hero-read-more-p">
          As far back as I can remember, I've always enjoyed making things. 
        </p>
        <p className="hero-read-more-p">
          I first started programming (hey, that's a form of making, right?) when I was 10.
          After quickly figuring out most of the fundementals, I realized that software
          development is something that I'm passionate about. Since then, I've been slowly
          building my skills and building cool, useful pieces of software. Along the way, I've
          won a <A
            target="_blank"
            href="https://medium.com/@hackupstate/hack-upstate-the-results-cc08656fa5cc"
          >couple</A> <A
            href="https://medium.com/@hackupstate/hack-upstate-vii-the-results-are-in-384766680f1d"
          >awards</A> and turned software
          development into my career – first at <A href="https://lono.io">Lono</A> and now at{' '}
          <A href="https://density.io">Density</A>.  
        </p>
        <img className="hero-read-more-image one" src="/static/terminal.png" />
        <p className="hero-read-more-p">
          In my youth, I didn't have access to much money – if I wanted something, I had to
          make it. So, through trial and error and a lot of iteration, I eventually figured out
          how to construct physical contraptions. When I was a little older and my parents
          started to let me use their tools, I also found that making things with my hands is
          something I found deeply satisfying. While software development could pay the bills,
          it was clear that woodworking, metalworking, sewing, and all other manual arts would
          be an important part of my life.
        </p>
        <img className="hero-read-more-image two" src="/static/spool.png" />
        <p className="hero-read-more-p">
          Since that realization, I've slowly been building up a space for me to make. At first, it
          was a desk in my bedrooom. All throughout high school, it was a corner of my parents
          basement. Now, I'm lucky enough to have a space devoted to my art, even if it's
          windowless and only has one outlet.
        </p>
        <img className="hero-read-more-image three" src="/static/anvil.png" />
      </div>
    </div>
    <style jsx>{`
      .hero-read-more-wrapper {
        padding-top: 10px;
        padding-left: 10px;
        padding-right: 10px;
        max-height: ${visible ? '1000px' : '0px'};
        opacity: ${visible ? 1 : 0};
        transition: all 250ms ease-in-out;

        position: relative;
        overflow: hidden;
      }
      .hero-read-more {
        max-width: 530px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;

        display: flex;
        flex-direction: column;
      }
      .hero-read-more-p {
        margin-top: 8px;
        margin-bottom: 8px;
        font-size: 18.5px;
        line-height: 28px;
      }
      .hero-read-more-image {
        width: 200px;
        height: 200px;
        position: absolute;
        opacity: 0.5;
      }
      .hero-read-more-image.one { transform: translate(-300px, 0px); }
      .hero-read-more-image.two { transform: translate(-300px, 230px); }
      .hero-read-more-image.three { transform: translate(650px, 350px); }
    `}</style>
  </Fragment>
);

class Home extends Component {
  state = {
    readMore: false,
  }

  render() {
    return (
      <div>
        <Head title="Ryan Gaus" />

        <Hero
          onClickReadMore={() => this.setState({readMore: true})}
          showReadMore={!this.state.readMore}
        />

        <HeroReadMore visible={this.state.readMore} />

        <ProjectList>
          {SOCIAL_CARDS.map(entry => {
            switch (entry.type) {
            case 'github':
              if (!entry.fork && entry.description && entry.description.length > 0) {
                return <GithubCard
                  key={entry.id}
                  data={entry}
                />;
              } else {
                return null;
              }
            case 'instagram':
              return <InstagramCard
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
}

export default Home
