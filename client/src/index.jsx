import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Axios from 'axios';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    Axios.get('http://localhost:1128/repos')
      .then((response) => {
        this.setState({
          repos: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    // Axios.post('http://localhost:1128/repos', {
    //   full_name: term
    // }).then((response) => {
    //   console.log(response.data);
    //   this.setState({
    //     repos: response.data
    //   });
    //   alert(`${term}'s repos have been successfully added.`)
    // }).catch((error) => {
    //   alert(`${term}'s repos have NOT been added. Check for spelling errors?`)
    // });

    // alternative - chained axios requests
    // Axios
    //   .post('http://localhost:1128/repos', {full_name: term})
    //   .then(response => {
    //     return Axios.get('http://localhost:1128/repos');
    //   })
    //   .then(response => {
    //     conosle.log('****this is from the 2nd then in axios request!!***', response.data)
    //     this.setState({
    //       repos: response.data
    //     })
    //   })
    //   .catch(error => {
    //     alert(`${term}'s repos have NOT been added. Check for spelling errors?`)
    //   })

    Axios
      .post('http://localhost:1128/repos', {full_name: term})
      .then(response => {
        Axios.get('http://localhost:1128/repos')
          .then(response => {this.setState({repos: response.data})})
          .catch(err => console.log('error from inner get -- ', err));
      })
      .catch(err => console.log('error from outer --- ', err));
      // .then(response => {
      //   this.setState({
      //     repos: response.data
      //   })
      // })
      // .catch(error => {
      //   alert(`${term}'s repos have NOT been added. Check for spelling errors?`)
      // })

  }

  render () {
    console.log(this.state.repos);
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));