import { gql } from "@apollo/client";
import client from "client"

export const getPageStaticProps = async (pageuri) => {
  const { data } = await client.query({
    query: gql`
    query PageQuery($uri: String!) {
      nodeByUri(uri: $uri) {
        ... on Page {
          id
          title
          blocks(postTemplate: false)
        }
        ... on Property {
          id
          title
          blocks(postTemplate: false)
        }
      }
      acfOptionsMainMenu {
        mainMenu {
          menuItems {
            items {
              destination {
                ... on Page {
                  uri
                }
              }
              label
            }
            menuItem {
              destination {
                ... on Page {
                  uri
                }
              }
              label
            }
          }
          callToActionButton {
            destination {
              ... on Page {
                uri
              }
            }
            label
          }
        }
      }
    }
    `,
    variables: {
      uri: pageuri || "/",
    }
  })
  return data || {};
}