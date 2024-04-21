import Input from "components/Input/Input";
import { useState } from "react";

const Filters = ({onSearch}) => {
  const [petFriendly, setPetFriendly] = useState(false)
  const [hasParking, setHasParking] = useState(false)
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  const handleSearch = () => {
    onSearch({
      petFriendly,
      hasParking,
      minPrice,
      maxPrice,
    })
  }

  return ( 
    <div className="max-w-5xl mx-auto mb-5 mt-5 flex justify-center gap-5 p-5 border-solid border-2 border-slate-400 rounded-md">
      <div className="flex-1">
        <div>
          <label className="cursor-pointer">
            <input type="checkbox" checked={hasParking} onChange={()=>setHasParking(prev=>!prev)} />
            <span className="pl-2">has parking</span>
          </label>
        </div>
        <div>
          <label className="cursor-pointer">
            <input type="checkbox" checked={petFriendly} onChange={()=>setPetFriendly(prev=>!prev)} />
            <span className="pl-2">pet friendly</span>
          </label>
        </div>
      </div>
      <div className="flex-1">
        <span>Min price</span>
        <Input type="number" value={minPrice} onChange={evt=>setMinPrice(evt.target.value)} />
      </div>
      <div className="flex-1">
        <span>Max price</span>
        <Input type="number" value={maxPrice} onChange={evt=>setMaxPrice(evt.target.value)} />
      </div>
      <div className="btn" onClick={handleSearch} >
        Search
      </div>
    </div>
   );
}
 
export default Filters;