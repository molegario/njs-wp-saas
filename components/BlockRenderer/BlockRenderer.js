import CallToAction from "components/CallToAction/CallToAction";
import Cover from "components/Cover/Cover";
import Heading from "components/Heading/Heading";
import Paragraph from "components/Paragraph/Paragraph";

export const BlockRenderer = ({blocks}) => {
  return blocks.map(block=>{
    // console.log("BLOCK:::", block)
    switch(block.name) {
      case 'core/cover': {
        return (<Cover key={block.id} background={block.attributes.url}><BlockRenderer blocks={block.innerBlocks}/></Cover>);
      }
      case 'core/heading': {
        return (<Heading key={block.id} {...block.attributes} />);
      }
      case 'core/paragraph': {
        return (
          <Paragraph key={block.id} {...block.attributes}/>
        )
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
      default: 
        return null;
    }
  })
}