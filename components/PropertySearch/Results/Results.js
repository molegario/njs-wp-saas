import PropertyCard from "components/PropertyCard/PropertyCard";

const Results = (props) => {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-3 gap-5 mb-2 mt-2">
      {
        (props.properties || []).map(xx => <PropertyCard key={xx.id} {...xx} />)
      }
    </div>
  );
}

export default Results;