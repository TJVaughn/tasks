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
    this.sendData()
    this.setState({input: ''})
    this.props.action()
  }
  handleChange(evt){
      this.setState({[evt.target.name]: evt.target.value})
  }
  render() {
    return (
      <div>
        <h3 style={{"textAlign": "center"}}>
          Add Category
        </h3>
        <form onSubmit={this.handleSubmit}>
          <div className="Task-add-task-form">
            <input style={{"padding": "10px 0", "margin": "0px 0"}} name="input" value={this.state.input} 
            onChange={this.handleChange} />
            <button style={{"background": "rgb(32, 113, 153)", "color": "#fff", "borderRadius": "5px", "height": "40px"}}>Add new Category </button>

          </div>
        </form>
      </div>
    )
  }
}

export default AddCategory