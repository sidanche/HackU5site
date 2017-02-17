import Head from 'next/head'
import React from 'react'
import Link from 'next/prefetch'
import Stars from '../components/stars'
import 'isomorphic-fetch'

export default class extends React.Component {
constructor(props) {
   super(props);
   this.state = {
     value: '',
     response: 'one' 
   };

 }

async querySender(value){
    const myLoad = JSON.stringify({input: {csvInstance: [value]}})
    const url = 'https://www.googleapis.com/prediction/v1.6/projects/yelppredictor/trainedmodels/prediction-model/predict?'
    const res = await fetch(url, {method: 'POST', 
    	headers: {'Authorization': 'Bearer ya29.Glv1A4u-g1yAk6hRLPr5lgw5D4IRM8fsPe3vleMdlcYTYx-FFIUBuDWeovoVqISCrm6vwwxTx801169dNotYsVkE4SP796rWsZqvRFmCv46fJ1Rou2L0G_gERzK9',
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
    }
    textarea:focus{
    	border: none;
    	outline: none;
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