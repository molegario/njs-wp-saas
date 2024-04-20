import { BlockRenderer } from "components/BlockRenderer";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";
import { getPageStaticProps } from "utils/getPageStaticProps";
import { cleanCta, mapMainMenuItems } from "utils/mapMainMenuItems";

export default function Home(props) {
  return <div>
    <BlockRenderer blocks={props.blocks} />
  </div>;
}

export const getStaticProps = async () => {
  const data = await getPageStaticProps();

  return {
    props: {
      mainMenuItems: mapMainMenuItems(data?.acfOptionsMainMenu?.mainMenu?.menuItems),
      blocks: cleanAndTransformBlocks(data?.nodeByUri?.blocks),
      cta: cleanCta(data?.acfOptionsMainMenu?.mainMenu?.callToActionButton),
    }
  }  
}