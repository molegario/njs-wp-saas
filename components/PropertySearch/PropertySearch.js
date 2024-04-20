"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import Results from "./Results/Results";

const PropertySearch = (props) => {
  const [properties, setProperties] = useState([])
  const {data, error} = useSWR(
    "/api/search",
    (url) => fetch(url).then(res => res.json()),
    {
      dedupingInterval: 0
    }
  )

  useEffect(
    () => {
      setProperties(data?.data)
    },
    [data, setProperties]
  )

  return ( 
    <div>
      <Results properties={properties} />
    </div>
   );
}
 
export default PropertySearch;