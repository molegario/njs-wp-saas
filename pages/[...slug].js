import { BlockRenderer } from "components/BlockRenderer";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";
// import { cleanProperties } from "utils/cleanProperties";
import { getPageStaticPaths } from "utils/getPageStaticPaths";
import { getPageStaticProps } from "utils/getPageStaticProps";
import { cleanCta, mapMainMenuItems } from "utils/mapMainMenuItems";

const Page = (props) => {
  console.log("SLUG::PROPS::", props)
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

  // console.log("DATAOUT::::", cleanProperties(data.properties.nodes))
  return {
    props: {
      blocks: data?.nodeByUri?.blocks ? cleanAndTransformBlocks(data.nodeByUri.blocks) : [],
      slug,
      title: data?.nodeByUri?.title ?? "",
      mainMenuItems: mapMainMenuItems(data?.acfOptionsMainMenu?.mainMenu?.menuItems),
      cta: cleanCta(data?.acfOptionsMainMenu?.mainMenu?.callToActionButton),
      // allproperties: cleanProperties(data?.properties?.nodes),
    }
  }
}

export const getStaticPaths = async () => {
  const data = await getPageStaticPaths();
  return {
    paths: [...data.pages.nodes, ...data.properties.nodes].filter(yy => yy.uri !== "/").map(
      gg => ({
        params: {
          slug: gg.uri.substring(1, gg.uri.length - 1).split("/"),
        }
      })
    ),
    fallback: "blocking"
  }
}