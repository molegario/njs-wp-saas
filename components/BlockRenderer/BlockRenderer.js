import CallToAction from "components/CallToAction/CallToAction";
import Column from "components/Column/Column";
import Columns from "components/Columns/Columns";
import Cover from "components/Cover/Cover";
import Heading from "components/Heading/Heading";
import Paragraph from "components/Paragraph/Paragraph";
import PropertySearch from "components/PropertySearch/PropertySearch";
import Image from "next/image";

export const BlockRenderer = ({blocks}) => {
  return blocks.map(block=>{
    switch(block.name) {
      case 'core/cover': {
        return (<Cover key={block.id} background={block.attributes.url}><BlockRenderer blocks={block.innerBlocks}/></Cover>);
      }
      case 'core/post-title':
      case 'core/heading': {
        return (<Heading key={block.id} {...block.attributes} />);
      }
      case 'core/paragraph': {
        return (
          <Paragraph key={block.id} {...block.attributes}/>
        )
      }
      case 'core/columns': {
        return (
          <Columns 
            key={block.id} 
            isStackedOnMobile={block?.attributes?.isStackedOnMobile} 
          >
            <BlockRenderer blocks={block?.innerBlocks ?? []} />
          </Columns>
        )
      }
      case 'core/column': {
        return (
          <Column 
            width={block?.attributes?.width}
            key={block.id}
          >
            <BlockRenderer
              blocks={block?.innerBlocks ?? []}
            />
          </Column>
        )
      }
      case 'core/image': {
        // console.log("IMAGE:::", block?.attributes?.url)
        return (
          <Image 
            key={block.id} 
            src={block?.attributes?.url}
            height={block?.attributes?.height}
            width={block?.attributes?.width}
            alt={block?.attributes?.alt || ""}
            // priority="true"
            placeholder="blur"
            blurDataURL="block?.attributes?.url"
          />
        )
      }
      case 'core/group':
      case 'core/block':
      {
        return <BlockRenderer key={block.id} blocks={block.innerBlocks}/>
      }
      case 'acf/ctabutton': {
        return (
          <CallToAction key={block.id} {...{
            label: block?.attributes?.data?.label,
            destination: block?.attributes?.data?.destination,
            align: block?.attributes?.data?.align,
          }} />
        )
      }
      case 'acf/propertysearch': {
        return (
          <PropertySearch key={block.id} />
        )
      }
      default: {
        // console.warn("UNKNOWN BLOCK::", block.name);
        return null;
      }
    }
  })
}