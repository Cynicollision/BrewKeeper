(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _brew_list_brew_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./brew-list/brew-list.component */ "./src/app/brew-list/brew-list.component.ts");





var routes = [
    { path: '', component: _home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"] },
    { path: 'brews', component: _brew_list_brew_list_component__WEBPACK_IMPORTED_MODULE_4__["BrewListComponent"] },
    { path: 'callback', component: _home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"] },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-sidenav-container class=\"sidenav-container\">\r\n  <mat-sidenav #drawer class=\"sidenav\" fixedInViewport=\"true\"\r\n      [attr.role]=\"(isHandset$ | async) ? 'dialog' : 'navigation'\"\r\n      [mode]=\"(isHandset$ | async) ? 'over' : 'side'\"\r\n      [opened]=\"!(isHandset$ | async)\">\r\n    <mat-toolbar>Menu</mat-toolbar>\r\n    <app-nav></app-nav>\r\n  </mat-sidenav>\r\n  <mat-sidenav-content>\r\n    <mat-toolbar color=\"primary\">\r\n      <button\r\n        type=\"button\"\r\n        aria-label=\"Toggle sidenav\"\r\n        mat-icon-button\r\n        (click)=\"drawer.toggle()\"\r\n        *ngIf=\"isHandset$ | async\">\r\n        <mat-icon aria-label=\"Side nav toggle icon\">menu</mat-icon>\r\n      </button>\r\n      <span id=\"title\">Brew Keeper</span>\r\n    </mat-toolbar>\r\n    <router-outlet></router-outlet>\r\n  </mat-sidenav-content>\r\n</mat-sidenav-container>\r\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".sidenav-container {\n  height: 100%; }\n\n.sidenav {\n  width: 200px; }\n\n.sidenav .mat-toolbar {\n  background: inherit; }\n\n.mat-toolbar.mat-primary {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  z-index: 1; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvQzpcXGRldlxcQnJld0tlZXBlcjJcXGNsaWVudC9zcmNcXGFwcFxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBWSxFQUNiOztBQUVEO0VBQ0UsYUFBWSxFQUNiOztBQUVEO0VBQ0Usb0JBQW1CLEVBQ3BCOztBQUVEO0VBQ0UseUJBQWdCO0VBQWhCLGlCQUFnQjtFQUNoQixPQUFNO0VBQ04sV0FBVSxFQUNYIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNpZGVuYXYtY29udGFpbmVyIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbi5zaWRlbmF2IHtcclxuICB3aWR0aDogMjAwcHg7XHJcbn1cclxuXHJcbi5zaWRlbmF2IC5tYXQtdG9vbGJhciB7XHJcbiAgYmFja2dyb3VuZDogaW5oZXJpdDtcclxufVxyXG5cclxuLm1hdC10b29sYmFyLm1hdC1wcmltYXJ5IHtcclxuICBwb3NpdGlvbjogc3RpY2t5O1xyXG4gIHRvcDogMDtcclxuICB6LWluZGV4OiAxO1xyXG59XHJcbiAgIl19 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/esm5/layout.es5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");




var AppComponent = /** @class */ (function () {
    function AppComponent(breakpointObserver) {
        this.breakpointObserver = breakpointObserver;
        this.title = 'BrewKeeperClient';
        this.isHandset$ = this.breakpointObserver.observe(_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_2__["Breakpoints"].Handset)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (result) { return result.matches; }));
        this.title = 'BrewKeeperClient';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_2__["BreakpointObserver"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/esm5/layout.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./nav/nav.component */ "./src/app/nav/nav.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _list_list_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./list/list.component */ "./src/app/list/list.component.ts");
/* harmony import */ var _brew_list_brew_list_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./brew-list/brew-list.component */ "./src/app/brew-list/brew-list.component.ts");
/* harmony import */ var _brew_dialog_brew_dialog_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./brew-dialog/brew-dialog.component */ "./src/app/brew-dialog/brew-dialog.component.ts");
















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_5__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"],
                _nav_nav_component__WEBPACK_IMPORTED_MODULE_10__["NavComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_11__["HomeComponent"],
                _list_list_component__WEBPACK_IMPORTED_MODULE_12__["ListComponent"],
                _brew_list_brew_list_component__WEBPACK_IMPORTED_MODULE_13__["BrewListComponent"],
                _brew_dialog_brew_dialog_component__WEBPACK_IMPORTED_MODULE_14__["BrewDialogComponent"],
            ],
            entryComponents: [
                _brew_dialog_brew_dialog_component__WEBPACK_IMPORTED_MODULE_14__["BrewDialogComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_8__["AppRoutingModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__["LayoutModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatToolbarModule"],
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/auth.service.ts":
/*!*********************************!*\
  !*** ./src/app/auth.service.ts ***!
  \*********************************/
/*! exports provided: UserInfo, AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserInfo", function() { return UserInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var auth0_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! auth0-js */ "./node_modules/auth0-js/dist/auth0.min.esm.js");




var UserInfo = /** @class */ (function () {
    function UserInfo() {
        this.name = "";
        this.id = "";
    }
    return UserInfo;
}());

var AuthService = /** @class */ (function () {
    function AuthService(router) {
        this.router = router;
        this._idToken = '';
        this._accessToken = '';
        this._expiresAt = 0;
        this._userInfo = null;
        // TODO: not hardcoded
        this.auth0 = new auth0_js__WEBPACK_IMPORTED_MODULE_3__["WebAuth"]({
            clientID: '2EHHIox2_2t01td8HfxYNpSuEZAVwLpH',
            domain: 'brewkeeper.auth0.com',
            responseType: 'token id_token',
            redirectUri: 'http://localhost:3000/callback',
            scope: 'openid profile'
        });
    }
    Object.defineProperty(AuthService.prototype, "accessToken", {
        get: function () {
            return this._accessToken;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "idToken", {
        get: function () {
            return this._idToken;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "isAuthenticated", {
        get: function () {
            return new Date().getTime() < this._expiresAt;
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.login = function () {
        this.auth0.authorize();
    };
    AuthService.prototype.init = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.handleAuthentication().then(function () {
                var next = Promise.resolve(null);
                if (localStorage.getItem('isLoggedIn') === 'true') {
                    next = _this.renewTokens();
                }
                return next.then(function (userInfo) { return resolve(userInfo); });
            });
        });
    };
    AuthService.prototype.handleAuthentication = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.auth0.parseHash(function (err, authResult) {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    window.location.hash = '';
                    _this.localLogin(authResult);
                }
                else if (err) {
                    console.log(err);
                }
                _this.router.navigate(['/']);
                return resolve();
            });
        });
    };
    AuthService.prototype.renewTokens = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.auth0.checkSession({}, function (err, authResult) {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    return resolve(_this.localLogin(authResult));
                }
                else if (err) {
                    console.log("Could not get a new token (" + err.error + ": " + err.error_description + ").");
                    _this.logout();
                }
                return resolve(null);
            });
        });
    };
    AuthService.prototype.localLogin = function (authResult) {
        this._accessToken = authResult.accessToken;
        this._idToken = authResult.idToken;
        this._expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
        localStorage.setItem('isLoggedIn', 'true');
        return {
            name: authResult.idTokenPayload.name,
            id: this._idToken,
        };
    };
    AuthService.prototype.logout = function () {
        this._accessToken = '';
        this._idToken = '';
        this._expiresAt = 0;
        localStorage.removeItem('isLoggedIn');
        this.router.navigate(['/']);
    };
    AuthService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/brew-dialog/brew-dialog.component.html":
/*!********************************************************!*\
  !*** ./src/app/brew-dialog/brew-dialog.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"brew-dialog\">\n  <mat-form-field>\n    <input matInput placeholder=\"Brew Name\" [(ngModel)]=\"brewName\">\n  </mat-form-field>\n  <mat-form-field>\n    <input matInput placeholder=\"Recipe\">\n  </mat-form-field>\n  <div>\n    <button mat-raised-button color=\"primary\" (click)=\"close()\">Save</button>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/brew-dialog/brew-dialog.component.scss":
/*!********************************************************!*\
  !*** ./src/app/brew-dialog/brew-dialog.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#brew-dialog {\n  display: flex;\n  flex-direction: column; }\n  #brew-dialog * {\n    width: 100%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYnJldy1kaWFsb2cvQzpcXGRldlxcQnJld0tlZXBlcjJcXGNsaWVudC9zcmNcXGFwcFxcYnJldy1kaWFsb2dcXGJyZXctZGlhbG9nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBYTtFQUNiLHVCQUFzQixFQUt2QjtFQVBEO0lBS00sWUFBVyxFQUNkIiwiZmlsZSI6InNyYy9hcHAvYnJldy1kaWFsb2cvYnJldy1kaWFsb2cuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjYnJldy1kaWFsb2cge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHJcbiAgKiB7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/brew-dialog/brew-dialog.component.ts":
/*!******************************************************!*\
  !*** ./src/app/brew-dialog/brew-dialog.component.ts ***!
  \******************************************************/
/*! exports provided: BrewDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrewDialogComponent", function() { return BrewDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _brew_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../brew.service */ "./src/app/brew.service.ts");
/* harmony import */ var _dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dialog.service */ "./src/app/dialog.service.ts");





var BrewDialogComponent = /** @class */ (function () {
    function BrewDialogComponent(dialogRef, config, brewService) {
        this.dialogRef = dialogRef;
        this.config = config;
        this.brewService = brewService;
        this.mode = _dialog_service__WEBPACK_IMPORTED_MODULE_4__["DialogMode"].view;
        this.brewName = '';
    }
    BrewDialogComponent.prototype.ngOnInit = function () {
        this.mode = this.config.mode || _dialog_service__WEBPACK_IMPORTED_MODULE_4__["DialogMode"].view;
        var brewData = this.config.data || {};
        this.brewID = brewData.id || '';
        this.brewName = brewData.name || '';
    };
    BrewDialogComponent.prototype.close = function () {
        var _this = this;
        var next = Promise.resolve({ success: true });
        if (this.mode === _dialog_service__WEBPACK_IMPORTED_MODULE_4__["DialogMode"].new) {
            next = this.saveNewBrew(this.getBrewData());
        }
        else if (this.mode === _dialog_service__WEBPACK_IMPORTED_MODULE_4__["DialogMode"].edit) {
            next = this.updateBrew(this.getBrewData());
        }
        next.then(function (result) { return _this.dialogRef.close(result); });
    };
    BrewDialogComponent.prototype.getBrewData = function () {
        return {
            id: this.brewID,
            name: this.brewName,
        };
    };
    BrewDialogComponent.prototype.saveNewBrew = function (newBrew) {
        return this.brewService.create(newBrew).then(function (response) {
            return {
                success: response.success,
                message: response.success ? 'Brew saved' : response.message,
                data: response.data,
            };
        });
    };
    BrewDialogComponent.prototype.updateBrew = function (updatedBrew) {
        return this.brewService.update(updatedBrew).then(function (response) {
            return {
                success: response.success,
                message: response.success ? 'Brew saved' : response.message,
                data: response.data,
            };
        });
    };
    BrewDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-brew-dialog',
            template: __webpack_require__(/*! ./brew-dialog.component.html */ "./src/app/brew-dialog/brew-dialog.component.html"),
            styles: [__webpack_require__(/*! ./brew-dialog.component.scss */ "./src/app/brew-dialog/brew-dialog.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object, _brew_service__WEBPACK_IMPORTED_MODULE_3__["BrewService"]])
    ], BrewDialogComponent);
    return BrewDialogComponent;
}());



/***/ }),

