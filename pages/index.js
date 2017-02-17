import Head from 'next/head'
import React from 'react'
import Link from 'next/prefetch'
import Stars from '../components/stars'
import 'isomorphic-fetch'

export default class extends React.Component {
	static async getInitialProps () {
		const accessToken = process.env.ACCESS_TOKEN
		console.log(accessToken)
		return {accessToken}
	}
constructor(props) {
   super(props);
   this.state = {
     value: '',
     response: 'none', 
     model: '0'
   };

 }

 modelChanger = (e) =>{
  e.preventDefault()
  this.setState({model:e.target.value})
  this.submiterHelper(this.state.value)
 }
 submiterHelper = (value) => {
  if (this.isLongEnough(value)){ 
    if (value[value.length - 1] === "." || value[value.length - 1] === " " || value[value.length - 1] === "!"  || value[value.length - 1] === "?")  
    {
      this.querySender(value, this.state.model)
    }
    
  }
  else {this.setState({response: 'none'})}  
 }
isLongEnough = value =>{
	var spaceCount = value.split(" ").length - 1
	return spaceCount >= 3
}
sanitize = value => value.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")

async querySender(value, model){
	const sanitize = this.sanitize(value)
  if (model == "0") {
    const myLoad = JSON.stringify({input: {csvInstance: [sanitize]}})
    const url = 'https://www.googleapis.com/prediction/v1.6/projects/yelppredictor/trainedmodels/100kmodel/predict?'
    const res = await fetch(url, {method: 'POST', 
      headers: {'Authorization': `Bearer ${this.props.accessToken}`,
      'Content-Type': 'application/json'} ,
      body: myLoad})
    const json = await res.json()
    this.setState({response: json.outputLabel})
  }
  else if (model == "1"){
    const myLoad = JSON.stringify({input: {csvInstance: [sanitize]}})
    const url = 'https://www.googleapis.com/prediction/v1.6/projects/yelppredictor/trainedmodels/prediction-model/predict?'
    const res = await fetch(url, {method: 'POST', 
    headers: {'Authorization': `Bearer ${this.props.accessToken}`,
    'Content-Type': 'application/json'} ,
    body: myLoad})
    const json = await res.json()
    this.setState({response: json.outputLabel})
  }

    else if (model == "2"){
    const myLoad = JSON.stringify({input: {csvInstance: [sanitize]}})
    const url = 'https://www.googleapis.com/prediction/v1.6/projects/yelppredictor/trainedmodels/200kmodel/predict?'
    const res = await fetch(url, {method: 'POST', 
    headers: {'Authorization': `Bearer ${this.props.accessToken}`,
    'Content-Type': 'application/json'} ,
    body: myLoad})
    const json = await res.json()
    this.setState({response: json.outputLabel})
  }
    else if (model == "3"){
    const myLoad = JSON.stringify({input: {csvInstance: [sanitize]}})
    const url = 'https://www.googleapis.com/prediction/v1.6/projects/yelppredictor/trainedmodels/large-predictor/predict?'
    const res = await fetch(url, {method: 'POST', 
    headers: {'Authorization': `Bearer ${this.props.accessToken}`,
    'Content-Type': 'application/json'} ,
    body: myLoad})
    const json = await res.json()
    this.setState({response: json.outputLabel})
  }
    else if (model == "4"){
    const myLoad = JSON.stringify({input: {csvInstance: [sanitize]}})
    const url = 'https://www.googleapis.com/prediction/v1.6/projects/yelppredictor/trainedmodels/fullmodel/predict?'
    const res = await fetch(url, {method: 'POST', 
    headers: {'Authorization': `Bearer ${this.props.accessToken}`,
    'Content-Type': 'application/json'} ,
    body: myLoad})
    const json = await res.json()
    this.setState({response: json.outputLabel})
  }
    else if (model == "5"){
    const myLoad = JSON.stringify({input: {csvInstance: [sanitize]}})
    const url = 'https://www.googleapis.com/prediction/v1.6/projects/yelppredictor/trainedmodels/fullmodel/predict?'
    const res = await fetch(url, {method: 'POST', 
    headers: {'Authorization': `Bearer ${this.props.accessToken}`,
    'Content-Type': 'application/json'} ,
    body: myLoad})
    const json = await res.json()
    this.setState({response: json.outputLabel})
  }
}
submit=(e)=>{
	e.preventDefault()
	this.setState({value: e.target.value})
	if (this.isLongEnough(e.target.value)){ 
		if (e.target.value[e.target.value.length - 1] === "." || e.target.value[e.target.value.length - 1] === " " || e.target.value[e.target.value.length - 1] === "!"  || e.target.value[e.target.value.length - 1] === "?")  
		{
			this.querySender(e.target.value, this.state.model)
		}
		
	}
	else {this.setState({response: 'none'})}

}

