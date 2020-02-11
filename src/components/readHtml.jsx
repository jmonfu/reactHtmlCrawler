import React from "react";
import $ from "jquery";

class ReadHtml extends React.Component {
    state = {
      innerText: '',
      players: [],
    }  

    handleFileSelect = (evt) => {
        const { players } = this.state;
        evt.preventDefault();
        var file = evt.target.files[0];
        var reader = new FileReader();
      
        reader.onload = (e) => {
          this.setState({
              innerText: e.target.result
          });

            var tbody = $('<div/>').append(this.state.innerText).find('tbody').get();
            var rows = tbody[0].rows;

            for(var i = 1; i < rows.length; i++) {
                let player = {id: Number, name: String, position: String, points: String};
                player.id = i;
                player.name = rows[i].cells[0].innerHTML; 
                player.position = rows[i].cells[1].innerHTML;
                player.points = rows[i].cells[2].innerHTML;

              //   this.setState({
              //     players: this.state.players.concat(this.player)
              //  });
              this.setState({ players: [...this.state.players, player]})
            };

        };
      
        // Read in the HTML file.
        reader.readAsText(file);
      };

    render() {
        return (
          <div>
            Select a file : <input type="file" onChange={(e) => this.handleFileSelect(e)} /><br/><br/>
            <div id="displayPage">{this.state.innerText}</div>
          </div>
        )
      }

}

export default ReadHtml;