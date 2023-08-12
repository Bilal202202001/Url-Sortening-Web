// import LinksCreateForm from "./createForm"
import Navbar from "../nav"
import LinkHTMLTable from "./table"
export default function LinkPage() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <Navbar/>
      <LinkHTMLTable/>
    </main>
  )
}
