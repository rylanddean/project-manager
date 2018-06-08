import React, { Component } from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';
import Todos from './Components/Todos';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      projects: [],
      todos: []
    }
  }

  // Fetch todo list object from jsonplaceholder via AJAX call
  getTodos(){
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            todos: result
          });
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      )
  }

  // Get projects obj from local array
  getProjects(){
    this.setState({projects: [
      {
        id: uuid.v4(),
        title: 'Business Website',
        category: 'Web Design'
      },
      {
        id: uuid.v4(),
        title: 'Social App',
        category: 'Mobile Development'
      },
      {
        id: uuid.v4(),
        title: 'Ecommerce Shopping Cart',
        category: 'Web Development'
      }
    ]});
  }

  // Onload get projects and todos
  componentWillMount(){
    this.getProjects();
    this.getTodos();
  }

  // When loaded get projects and todos
  componentDidMount(){
    this.getTodos();
  }

  // Get projects and append the new project from the input form
  handleAddProject(project){
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects:projects});
  }

  // Get projects and remove the selected project from the array
  handleDeleteProject(id){
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);
    this.setState({projects:projects});
  }

  render() {
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject.bind(this)}/>
        <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />
        <br />
        <Todos todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
