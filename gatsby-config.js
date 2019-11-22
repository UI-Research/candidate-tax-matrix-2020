
let deployBucket =
  process.env.DEPLOY_BUCKET || "candidate-tax-matrix-2020-stg";

module.exports = {
  siteMetadata: {
    title: `Where the 2020 Presidential Candidates Stand on Tax Policy`,
    description: `Our tracker breaks down the candidates’ tax plans by the issues, tallies up the cost, and shows how much household tax bills would change.`,
    author: `@urbaninstitute`,
    url:  `https://urbn.is/2020tax`,
    image: `/images/social.jpg`,
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
      resolve: `gatsby-plugin-s3`,
      options: {
          bucketName: deployBucket,
          // protocol: "https",
          // hostname: "www.example.com",
      },
    },
  ]
}
