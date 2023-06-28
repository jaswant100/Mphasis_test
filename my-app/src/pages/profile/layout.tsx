import {usePathname} from "next/navigation"

export default function Layout( { children }:any) {
  const pathName =usePathname();
 // console.log(pathName)
    return (
      <>
      <h4>Landing Comman Header</h4>
        <main >{children}</main>
      </>
    )
  }