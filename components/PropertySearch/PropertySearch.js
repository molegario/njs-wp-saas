"use client";

import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import Results from "./Results/Results";
import PagingNavigation from "components/PagingNavigation/PagingNavigation";
import { useRouter } from "next/router";
const PAGE_SIZE = 3;

const PropertySearch = (props) => {
  const [properties, setProperties] = useState([])
  const [pages, setPages] = useState([])
  const router = useRouter()
  const reqOffset = router?.query?.pageoffset ?? 0

  const {data, error} = useSWR(
    `/api/search?offset=${reqOffset}&pagesize=${PAGE_SIZE}`,
    (url) => fetch(url).then(res => res.json()),
    {
      dedupingInterval: 0
    }
  )

  const processData = useCallback(
    (data) => {
      if (data) {
        setProperties(data.data)
        let pages = []
        if (data.count && data.size) {
          for (let ii = 0; ii < +data.count; ii = ii + +data.size) {
            pages.push(ii)
          }
          setPages(pages)
        }
      }
    },
    [
      setProperties, setPages
    ]
  )

  useEffect(
    () => {
      processData(data)
    },
    [data, processData]
  )

  const handlePaging = (pageuri) => {
    return async evt => {
      router.push(`${router.query.slug.join("/")}?pageoffset=${pageuri}`, null, {shallow:true})
    }
  }

  return ( 
    <div>
      <PagingNavigation pages={pages} handlePaging={handlePaging} pagenum={reqOffset} />
      <Results properties={properties} />
      <PagingNavigation pages={pages} handlePaging={handlePaging} pagenum={reqOffset} />
    </div>
   );
}
 
export default PropertySearch;