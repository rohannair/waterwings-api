module.exports = (companySubdomain, playbookID, email) => {
  return ("http://" + `/${companySubdomain}.` + process.env.DOMAIN + `/playbook/${playbookID}` + `?from_email=${email}`);
}
