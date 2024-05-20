import Head from 'next/head'
import Navbar from './nav'
import Footer from './footer'

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col font-mono" >
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      </Head>
      <Navbar />

      <div className='flex flex-col justify-center items-center w-screen'>
        <h1 className="flex flex-col justify-center items-center font-bold leading-7 text-gray-900 sm:truncate sm:text-5xl sm:tracking-tight h-30 w-screen mt-5 mb-16 text-center ">LINK SHORTENING SERVICE
        <p className="p-2 text-gray-900 sm:text-base shadow-lg shadow-gray-700 rounded-lg w-1/4 h-auto text-center m-2">GET YOUR LINKS SHORTENED IMEDIATELY</p>
        </h1>
        

        <div className='flex flex-col w-screen justify-center items-center align-center'>
          <div className='flex flex-col justify-center items-center w-3/4 h-1/2'>
            <img src='/images/url.png' alt='no Pic' className=" h-12 w-12 mt-3 animate-pulse"/>
            <h2 className="leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight h-12 mt-3 text-center">
              URL SHORTENING
            </h2>
            <p className="p-2 text-gray-900 sm:text-1xl  h-auto text-center  h-1/2 border-0 border-b-2 border-slate-300 mb-3">URL shortening is a web service that plays a pivotal role in simplifying and condensing lengthy website addresses into more compact formats. These shortened URLs are not only easier to share but also enhance the aesthetics of messages, especially on platforms with character limits. The process involves substituting the original URL with a shorter alias that redirects users to the intended webpage.</p>
          </div>
          <div className='flex flex-col justify-evenly items-center w-3/4 h-auto mt-4'>
            <img src='/images/www.png' alt='no Pic' className=" h-12 w-12 mt-3 animate-pulse"/>
            <h2 className="leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight h-12 mt-3 mb-3 text-center">
             SECURE BROWSING
            </h2>
            <p className="p-2 text-gray-900 sm:text-1xl text-center border-0 border-b-2 border-slate-300 mb-3 h-1/2">Secure browsing is a crucial aspect of online activities that prioritizes user safety and privacy in the digital landscape. It involves employing various measures to protect users from potential threats, such as malicious software, phishing attacks, data breaches, and unauthorized access to sensitive information.Secure websites use HTTPS (Hypertext Transfer Protocol Secure) to encrypt the data transmitted between a users device and the websites server.</p>
          </div>
          <div className='flex flex-col justify-evenly items-center w-3/4 h-auto mt-4'>
            <img src='/images/website.png' alt='no Pic' className=" h-12 w-12 mt-3 animate-pulse "/>
            <h2 className="leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight h-12 mt-3 mb-3 text-center">
             EASY ACCESS
            </h2>
            <p className="p-2 text-gray-900 sm:text-1xl text-center border-0 border-b-2 border-slate-300 mb-3 h-1/2">Easy access for shortened URLs from a database is crucial for efficient redirection and retrieval of the original URLs associated with those shortened links.When a user clicks on a shortened link, your application should retrieve the original URL from the database using the shortened alias, and then perform a server-side redirect (HTTP 301 or 302) to the original URL.When a user wants to shorten a URL, your application should generate a unique alias for the URL and store it in the database along with the original URL.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
