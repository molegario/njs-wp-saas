"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import Results from "./Results/Results";
import PagingNavigation from "components/PagingNavigation/PagingNavigation";

const PropertySearch = (props) => {
  const [properties, setProperties] = useState([])
  const [pages, setPages] = useState([])
  const [pageurl, setPageurl] = useState('/api/search?offset=0')

  const {data, error} = useSWR(
    `/api/search?offset=0`,
    (url) => fetch(url).then(res => res.json()),
    {
      dedupingInterval: 0
    }
  )

  useEffect(
    () => {
      setProperties(data?.data)
      let pages = []
      if (data?.count && data?.size) {
        for (let ii = 0; ii < data.count; ii = ii + data.size) {
          console.log(`/api/search?offset=${ii}`)
          pages.push(`/api/search?offset=${ii}`)
        }
        setPages(pages)
      }
    },
    [data, setProperties]
  )

  const handlePaging = (pageuri) => {
    return async evt => {
      const resp = await fetch(pageuri);
      const respJson = await resp.json()

      setPageurl(pageuri)

      if(respJson.data) {
        setProperties(respJson.data)
      }
    }
  }

  return ( 
    <div>
      <PagingNavigation pages={pages} handlePaging={handlePaging} pageurl={pageurl} />
      <Results properties={properties} />
      <PagingNavigation pages={pages} handlePaging={handlePaging} pageurl={pageurl} />
    </div>
   );
}
 
export default PropertySearch;