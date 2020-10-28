/**
 *  TODO make a environment.prod.ts like this one and change production: true to false for the environment.ts file
 */

export const environment = {
    production: true,
    apiUrl: 'apiUrl',
    applicationTitle: 'applicationTitle',
    favIconHeader: 'favIconHeader', // Use  assets/images/ path to save your file
    firebaseConfig: {
        apiKey: 'apiKey',
        authDomain: 'authDomain',
        databaseURL: 'databaseURL',
        projectId: 'projectId',
        storageBucket: 'storageBucket',
        messagingSenderId: 'messagingSenderId',
        appId: 'appId',
        measurementId: 'measurementId'
    }
};
