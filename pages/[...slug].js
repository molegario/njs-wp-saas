import { gql } from "@apollo/client";
import client from "client";
import { BlockRenderer } from "components/BlockRenderer";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";

const Page = (props) => {
  return (
    <div>
      <BlockRenderer blocks={props.blocks} />
    </div>
  );
}
export default Page;

export const getStaticProps = async (ctx) => {
  const { params } = ctx;
  const {
    slug
  } = params;
  const uri = `/${slug.join('/')}/`;
  const { data } = await client.query({
    query: gql`
    query PageQuery($uri: String!) {
      nodeByUri(uri: $uri) {
        ... on Page {
          id
          title
          blocks(postTemplate: false)
        }
      }
    }
    `,
    variables: {
      uri,
    }
  })

  return {
    props: {
      blocks: cleanAndTransformBlocks(data.nodeByUri.blocks),
      slug,
      title: data.nodeByUri.title
    }
  }
}

export const getStaticPaths = async () => {
  const { data } = await client.query(
    {
      query: gql`      
      query AllPagesQuery {
        pages {
          nodes {
            uri
          }
        }
      }
      `
    }
  )

  return {
    paths: data.pages.nodes.filter(yy => yy.uri !== "/").map(
      gg => ({
        params: {
          slug: gg.uri.substring(1, gg.uri.length - 1).split("/"),
        }
      })
    ),
    fallback: "blocking"
  }
}