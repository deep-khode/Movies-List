import PropTypes from 'prop-types'
import React, { Component } from 'react';
import axios from 'axios';
import './App.css'

export class SearchMovies extends Component {
  
  constructor() {
    super();
    this.state = {movieResult: [], searchKeyword: ''};
  }

  componentDidMount(){
    this.runAPI();
  }

  runAPI = () => {
    axios.get("https://api.themoviedb.org/3/movie/popular?api_key=cfe422613b250f702980a3bbf9e90716")
    .then((res) => {
        console.log(res.data.results)
        this.setState({movieResult: res.data.results})
    }).catch((err) => {
        console.log(err);
    })
  }

  handleInput = (input) => {

    if(input == ''){
        this.runAPI();
    }
    
    axios.get(`https://api.themoviedb.org/3/search/movie?query=${input}&api_key=cfe422613b250f702980a3bbf9e90716`)
    .then((res) => {
        this.setState({movieResult: res.data.results})
    }).catch((err) => {
        console.log(err);
    })
    this.setState({searchKeyword: input})
    
  }

  render() {
    return (
      <>
        <div id="container">
            <div>
                <h1 className="Heading">Search Your Favourite Movies</h1>
            </div>
            <div>
                <input type="search" id="searchInput" value={this.state.searchKeyword} name="searchKeyword" onChange={(e) => this.handleInput(e.target.value)} />
            </div>
            <div id="result">
                {
                    this.state.movieResult.map((movie, index) => {
                        return <>
                            <div className="card" key={index} title={movie.original_title} >
                                <img className="image" src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`} alt={movie.original_title} />
                                <h3 className="title">{movie.original_title}</h3>
                            </div>
                        </>
                    })
                }
                <div>

                </div>
            </div>
            <footer id="footer">
                <p>© 2022 Deep Khode ✌️</p>
            </footer>
        </div>

        {/* <div>{JSON.stringify(this.state)}</div> */}
      </>
    )
  }
}

export default SearchMovies;