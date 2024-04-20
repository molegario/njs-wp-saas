import { faBathtub, faBed, faCar, faDog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import numeral from "numeral";

const PropertyCard = ({
  bathrooms,
  bedrooms,
  hasParking,
  imgTitle,
  imgUri,
  petFriendly,
  price,
  uri,
  title,
}) => {
  return ( 
    <Link 
      href={uri} 
      className="border-2 border-slate-300 p-5 block bg-slate-100 hover:bg-slate-200"
    >
      <div className="flex w-full h-[200px] relative">
        <Image src={imgUri} alt={imgTitle} fill sizes="(max-width: 300px)"/>
      </div>
      <div className="mt-3 text-lg font-bold ">
        {title}
      </div>
      <div className="text-lg ">
        {numeral(price).format('$0,0.00')}
      </div>
      <div className="flex justify-between text-sm mt-3">
        <div>
          <FontAwesomeIcon icon={faBathtub} /> {bathrooms} Bathroom{+bathrooms > 1 ? 's' : ''}
        </div>
        <div>
          <FontAwesomeIcon icon={faBed} /> {bedrooms} Bedroom{+bedrooms > 1 ? 's' : ''}
        </div>
      </div>
      <div className="flex justify-between text-sm mt-3">
        <div>
          {
            petFriendly && (<><FontAwesomeIcon icon={faDog} /> Pet friendly</>)
          }
        </div>
        <div>
          {hasParking && (<><FontAwesomeIcon icon={faCar} /> Parking avail.</>)}
        </div>
      </div>


    </Link>
   );
}
 
export default PropertyCard;