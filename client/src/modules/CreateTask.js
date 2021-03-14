import React, { Component } from 'react'
import { createTask } from '../paths/Task-requests/CreateTask'

class CreateTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTask: '',
      category: ''
    }
    this.handleCreateTask = this.handleCreateTask.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleCreateTask(evt){
    evt.preventDefault()
    createTask(this.state.newTask, this.props.id, this.state.category)
    this.setState({newTask: ''})
    this.props.action()
  }
  handleChange(evt){
      this.setState({[evt.target.name]: evt.target.value})
  }
  render() {
    const allCategoriesMap = this.props.categories.map(item => 
        <option value={item.category._id} key={item.category._id}>
          {item.category.title}
        </option>
      )
    return (
      <div>
        <h3 style={{"textAlign": "center"}}>
          Add new Tasks
        </h3>
        <form onSubmit={this.handleCreateTask}>
          <div className="Task-add-task-form">
            <input className="Input" name="newTask" value={this.state.newTask} 
            onChange={this.handleChange} />

            <select name='category' value={this.state.category} onChange={this.handleChange}>
              <option value={null}>Category</option>
              {allCategoriesMap}
            </select>
          </div>
          <button style={{"background": "rgb(32, 113, 153)", "width": "100%", "color": "#fff", "borderRadius": "5px", "height": "30px"}}>Add new task: </button>
        </form>
      </div>
    )
  }
}

export default CreateTask
