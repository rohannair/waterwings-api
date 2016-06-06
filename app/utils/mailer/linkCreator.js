module.exports = (companySubdomain, playbookID) => {
  return ("http://" + `/${companySubdomain}.` + process.env.DOMAIN + `/playbook/${playbookID}`);
}
