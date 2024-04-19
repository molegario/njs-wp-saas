import { gql } from "@apollo/client";
import client from "client"

export const getPageStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
    query AllPagesQuery {
      pages {
        nodes {
          uri
        }
      }
      properties {
        nodes {
          uri
        }
      }
    }
    `
  })
  return data || {};
}