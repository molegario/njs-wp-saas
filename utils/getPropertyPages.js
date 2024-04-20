import { gql } from "@apollo/client";
import client from "client"
// const PAGE_SIZE = 3;
// import { cleanProperties } from "utils/cleanProperties";

export const getPropertyPages = async (offset=0, size=1) => {
  const { data } = await client.query({
    query: gql`      
      query PageQuery($offset: Int!, $size: Int!) {
        properties(where: {offsetPagination: {offset: $offset, size: $size}}) {
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
          pageInfo {
            offsetPagination {
              total
            }
          }
        }
      }
      `,
    variables: {
      offset,
      size: size
    }
  })

  return data;
}