/***/ "./src/app/brew-list/brew-list.component.html":
/*!****************************************************!*\
  !*** ./src/app/brew-list/brew-list.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button mat-fab class=\"add-brew\" (click)=\"addBrew($event)\">+</button>\r\n<app-list [collection]=\"brews\" (itemSelected)=\"viewBrew($event)\"></app-list>"

/***/ }),

/***/ "./src/app/brew-list/brew-list.component.scss":
/*!****************************************************!*\
  !*** ./src/app/brew-list/brew-list.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".add-brew {\n  right: 30px;\n  margin-top: 10px;\n  position: absolute;\n  z-index: 10; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYnJldy1saXN0L0M6XFxkZXZcXEJyZXdLZWVwZXIyXFxjbGllbnQvc3JjXFxhcHBcXGJyZXctbGlzdFxcYnJldy1saXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBVztFQUNYLGlCQUFnQjtFQUNoQixtQkFBa0I7RUFDbEIsWUFBVyxFQUNkIiwiZmlsZSI6InNyYy9hcHAvYnJldy1saXN0L2JyZXctbGlzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hZGQtYnJldyB7XHJcbiAgICByaWdodDogMzBweDtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB6LWluZGV4OiAxMDtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/brew-list/brew-list.component.ts":
/*!**************************************************!*\
  !*** ./src/app/brew-list/brew-list.component.ts ***!
  \**************************************************/
