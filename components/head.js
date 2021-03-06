import React, { Fragment } from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'

const defaultDescription = ''
const defaultOGURL = ''
const defaultOGImage = ''

const Head = props => (
  <Fragment>
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{props.title || ''}</title>
      <meta
        name="description"
        content={props.description || defaultDescription}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" />

      <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
      <link rel="manifest" href="/static/site.webmanifest" />
      <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#5bbad5" />
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="msapplication-config" content="/static/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />

      <meta property="og:url" content={props.url || defaultOGURL} />
      <meta property="og:title" content={props.title || ''} />
      <meta
        property="og:description"
        content={props.description || defaultDescription}
      />
      <meta name="twitter:site" content={props.url || defaultOGURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </NextHead>

    {/* Include the font on every page */}
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css?family=Josefin+Sans:300,600');

      body {
        font-family: 'Josefin Sans', Helvetica, Arial, sans-serif;
        font-weight: 300;
        font-size: 18px;
      }
    `}</style>

    {/* Include instagram embed script */}
    <script async defer src="https://www.instagram.com/embed.js"></script>

    {/* Include twitter embed script */}
    <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
  </Fragment>
);

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string,
}

export default Head;
