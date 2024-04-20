import { gql } from "@apollo/client";
import client from "client"
// import { cleanProperties } from "utils/cleanProperties";

export const getPropertyPages = async () => {
  const { data } = await client.query({
    query: gql`      
      query PageQuery {
        properties {
          nodes {
            uri
            title
            featuredImage {
              node {
                uri
                title
                altText
                sourceUrl
              }
            }
            propertyFeatures {
              bathrooms
              bedrooms
              fieldGroupName
              hasParking
              petFriendly
              price
            }
          }
        }
      }
      `,
    variables: {

    }
  })

  return data;
}