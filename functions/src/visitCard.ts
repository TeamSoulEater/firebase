import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const createVisitCard = functions.https.onCall(async (data, context) => {
	const contextAuth = await admin
		.firestore()
		.doc(`users/${context.auth.uid}`)
		.get();
	const isAdmin = await contextAuth.data().roles.admin;
	if (isAdmin) {
		data.visitCards.createdAt = new Date();
		await admin
			.firestore()
			.collection(`visitCards`).add(data.visitCards);
		return true;
	} else {
		return false;
	}
});

export const createVisitCards = functions.https.onCall(async (data, context) => {
    const contextAuth = await admin
        .firestore()
        .doc(`users/${context.auth.uid}`)
        .get();
    const isAdmin = await contextAuth.data().roles.admin;
    if (isAdmin) {
        data.visitCards.createdAt = new Date();
        await admin
            .firestore()
            .collection(`visitCards`).add(data.visitCards);
        return true;
    } else {
        return false;
    }
});