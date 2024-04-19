import { gql } from "@apollo/client";
import client from "client"
import { cleanProperties } from "utils/cleanProperties";

const handler = async (req, res) => {

  try {
    const {data} = await client.query({
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

    console.log("DATA::API::", data, cleanProperties(data?.properties?.nodes))
    res.status(200).json({ 
      message: 'success requested search',
      data: cleanProperties(data?.properties?.nodes),
     })
    return;
  } catch (e) {
    console.log(e.message || "Error ")
    res.status(500).json({ message: e.message || "Error " })
    return;
  }

  // res.status(200).json({ message: 'No valid action was requested' })
}

export default handler;




