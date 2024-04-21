import queryString from 'query-string';
import Input from "components/Input/Input";
import { useEffect, useState } from "react";

const Filters = ({onSearch}) => {
  const [petfriendly, setPetFriendly] = useState(false)
  const [hasparking, setHasParking] = useState(false)
  const [minprice, setMinPrice] = useState("")
  const [maxprice, setMaxPrice] = useState("")

  useEffect(
    () => {
      const { petfriendly: prevPetFriendly, hasparking: prevHasParking, minprice: prevMinPrice, maxprice: prevMaxPrice, } = queryString.parse(window.location.search);
      setPetFriendly(prevPetFriendly === "true")
      setHasParking(prevHasParking === "true")
      setMinPrice(prevMinPrice ?? "")
      setMaxPrice(prevMaxPrice ?? "")
    },
    []
  )

  const handleSearch = () => {
    onSearch({
      petfriendly,
      hasparking,
      minprice,
      maxprice,
    })
  }

  return ( 
    <div className="max-w-5xl mx-auto mb-5 mt-5 flex justify-center gap-5 p-5 border-solid border-2 border-slate-400 rounded-md">
      <div className="flex-1">
        <div>
          <label className="cursor-pointer">
            <input type="checkbox" checked={hasparking} onChange={()=>setHasParking(prev=>!prev)} />
            <span className="pl-2">has parking</span>
          </label>
        </div>
        <div>
          <label className="cursor-pointer">
            <input type="checkbox" checked={petfriendly} onChange={()=>setPetFriendly(prev=>!prev)} />
            <span className="pl-2">pet friendly</span>
          </label>
        </div>
      </div>
      <div className="flex-1">
        <span>Min price</span>
        <Input type="number" value={minprice} onChange={evt=>setMinPrice(evt.target.value)} />
      </div>
      <div className="flex-1">
        <span>Max price</span>
        <Input type="number" value={maxprice} onChange={evt=>setMaxPrice(evt.target.value)} />
      </div>
      <div className="btn" onClick={handleSearch} >
        Search
      </div>
    </div>
   );
}
 
export default Filters;