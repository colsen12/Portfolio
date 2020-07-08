const express = require('express');
const sendMail = require('./mail');

const app = express();
const path = require('path');

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({
	extended: false
}));
app.use(express.json());

//send email through mailgun
app.post('/email', (req, res) => {

	const { subject, email, text } = req.body;
	console.log('Data: ', req.body);

	sendMail(email, subject, text, function(err, data) {
		if (err) {
			res.status(500).json({ message: 'Internal error' });
		} else {
			res.json({ message: 'Email sent' });
		}
	});
})

//allows css file 
app.use(express.static(path.join(__dirname, '/public')));

//gets index
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Server is starting on PORT ${PORT}`);
});