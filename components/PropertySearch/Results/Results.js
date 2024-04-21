import PropertyCard from "components/PropertyCard/PropertyCard";

const Results = (props) => {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-3 gap-5 mb-2 mt-2">
      {
        (props.properties || []).map(xx => <PropertyCard key={xx.id} {...xx} />)
      }
      {
        props.properties?.length === 0 && (<>
          <div/><span className="block text-center p-5">no results available.</span><div/>
        </>
        )
      }
    </div>
  );
}

export default Results;