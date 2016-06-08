module.exports = (companySubdomain, playbookID, email) => {
  return ("http://www." + process.env.DOMAIN + `/playbook/${playbookID}` + `?from_email=${email}`);
}
