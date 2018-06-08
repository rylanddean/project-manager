import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import ProjectItem from './ProjectItem';

class AddProject extends Component {
  constructor(){
    super();
    // Onload create the new project object
    this.state = {
      newProject:{}
    }
  };

  // define the category arrary for use in the select element
  static defaultProps = {
    categories: ['Web Design','Web Development','Mobile Development']
  }

  // on form submit gather project data and populate
  handleSubmit(e){
    // Check if title value is empty
    if(this.refs.title.value === ''){
      alert('Title is required');
    }else{
      // Populate the new project object with the form data
      this.setState({newProject:{
        id: uuid.v4(),
        title: this.refs.title.value,
        category: this.refs.category.value
      }}, function(){
        // Assign the new project to the AddProject property for use in the Projects Component
        this.props.addProject(this.state.newProject);
      });
    }
    e.preventDefault();
  }

  render() {
    // Iterate through the categories array and populate the DOM with option elements
    let categoryOptions = this.props.categories.map(category => {
      return <option key={category} value={category}>{category}</option>
    });
    return (
      <div>
        <h3>Add Project</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Title</label><br />
            <input type="text" ref="title" />
          </div>
          <div>
            <label>Category</label><br />
            <select ref="category">
              {categoryOptions}
            </select>
          </div>
          <br />
          <input type="submit" value="Submit" />
          <br />
        </form>
      </div>
    );
  }
}

// Verify the types of the properties
AddProject.propTypes = {
  categories: PropTypes.array,
  AddProject: PropTypes.func
}

export default AddProject;
