import Link from "next/link";
import { getTextAligned } from "utils/fonts";

const CallToAction = (props) => {
  console.log("CTA:::", props)
  return ( 
    <div className={`${getTextAligned(props.align)}`}>
      <Link href={props.destination} className="btn">{props.label}</Link>
    </div>
   );
}
 
export default CallToAction;