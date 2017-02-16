
import React from 'react'
import Link from 'next/prefetch'
import 'isomorphic-fetch'

export default class extends React.Component {
  static async getInitialProps () {
    // eslint-disable-next-line no-undef
    const res = await fetch('https://api.github.com/repos/zeit/next.js')
    const json = await res.json()
    return { stars: json.stargazers_count }
  }

submit(e){
	e.preventDefault()
	console.log("submitted")
}

  render () {
    return (
      <div>
      	<form onSubmit={this.submit}>
 		 First name:
  		<input type="text" name="firstname" value="Enter Review Here"/>
  		<input type="submit" value="Submit"/>
		</form>
      </div>
    )
  }
}