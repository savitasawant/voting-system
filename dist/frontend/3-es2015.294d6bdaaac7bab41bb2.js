(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"40+f":function(t,i,n){"use strict";n.d(i,"a",(function(){return e})),n("8Y7J"),n("UhP/"),n("8LU1");class e{}},"6VRY":function(t,i,n){"use strict";n.d(i,"a",(function(){return e}));class e{constructor(t,i){this._authService=t,this.router=i}canActivate(){return!this._authService.isAuthenticated()||(this.router.navigate(["/files"]),!1)}}}}]);