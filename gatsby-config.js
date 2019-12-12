
let deployBucket =
  process.env.DEPLOY_BUCKET || "candidate-tax-matrix-2020-stg";

let deployAddress =
  process.env.DEPLOY_ADDRESS || "http://candidate-tax-matrix-2020-stg.s3-website-us-east-1.amazonaws.com";

const siteAddress = new URL(deployAddress);

  module.exports = {
  siteMetadata: {
    title: `Where the 2020 Presidential Candidates Stand on Tax Policy`,
    description: `How would the 2020 presidential candidates change the tax code? Dig into the details of their latest proposals.`,
    author: `@urbaninstitute`,
    url:  `https://urbn.is/2020tax`,
    image: `/images/social.png`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        typeName: `Json`,
        path: `${__dirname}/src/data`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/tpcLogo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        monotype: {
          projectId: '847ecb19-cb74-45f9-b379-92686dbe694b',
          loadAllFonts: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
          siteUrl: siteAddress.href.slice(0, -1),
      }
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
          bucketName: deployBucket,
          protocol: siteAddress.protocol.slice(0, -1),
          hostname: siteAddress.hostname,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-392952-2",
      },
    },
  ]
}
