import { cleanProperties } from "utils/cleanProperties";
import { getPropertyPages } from "utils/getPropertyPages";
const FALLBACK_PAGE_SIZE = 1;

const handler = async (req, res) => {
  let { offset=0, pagesize=FALLBACK_PAGE_SIZE } = req.body;
  try {
    const data = await getPropertyPages(+offset, +pagesize);
    res.status(200).json({ 
      message: 'success requested search',
      data: cleanProperties(data?.properties?.nodes),
      count: data?.properties?.pageInfo?.offsetPagination?.total ?? 0,
      size: pagesize,
     })
    return;
  } catch (e) {
    res.status(500).json({ message: e.message ?? "Error " })
    return;
  }
}

export default handler;