  render () {
  	const stars=`stars flex ${this.state.response}`
    return (
      <div>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
         <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Nunito:200,400" />
      </Head>

      <style>{`

        html{
          background: url(https://www.toptal.com/designers/subtlepatterns/patterns/subtle_white_feathers.png);
        }
    html, body {
    
    	margin: 0;
    	padding: 0;
      font-family: Nunito, sans-serif;
      text-rendering: optimizeLegibility;
	}
	
	main{
		max-width: 1040px;
		width: auto;
		padding: 2rem 1rem 0;
		margin: 0 auto;
	}
  header{
    margin-top: 0;
    background: url(/static/lodyas.png);
  }
	h1{
		font-family: Nunito, sans-serif;
		font-size: 86px;
		font-weight: 200;
		text-align: center;
    margin: 0 auto;
    padding: 4rem 0;
    color:#fafafa;
	}
  h3{
    text-align:center;
  }
    textarea{
    	display: block;
      font-family: Nunito, sans-serif;
      margin: 0 auto;
      padding: 2rem;
      font-weight: 400;
      font-size: 36px;
      border: none;
    	overflow: auto;
    	outline: none;
    	width: 100%;
    	max-width: 800px;
    	min-height: 40vh;
    	resize: vertical;
    	-webkit-box-shadow: none;
    	-moz-box-shadow: none;
    	box-shadow: none;
    	-webkit-box-sizing: border-box;
    	-moz-box-sizing: border-box;
    	box-sizing: border-box;
		border-radius: 3px;
		box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
		-moz-transition: box-shadow 250ms cubic-bezier(.4,0,.2,1);
		-webkit-transition: box-shadow 250ms cubic-bezier(.4,0,.2,1);
		-o-transition: box-shadow 250ms cubic-bezier(.4,0,.2,1);
		transition: box-shadow 250ms cubic-bezier(.4,0,.2,1);
	}
	textarea:focus, textarea:hover {
		outline: none;
		box-shadow: 0 3px 9px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08);
		-moz-transition: box-shadow 250ms cubic-bezier(.4,0,.2,1);
		-webkit-transition: box-shadow 250ms cubic-bezier(.4,0,.2,1);
		-o-transition: box-shadow 250ms cubic-bezier(.4,0,.2,1);
		transition: box-shadow 250ms cubic-bezier(.4,0,.2,1);
	}
  img {
    width: 120px;
    height: auto;
  }
  footer {
    max-width: 800px;
    margin: auto auto;
    padding: 1rem 1rem;
    display: flex;
    justify-content: space-between;
  }

    `}</style>
    	<header>
    	 <h1>review.me</h1>
    	</header>
      <main>
        <Stars stars={stars} />
        <h3>Predictive Rating</h3>
       	<textarea name="Text1" onChange={this.submit} value={this.state.value} placeholder="Enter Review Here"></textarea>
      </main>
      <footer>
        <div className="select-container">
          <select onChange={this.modelChanger}> 
            <option value="0">Google API Predictor (100k rows expanded)</option>
            <option value="1">Google API Predictor (100k rows non-expanded)</option>
            <option value="2">Google API Predictor (200k rows expanded)</option>
            <option value="3">Google API Predictor (1m rows non-expanded)</option>
            <option value="4">Google API Predictor (3m rows non-expanded)</option>
            <option value="5">custom</option>
          </select>
        </div>
        <a href="https://www.yelp.com/login">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Yelp_Logo.svg/1920px-Yelp_Logo.svg.png" />
        </a>
      </footer>
    </div>
    )
  }
}

