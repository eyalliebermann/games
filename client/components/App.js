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
         let rows = this.state.games.map( (game) => 
             (
                <tr className="game-row">
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