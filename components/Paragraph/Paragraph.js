import React from "react";
import { getFontColorForParagraph, getTextAligned } from "utils/fonts";
import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";

const Paragraph = (props) => {
  const {content, textAlign="left", style, textColor} = props
  const { color } = {...style}

  return <p 
    className={`max-w-5xl mx-auto ${getTextAligned(textAlign)}`}
    style={{
      color: getFontColorForParagraph(color, textColor)
    }}
    dangerouslySetInnerHTML={{__html: relativeToAbsoluteUrls(content)}}
  />;
}
 
export default Paragraph;