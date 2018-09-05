import React, { Component, Fragment } from 'react';
import Head from '../components/head';
import A from '../components/a';
import Masonry from 'react-masonry-component';

import { grayLight } from '../variables.json';

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
          <A onClick={() => console.log('bla')}>Read More</A>
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
    instgrm.Embeds.process(this.widget);
  }

  render() {
    return (
      <div style={{width: 490, height: 730, marginBottom: 20}}>
        <blockquote
          className="instagram-media"
          ref={r => { this.widget = r; }}
          data-instgrm-captioned
          data-instgrm-permalink="https://www.instagram.com/p/BnRK2JSAyt3/?utm_source=ig_embed"
          data-instgrm-version="9"
          style={{width: 490, height: 730}}
        ></blockquote>
      </div>
    );
  }
}

const ProjectList = () => (
  <Fragment>
    <div className="projects-container">
      <div className="projects-tab-row">
        <div className="projects-tab-name">My Feed</div>
      </div>
      <div className="projects-content-wrapper">
        <div className="projects-content">
          <Masonry options={{gutter: 20}}>
            <InstagramEmbed />
            <InstagramEmbed />
            <div
              style={{background: 'red', width: 490, height: 300, marginBottom: 20}}
            />
            <div
              style={{background: 'red', width: 490, height: 714}}
            />
            <div
              style={{background: 'red', width: 490, height: 714}}
            />
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
    `}</style>
  </Fragment>
);

const Home = () => (
  <div>
    <Head title="Ryan Gaus" />

    <Hero />

    <ProjectList />
  </div>
)

export default Home