/*! exports provided: BrewListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrewListComponent", function() { return BrewListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _brew_dialog_brew_dialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../brew-dialog/brew-dialog.component */ "./src/app/brew-dialog/brew-dialog.component.ts");
/* harmony import */ var _brew_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../brew.service */ "./src/app/brew.service.ts");
/* harmony import */ var _dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../dialog.service */ "./src/app/dialog.service.ts");






var BrewListComponent = /** @class */ (function () {
    function BrewListComponent(snackBar, dialogService, brewService) {
        this.snackBar = snackBar;
        this.dialogService = dialogService;
        this.brewService = brewService;
    }
    BrewListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.brews = [];
        // TODO: test code, replace w/ retrieval of brew list
        this.brews.push({ id: '123', name: 'IPA' });
        this.brews.push({ id: '456', name: 'Porter' });
        this.brewService.get('24680').then(function (response) {
            if (response.success) {
                var brew = response.data;
                _this.brews.push({ id: '24680', name: brew.name || 'No Name' });
            }
            else {
                _this.handleServiceError(response.message);
            }
        });
    };
    BrewListComponent.prototype.addBrew = function (event) {
        var _this = this;
        this.popBrewDialog(_dialog_service__WEBPACK_IMPORTED_MODULE_5__["DialogMode"].new).then(function (result) {
            if (result.success && result.message) {
                _this.addBrewListItem(result.data);
                _this.snackBar.open(result.message, 'Success');
            }
        });
    };
    BrewListComponent.prototype.addBrewListItem = function (newData) {
        this.brews.push({ id: newData.id, name: newData.name });
    };
    BrewListComponent.prototype.viewBrew = function (brewID) {
        var _this = this;
        // TODO: open in 'view' mode, then let dialog change itself to 'edit'
        this.popBrewDialog(_dialog_service__WEBPACK_IMPORTED_MODULE_5__["DialogMode"].edit, brewID).then(function (result) {
            if (result.success && result.message) {
                _this.updateBrewListItem(result.data);
                _this.snackBar.open(result.message, 'Success');
            }
        });
    };
    BrewListComponent.prototype.updateBrewListItem = function (newData) {
        var updatedBrew = this.brews.find(function (brew) { return brew.id === newData.id; });
        updatedBrew.name = newData.name;
    };
    BrewListComponent.prototype.popBrewDialog = function (mode, brewID) {
        var _this = this;
        var brew = null;
        if (brewID) {
            brew = this.brews.find(function (brew) { return brew.id === brewID; });
        }
        var config = {
            mode: mode,
            data: brew,
        };
        return this.dialogService.popDialog(_brew_dialog_brew_dialog_component__WEBPACK_IMPORTED_MODULE_3__["BrewDialogComponent"], config)
            .then(function (result) {
            if (!result.success) {
                _this.handleServiceError(result.message);
            }
            return Promise.resolve(result);
        });
    };
    BrewListComponent.prototype.handleServiceError = function (internalMessage) {
        this.snackBar.open("Something went wrong... " + (internalMessage || ''), 'Error', {
            duration: 5000,
        });
    };
    BrewListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-brew-list',
            template: __webpack_require__(/*! ./brew-list.component.html */ "./src/app/brew-list/brew-list.component.html"),
            styles: [__webpack_require__(/*! ./brew-list.component.scss */ "./src/app/brew-list/brew-list.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"],
            _dialog_service__WEBPACK_IMPORTED_MODULE_5__["DialogService"],
            _brew_service__WEBPACK_IMPORTED_MODULE_4__["BrewService"]])
    ], BrewListComponent);
    return BrewListComponent;
}());



