import axios from 'axios'
import React, { Component } from 'react' 
 class ChangeCategoryTitle extends Component {
    constructor(props) {
    super(props)
    this.state = {
        input: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    }
    async handleSubmit(evt){
        evt.preventDefault()
        let res = await axios.patch(`/api/category/${this.props.id}`, {title: this.state.input})
        console.log(res)
        this.setState({input: this.props.input})
        this.props.action()
    }
    handleChange(evt){
        this.setState({[evt.target.name]: evt.target.value})
    }
    componentDidMount(){
        this.setState({input: this.props.input})
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input className="Input" name="input" value={this.state.input} onChange={this.handleChange} />
                        <button style={{"background": "rgb(32, 113, 153)", "color": "#fff", "borderRadius": "5px", "height": "30px"}}>Change</button>

                    </div>
                </form>
            </div>
        )
    }
}
export default ChangeCategoryTitle