import React from "react";
import { getFontsizeForHeading, getTextAligned } from "utils/fonts";

const Heading = (props) => {
  const { textAlign, content, level = 2 } = props
  const tag = React.createElement(`h${level}`, {
    dangerouslySetInnerHTML: {__html: content},
    className: `font-heading max-w-5xl mx-auto my-5 ${getTextAligned(textAlign)} ${getFontsizeForHeading(level)}`
  })
  return tag;
}
 
export default Heading;