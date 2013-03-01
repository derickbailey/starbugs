(function (authorization) {
    var el = new Everlive('Vvow4z7IQcyWmoU3');
    
    authorization._token = {};
    authorization._user = null;
    authorization._logged = false;
    
    
    
    authorization._getToken = function () {        
        return authorization._token.access_token;
    };
    
    authorization._getTokenType = function () {
        return authorization._token.token_type;
    };
    
    authorization.setToken = function (tokenServerData) {
        authorization._logged = true;
        authorization._token = tokenServerData;
        window.localStorage.setItem('auth_token', JSON.stringify(tokenServerData));
    };
    
    authorization.getAuthString = function () {
        if (!authorization._getToken()) {
            return null;
        } else {
            return authorization._getTokenType() + " " + authorization._getToken();
        }
    };
    
    authorization.logout = function () {
        authorization._logged = false;
    }
    ;
    authorization.logged = function () {
        return authorization._logged;
    };
    
    authorization.getUserId = function () {
        return this._user.Id;
    };

    authorization.setUser = function (user) {
        if (!(this._user)) {
            this._user = user;
            return true;
        } else {
            this._user = user;
        }
        return false;
    };

    authorization.getUser = function () {
        
        
        return this._user;;
    };
    
    authorization.login = function() {
        var username = document.getElementById('txtName').value;
        var password = document.getElementById('txtPassword').value;
        
        
        
        Everlive.$.Users.login(username, password, 
                                function (data) {
                                    //alert(JSON.stringify(data));
                                    authorization.setToken(data);
                                    location.href = 'App.html';
                                },
                                function(error){
                                    alert(JSON.stringify(error));
                                }
                );        
    };
    authorization.init = function(){
        
        //try to set the auth. token here
        var token = window.localStorage.getItem('auth_token');
        if(token) {            
            token = JSON.parse(token);
            debugger;
            authorization._token = token;
            Everlive.$.setup.token = token;
            console.log('authorization token found');
        }
        else {
            console.log('no authorization token');
        }
            
    };
    
    authorization.init();
    
    window.auth = authorization;    
})(window.auth = window.auth || {});