import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/Quote.scss'
import { Link } from 'react-router-dom'

export default function Quote() {
    const [message, setMessage] = useState("")
    const [source, setSource] = useState("")
    const [allQuotes, setAllQuotes] = useState(true)

    const getQuote = async () => {
        const quote = await axios({
            method: 'GET',
            responseType: 'json',
            url: "/api/quote"
        })
        // console.log(quote)
        setMessage(quote.data.quote.message)
        setSource(quote.data.quote.source)
        return
    }

    useEffect(() => {
        getQuote()
    }, [setMessage, setSource])

    return (
        <div onMouseEnter={()=> {setAllQuotes(true)}}
            onMouseLeave={() => { setAllQuotes(false) }}
            onClick={() => {setAllQuotes(!allQuotes)}}
        className="Quote">
            {allQuotes 
            ? <div id="All-quotes-links">
                <Link to={'/all-quotes'}>See all quotes</Link>
                <Link to={'/subscribe-to-quotes'}>Subscribe</Link>
            </div>
            :''
            }
            <blockquote style={{"fontWeight": 700}}>
                "{message}"
                <br />

            </blockquote>
            --{source}
        </div>
    )
}