const nodemailer = require('nodemailer')
const mailGun = require('nodemailer-mailgun-transport');

require('dotenv').config()

const auth = {
	auth: {
		api_key: process.env.API_KEY,
		domain: 'sandboxd6c537f4618347358c9118caadb6b021.mailgun.org'
	}
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, subject, text, cb) => {
	const mailOptions = {
		from: email,
		to: 'colsen788@gmail.com',
		subject: subject,
		text: text
	};

	transporter.sendMail(mailOptions, function(err, data) {
		if (err) {
			cb(err, null);
		} else {
			cb(null, data);
		}
	});
}

module.exports = sendMail;


