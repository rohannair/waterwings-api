import utils from './utils';
import { filePost, API_ROOT } from '../utils/request';

const getDomain = utils.getDomain;
const LOCATION_ROOT = getDomain() + API_ROOT;

// Users Retrieved action
function uploadComplete(data) {
  return {
    type: 'UPLOAD_SUCCESSFUL',
    data
  };
}

// Single User Call
export const postUpload = (token, data) =>
  dispatch => filePost(`${LOCATION_ROOT}upload/`, token, data)
  .then(json => dispatch(uploadComplete(json)));
