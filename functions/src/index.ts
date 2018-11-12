import * as admin from 'firebase-admin';

export {
	createUser,
	createUsers,
	verifyUser,
	activateUser,
	desactivateUser,
	deleteUser,
	deleteUsers,
	changeEmail,
	changePassword
} from './user';

admin.initializeApp();
