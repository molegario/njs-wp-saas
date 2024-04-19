import ButtonLink from 'components/ButtonLink/ButtonLink';
import Link from 'next/link';
import { FaHouseUser, FaHeart } from 'react-icons/fa'

const MainMenu = (props) => {
  const { menuItems } = props
  return (
    <div className="bg-slate-800 text-white px-5 h-[64px] sticky top-0 z-20 flex">
      <div className="py-4 pl-3 flex text-pink-600">
        <FaHouseUser size={30} />
        <FaHeart size={30} />
      </div>
      <div className="flex flex-1 justify-end">
        {
          (menuItems || []).map(xxx => {
            return (
              <div key={xxx.id} className="hover:bg-slate-700 cursor-pointer relative group">
                <div>
                  <Link
                    className="p-5 block "
                    href={xxx.destination}
                  >{xxx.label}</Link>
                </div>
                {
                  !!xxx.items?.length && (
                    <div className="group-hover:block hidden hover:bg-slate-800 text-right cursor-pointer absolute right-0 top-full -mt-3">
                      {
                        xxx.items.map(uuu => (
                          <Link
                            key={uuu.id}
                            className="block whitespace-nowrap p-5 hover:bg-slate-500"
                            href={uuu.destination}
                          >{uuu.label}</Link>
                        ))
                      }
                    </div>
                  )
                }
              </div>
            )
          })
        }
        <div
          className="ml-3 my-auto"
        >
          <ButtonLink href={props.cta.destination}>
            {props.cta.label}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;