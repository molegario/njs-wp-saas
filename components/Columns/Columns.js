const Columns = (props) => {
  console.log("COL::PROPS:::", props)

  const {
    isStackedOnMobile,
    children
  } = props;
  return ( 
    <div className="my-10">
      <div className={`max-w-5xl mx-auto ${ isStackedOnMobile ? "block md:flex" : "flex" }`}>
        {children}
      </div>
    </div>
   );
}
 
export default Columns;