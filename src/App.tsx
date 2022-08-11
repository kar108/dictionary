import { useState } from "react";
import Axios from "axios";
import "./App.css";



function App() {

const [data, setData] = useState("");
const [error, setError] = useState(false);
const [def, setDef] = useState("");
const [audiourl, setAudioUrl] = useState("");
const [searchWord, setSearchWord] = useState(require("random-words"));


function search() {
	Axios.get(
	`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
	).then((response) => {
	setData(response.data[0].word);
  setDef(response.data[0].meanings[0].definitions[0].definition)
  setAudioUrl(response.data[0].phonetics[0]?.audio);
  setError(false)
	}).catch(()=>{setError(true)});
}

function musicon() {
	let audio = new Audio(audiourl);
	audio.play();
}

return (
	<div className="App">
	<h1 className="heading">Dictionary</h1>
  <button className="Admin">Admin</button>
	<div className="searchBox">
		<input
		placeholder="Enter your word"
    type="text"
		onChange={(e) => {
			setSearchWord(e.target.value);
		}}
		/>
		<button
		onClick={() => {
			search();
		}}
		>
		search
		</button>
	</div>
	{error?(
		<div>Please Enter a meaningful word</div>
	):(
    <div>
		<h2>
			Word : {data}{" "}</h2>
    <h3><button onClick={() => {musicon();}}>Play Music</button></h3>
		<h4>Definition:</h4>
    <p>{def}</p>
		</div>
  )}
	</div>
);
}

export default App;

