import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/Quote.scss'

export default function Quote() {
    const [message, setMessage] = useState("")
    const [source, setSource] = useState("")

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
        <div className="Quote">
            <blockquote>
                "{message}"
                <br />

            </blockquote>
            --{source}
        </div>
    )
}