import React, { Component } from 'react';
import './stylesheets/App.css';
import Venues from './components/venues';
import Header from './components/header';
import { users } from './data/users';
import { venues } from './data/venues';
import {
  cleanUsersObject,
  cleanVenuesObject,
  canTheyDrinkHere,
  canTheyEatHere,
  whoIsGoing
} from './utilities/utilities';


class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      venues: []
    };
  }

  componentDidMount() {
    this.setState({ 
      users: cleanUsersObject(users),
      venues: cleanVenuesObject(venues)
    })
  }


  handleUserSelect = (e) => { //debugger;
    let checked = e.target.checked ? true : false;

    // prepend/remove a 'checked' flag to the user object
    this.setState({
      users: this.state.users.map(user => {
        if(user.name === e.target.name) {
          return Object.assign({}, user, { checked }) 
        } else {
          return user;
        }
      })

    }, () => { // now analyse
      this.whereCanWeGo();
    });
  }


  whereCanWeGo = () => {
    let attendees = whoIsGoing(this.state.users);
    
    // prepend user analysis data to the venue object
    this.setState({
      venues: this.state.venues
        .map(venue => {
          return Object.assign({}, venue, {
            users: attendees.map(attendee => {
              return {
                'name': attendee.name,
                'can-drink': canTheyDrinkHere(attendee, venue),
                'can-eat': canTheyEatHere(attendee, venue)
              }
            })
          })
        })
    }); 
  }


  render() {
    const { users, venues } = this.state;

    let header = <Header />

    let venuesAnalysis = <Venues venues={venues}/>

    let userSelectionForm = users.map((user, index) => {
      return(
        <div onChange={(e) => this.handleUserSelect(e)}
          className="User__radio-button-bg" 
          key={`${index}-user`}>
          <label htmlFor={``}>{user.name}</label>
          <input 
            type="radio" 
            name={`${user.name}`}
            checked={this.state.users.filter(u => u.name === user.name)[0].checked || false}/>
        </div>
      )
    })

    let codeLink = <a href="https://github.com/moaiii/moaiii-timeout" 
      className="codelink">Code can be accessed here.</a>

    return (
      <div className="App">
        {header}
        {codeLink}
        {userSelectionForm}
        {venuesAnalysis}
      </div>
    );
  }
}

export default App;