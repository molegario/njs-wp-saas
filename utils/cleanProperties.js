import { v4 as uuid } from 'uuid'
export const cleanProperties = (properties) => {
  const cleaned = JSON?.parse(JSON?.stringify(properties))

  const assignIds = (p) => {
    const cleanedproperties = p.reduce( 
      (acc, property)=>{
        const out = {}
        out.id = uuid()
        out.title = property.title
        out.uri = property.uri
        out.bathrooms = property?.propertyFeatures?.bathrooms
        out.bedrooms = property?.propertyFeatures?.bedrooms
        out.hasParking = property?.propertyFeatures?.hasParking
        out.petFriendly = property?.propertyFeatures?.petFriendly
        return [...acc, out]
      },
      []
    )
    return cleanedproperties
  }

  const updated = assignIds(cleaned)
  return updated;
}