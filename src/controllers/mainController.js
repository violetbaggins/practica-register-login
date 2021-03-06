//require modules
const fs = require('fs');


// Constants
const userFilePath = __dirname + '/../data/users.json';
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

// Helper Functions
function getAllUsers () {
	let usersFileContent = fs.readFileSync(userFilePath, 'utf-8');
	let finalUsers = usersFileContent == '' ? [] : JSON.parse(usersFileContent); 
	return finalUsers;
}

function storeUser (newUserData) {
	let allUsers = getAllUsers();
	allUsers.push(newUserData);
	fs.writeFileSync(userFilePath, JSON.stringify(allUsers, null, ' '));
}

function generateUserId () {
	let allUsers = getAllUsers();
	if (allUsers.length == 0) {
		return 1;
	}
	let lastUser = allUsers.pop();
	return lastUser.id + 1;
}

function getUserByEmail(email) {
	let allUsers = getAllUsers();
	let userToFind = allUsers.find(oneUser => oneUser.email == email);
	return userToFind;
	
}

function getUserById(id) {
	let allUsers = getAllUsers();
	let userToFind = allUsers.find(oneUser => oneUser.id == id);
	return userToFind;
}

const controller = {
	home: (req, res) => {
        res.render('index', {
			users //esta const la declare al prncipio, lee todo el archivo JSON
		});
    },
	registerForm: (req, res) => {
        //res.send('Página de Registro'); ** ESTO ES PARA COMPROBAR SI ANDA
        res.render('register');
    },store: (req, res) => {
		let userFinalData = {
			id: generateUserId(),
			name: req.body.name,
			lastname: req.body.lastname,
			email: req.body.email,
            //password: bcrypt.hashSync(req.body.password, 10),
			password: req.body.password,
			bio:req.body.bio,
			avatar: req.file.filename
		};
		
		// Guardar al usario
		storeUser(userFinalData);
		
		// Redirección al login
        res.redirect('/login');
        //** -- COSAS DE PAO --- res.send("andó!!!");
	},
	loginForm:(req, res) => {
        //res.send('Esta es la pagina de login'); // ESTO ES PARA COMPROBAR SI ANDA
        res.render('login');
	},
	processLogin: (req, res) =>{
		// Buscar usuario por email
		let user = getUserByEmail(req.body.email);
		
		// Si encontramos al usuario
		//if (user != undefined) {
			// Al ya tener al usuario, comparamos las contraseñas
			res.send(user);
		//} else {
		//res.send('No hay usuarios registrados con ese email')}
	},
	pruebas:(req, res) => {
        //res.send('Esta es la pagina de login'); // ESTO ES PARA COMPROBAR SI ANDA
		res.render('pruebas');
	},
	profile: (req, res) => {
		let userLoged = getUserById(req.params.id);

		res.render('profile', { user: userLoged });
	}
}

module.exports = controller;