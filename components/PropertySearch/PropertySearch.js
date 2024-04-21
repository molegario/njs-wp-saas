"use client";
import queryString from 'query-string';
import { useEffect, useRef, useState } from "react";
import Results from "./Results/Results";
import PagingNavigation from "components/PagingNavigation/PagingNavigation";
import { useRouter } from "next/router";
import Filters from "components/Filter/Filters";
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
  const [data, setData] = useState({})
  const router = useRouter()
  const reqOffset = router?.query?.pageoffset ?? 0
  // const refReqOffset = useRef(router?.query?.pageoffset ?? 0)

  const searchPages = async () => {
    const { pageoffset=0, petFriendly, hasParking, minPrice, maxPrice,  } = queryString.parse(window.location.search);
    const filters = {
      pagesize: PAGE_SIZE
    }
    // console.log("INC::", typeof petFriendly, hasParking, minPrice, maxPrice)
    filters.offset = pageoffset
    if (petFriendly && petFriendly.toLowerCase() === "true") {
      filters.petfriendly = petFriendly
    }
    if (hasParking && hasParking.toLowerCase() === "true") {
      filters.hasparking = hasParking
    }
    if (!!minPrice) {
      filters.minprice = minPrice
    }
    if (!!maxPrice) {
      filters.maxprice = maxPrice
    }

    console.log("FILTERS::", filters)

    const resp = await fetch(
      '/api/search',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filters)
      }
    );
    const respJSON = await resp.json()
    setData(respJSON)
  }

  const processData = (data) => {
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
  }

  useEffect(
    () => {
      searchPages()
    },
    []
  )

  useEffect(
    () => {
      processData(data)
    },
    [data]
  )

  const handlePaging = (pageuri) => {
    const { petFriendly, hasParking, minPrice, maxPrice, } = queryString.parse(window.location.search)
    return async evt => {
      await router.push(`${router.query.slug.join("/")}?pageoffset=${pageuri}&petFriendly=${!!petFriendly}&hasParking=${!!hasParking}&minPrice=${minPrice}&maxPrice=${maxPrice}`, null, {shallow:true})
      searchPages()
    }
  }

  const handleSearch = async ({petFriendly, hasParking, minPrice, maxPrice}) => {
    //update browser url
    await router.push(`${router.query.slug.join("/")}?pageoffset=0&petFriendly=${!!petFriendly}&hasParking=${!!hasParking}&minPrice=${minPrice}&maxPrice=${maxPrice}`, null, { shallow: true })
    //search-->
    searchPages()
  }

  return ( 
    <div>
      <Filters onSearch={handleSearch} />
      <PagingNavigation pages={pages} handlePaging={handlePaging} pagenum={reqOffset}/>
      <Results properties={properties} />
      <PagingNavigation pages={pages} handlePaging={handlePaging} pagenum={reqOffset}/>
    </div>
   );
}
 
export default PropertySearch;