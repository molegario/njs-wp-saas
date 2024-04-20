const PagingNavigation = ({pages=[], handlePaging=()=>{}, pageurl=''}) => {
  return ( 
    <div className="flex flex-row justify-center">
      <div className="grid grid-flow-col gap-2">
        {
          pages.map((page, idx) => <button 
            className={`btn shadow-sm h-[50px] min-w-[50px] ${pageurl === page ? "text-pink-500 bg-white border-2 border-pink-500" : "border-2 border-pink-500"}`} 
            key={`page-${idx}`} 
            onClick={handlePaging(page)}
          >{idx + 1}</button>)
        }
      </div>
    </div>
   );
}

export default PagingNavigation;