// import { gql } from "@apollo/client";
// import client from "client";
import { BlockRenderer } from "components/BlockRenderer";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";
import { getPageStaticPaths } from "utils/getPageStaticPaths";
import { getPageStaticProps } from "utils/getPageStaticProps";
import { cleanCta, mapMainMenuItems } from "utils/mapMainMenuItems";

const Page = (props) => {
  // console.log("PROPS::FE::", props)
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
  const data = await getPageStaticProps(uri);

  return {
    props: {
      blocks: cleanAndTransformBlocks(data.nodeByUri.blocks),
      slug,
      title: data.nodeByUri.title,
      mainMenuItems: mapMainMenuItems(data?.acfOptionsMainMenu?.mainMenu?.menuItems),
      cta: cleanCta(data?.acfOptionsMainMenu?.mainMenu?.callToActionButton)
    }
  }
}

export const getStaticPaths = async () => {
  const data = await getPageStaticPaths();

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