/***/ }),

/***/ "./src/app/brew.service.ts":
/*!*********************************!*\
  !*** ./src/app/brew.service.ts ***!
  \*********************************/
/*! exports provided: BrewService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrewService", function() { return BrewService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var BrewService = /** @class */ (function () {
    function BrewService(http) {
        this.http = http;
    }
    BrewService.prototype.create = function (brew) {
        var _this = this;
        return this.http.post("http://localhost:3000/api/brew", brew).toPromise()
            .then(function (response) { return response; })
            .catch(function (error) {
            return Promise.resolve(_this.buildFailedResponse(error));
        });
    };
    BrewService.prototype.update = function (brew) {
        var _this = this;
        return this.http.post("http://localhost:3000/api/brew/" + brew.id, brew).toPromise()
            .then(function (response) { return response; })
            .catch(function (error) {
            return Promise.resolve(_this.buildFailedResponse(error));
        });
    };
    BrewService.prototype.get = function (brewID) {
        var _this = this;
        return this.http.get("http://localhost:3000/api/brew?id=" + brewID).toPromise()
            .then(function (response) { return response; })
            .catch(function (error) {
            return Promise.resolve(_this.buildFailedResponse(error.message));
        });
    };
    BrewService.prototype.buildFailedResponse = function (error) {
        var message = error.message ? error.message : error;
        return {
            success: false,
            message: "Service error: " + (message || ''),
        };
    };
    BrewService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], BrewService);
    return BrewService;
}());



