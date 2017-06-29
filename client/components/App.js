import React ,{Component} from "react";
import axios from "axios";

require('./App.css');

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [{sport:'SPORT',league:'LEAGUE',competitors:'COMPETITORS',date:Date.now()}]
        };
    }

    componentDidMount = () => {
        axios.get('/api/v1.0/games')
            .then(res => this.setState({ games: res.data.games }))
            .catch(logNetworkError);
    }

    render = () => {
         let rows = this.state.games.map( (game,indx) => 
             (
                <tr className="game-row" key={indx}>
                    <td>{game.sport}</td>
                    <td>{game.league}</td>
                    <td>{game.competitors}</td>
                    <td>{new Date(game.date).toLocaleDateString('en-GB') 
                    + ' ' + 
                    new Date(game.date).toLocaleTimeString('en-GB',{hour: '2-digit', minute:'2-digit'})  }</td>
                </tr>
            )
         );
         
    return (
        <div>
            <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
            <div className="navbar-header">
                <a className="navbar-brand" href="#">Game Scrapper</a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav navbar-left">
                    <li><a href="#">The time is {new Date().toLocaleString('en-GB')}</a></li> 
                    <li><a href="#">Last updated on {new Date(this.state.updated).toLocaleString('en-GB')}</a></li> 

                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="https://www.linkedin.com/in/eyalliebermann/">By Eyal Liebermann</a></li>
                </ul>
            </div>
        </div>
    </nav>

            <div className="container">
                <div className="table-component col-xs-12">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Sport</th>
                                <th>League</th>
                                <th>Competitors</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
            );
  }

logNetworkError = (err) => {
        if (err.response) {
            console.log('Data', err.response.data);
            console.log('Status', err.response.status);
            console.log('Headers', err.response.headers);
        }
        else console.log('Error', err.message);
    }

}