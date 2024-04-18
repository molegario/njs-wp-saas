// import { gql } from "@apollo/client";
// import client  from "client";
import { BlockRenderer } from "components/BlockRenderer";
// import MainMenu from "components/MainMenu/MainMenu";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";
import { getPageStaticProps } from "utils/getPageStaticProps";
import { cleanCta, mapMainMenuItems } from "utils/mapMainMenuItems";

export default function Home(props) {
  console.log("PROPS::", props)
  return <div>
    <BlockRenderer blocks={props.blocks} />
  </div>;
}

export const getStaticProps = async () => {
  const data = await getPageStaticProps();

  console.log("DATA:::", data, data?.acfOptionsMainMenu?.mainMenu)

  return {
    props: {
      mainMenuItems: mapMainMenuItems(data?.acfOptionsMainMenu?.mainMenu?.menuItems),
      blocks: cleanAndTransformBlocks(data?.nodeByUri?.blocks),
      cta: cleanCta(data?.acfOptionsMainMenu?.mainMenu?.callToActionButton)
    }
  }  
}