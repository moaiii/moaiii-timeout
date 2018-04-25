import React, { Component } from 'react';

class Venues extends Component {
  constructor() {
    super();

    this.state = {
      disallowed: [],
      allowed: []
    };
  }


  componentWillReceiveProps(nextProps) { //debugger;
    this.getDisallowedVenues(nextProps);
  }


  getDisallowedVenues = (nextProps) => {
    const { venues } = nextProps;
    var self = this;
    let allDisallowedVenues = [];

    venues.forEach(venue => { // loop venues
      if(venue.users) { // check users have been selected to avoid undefined error

        // if no copy of the venue in the state object create a new one, else use the state
        let disallowedVenue = typeof self.state.disallowed[venue.name] === 'undefined'
          ? { name: venue.name, reasons: new Set() } // new
          : self.state.disallowed[venue.name] // copy

        // look at each user in this venue and extract why they cant go
        for(let i = 0; i < venue.users.length; i++) { 
          if(venue.users[i]['can-drink'] === false) {
            disallowedVenue.reasons.add(`There is nothing for ${venue.users[i].name} to drink`);
          }
          if(venue.users[i]['can-eat'] === false) {
            disallowedVenue.reasons.add(`There is nothing for ${venue.users[i].name} to eat`);
          }
        }
        allDisallowedVenues.push(disallowedVenue);
      }
    })

    this.setState({ 
      disallowed: allDisallowedVenues 
    }, () => this.getAllowedVenues(venues));
  }


  getAllowedVenues = () => { // debugger;
    const { disallowed } = this.state;

    // allowed venues are those in the disallowed with an empty 'reason' set/array
    this.setState({
      allowed: disallowed.filter(venue => venue.reasons.size === 0)
    }, () => console.log(this.state))
  }


  render() {
    const { disallowed, allowed } = this.state;
    
    let allowedVenues = allowed
      .map((venue, index) => {
        return(<h3 key={`${index}-allowedVenue`}><span>👍</span> {venue.name}</h3>)
      });
    
    let disallowedVenues = disallowed
      .filter(venue => venue.reasons.size >= 1)
      .map((venue, index) => {
        return(
          <div>
            <h3 key={`${index}-disallowedVenue`}><span>👎</span> {venue.name}</h3>
            {Array.from(venue.reasons).map(reason => {
              return(<p>{reason}</p>)
            })}
          </div>
        )
      });

    return (
      <div className="Venues">
        <div className="approved__container">
          <h2>Avoid...</h2>
          {disallowedVenues}
        </div>
        <div className="disallowed__container">
          <h2>Lets go!</h2>
          {allowedVenues}
        </div>
      </div>
    );
  }
}

export default Venues;