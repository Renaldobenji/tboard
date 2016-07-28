; (function (window) {

    'use strict';

    function Tboard() {        
        this._init();
    }

    /**
     * SimpleAlert _init
     *
     * This is the initializer function. It builds the HTML and gets the alert
     * ready for showing.
     *
     * @type {HTMLElement} this.sa - The Simple Alert div
     * @param {string} strinner - The inner HTML for our alert
     */
    Tboard.prototype._init = function () {
        // create element
        this.message = "testing";
    };

    /**
     * SimpleAlert show
     *
     * This function simply shows our Simple Alert by appending it
     * to the wrapper in question.
     */
    Tboard.prototype.show = function () {
        alert(this.message);
    };

    window.Tboard = Tboard;

})(window);

; (function (window) {

    'use strict';

    function TboardJWTToken() {
        this._init();
    }

    /**
     * SimpleAlert _init
     *
     * This is the initializer function. It builds the HTML and gets the alert
     * ready for showing.
     *
     * @type {HTMLElement} this.sa - The Simple Alert div
     * @param {string} strinner - The inner HTML for our alert
     */
    TboardJWTToken.prototype._init = function () {
        // create element        
    };

    /**
     * SimpleAlert show
     *
     * This function simply shows our Simple Alert by appending it
     * to the wrapper in question.
     */
    TboardJWTToken.prototype.store = function (jwtToken) {
        createCookie("jwtToken", jwtToken,1);
    };

    TboardJWTToken.prototype.IsLoggedIn = function () {
        var token = this.getJWTToken();

        var params = window.location.hash.replace("#", '').replace("/",'-');        

        if (token == null) {
            if (params != "")
            {
                routie('login/' + params);
                return false;}
            else
                return false;            
        }
            
        return true;
    };

    TboardJWTToken.prototype.logout = function () {
        eraseCookie('jwtToken');
    };

    TboardJWTToken.prototype.getJWTToken = function () {
        var value = readCookie("jwtToken");
        if (value == null)
            return null;

        var decoded = jwt_decode(value);

        return decoded;
    };

    TboardJWTToken.prototype.getJWTTokenRAW = function () {
        var value = readCookie("jwtToken");
        if (value == null)
            return null;

        return value;
    };

    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        createCookie(name, "", -1);
    }

    window.TboardJWTToken = TboardJWTToken;

})(window);