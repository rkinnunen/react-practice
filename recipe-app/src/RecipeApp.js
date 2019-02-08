import React, { Component } from 'react';
import Recipe from './Recipe';
import Navbar from './Navbar';
import RecipeList from './RecipeList';
import RecipeInput from './RecipeInput';
import './RecipeApp.css';

class RecipeApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes : [
        {
          id: 0,
          title: 'Spaghetti',
          instructions: 'Make pasta, add sauce!',
          ingredients: ['pasta', 'sauce'],
          img: 'spaghetti.jpg'
        },
        {
          id: 1,
          title: 'Milkshake',
          instructions: 'Combine ice cream and milk. Blend together. Enjoy!',
          ingredients: ['15 pakettia jäätelöä', '8 litra maitoa'],
          img: 'milkshake.jpg'
        },
        {
          id: 2,
          title: 'Periantai Pizza',
          instructions: 'Tilaa pizza',
          ingredients: ['pizza', 'raha'],
          img: 'pizza.jpg'
        }
      ],
      nextRecipeId: 3,
      showForm: false
    }
    this.handleSave = this.handleSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  handleSave(recipe) {
    this.setState((prevState, props) => {
      const newRecipe = {...recipe, id: this.state.nextRecipeId};
      return {
        nextRecipeId: prevState.nextRecipeId + 1,
        recipes: [...this.state.recipes, newRecipe],
        showForm: false
      }
    });
  }

  onDelete(id) {
    const recipes = this.state.recipes.filter(r => r.id !== id);
    this.setState({recipes});
  }

  render() {
    const {showForm} = this.state;
    return (
      <div className="App">
        <Navbar onNewRecipe={() => this.setState({showForm: true})} />
        { showForm ? 
          <RecipeInput
            onSave={this.handleSave} 
            onClose={() => this.setState({showForm: false})} /> 
          : null }
        <RecipeList 
          recipes={this.state.recipes} 
          onDelete={this.onDelete}
        />
      </div>
    );
  }
}

export default RecipeApp;