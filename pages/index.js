
import React from 'react'
import Link from 'next/prefetch'
import 'isomorphic-fetch'

export default class extends React.Component {
constructor(props) {
   super(props);
   this.state = {
     value: '',
     response: '' 
   };

 }

async querySender(value){
    const myLoad = JSON.stringify({input: {csvInstance: [value]}})
    const url = 'https://www.googleapis.com/prediction/v1.6/projects/yelppredictor/trainedmodels/prediction-model/predict?'
    const res = await fetch(url, {method: 'POST', 
    	headers: {'Authorization': 'Bearer ya29.Glv0A5sZTaVrwgIqNCGkGeNlwr6e09meu-RbJxHiWGCPF8In3vwi5B7xPMbXCQEj3NRZ8bWEyffKnoZCecyWoQXHZjyRSKThpuXo-k6U8T0vP_QsGBR6U-YirbRR',
    	'Content-Type': 'application/json'} ,
    	body: myLoad})
    const json = await res.json()
    console.log(json.outputLabel, value)
    this.setState({response: json.outputLabel})


}
submit=(e)=>{
	e.preventDefault()
	this.setState({value: e.target.value})
	this.querySender(e.target.value)

}

  render () {
    return (
      <div>
      <p>{this.state.response}</p>
      	<form>
 		 Review Entry:
 		<textarea name="Text1" onChange={this.submit} value={this.state.value} cols="40" rows="5" placeholder="Enter Review Here"></textarea>
  		<input type="submit" value="Submit"/>
		</form>
      </div>
    )
  }
}