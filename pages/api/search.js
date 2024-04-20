import { cleanProperties } from "utils/cleanProperties";
import { getPropertyPages } from "utils/getPropertyPages";
const PAGE_SIZE = 3;

const handler = async (req, res) => {
  let { offset=0 } = req.query;

  try {
    const data = await getPropertyPages(+offset, PAGE_SIZE);
    res.status(200).json({ 
      message: 'success requested search',
      data: cleanProperties(data?.properties?.nodes),
      count: data?.properties?.pageInfo?.offsetPagination?.total ?? 0,
      size: PAGE_SIZE,
     })
    return;
  } catch (e) {
    res.status(500).json({ message: e.message ?? "Error " })
    return;
  }
}

export default handler;