import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const createUser = functions.https.onCall(async (data, context) => {
	const contextAuth = await admin
		.firestore()
		.doc(`users/${context.auth.uid}`)
		.get();
	const isAdmin = await contextAuth.data().roles.admin;
	if (isAdmin) {
		const auth = await admin.auth().createUser({
			email: data.user.email,
			password: data.user.password
		});
		data.user.createdAt = new Date();
		data.user.uid = auth.uid;
		await admin
			.firestore()
			.doc(`users/${auth.uid}`)
			.set(data.user);
		return true;
	} else {
		return false;
	}
});

export const createUsers = functions.https.onCall(async (data, context) => {
	const contextAuth = await admin
		.firestore()
		.doc(`users/${context.auth.uid}`)
		.get();
	const isAdmin = await contextAuth.data().roles.admin;
	if (isAdmin) {
		data.users.forEach(async user => {
			const auth = await admin.auth().createUser({
				email: user.email,
				password: user.password
			});
			user.createdAt = new Date();
			user.uid = auth.uid;
			await admin
				.firestore()
				.doc(`users/${auth.uid}`)
				.set(user);
		});
		return true;
	} else {
		return false;
	}
});

export const verifyUser = functions.https.onCall(async (data, context) => {
	const contextAuth = await admin
		.firestore()
		.doc(`users/${context.auth.uid}`)
		.get();
	const isAdmin = await contextAuth.data().roles.admin;
	if (isAdmin) {
		await admin.auth().updateUser(data.userId, {
			emailVerified: true
		});
		return true;
	} else {
		return false;
	}
});

export const changeEmail = functions.https.onCall(async (data, context) => {
	const contextAuth = await admin
		.firestore()
		.doc(`users/${context.auth.uid}`)
		.get();
	const isAdmin = await contextAuth.data().roles.admin;
	if (isAdmin) {
		await admin.auth().updateUser(data.userId, {
			email: data.newEmail
		});
		await admin
			.firestore()
			.doc(`users/${data.userId}`)
			.update({
				email: data.newEmail
			});
		return true;
	} else {
		return false;
	}
});

export const changePassword = functions.https.onCall(async (data, context) => {
	const contextAuth = await admin
		.firestore()
		.doc(`users/${context.auth.uid}`)
		.get();
	const isAdmin = await contextAuth.data().roles.admin;
	if (isAdmin) {
		await admin.auth().updateUser(data.userId, {
			password: data.newPassword
		});
		return true;
	} else {
		return false;
	}
});

export const activateUser = functions.https.onCall(async (data, context) => {
	const contextAuth = await admin
		.firestore()
		.doc(`users/${context.auth.uid}`)
		.get();
	const isAdmin = await contextAuth.data().roles.admin;
	if (isAdmin) {
		await admin.auth().updateUser(data.userId, {
			disabled: false
		});
		return true;
	} else {
		return false;
	}
});

export const desactivateUser = functions.https.onCall(async (data, context) => {
	const contextAuth = await admin
		.firestore()
		.doc(`users/${context.auth.uid}`)
		.get();
	const isAdmin = await contextAuth.data().roles.admin;
	if (isAdmin) {
		await admin.auth().updateUser(data.userId, {
			disabled: true
		});
		return true;
	} else {
		return false;
	}
});

export const deleteUser = functions.https.onCall(async (data, context) => {
	const contextAuth = await admin
		.firestore()
		.doc(`users/${context.auth.uid}`)
		.get();
	const isAdmin = await contextAuth.data().roles.admin;
	if (isAdmin) {
		await admin.auth().deleteUser(data.userId);
		await admin
			.firestore()
			.doc(`users/${data.userId}`)
			.delete();
		return true;
	} else {
		return false;
	}
});

export const deleteUsers = functions.https.onCall(async (data, context) => {
	const contextAuth = await admin
		.firestore()
		.doc(`users/${context.auth.uid}`)
		.get();
	const isAdmin = await contextAuth.data().roles.admin;
	if (isAdmin) {
		data.userIds.forEach(async userId => {
			await admin.auth().deleteUser(userId);
			await admin
				.firestore()
				.doc(`users/${userId}`)
				.delete();
		});
		return true;
	} else {
		return false;
	}
});
