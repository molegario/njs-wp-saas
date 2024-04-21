import queryString from 'query-string';
const PagingNavigation = ({pages=[], handlePaging=()=>{}, pagenum=0}) => {
  // const { pageoffset=0 } = queryString.parse(window.location.search)
  // const pageoffset = 0
  // console.log("PAGENAV::", pagenum, pages)
  
  return ( 
    <div className="max-w-5xl mx-auto mb-2 flex justify-center gap-2">
      {
        pages.map((page, idx) => <button 
          className={`btn shadow-sm h-[50px] min-w-[50px] ${+pagenum === +page ? "border-2 border-pink-500" : "text-pink-500 bg-white border-2 border-pink-500"}`} 
          key={`page-${idx}`} 
          onClick={handlePaging(page)}
        >{idx + 1}</button>)
      }
    </div>
   );
}

export default PagingNavigation;