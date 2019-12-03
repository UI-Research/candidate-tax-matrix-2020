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

  const siteURL =site.siteMetadata.url
  const metaDescription = description || site.siteMetadata.description

  const schemaJSONLD = {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": `${site.siteMetadata.title}`,
        "url": `${siteURL}`,
        "thumbnailUrl": `${siteURL}${socialImage}`,
        "dateCreated": "2019-12-10T05:00:00.000Z",
        "articleSection": "Interactive Feature",
        "creator": ["Janet Holtzblatt","Nikhita Airi","Allison Feldman","Alice Feng","Michael Marazzi","Serena Lei"],
        "keywords": ["Taxes and Budget"]
      };

  return (
    <Helmet>
        <html lang="en" />
        <title>{site.siteMetadata.title}</title>
        <meta name="description" content={metaDescription} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@urbaninstitute" />
        <meta name="twitter:creator" content="@urbaninstitute" />
        <meta name="twitter:title" content="Where the 2020 Presidential Candidates Stand on Tax Policy" />
        <meta name="twitter:description" content="Our tracker breaks down the candidates’ tax plans by the issues, tallies up the cost, and shows how much household tax bills would change." />
        <meta name="twitter:image" content={`${siteURL}${socialImage}`} />
        <meta property="og:title" content="Where the 2020 Presidential Candidates Stand on Tax Policy" />
        <meta property="og:description" content="Our tracker breaks down the candidates’ tax plans by the issues, tallies up the cost, and shows how much household tax bills would change." />
        <meta property="og:image" content={`${siteURL}${socialImage}`} />
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
