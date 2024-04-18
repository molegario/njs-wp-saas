import { v4 as uuid } from 'uuid'
export const mapMainMenuItems = (mainMenuItems) => {
  const cleaned = JSON.parse(JSON.stringify(mainMenuItems))
  const assignIds = (b) => {
    let acc = [];
    b.forEach(block => {
      const out = {}
      out.id = uuid()

      if (block?.menuItem) {
        out.destination = block.menuItem?.destination?.uri || "";
        out.label = block.menuItem?.label || ""
      } else {
        out.destination = block.destination?.uri || "";
        out.label = block.label || ""
      }

      if(block?.items) {
        out.items = assignIds(block.items)
      }

      acc.push(out)
    })
    return acc
  }
  const updated = assignIds(cleaned)
  return updated;
}

// export const omit = (key, obj) => {
//   const {[key]: omitted, ...rest} = obj;
//   return rest;
// }

export const cleanCta = (ctaBlock) => {
  const cleaned = JSON.parse(JSON.stringify(ctaBlock));
  return {
    label: cleaned?.label,
    destination: cleaned?.destination?.uri,
  };
}