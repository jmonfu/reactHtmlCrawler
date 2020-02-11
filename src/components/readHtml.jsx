import React from "react";
import $ from "jquery";

const initialState = {
  innerText: '',
  matchDay: [],
};

class ReadHtml extends React.Component {
  state = initialState;

  handleFileSelect = (evt) => {
    evt.preventDefault();
    var file = evt.target.files[0];
    var reader = new FileReader();

    reader.onload = (e) => {
      this.setState({
        innerText: e.target.result
      });

      var tbody = $('<div/>').append(this.state.innerText).find('tbody').get();
      var head = $('<div/>').append(this.state.innerText).find('h1').get();
      var rows = tbody[0].rows;

      let playersArr = [];

      for (var i = 0; i < rows.length; i++) {
        if ( this.hasNumbers(rows[i].cells[0].innerHTML)) {
          let player = { id: Number, name: String, position: String, points: String };
          player.id = this.extractNumber(rows[i].cells[0].innerHTML);
          player.name = this.extractNameFromLink(rows[i].cells[0].innerHTML);
          player.points = this.extractNumber(rows[i].cells[2].innerHTML);
          playersArr = playersArr.concat(player);
  
          //this.setState({ players: [...this.state.players, player] })
        }
      };

      this.setState({ matchDay: {header: head[0].innerText, players: playersArr} });

    };

    // Read in the HTML file.
    reader.readAsText(file);
  };

  resetState = () => {
    this.setState(initialState);
  }

  extractNumber = (value) => {
    // return value.replace( /^\D+/g, '');
    var matches = value.match(/(\d+)/);
    return matches[0];
  }

  extractNameFromLink = (value) => {
    var match = value.match(/<a [^>]+>([^<]+)<\/a>/)[1];
    return match;
  }

  hasNumbers = (t) => {
    return /\d/.test(t);
  }

  // renderTableData() {
  //   if (this.state.matchDay) {
  //     return this.state.matchDay.players.map((player, index) => {
  //       const { id, name, points } = player //destructuring
  //       return (
  //         <tr key={id}>
  //           <td>{id}</td>
  //           <td>{name}</td>
  //           <td>{points}</td>
  //         </tr>
  //       )
  //     })
  //   }
  //   else {
  //     return (
  //       <div>No Data at Present</div>
  //     )
  //   }
  // }

  render() {
    return (
      <div>
        Select a file : <input type="file" onChange={(e) => this.handleFileSelect(e)} /><br /><br />
        <div id="displayPage">
        <h1 id='title'>{this.state.header}</h1>
            <table id='players'>
               <tbody>
                  {/* {this.renderTableData()} */}
               </tbody>
            </table>
        </div>
      </div>
    )
  }

}

export default ReadHtml;