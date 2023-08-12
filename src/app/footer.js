import Link from 'next/link'

export default function Footer(){
    return <>
        <footer className='flex justify-between items-center bg-gray-900 h-15 w-screen p-3'>
        <div className='flex justify-between items-center text-white text-2xl'>
        <img src='/images/logo.png' alt='no Pic' className=" h-12 w-11 mr-3 "/>
          LiNK-iT

        </div>
        <div className='text-blue-600'>
        © 2020 LiNK-iT, Inc. All rights reserved.
        </div>

        <div className='text-white'>
          <h4>Contact : 03367500932</h4>
          <h4>Address : Shop-No# 20,Saddar,Rawalpindi</h4>
          <h4>Linkedin :<Link href='' class="p-3 text-blue-500 hover:underline">Linkedin</Link></h4>
          <h4>GitHub :<Link href='' class="p-3 text-blue-500 hover:underline">GitHub</Link></h4>
        </div>
      </footer>
    </>
}