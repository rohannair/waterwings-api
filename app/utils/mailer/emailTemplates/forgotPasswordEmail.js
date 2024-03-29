// This is the forgot password email template

module.exports = (firstName, lastName, email, link) => {
  return (
          {
            transmissionBody: {
              content: {
                from: 'no-reply@qrtrmstr.com',
                subject: 'Quartermaster Password Reset',
                html:
                    `
                      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
                      <html xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/xhtml" style="min-height: 100%; back +ground: #f3f3f3;">
                        <head>
                          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                          <meta name="viewport" content="width=device-width" />
                        </head>
                        <body style="width: 100% !important; min-width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: #0a0a0a; font-family: Helvetica,Arial,sans-serif; font-weight: normal; text-align: left; line-height: 19px; font-size: 16px; margin: 0; padding: 0;"><style type="text/css">
                      @media only screen and (max-width: 596px) {
                        .small-float-center {
                          margin: 0 auto !important; float: none !important; text-align: center !important;
                        }
                        .small-text-center {
                          text-align: center !important;
                        }
                        .small-text-left {
                          text-align: left !important;
                        }
                        .small-text-right {
                          text-align: right !important;
                        }
                        table.body table.container .hide-for-large {
                          display: block !important; width: auto !important; overflow: visible !important;
                        }
                        table.body table.container .row.hide-for-large {
                          display: table !important; width: 100% !important;
                        }
                        table.body table.container .row.hide-for-large {
                          display: table !important; width: 100% !important;
                        }
                        table.body table.container .show-for-large {
                          display: none !important; width: 0; mso-hide: all; overflow: hidden;
                        }
                        table.body img {
                          width: auto !important; height: auto !important;
                        }
                        table.body center {
                          min-width: 0 !important;
                        }
                        table.body .container {
                          width: 95% !important;
                        }
                        table.body .columns {
                          height: auto !important; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; padding-left: 16px !important; padding-right: 16px !important;
                        }
                        table.body .column {
                          height: auto !important; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; padding-left: 16px !important; padding-right: 16px !important;
                        }
                        table.body .columns .column {
                          padding-left: 0 !important; padding-right: 0 !important;
                        }
                        table.body .columns .columns {
                          padding-left: 0 !important; padding-right: 0 !important;
                        }
                        table.body .column .column {
                          padding-left: 0 !important; padding-right: 0 !important;
                        }
                        table.body .column .columns {
                          padding-left: 0 !important; padding-right: 0 !important;
                        }
                        table.body .collapse .columns {
                          padding-left: 0 !important; padding-right: 0 !important;
                        }
                        table.body .collapse .column {
                          padding-left: 0 !important; padding-right: 0 !important;
                        }
                        td.small-1 {
                          display: inline-block !important; width: 8.33333% !important;
                        }
                        th.small-1 {
                          display: inline-block !important; width: 8.33333% !important;
                        }
                        td.small-2 {
                          display: inline-block !important; width: 16.66667% !important;
                        }
                        th.small-2 {
                          display: inline-block !important; width: 16.66667% !important;
                        }
                        td.small-3 {
                          display: inline-block !important; width: 25% !important;
                        }
                        th.small-3 {
                          display: inline-block !important; width: 25% !important;
                        }
                        td.small-4 {
                          display: inline-block !important; width: 33.33333% !important;
                        }
                        th.small-4 {
                          display: inline-block !important; width: 33.33333% !important;
                        }
                        td.small-5 {
                          display: inline-block !important; width: 41.66667% !important;
                        }
                        th.small-5 {
                          display: inline-block !important; width: 41.66667% !important;
                        }
                        td.small-6 {
                          display: inline-block !important; width: 50% !important;
                        }
                        th.small-6 {
                          display: inline-block !important; width: 50% !important;
                        }
                        td.small-7 {
                          display: inline-block !important; width: 58.33333% !important;
                        }
                        th.small-7 {
                          display: inline-block !important; width: 58.33333% !important;
                        }
                        td.small-8 {
                          display: inline-block !important; width: 66.66667% !important;
                        }
                        th.small-8 {
                          display: inline-block !important; width: 66.66667% !important;
                        }
                        td.small-9 {
                          display: inline-block !important; width: 75% !important;
                        }
                        th.small-9 {
                          display: inline-block !important; width: 75% !important;
                        }
                        td.small-10 {
                          display: inline-block !important; width: 83.33333% !important;
                        }
                        th.small-10 {
                          display: inline-block !important; width: 83.33333% !important;
                        }
                        td.small-11 {
                          display: inline-block !important; width: 91.66667% !important;
                        }
                        th.small-11 {
                          display: inline-block !important; width: 91.66667% !important;
                        }
                        td.small-12 {
                          display: inline-block !important; width: 100% !important;
                        }
                        th.small-12 {
                          display: inline-block !important; width: 100% !important;
                        }
                        .columns td.small-12 {
                          display: block !important; width: 100% !important;
                        }
                        .column td.small-12 {
                          display: block !important; width: 100% !important;
                        }
                        .columns th.small-12 {
                          display: block !important; width: 100% !important;
                        }
                        .column th.small-12 {
                          display: block !important; width: 100% !important;
                        }
                        .body .columns td.small-1 {
                          display: inline-block !important; width: 8.33333% !important;
                        }
                        .body .column td.small-1 {
                          display: inline-block !important; width: 8.33333% !important;
                        }
                        td.small-1 center {
                          display: inline-block !important; width: 8.33333% !important;
                        }
                        .body .columns th.small-1 {
                          display: inline-block !important; width: 8.33333% !important;
                        }
                        .body .column th.small-1 {
                          display: inline-block !important; width: 8.33333% !important;
                        }
                        th.small-1 center {
                          display: inline-block !important; width: 8.33333% !important;
                        }
                        .body .columns td.small-2 {
                          display: inline-block !important; width: 16.66667% !important;
                        }
                        .body .column td.small-2 {
                          display: inline-block !important; width: 16.66667% !important;
                        }
                        td.small-2 center {
                          display: inline-block !important; width: 16.66667% !important;
                        }
                        .body .columns th.small-2 {
                          display: inline-block !important; width: 16.66667% !important;
                        }
                        .body .column th.small-2 {
                          display: inline-block !important; width: 16.66667% !important;
                        }
                        th.small-2 center {
                          display: inline-block !important; width: 16.66667% !important;
                        }
                        .body .columns td.small-3 {
                          display: inline-block !important; width: 25% !important;
                        }
                        .body .column td.small-3 {
                          display: inline-block !important; width: 25% !important;
                        }
                        td.small-3 center {
                          display: inline-block !important; width: 25% !important;
                        }
                        .body .columns th.small-3 {
                          display: inline-block !important; width: 25% !important;
                        }
                        .body .column th.small-3 {
                          display: inline-block !important; width: 25% !important;
                        }
                        th.small-3 center {
                          display: inline-block !important; width: 25% !important;
                        }
                        .body .columns td.small-4 {
                          display: inline-block !important; width: 33.33333% !important;
                        }
                        .body .column td.small-4 {
                          display: inline-block !important; width: 33.33333% !important;
                        }
                        td.small-4 center {
                          display: inline-block !important; width: 33.33333% !important;
                        }
                        .body .columns th.small-4 {
                          display: inline-block !important; width: 33.33333% !important;
                        }
                        .body .column th.small-4 {
                          display: inline-block !important; width: 33.33333% !important;
                        }
                        th.small-4 center {
                          display: inline-block !important; width: 33.33333% !important;
                        }
                        .body .columns td.small-5 {
                          display: inline-block !important; width: 41.66667% !important;
                        }
                        .body .column td.small-5 {
                          display: inline-block !important; width: 41.66667% !important;
                        }
                        td.small-5 center {
                          display: inline-block !important; width: 41.66667% !important;
                        }
                        .body .columns th.small-5 {
                          display: inline-block !important; width: 41.66667% !important;
                        }
                        .body .column th.small-5 {
                          display: inline-block !important; width: 41.66667% !important;
                        }
                        th.small-5 center {
                          display: inline-block !important; width: 41.66667% !important;
                        }
                        .body .columns td.small-6 {
                          display: inline-block !important; width: 50% !important;
                        }
                        .body .column td.small-6 {
                          display: inline-block !important; width: 50% !important;
                        }
                        td.small-6 center {
                          display: inline-block !important; width: 50% !important;
                        }
                        .body .columns th.small-6 {
                          display: inline-block !important; width: 50% !important;
                        }
                        .body .column th.small-6 {
                          display: inline-block !important; width: 50% !important;
                        }
                        th.small-6 center {
                          display: inline-block !important; width: 50% !important;
                        }
                        .body .columns td.small-7 {
                          display: inline-block !important; width: 58.33333% !important;
                        }
                        .body .column td.small-7 {
                          display: inline-block !important; width: 58.33333% !important;
                        }
                        td.small-7 center {
                          display: inline-block !important; width: 58.33333% !important;
                        }
                        .body .columns th.small-7 {
                          display: inline-block !important; width: 58.33333% !important;
                        }
                        .body .column th.small-7 {
                          display: inline-block !important; width: 58.33333% !important;
                        }
                        th.small-7 center {
                          display: inline-block !important; width: 58.33333% !important;
                        }
                        .body .columns td.small-8 {
                          display: inline-block !important; width: 66.66667% !important;
                        }
                        .body .column td.small-8 {
                          display: inline-block !important; width: 66.66667% !important;
                        }
                        td.small-8 center {
                          display: inline-block !important; width: 66.66667% !important;
                        }
                        .body .columns th.small-8 {
                          display: inline-block !important; width: 66.66667% !important;
                        }
                        .body .column th.small-8 {
                          display: inline-block !important; width: 66.66667% !important;
                        }
                        th.small-8 center {
                          display: inline-block !important; width: 66.66667% !important;
                        }
                        .body .columns td.small-9 {
                          display: inline-block !important; width: 75% !important;
                        }
                        .body .column td.small-9 {
                          display: inline-block !important; width: 75% !important;
                        }
                        td.small-9 center {
                          display: inline-block !important; width: 75% !important;
                        }
                        .body .columns th.small-9 {
                          display: inline-block !important; width: 75% !important;
                        }
                        .body .column th.small-9 {
                          display: inline-block !important; width: 75% !important;
                        }
                        th.small-9 center {
                          display: inline-block !important; width: 75% !important;
                        }
                        .body .columns td.small-10 {
                          display: inline-block !important; width: 83.33333% !important;
                        }
                        .body .column td.small-10 {
                          display: inline-block !important; width: 83.33333% !important;
                        }
                        td.small-10 center {
                          display: inline-block !important; width: 83.33333% !important;
                        }
                        .body .columns th.small-10 {
                          display: inline-block !important; width: 83.33333% !important;
                        }
                        .body .column th.small-10 {
                          display: inline-block !important; width: 83.33333% !important;
                        }
                        th.small-10 center {
                          display: inline-block !important; width: 83.33333% !important;
                        }
                        .body .columns td.small-11 {
                          display: inline-block !important; width: 91.66667% !important;
                        }
                        .body .column td.small-11 {
                          display: inline-block !important; width: 91.66667% !important;
                        }
                        td.small-11 center {
                          display: inline-block !important; width: 91.66667% !important;
                        }
                        .body .columns th.small-11 {
                          display: inline-block !important; width: 91.66667% !important;
                        }
                        .body .column th.small-11 {
                          display: inline-block !important; width: 91.66667% !important;
                        }
                        th.small-11 center {
                          display: inline-block !important; width: 91.66667% !important;
                        }
                        table.body td.small-offset-1 {
                          margin-left: 8.33333% !important;
                        }
                        table.body th.small-offset-1 {
                          margin-left: 8.33333% !important;
                        }
                        table.body td.small-offset-2 {
                          margin-left: 16.66667% !important;
                        }
                        table.body th.small-offset-2 {
                          margin-left: 16.66667% !important;
                        }
                        table.body td.small-offset-3 {
                          margin-left: 25% !important;
                        }
                        table.body th.small-offset-3 {
                          margin-left: 25% !important;
                        }
                        table.body td.small-offset-4 {
                          margin-left: 33.33333% !important;
                        }
                        table.body th.small-offset-4 {
                          margin-left: 33.33333% !important;
                        }
                        table.body td.small-offset-5 {
                          margin-left: 41.66667% !important;
                        }
                        table.body th.small-offset-5 {
                          margin-left: 41.66667% !important;
                        }
                        table.body td.small-offset-6 {
                          margin-left: 50% !important;
                        }
                        table.body th.small-offset-6 {
                          margin-left: 50% !important;
                        }
                        table.body td.small-offset-7 {
                          margin-left: 58.33333% !important;
                        }
                        table.body th.small-offset-7 {
                          margin-left: 58.33333% !important;
                        }
                        table.body td.small-offset-8 {
                          margin-left: 66.66667% !important;
                        }
                        table.body th.small-offset-8 {
                          margin-left: 66.66667% !important;
                        }
                        table.body td.small-offset-9 {
                          margin-left: 75% !important;
                        }
                        table.body th.small-offset-9 {
                          margin-left: 75% !important;
                        }
                        table.body td.small-offset-10 {
                          margin-left: 83.33333% !important;
                        }
                        table.body th.small-offset-10 {
                          margin-left: 83.33333% !important;
                        }
                        table.body td.small-offset-11 {
                          margin-left: 91.66667% !important;
                        }
                        table.body th.small-offset-11 {
                          margin-left: 91.66667% !important;
                        }
                        table.body table.columns td.expander {
                          display: none !important;
                        }
                        table.body table.columns th.expander {
                          display: none !important;
                        }
                        table.body .right-text-pad {
                          padding-left: 10px !important;
                        }
                        table.body .text-pad-right {
                          padding-left: 10px !important;
                        }
                        table.body .left-text-pad {
                          padding-right: 10px !important;
                        }
                        table.body .text-pad-left {
                          padding-right: 10px !important;
                        }
                        table.menu {
                          width: 100% !important;
                        }
                        table.menu td {
                          width: auto !important; display: inline-block !important;
                        }
                        table.menu th {
                          width: auto !important; display: inline-block !important;
                        }
                        table.menu.vertical td {
                          display: block !important;
                        }
                        table.menu.vertical th {
                          display: block !important;
                        }
                        table.menu.small-vertical td {
                          display: block !important;
                        }
                        table.menu.small-vertical th {
                          display: block !important;
                        }
                        table.button.expand {
                          width: 100% !important;
                        }
                      }
                      </style>
                      <table class="body" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; height: 100%; width: 100%; color: #0a0a0a; font-family: Helvetica,Arial,sans-serif; font-weight: normal; line-height: 19px; font-size: 16px; background: #f3f3f3; margin: 0; padding: 0;" bgcolor="#f3f3f3"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td class="center" align="center" valign="top" style="word-wrap: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; color: #0a0a0a; font-family: Helvetica,Arial,sans-serif; font-weight: normal; line-height: 19px; font-size: 16px; margin: 0; padding: 0;">
                      <center data-parsed="" style="width: 100%; min-width: 580px;">
                      <table class="container header text-center" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: center; width: 580px; background: #fefefe; margin: 0 auto; padding: 0;" bgcolor="#fefefe"><tbody><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td style="word-wrap: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; color: #0a0a0a; font-family: Helvetica,Arial,sans-serif; font-weight: normal; line-height: 19px; font-size: 16px; margin: 0; padding: 0;" align="left" valign="top">
                      <table class="row collapse" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; position: relative; display: table; padding: 0;"></table></td>
                      </tr></tbody></table><table class="container body text-center" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; height: 100%; width: 580px; color: #0a0a0a; font-family: Helvetica,Arial,sans-serif; font-weight: normal; line-height: 19px; font-size: 16px; background: #fefefe; margin: 0; padding: 0;" bgcolor="#fefefe"><tbody><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td style="word-wrap: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; color: #0a0a0a; font-family: Helvetica,Arial,sans-serif; font-weight: normal; line-height: 19px; font-size: 16px; margin: 0; padding: 0;" align="left" valign="top"> <br /><center data-parsed="" style="width: 100%; min-width: 580px;"> <img src="https://qrtrmstr-images.s3.amazonaws.com/qrtrmstr_icon_120x120.png" alt="" align="center" class="text-center" style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; width: auto; max-width: 100%; clear: both; display: block; float: none; text-align: center; margin: 0 auto;" /></center> <br /><table class="row" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; position: relative; display: table; padding: 0;"><tbody><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><th class="small-12 large-12 columns first last" style="width: 564px; color: #0a0a0a; font-family: Helvetica,Arial,sans-serif; font-weight: normal; text-align: left; line-height: 19px; font-size: 16px; margin: 0 auto; padding: 0 16px 16px;" align="left">
                      <table style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><th style="color: #0a0a0a; font-family: Helvetica,Arial,sans-serif; font-weight: normal; text-align: left; line-height: 19px; font-size: 16px; margin: 0; padding: 0;" align="left">
                      <h4 class="text-center" style="text-align: center; color: inherit; font-family: Helvetica,Arial,sans-serif; font-weight: normal; line-height: 1.3; word-wrap: normal; font-size: 24px; margin: 0 0 10px; padding: 0;" align="center">Quartermaster</h4>
                      </th>
                      <th class="expander" style="visibility: hidden; width: 0; color: #0a0a0a; font-family: Helvetica,Arial,sans-serif; font-weight: normal; text-align: left; line-height: 19px; font-size: 16px; margin: 0; padding: 0;" align="left"></th>
                      </tr></table></th>
                      </tr></tbody></table><hr style="max-width: 580px; height: 0; border-bottom-color: #cacaca; clear: both; border-bottom-style: solid; margin: 20px auto; border-width: 0 0 1px;" /><table class="row" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; position: relative; display: table; padding: 0;"><tbody><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><th class="small-12 large-12 columns first last" style="width: 564px; color: #0a0a0a; font-family: Helvetica,Arial,sans-serif; font-weight: normal; text-align: left; line-height: 19px; font-size: 16px; margin: 0 auto; padding: 0 16px 16px;" align="left">
                      <table style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><th style="color: #0a0a0a; font-family: Helvetica,Arial,sans-serif; font-weight: normal; text-align: left; line-height: 19px; font-size: 16px; margin: 0; padding: 0;" align="left">
                      <p class="text-center" style="text-align: center; color: #0a0a0a; font-family: Helvetica,Arial,sans-serif; font-weight: normal; line-height: 19px; font-size: 16px; margin: 0 0 10px; padding: 0;" align="center">Hi, ${firstName} ${lastName}</p>
                      <p class="text-center" style="text-align: center; color: #0a0a0a; font-family: Helvetica,Arial,sans-serif; font-weight: normal; line-height: 19px; font-size: 16px; margin: 0 0 10px; padding: 0;" align="center"> This is a password reset message. Please click the link below to go to the password reset page</p>
                      <center data-parsed="" style="width: 100%; min-width: 532px;">
                      <table class="button text-center" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: center; width: auto !important; margin: 0 0 16px; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td style="word-wrap: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; color: #0a0a0a; font-family: Helvetica,Arial,sans-serif; font-weight: normal; line-height: 19px; font-size: 16px; margin: 0; padding: 0;" align="left" valign="top">
                      <table style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td style="word-wrap: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; color: #fefefe; font-family: Helvetica,Arial,sans-serif; font-weight: normal; line-height: 19px; font-size: 16px; width: auto !important; background: #EE6352; margin: 0; padding: 0; border: 2px solid #ee6352;" align="left" bgcolor="#EE6352" valign="top"><a href=${link} style="color: #fefefe; font-family: Helvetica,Arial,sans-serif; font-weight: bold; text-align: left; line-height: 1.3; text-decoration: none; font-size: 16px; display: inline-block; border-radius: 3px; margin: 0; padding: 8px 16px; border: 0px solid #ee6352;">Reset Password ↣</a></td>
                      </tr></table></td>
                      </tr></table></center>
                      </th>
                      <th class="expander" style="visibility: hidden; width: 0; color: #0a0a0a; font-family: Helvetica,Arial,sans-serif; font-weight: normal; text-align: left; line-height: 19px; font-size: 16px; margin: 0; padding: 0;" align="left"></th>
                      </tr></table></th>
                      </tr></tbody></table><table class="row collapsed footer" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; position: relative; display: table; padding: 0;"><tbody><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><th class="small-12 large-12 columns first last" style="width: 564px; color: #0a0a0a; font-family: Helvetica,Arial,sans-serif; font-weight: normal; text-align: left; line-height: 19px; font-size: 16px; margin: 0 auto; padding: 0 16px 16px;" align="left">
                      <table style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><th style="color: #0a0a0a; font-family: Helvetica,Arial,sans-serif; font-weight: normal; text-align: left; line-height: 19px; font-size: 16px; margin: 0; padding: 0;" align="left"> <br /><p class="text-center" style="text-align: center; color: #0a0a0a; font-family: Helvetica,Arial,sans-serif; font-weight: normal; line-height: 19px; font-size: 16px; margin: 0 0 10px; padding: 0;" align="center">Quartermaster Branch Inc<br /></p>
                      <center data-parsed="" style="width: 100%; min-width: 532px;">
                      <table class="menu text-center" align="center" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: center; width: 100%; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td style="word-wrap: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; color: #0a0a0a; font-family: Helvetica,Arial,sans-serif; font-weight: normal; line-height: 19px; font-size: 16px; margin: 0; padding: 0;" align="left" valign="top">
                      </td>
                      </tr></table></center>
                      </th>
                      <th class="expander" style="visibility: hidden; width: 0; color: #0a0a0a; font-family: Helvetica,Arial,sans-serif; font-weight: normal; text-align: left; line-height: 19px; font-size: 16px; margin: 0; padding: 0;" align="left"></th>
                      </tr></table></th>
                      </tr></tbody></table></td>
                      </tr></tbody></table></center>
                      </td>
                      </tr></table></body>
                      </html>
                    `
              },
              recipients: [ { address: email } ]
            }
          }
        );
};
