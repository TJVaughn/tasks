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
  async handleCreateTask(evt){
    evt.preventDefault()
    console.log(this.state.category)
    await createTask(this.state.newTask, this.props.id, this.state.category)
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
      <div style={{"margin": "20px 0"}}>
        <h3 style={{"textAlign": "center"}}>
          Add new Tasks
        </h3>
        <form title="Click settings to add a new category" onSubmit={this.handleCreateTask}>
          <div className="Task-add-task-form">
            <input placeholder="Add new task" className="input" name="newTask" value={this.state.newTask} 
            onChange={this.handleChange} />

            <select className="btn" name='category' value={this.state.category} onChange={this.handleChange}>
              <option value={null}>Category</option>
              {allCategoriesMap}
            </select>
          </div>
          <button className="btn btn-action" >Add</button>
        </form>
      </div>
    )
  }
}

export default CreateTask
