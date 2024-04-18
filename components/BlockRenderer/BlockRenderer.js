import Cover from "components/Cover/Cover";
import Heading from "components/Heading/Heading";
import Paragraph from "components/Paragraph/Paragraph";

export const BlockRenderer = ({blocks}) => {

  return blocks.map(block=>{
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

      default: 
        return null;
    }
  })

}