/***/ }),

/***/ "./src/app/dialog.service.ts":
/*!***********************************!*\
  !*** ./src/app/dialog.service.ts ***!
  \***********************************/
/*! exports provided: DialogMode, DialogService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogMode", function() { return DialogMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogService", function() { return DialogService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");



var DialogMode;
(function (DialogMode) {
    DialogMode["edit"] = "edit";
    DialogMode["new"] = "new";
    DialogMode["view"] = "view";
})(DialogMode || (DialogMode = {}));
var DialogService = /** @class */ (function () {
    function DialogService(dialog) {
        this.dialog = dialog;
    }
    DialogService.prototype.popDialog = function (componentType, config) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dialog.open(componentType, {
                width: '350px',
                data: config,
            })
                .afterClosed()
                .subscribe(function (result) { return resolve(result); });
        });
    };
    DialogService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
    ], DialogService);
    return DialogService;
}());



/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-spinner *ngIf=\"!ready\"></mat-spinner>\n<div id=\"home\" *ngIf=\"ready\">\n  <div class=\"welcome\" *ngIf=\"authService.isAuthenticated\">\n    <h3>Welcome, {{userName}}</h3>\n    <p>Message text/active brew summary here</p>\n  </div>\n\n  <div class=\"welcome\" *ngIf=\"!authService.isAuthenticated\">\n    <h3>Welcome to Brew Keeper</h3>\n    <p>Please log in.</p>\n    <button mat-raised-button color=\"primary\" (click)=\"authService.login()\">Log In</button>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/home/home.component.scss":
/*!******************************************!*\
  !*** ./src/app/home/home.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#home {\n  padding: 0 20px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9DOlxcZGV2XFxCcmV3S2VlcGVyMlxcY2xpZW50L3NyY1xcYXBwXFxob21lXFxob21lLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZ0JBQWUsRUFDbEIiLCJmaWxlIjoic3JjL2FwcC9ob21lL2hvbWUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjaG9tZSB7XHJcbiAgICBwYWRkaW5nOiAwIDIwcHg7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth.service */ "./src/app/auth.service.ts");



