import React from 'react';
import RepoListItem from './RepoListItem.jsx';

const RepoList = (props) => (
  <React.Fragment>

    <div>
      {props.repos.map(repo => (<RepoListItem key={repo.id} repo={repo}/>))}
    </div>
    <div>
      There are {props.repos.length} repos.
    </div>
  </React.Fragment>
)

export default RepoList;