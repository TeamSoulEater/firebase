import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const createTextBlock = functions.https.onCall(async (data, context) => {
    const contextAuth = await admin
        .firestore()
        .doc(`blocsText/${context.auth.uid}`)
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

