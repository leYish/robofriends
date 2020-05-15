 import React, { Component } from 'react'
import Scroll from '../componenets/Scroll';
import SearchBox from '../componenets/SearchBox';
import CardList from '../componenets/CardList';
import './App.css';


class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchField: ''
        };
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value });
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => { return response.json() })
            .then(users => { this.setState({ robots: users }) });
    }
    render() {
        const { robots, searchField} = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });

        if (!robots.length) {
            return <h1>Loading...</h1>
        } else {
            return (
                <div className="tc">
                    <h1 className="f1">RoboFriend</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <CardList robots={filteredRobots} />
                    </Scroll>
                </div>
            );
        }
    }
}
export default App