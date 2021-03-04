const getUser = async() => {
    const response = await fetch('/users/me', {
        headers: {
            "Content-Type": "application/json"
        }
    }).catch(err => {
        return err
    })
    const body = await response.json()
    // console.log(body)
    // this.setState({profile: body, loggedIn: true})
    return body
}
export { getUser }