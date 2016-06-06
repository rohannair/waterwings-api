function linkCreator(companySubdomain, playbookID) {
  return ("http://" + `/${companySubdomain}.` + process.env.DOMAIN + `/playbook/${playbookID}`);
}

module.exports = linkCreator;
