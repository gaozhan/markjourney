(function(){
    var login = (function(){
        return {
            init: function(){
                //新浪微博
                WB2.anyWhere(function (W) {
                    W.widget.connectButton({
                        id: "wb_connect_btn",
                        type: '3,2',
                        callback: {
                            login: function (o) { //登录后的回调函数
                                alert("login: " + o.screen_name)
                            },
                            logout: function () { //退出后的回调函数
                                alert('logout');
                            }
                        }
                    });
                });
                function login(data){
                    console.log(data);
                }
                function logout(data){
                    console.log(data);
                }
            }
        }
    })();

    setTimeout(function(){
        $(login).trigger('finish');

    },2000);


    window.MJ = window.MJ || {};
    window.MJ.login = login;

})();