var HomeComponent = /** @class */ (function () {
    function HomeComponent(authService) {
        this.authService = authService;
        this._ready = false;
        this._userInfo = null;
    }
    Object.defineProperty(HomeComponent.prototype, "ready", {
        get: function () {
            return this._ready;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeComponent.prototype, "userName", {
        get: function () {
            return this._userInfo ? this._userInfo.name : '';
        },
        enumerable: true,
        configurable: true
    });
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.init().then(function (userInfo) {
            _this._userInfo = userInfo;
            _this._ready = true;
        });
    };
    HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.scss */ "./src/app/home/home.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/list/list.component.html":
/*!******************************************!*\
  !*** ./src/app/list/list.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-list>\r\n  <mat-list-item *ngFor=\"let item of collection\" (click)=\"itemSelected(item.id);\">\r\n      <h3 matLine>{{item.name}}</h3>\r\n      <p matLine>Brew date</p>\r\n      <mat-divider></mat-divider>\r\n  </mat-list-item>\r\n</mat-list>"

/***/ }),

/***/ "./src/app/list/list.component.scss":
/*!******************************************!*\
  !*** ./src/app/list/list.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".list-item {\n  width: 100%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGlzdC9DOlxcZGV2XFxCcmV3S2VlcGVyMlxcY2xpZW50L3NyY1xcYXBwXFxsaXN0XFxsaXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBVyxFQUNkIiwiZmlsZSI6InNyYy9hcHAvbGlzdC9saXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxpc3QtaXRlbSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/list/list.component.ts":
/*!****************************************!*\
  !*** ./src/app/list/list.component.ts ***!
  \****************************************/
/*! exports provided: ListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListComponent", function() { return ListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ListComponent = /** @class */ (function () {
    function ListComponent() {
        this.collection = [];
        this.itemSelectedEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    ListComponent.prototype.ngOnInit = function () {
    };
    ListComponent.prototype.itemSelected = function (itemID) {
        this.itemSelectedEvent.emit(itemID);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], ListComponent.prototype, "collection", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])('itemSelected'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ListComponent.prototype, "itemSelectedEvent", void 0);
    ListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-list',
            template: __webpack_require__(/*! ./list.component.html */ "./src/app/list/list.component.html"),
            styles: [__webpack_require__(/*! ./list.component.scss */ "./src/app/list/list.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ListComponent);
    return ListComponent;
}());



/***/ }),

/***/ "./src/app/nav/nav.component.html":
/*!****************************************!*\
  !*** ./src/app/nav/nav.component.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-nav-list>\n  <a mat-list-item routerLink=\"\">Home</a>\n  <a mat-list-item routerLink=\"brews\" *ngIf=\"authService.isAuthenticated\" >Brews</a>\n  <mat-divider *ngIf=\"authService.isAuthenticated\"></mat-divider>\n  <a mat-list-item (click)=\"authService.logout()\" *ngIf=\"authService.isAuthenticated\">Log Out</a>\n</mat-nav-list>"

/***/ }),

/***/ "./src/app/nav/nav.component.scss":
/*!****************************************!*\
  !*** ./src/app/nav/nav.component.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL25hdi9uYXYuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/nav/nav.component.ts":
/*!**************************************!*\
  !*** ./src/app/nav/nav.component.ts ***!
  \**************************************/
/*! exports provided: NavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavComponent", function() { return NavComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../auth.service */ "./src/app/auth.service.ts");



var NavComponent = /** @class */ (function () {
    function NavComponent(authService) {
        this.authService = authService;
    }
    NavComponent.prototype.ngOnInit = function () {
    };
    NavComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-nav',
            template: __webpack_require__(/*! ./nav.component.html */ "./src/app/nav/nav.component.html"),
            styles: [__webpack_require__(/*! ./nav.component.scss */ "./src/app/nav/nav.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], NavComponent);
    return NavComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\dev\BrewKeeper2\client\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map