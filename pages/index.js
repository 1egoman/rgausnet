import React, { Fragment } from 'react'
import Head from '../components/head'
import A from '../components/a';

const Hero = () => (
  <Fragment>
    <div className="hero-wrapper">
      <div className="hero">
        <img className="hero-image" src="/static/me.png" />
        <h1 className="hero-title">I'm <span>Ryan</span>.</h1>
        <p>foo bar baz <A href="http://google.com">Link</A></p>
      </div>
    </div>
    <style jsx>{`
      .hero-wrapper {
        padding-top: 64px;
        padding-left: 10px;
        padding-right: 10px;
      }
      .hero {
        max-width: 500px;
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
      }
      .hero-title > span {
        font-weight: 600;
      }
    `}</style>
  </Fragment>
)

const Home = () => (
  <div>
    <Head title="Ryan Gaus" />

    <Hero />
  </div>
)

export default Home
