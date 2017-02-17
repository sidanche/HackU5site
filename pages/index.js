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
     response: 'none' 
   };

 }
isLongEnough = value =>{
	var spaceCount = value.split(" ").length - 1
	return spaceCount >= 3
}
sanitize = value => value.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")

async querySender(value){
	const sanitize = this.sanitize(value)
	console.log(sanitize)
    const myLoad = JSON.stringify({input: {csvInstance: [sanitize]}})
    const url = 'https://www.googleapis.com/prediction/v1.6/projects/yelppredictor/trainedmodels/prediction-model/predict?'
    const res = await fetch(url, {method: 'POST', 
    	headers: {'Authorization': `Bearer ${this.props.accessToken}`,
    	'Content-Type': 'application/json'} ,
    	body: myLoad})
    const json = await res.json()
    this.setState({response: json.outputLabel})


}
submit=(e)=>{
	e.preventDefault()
	console.log("submitted")
	this.setState({value: e.target.value})
	if (this.isLongEnough(e.target.value)){ 
		if (e.target.value[e.target.value.length - 1] === "." || e.target.value[e.target.value.length - 1] === " " || e.target.value[e.target.value.length - 1] === "!"  || e.target.value[e.target.value.length - 1] === "?")  
		{
			this.querySender(e.target.value)
		}
		
	}
	else {this.setState({response: 'none'}); console.log("inside else");}

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
    html, body {
    	background: #F1FFE7;
    	margin: 0;
    	padding: 0;
	}
	
	main, header{
		max-width: 1040px;
		width: auto;
		padding: 0 1rem;
		margin: 0 auto;
	}

	h1{
		font-family: Nunito, sans-serif;
		font-size: 52px;
		font-weight: 200;
		text-align: center;
	}
    textarea{
    	display: block;
      	margin: 0 auto;
      	padding: 2rem;
      	font-weight: 400;
      	font-size: 36px;
      	border: none;
    	overflow: auto;
    	outline: none;
    	width: 100%;
    	max-width: 880px;
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


    `}</style>
    	<header>
    	<h1>Yelp Review Project</h1>
    	</header>
      <main>
      <Stars stars={stars} />
 		<textarea name="Text1" onChange={this.submit} value={this.state.value} placeholder="Enter Review Here"></textarea>
      </main>
      </div>
    )
  }
}