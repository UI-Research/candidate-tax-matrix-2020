/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import socialImage from "../images/tpcLogo.png"

function SEO({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            url
            image
          }
        }
      }
    `
  )

  const siteTitle = site.siteMetadata.title
  const siteAuthor = site.siteMetadata.author
  const siteURL =site.siteMetadata.url
  const metaDescription = description || site.siteMetadata.description

  const schemaJSONLD = {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": `${site.siteMetadata.title}`,
        "url": `${siteURL}`,
        "thumbnailUrl": `${siteURL}${site.siteMetadata.image}`,
        "dateCreated": "2019-12-10T05:00:00.000Z",
        "articleSection": "Interactive Feature",
        "creator": ["Janet Holtzblatt","Nikhita Airi","Allison Feldman","Alice Feng","Michael Marazzi","Serena Lei"],
        "keywords": ["Taxes and Budget"]
      };

  return (
    <Helmet>
        <html lang="en" />
        <title>{site.siteMetadata.title}</title>
        <meta name="description" content={ metaDescription } />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={ siteAuthor } />
        <meta name="twitter:creator" content={ siteAuthor } />
        <meta name="twitter:title" content={ siteTitle } />
        <meta name="twitter:description" content={ metaDescription } />
        <meta name="twitter:image" content={ socialImage } />
        <meta property="og:title" content={ siteTitle } />
        <meta property="og:description" content={ metaDescription } />
        <meta property="og:image" content={ socialImage } />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:url" content={`${siteURL}`} />
        <script type="application/ld+json">{JSON.stringify(schemaJSONLD)}</script>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
