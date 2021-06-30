import React, { Component } from 'react'
import axios from 'axios'

class AddCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  async sendData(){
    let data = {
        title: this.state.input,
        project: this.props.id
    }
    let res = await axios.post(`/api/category/new`, data)
    console.log(res.data)
  }
  async handleSubmit(evt){
    evt.preventDefault()
    await this.sendData()
    this.setState({input: ''})
    // this.props.action()
    window.location.reload()
  }
  handleChange(evt){
      this.setState({[evt.target.name]: evt.target.value})
  }
  render() {
    return (
      <div id="add-category">
        <h3 style={{"textAlign": "center"}}>
          Add Category
        </h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input placeholder="Add new category" className="input" name="input" value={this.state.input} 
            onChange={this.handleChange} />
            <button className="btn btn-action">Add</button>

          </div>
        </form>
      </div>
    )
  }
}

export default AddCategory