import { cleanProperties } from "utils/cleanProperties";
import { getPropertyPages } from "utils/getPropertyPages";

const handler = async (req, res) => {
  try {
    const data = await getPropertyPages();
    res.status(200).json({ 
      message: 'success requested search',
      data: cleanProperties(data?.properties?.nodes),
     })
    return;
  } catch (e) {
    res.status(500).json({ message: e.message ?? "Error " })
    return;
  }
}

export default handler;