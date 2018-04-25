/**@returns {array}*/
exports.lowerCaseArray = (array) => array.map(element => element.toLowerCase());

/**@returns {array<object>}*/
exports.cleanUsersObject = (users) => {
  return users.map(user => {
    return Object.assign({}, user, {
      drinks: this.lowerCaseArray(user.drinks),
      name: user.name,
      wont_eat: this.lowerCaseArray(user.wont_eat)
    })
  })
}

/**@returns {array<object>}*/
exports.cleanVenuesObject = (venues) => {
  return venues.map(venue => {
    return Object.assign({}, venue, {
      drinks: this.lowerCaseArray(venue.drinks),
      food: this.lowerCaseArray(venue.food),
      name: venue.name
    })
  })
}

/**@returns {boolean}*/
exports.canTheyDrinkHere = (user, venue) => {
  return user.drinks !== 0
    ? user.drinks
      .map(drink => venue.drinks.includes(drink))
      .includes(true)
    : true; // else if the array is empty they cant drink anywhere
}

/** @returns {boolean} */
exports.canTheyEatHere = (user, venue) => { //debugger;
  return user.wont_eat.length !== 0
    ? user.wont_eat
        .map(_food => !venue.food.includes(_food))
        .includes(true)
    : true; // else if the array is empty they can eat anywhere
}

/** @returns {array<object>}*/
exports.whoIsGoing = (users) => {
  return users.filter(user => user.checked);
}