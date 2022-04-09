// for next.js's <head> tag and rendering images
import Head from 'next/head'
import Image from 'next/image'

// import the web3 library with setup from lib/web3.js
import { web3 } from '../lib/web3';

// import react hooks
import { useState, useEffect } from 'react';

// all from our components folder
import Account from '../components/Account'
import EthName from '../components/EthName'
import Answer from '../components/Answer'
import AnswerForm from '../components/AnswerForm'

export default function Home() {
  // todo:
  // 1. make the connect button work!
  // 2. get the answers from the API (see /api/answers.js file)
  // 3. add tipping like project 1
  // 4. make the user name look good
  // 5. let the user post their own reply

  //setup accounts state for browser based accounts/wallet
  const [accounts, setAccounts] = useState([]);
  //setup logged in or not state for log in functionality
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //setup loading or not state for whether the data is being fetched or not
  const [isLoading, setIsLoading] = useState(true);
  //setup answers state
  const [answers, setAnswers] = useState([]);


  //create request to connect to browser based digital wallet
  const connect = async function() {
    let a = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccounts(a);
  };

  //every time the accounts state is changed, this will check whether the accounts state is connected 
  //and if so, update the logged in state accordingly
  useEffect(function() {
    if (accounts.length > 0) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [accounts]);

  //this function will run once upon load
  useEffect(async function() {
    //if the page is refreshed, the page is not reloaded with the currently connected account/wallet in the top right corner, 
    //instead the "Connect Wallet" button appears, so in order to check whether an account/wallet is already loaded, 
    //we'll use the useEffect function in order to fix this bug
    let a = await window.ethereum.request({ method: "eth_accounts" });
    setAccounts(a);

    //if the currently connected account/wallet is disconnected from within the browser extension, 
    //there is no indication given to the web application. 
    //in order to deal with this bug, we'll add an event listener and a callback function to deal with updating the change whenever an account is disconnected
    window.ethereum.on("accountsChanged", function(a) {
      setAccounts(a);
    })

    //we want to fetch updated data everytime the page loads
    fetch("/api/answers")
      //the response will be in JSON so we'll setup a promise with an arrow function in order to handle it
      .then(response => response.json())
      //this callback will determine what we want our data to do
      // our data is within an object and the key is "answers" while the value is "data"
      // so we are going to update the answers state with the object we're pulling from our API
      .then(data => { 
        setAnswers(data.answers);
        //after updating the answers state, we will update the loading state
        setIsLoading(false);
      })
  }, [])

  let answersArea = (
    <div className="loading">Loading answers...</div>
  )

  if (!isLoading) {
    answersArea = answers.map(function(answer, index) {
      return <Answer key={index} number={index + 1} answer={answer} accounts={accounts} isLoggedIn={isLoggedIn} />
    })
  }

  return (
    <main>
      <header>
        <h1>Feedback</h1>

        <form>
          <input type="text" placeholder="Search" />
        </form>

        <Account accounts={accounts} isLoggedIn={isLoggedIn} connect={connect} />
      </header>

      <section className="question">
        <div className="main">
          <h3>Feedback forum</h3>
          <h2>Looking for feedback as a beginner</h2>
          <p>Hey everyone, I&apos;m a new potter, just 4 weeks into my journey, and I&apos;m looking to get some feedback on what I&apos;ve made so far. I&apos;m particularly interested in how to make rustic looking bowls and pots, and I&apos;d love to know what the best tools to use would be!</p>

          <div className="slides">
            <Image src="/image-1.jpg" width="600" height="800" />
            <Image src="/image-2.jpg" width="600" height="800" />
            <Image src="/image-3.jpg" width="600" height="800" />
            <Image src="/image-4.jpg" width="600" height="800" />
          </div>
        </div>
        <div className="meta">
          
          {/* EthName */}
          <div className="eth-name">
            <img src="" alt="Avatar of melvinadu.eth" />
            <div className="name">
              <span className="primary">melvinadu.eth</span>
              <span className="secondary">0xb25bf3...aaf4</span>
            </div>
          </div>
          {/* end EthName */}

        </div>
      </section>

      <section className="answers">
        {answersArea}
      </section>

      <Head>
        <title>Looking for feedback as a beginner – Feedback forum – Feedback </title>
        <meta property="og:title" content="Looking for feedback as a beginner on Feedback Forum" />
        <meta property="og:description" content="This is a project" />
        <meta property="og:image" content="/social.png" />
      </Head>
    </main>
  )
}
