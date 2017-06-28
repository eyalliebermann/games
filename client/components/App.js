import React ,{Component} from "react";
import axios from "axios";

require('./App.css');

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [{date:'1',league:'2',sport:'4',competitors:'45'}]
        };
    }

    componentDidMount = () => {
        axios.get('/api/v1.0/games')
            .then(res => this.setState({ games: res.data }))
            .catch(logNetworkError);
    }

    render = () => {
         let rows = this.state.games.map( (game) => 
             (
                <tr className="game-row">
                    <td>{game.date}</td>
                    <td>{game.sport}</td>
                    <td>{game.league}</td>
                    <td>{game.competitors}</td>
                </tr>
            )
         );
         
   return (
            <div className="table-component col-xs-12">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Sport</th>
                            <th>League</th>
                            <th>Competitors</th>
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