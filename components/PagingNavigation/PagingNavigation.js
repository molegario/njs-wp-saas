const PagingNavigation = ({pages=[], handlePaging=()=>{}, pagenum=''}) => {
  console.log("PAGES::PAGENUM", pages, pagenum)
  return ( 
    <div className="max-w-5xl mx-auto mb-2 flex justify-center gap-2">
      {
        pages.map((page, idx) => <button 
          className={`btn shadow-sm h-[50px] min-w-[50px] ${+pagenum === +page ? "text-pink-500 bg-white border-2 border-pink-500" : "border-2 border-pink-500"}`} 
          key={`page-${idx}`} 
          onClick={handlePaging(page)}
        >{idx + 1}</button>)
      }
    </div>
   );
}

export default PagingNavigation;