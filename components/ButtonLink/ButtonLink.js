import Link from 'next/link';
const ButtonLink = (props) => {
  return ( 
    <>
      <Link href={props.href} className="btn">
        {props.children}
      </Link>
    </>
   );
}
export default ButtonLink;