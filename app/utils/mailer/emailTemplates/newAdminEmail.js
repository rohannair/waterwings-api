// This is the new Admin user email template

module.exports = (firstName, lastName, email, password, companyName, senderFirstName, senderLastName, link) => {
  return (
          {
            transmissionBody: {
              content: {
                from: 'no-reply@qrtrmstr.com',
                subject: `Quartermaster invite from ${senderFirstName} ${senderLastName}`,
                html:
                    `
                      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
                      <html xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/xhtml" style="min-height: 100%; back +ground: #f3f3f3;">
                        <head>
                          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                          <meta name="viewport" content="width=device-width" />
                        </head>
                        <body>
                          <p>Hi ${firstName}</p>
                          <p>${senderFirstName} ${senderLastName} has invited you to <a href="http://qrtrmstr.com">Quartermaster</a></p>
                          <p>Below are login details</p>
                          <p>${link}</p>
                          <p>u: ${email}</p>
                          <p>p: ${password}</p>
                          <p>Let me know if you have any problems. Below is a product overview video</p>
                          <a href="https://www.youtube.com/watch?v=f-NmieEx4eM">Quartermaster Demo</a>
                          <p>Ray Kanani</p>
                          <p>Co-Founder, Quartermaster</p>
                        </body>
                      </html>
                      `
              },
              recipients: [ { address: email } ]
            }
          }
        );
};
