import React from 'react';
import styles from './playbookBio.css';

import Uploader from '../../containers/Uploader';

const PlaybookBio = (props) => {
  const bodyOpts = props.body.options;
  const profilePic = bodyOpts.profile_image
  ? (<Uploader>
        <i className="material-icons">cloud_upload</i>
        <span>Upload a profile picture</span>
      </Uploader>)
  : null;

  const bio = bodyOpts.bio
  ? <textarea placeholder="Tell the team a little bit about yourself..."/>
  : null;

  const facebook = bodyOpts.facebook
  ? <li className="fb">Link your Facebook</li>
  : null;

  const twitter = bodyOpts.twitter
  ? <li className="tw">Link your Twitter</li>
  : null;

  const linkedin = bodyOpts.linkedin
  ? <li className="li">Link your LinkedIn</li>
  : null;

  const social = (facebook || twitter || linkedin)
  ? (
    <div className="social-media">
      { facebook }
      { twitter }
      { linkedin }
    </div>
  )
  : null;

  return (
    <div className="playbookBio">
      <h2>Fill out your profile</h2>
      <div className="bio">
        <div className="bio-info">
          { profilePic }
        </div>
        <div className="bio-form">
          <h3>{ props.userInfo.firstName + ' ' + props.userInfo.lastName}</h3>
          { bio }
          { social }
        </div>
      </div>
    </div>
  );
};

export default PlaybookBio;
