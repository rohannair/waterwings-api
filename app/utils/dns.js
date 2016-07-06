// Deps
const fetch = require('node-fetch');
const ApiError = require('./customErrors');

// Utilities to create new DNS records with DNS providers

// CloudFlare
function createCloudFlareDomainRecord(subdomain) {
  return (new Promise((resolve, reject) => {
    fetch(`https://api.cloudflare.com/client/v4/zones/${process.env.ZONE_IDENTIFIER}/dns_records`,
      {
        method: 'POST',
        headers:
          {
            'X-Auth-Email': process.env.CLOUD_FLARE_EMAIL,
            'X-Auth-Key': process.env.CLOUD_FLARE_API_KEY,
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(
          {
            type: 'CNAME',
            name: subdomain,
            content: process.env.DOMAIN_NAME,
            proxied: true
          }
        )
      })
    .then((res) => { resolve(res.json()) })
    .catch(err => { reject(new ApiError('Problem creating new company', 500, err)) });
  }));
}

// Heroku DNS creation
function createHerokuDomainRecord(customDomain) {
  return (new Promise((resolve, reject) => {
    fetch(`https://api.heroku.com/apps/${process.env.HEROKU_APP_NAME}/domains`,
      {
        method: 'POST',
        headers:
          {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.HEROKU_API_KEY}`,
            'Accept': 'application/vnd.heroku+json; version=3'
          },
        body: JSON.stringify(
          {
            hostname: customDomain
          }
        )
      })
    .then(res => { resolve(res.json()) })
    .catch(err => { reject(new ApiError( 'Problem creating new company', 500, err)) });
  }));
}

module.exports = {
  createCloudFlareDomainRecord,
  createHerokuDomainRecord
}
