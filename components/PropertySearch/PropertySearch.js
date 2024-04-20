"use client";

import { useCallback, useEffect, useState } from "react";
import Results from "./Results/Results";
import PagingNavigation from "components/PagingNavigation/PagingNavigation";
import { useRouter } from "next/router";
const PAGE_SIZE = 3;

export const fetcher = async (
  url,
  payload,
) => {
  const options = {
    method: payload ? "POST" : "GET",
    ...(payload && { body: payload }),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  return fetch(url, options).then(r => r.json());
};

const PropertySearch = (props) => {
  const [properties, setProperties] = useState([])
  const [pages, setPages] = useState([])
  const router = useRouter()
  const reqOffset = router?.query?.pageoffset ?? 0
  const [data, setData] = useState({})

  const searchPages = useCallback(
    async () => {
      const resp = await fetch(
        '/api/search',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            offset: reqOffset,
            pagesize: PAGE_SIZE,
          })
        }
      );
      const respJSON = await resp.json()
      setData(respJSON)
    },
    [setData, reqOffset, PAGE_SIZE]
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
      searchPages()
    },
    [searchPages]
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