import React from "react";
import $ from "jquery";
import { getPlayerPointsFolder } from '../../config/config';

const initialState = {
    innerText: ''
};

class HtmlToXml extends React.Component {
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

            var doc = document.implementation.createDocument("", "", null);
            var matchDayElem = doc.createElement("matchDay");
            matchDayElem.setAttribute("gameweek", head[0].innerText);

            var playersElem1 = doc.createElement("players");

            for (var i = 0; i < rows.length; i++) {
                if (this.hasNumbers(rows[i].cells[0].innerHTML)) {
                    var playerElem1 = doc.createElement("player");
                    playerElem1.setAttribute("id", this.extractNumber(rows[i].cells[0].innerHTML));
                    playerElem1.setAttribute("name", this.extractNameFromLink(rows[i].cells[0].innerHTML));
                    playerElem1.setAttribute("points", this.extractNumber(rows[i].cells[2].innerHTML));
                    playersElem1.appendChild(playerElem1);
                }
            };

            matchDayElem.appendChild(playersElem1);
            doc.appendChild(matchDayElem);

            var xmlFile = ((new XMLSerializer()).serializeToString(doc));

            alert('Ready!:-' + head[0].innerText);

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

    render() {
        return (
            <div>
                Select a file : <input type="file" onChange={(e) => this.handleFileSelect(e)} /><br /><br />
            </div>
        )
    }

}

export default HtmlToXml;