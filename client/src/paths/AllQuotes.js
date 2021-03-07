import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function AllQuotes () {
    const [allQuotes, setAllQuotes] = useState([{message: "", source: ""}])

    const getQuote = async () => {
        const quotes = await axios({
            method: 'GET',
            responseType: 'json',
            url: "/api/read-all-quotes"
        })
        console.log(quotes)
        setAllQuotes(quotes.data.quotes)
        return
    }

    useEffect(() => {
        getQuote()
    }, [setAllQuotes])

    const allQuotesMap = allQuotes.map(i => 
            <div style={{"border": "1px solid #000", "borderRadius": "10px", "margin": "5px 0", "padding": "3px", "textAlign": "center"}}>
                <blockquote style={{"fontWeight": 700}}>"{i.message}"</blockquote>
                <p>-{i.source}</p>
            </div>
        )
    return (
        <div>
            <h2 style={{"textAlign": "center"}}><Link to={'/subscribe-to-quotes'}>Subscribe To Quotes</Link></h2>
            {allQuotesMap}
        </div>
    )
}