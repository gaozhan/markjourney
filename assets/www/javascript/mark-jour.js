/**
 * @fileOverview 负责旅途的"记录"部分的功能
 *               主要包括: 开始旅途，输入旅途名称，旅途过程中的拍照，录音，文字以及相应的数据存储。
 * @author shiba<shiba@taobao.com>
 *
 */
;
(function () {
    var state = 0;

    var markJour = (function () {
        var map;
        var jours = [];
        var onej = {};

        function initEmptyJour(){
            onej = {
                name:"",
                point:[

                ]
            };
        }

        var positionArr = [];

        var fail = function () {
            alert('失败了，我也没办法!');
        };

        /**
         * 把一个图片标记在地图上
         * @param imgSrc
         * @param position
         */
        function markImg(imgSrc, position) {
            if(onej.name === undefined){
                initEmptyJour();
            }
            onej.point.push({
                imgs:imgSrc,
                position:position
            });
            var marker = new google.maps.Marker({
                position:position,
                map:map
            });
            var content = '<div style="text-align: center;"><img style="margin:0 auto;width:140px;" src="' + imgSrc + '"/></div>';
            attachInfowindow(marker, content);
        }

        function attachInfowindow(marker, content) {
            var infowindow = new google.maps.InfoWindow({
                content:content
            });
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });
        }


        /**
         * 初始化地图，返回地图实例
         */
        function initMap() {
            return map = new google.maps.Map(document.getElementById('map_canvas'), {
                center: new google.maps.LatLng(30.1114111, 120),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                panControl: false,
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                overviewMapControl: false
            });
        }

        function initOptEvent() {
            var state = {jouring:0};

            /**
             * 处理开始旅途，输入名称逻辑
             */
            $('#start-jour').click(function (e) {
                if (state.jouring == 1) {//旅途中
                    $('#start-jour').find('.ui-btn-text').text('开始旅途');
                    //结束旅途了
                    e.preventDefault();
                    setTimeout(function () {
                        $('#start-jour').attr('href', '#insureJourName');
                    }, 10);
                    jours.push(onej);
                    localStorage.setItem("jourlist", JSON.stringify(jours));
                    onej = [];
                } else {//没开始旅途

                }
            });
            $('#M_SaveName').click(function (e) {
                state.jouring = 1;
                $('#start-jour').find('.ui-btn-text').text('结束');
                $('#mark-jour .ui-title').text($('#M_un').val());
                $('#start-jour').attr('href', '');
                e.preventDefault();
                goJour();
            });

            //页面状态和地图状态维护
            $('#page-go-photo').live("pagebeforehide", function (e, ui) {
                $('#map_canvas').css({visibility: "visible"});
            });
            $('#page-go-photo').live("pageshow", function (e, ui) {
                $('#map_canvas').css({visibility: "hidden"});
            });

            /**
             * 拍照
             */
            $('#MJ_GoPhoto').click(function (e) {
                // 使用设备上的摄像头拍照，并获得Base64编码字符串格式的图像
                navigator.camera.getPicture(function (imgUrl) {
                    markImg(imgUrl, positionArr[positionArr.length - 1]);
                }, fail, {
                    quality: 50,
                    destinationType: 1,
                    sourceType: 1
                });
            });

            $('#MJ_GoPhoLib').click(function (e) {
                //当成功得到一张照片的URI后被调用
                navigator.camera.getPicture(function (imgUrl) {
                    markImg(imgUrl, positionArr[positionArr.length - 1]);
                }, fail, {
                    quality: 50,
                    destinationType: 1,
                    sourceType: 0
                });
            });

            function guid(){
                return +new Date().getTime();
            }

            var src, mediaRec;
            $('#go-voice').live('vmousedown',function(){
                src = guid()+".mp3";
                mediaRec = new Media(src, function () {
                    console.log(111);
                }, function () {
                    console.log(222);
                },function(){
                    if(arguments[0] === 4){

                    }
                });
                mediaRec.startRecord();
            }).live('vmouseup', function(){
                mediaRec.stopRecord();
            });

            function goJour(){

//            navigator.geolocation.getCurrentPosition(function (position) {
                //获取当前起点坐标
                var startLat = new google.maps.LatLng(20,30);
                positionArr.push(startLat);
                var marker = new google.maps.Marker({
                    position:startLat,
                    map:map
                });

                //初始化画路线工具
                var options = { frequency:6000 }, polyOptions, poly;
                polyOptions = {
                    strokeColor:'black',
                    strokeOpacity:1.0,
                    strokeWeight:1.5
                };
                poly = new google.maps.Polyline(polyOptions);
                poly.setMap(map);

                addLatLng(startLat);

                function addLatLng(latLng) {
                    var path = poly.getPath();
                    path.push(latLng);
                    map.setCenter(latLng);
                }


                //在web 页面 模拟一下多个路径的情况 -------------------------------------
                function emulatePosition() {
                    if (emulatePosition.p) {
                        emulatePosition.p.x -= Math.random() * 0.001;
                        emulatePosition.p.y -= Math.random() * 0.003;

                    } else {
                        emulatePosition.p = {
                            x:positionArr[0].lat(),
                            y:positionArr[0].lng()
                        }
                    }
                    var newLat = new google.maps.LatLng(emulatePosition.p.x, emulatePosition.p.y);
                    positionArr.push(newLat);
                    addLatLng(newLat);

                    markImg('http://img02.taobaocdn.com/tps/i2/T1qeTeXiBxXXaokqjm-70-40.gif?t='+guid(),newLat)

                    setTimeout(function () {
                        emulatePosition();
                    }, options.frequency);
                }

                emulatePosition();
//            }, function(msg){
//                alert(msg);
//            });

            }
        }

        return {
            init: function () {
                if(state === 1){return;}
                initMap();
                initOptEvent();
                state = 1;
            }
        }
    })();

    window.MJ = window.MJ || {};
    window.MJ.markJour = markJour;

})();