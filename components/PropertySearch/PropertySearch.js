"use client";
import queryString from 'query-string';
import { useEffect, useState } from "react";
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

  const searchPages = async () => {
    const { pageoffset=0, petfriendly, hasparking, minprice, maxprice,  } = queryString.parse(window.location.search);

    const filters = {
      pagesize: PAGE_SIZE
    }

    filters.offset = pageoffset
    if (!!petfriendly && petfriendly.toLowerCase() === "true") {
      filters.petfriendly = petfriendly
    }
    if (!!hasparking && hasparking.toLowerCase() === "true") {
      filters.hasparking = hasparking
    }
    if (!!minprice && minprice !== "undefined") {
      filters.minprice = minprice
    }
    if (!!maxprice && maxprice !== "undefined") {
      filters.maxprice = maxprice
    }

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
      if (!!data.count && !!data.size) { //check if text equiv not empty
        for (let ii = 0; ii < +data.count; ii = ii + +data.size) {
          pages.push(ii)
        }
        setPages(pages)
      } else {
        setPages([]) //clear pagination no results
      }
    }
  }

  useEffect(
    () => {
      searchPages() //init pull
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
    return async evt => {
      const { petfriendly, hasparking, minprice, maxprice, } = queryString.parse(window.location.search)
      await router.push(`${router.query.slug.join("/")}?pageoffset=${pageuri}&petfriendly=${petfriendly==="true"}&hasparking=${hasparking==="true"}&minprice=${minprice ?? ""}&maxprice=${maxprice ?? ""}`, null, {shallow:true})
      searchPages()
    }
  }

  const handleSearch = async ({petfriendly, hasparking, minprice, maxprice}) => {
    //update browser url
    await router.push(`${router.query.slug.join("/")}?pageoffset=0&petfriendly=${!!petfriendly}&hasparking=${!!hasparking}&minprice=${minprice ?? ""}&maxprice=${maxprice ?? ""}`, null, { shallow: true })
    //search-->
    searchPages()
  }

  return ( 
    <div>
      <Filters onSearch={handleSearch} />
      {
        pages.length > 0 && (
          <PagingNavigation pages={pages} handlePaging={handlePaging} pagenum={reqOffset} />
        )
      }
      
      <Results properties={properties} />
      {
        pages.length > 0 && (
          <PagingNavigation pages={pages} handlePaging={handlePaging} pagenum={reqOffset} />
        )
      }
    </div>
   );
}
 
export default PropertySearch;