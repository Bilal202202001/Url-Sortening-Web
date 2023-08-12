import { getSessionUser } from './lib/session'
import Link from 'next/link'
import { getUserByUserID } from './lib/db'

export default async function Navbar(){
    const user = await getSessionUser()
    let userName
    if (user) {
      const data = await getUserByUserID(user)
      userName = data[0].userName
    }
    return <>
        <nav class="flex justify-between items-center bg-gray-800 h-12 w-screen p-9">
        <div className='text-white text-4xl flex justify-between items-center'>
        <img src='/images/logo.png' alt='no Pic' className=" h-16 w-14 mr-3 "/>
          LiNK-iT
        </div>
        <div>
          <Link href='/' class="p-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded m-2">HOME</Link>
          <Link href='/links' class="p-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded m-2 ">LINKS</Link>
          <Link href='/blog' class="p-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded m-2">BLOGS</Link>
        </div>
        <div className='flex  justify-between items-center'>
          {user?<div className='flex justify-between items-center text-white text-sm mr-5 '>
            {userName}
          <img src='/images/account.png' alt='no Pic' className=" h-6 w-6 ml-3"/>
          </div>:<div></div>}
          {user ?
            <Link href='/logout' class="flex justify-between items-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded m-2">LOGOUT
            <img src='/images/arrow.png' alt='no Pic' className=" h-4 w-4 ml-2 animate-pulse"/>
            </Link>
            :
            <div className='flex justify-between items-center'>
            <Link href='/register' class="p-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded m-2">REGISTER</Link>
            <Link href='/login' class="flex justify-between items-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded m-2">LOGIN
            <img src='/images/private.png' alt='no Pic' className=" h-8 w-8 ml-2 animate-pulse"/>
            </Link>
            </div>}
        </div>
      </nav>
    </>
}