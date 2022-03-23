import React from 'react';

const RepoListItem = (props) => {
  return (
    <div>
      <span>Forks: {props.repo.forks}   </span>
      <span >Repo Name: </span>
      <a href={props.repo.html_url}>{props.repo.full_name}</a>
    </div>
  )
};

export default RepoListItem;