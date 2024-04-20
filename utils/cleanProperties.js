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
        out.price = property?.propertyFeatures?.price
        out.imgUri = property?.featuredImage.node.sourceUrl
        out.imgTitle = property?.featuredImage.node.title
        return [...acc, out]
      },
      []
    )
    return cleanedproperties
  }

  const updated = assignIds(cleaned)
  return updated;
}