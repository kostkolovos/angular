// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUrl: 'http://localhost:8081/',
    applicationTitle: 'Application',
    favIconHeader: 'favicon.ico', // Use  assets/images/ path to save your file
    firebaseConfig: {
        apiKey: 'AIzaSyDD6rmg_rLfVN6WnWHZYLTuMUz53JrVSTk',
        authDomain: 'peiratokatastasi.firebaseapp.com',
        databaseURL: 'https://peiratokatastasi.firebaseio.com',
        projectId: 'peiratokatastasi',
        storageBucket: 'peiratokatastasi.appspot.com',
        messagingSenderId: '745562733523',
        appId: '1:745562733523:web:c5d9c8284fac2d0d4b0d26',
        measurementId: 'G-J905G4HXVR'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
