// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //api_urlbase: "http://localhost:8080/Proyecto2018/",
  //ws_urlbase: "ws://localhost:8080/Proyecto2018/"
  
  //api_urlbase: "http://172.20.10.3:8080/Proyecto2018/",
  //ws_urlbase: "ws://172.20.10.3:8080/Proyecto2018/"

  api_urlbase: "http://192.168.43.125:8080/Proyecto2018/",
  ws_urlbase: "ws://192.168.43.125:8080/Proyecto2018/"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
