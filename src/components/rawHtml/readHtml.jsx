import React from "react";
import $ from "jquery";

const initialState = {
  innerText: '',
  matchDays: [
  ]
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
        }
      };

      let matchDay = [];
      matchDay = matchDay.concat({header: head[0].innerText, players: playersArr});

      this.addItem(matchDay);
      // this.setState({ matchDays: {...this.state.matchDays, matchDay} });
      alert('Ready!:-' + matchDay[0].header);

    };

    // Read in the HTML file.
    reader.readAsText(file);
  };

  addItem = matchDay => {
    this.setState({
      matchDays: [
        ...this.state.matchDays,
        matchDay 
      ]
    })
  }

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

  render() {
    return (
      <div>
        Select a file : <input type="file" onChange={(e) => this.handleFileSelect(e)} /><br /><br />
      </div>
    )
  }

}

export default ReadHtml;