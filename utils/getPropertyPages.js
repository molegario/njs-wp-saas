import { gql } from "@apollo/client";
import client from "client"

export const getPropertyPages = async (
  offset = '0', 
  size = '1', 
  hasparking, 
  petfriendly, 
  minprice, 
  maxprice,
) => {

  const queryArray = [];

  if(hasparking === 'true') {
    queryArray.push(
      `
      {
        key: "has_parking"
        compare: EQUAL_TO
        value: "1"
      }
      `
      )
  }

  if (petfriendly === 'true') {
    queryArray.push(
      `
      {
        key: "pet_friendly"
        compare: EQUAL_TO
        value: "1"
      }
      `
    )
  }

  if (!!minprice) {
    queryArray.push(
      `
      {
        key: "price"
        compare: GREATER_THAN_OR_EQUAL_TO
        value: "${minprice}"
        type: NUMERIC
      }
      `
    )
  }

  if (!!maxprice) {
    queryArray.push(
      `
      {
        key: "price"
        compare: LESS_THAN_OR_EQUAL_TO
        value: "${maxprice}"
        type: NUMERIC
      }
      `
    )
  }

  const { data } = await client.query({
    query: gql`      
      query PageQuery($offset: Int!, $size: Int!) {
        properties(where: {offsetPagination: {offset: $offset, size: $size}
          metaQuery: {
            relation: AND
            metaArray: [
              ${
                queryArray.join(',\n')
              }
            ]
          }
        }) {
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
      offset: +offset,
      size: +size
    }
  })

  return data;
}