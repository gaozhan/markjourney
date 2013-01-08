/**
 * @fileOverview 负责旅途的"记录"部分的功能
 *               主要包括: 开始旅途，输入旅途名称，旅途过程中的拍照，录音，文字以及相应的数据存储。
 * @author shiba<shiba@taobao.com>
 *
 */
;
(function () {
    var markJour = (function () {
        var map;
        var positionArr = [];

        var fail = function(){
            alert('失败了，我也没办法!');
        };

        /**
         * 初始化地图，返回地图实例
         */
        function initMap() {
            return map = new google.maps.Map(document.getElementById('map_canvas'), {
                center:new google.maps.LatLng(30.1114111, 120),
                zoom:15,
                mapTypeId:google.maps.MapTypeId.ROADMAP,
                panControl:false,
                zoomControl:true,
                mapTypeControl:false,
                scaleControl:false,
                streetViewControl:false,
                overviewMapControl:false
            });
        }

        function initOptEvent() {
            var state = {};

            /**
             * 处理开始旅途，输入名称逻辑
             */
            $('#start-jour').click(function (e) {
                if (state.jouring == 1) {//旅途中
                    //结束旅途了
                    e.preventDefault();
                    setTimeout(function(){
                        $('#start-jour').attr('href', '#insureJourName');
                    },10);
                } else {//没开始旅途
                    state.jouring = 0;
                }
            });
            $('#M_SaveName').click(function (e) {
                state.jouring = 1;
                $('#start-jour').find('.ui-btn-text').text('结束');
                $('#mark-jour .ui-title').text($('#M_un').val());
                $('#start-jour').attr('href', '');
                e.preventDefault();
            });


            //页面状态和地图状态维护
            $('#page-go-photo').live("pagebeforehide", function (e, ui) {
                $('#map_canvas').css({visibility:"visible"});
            });
            $('#page-go-photo').live("pageshow", function (e, ui) {
                $('#map_canvas').css({visibility:"hidden"});
            });

            /**
             * 拍照
             */
            $('#MJ_GoPhoto').click(function (e) {
                // 使用设备上的摄像头拍照，并获得Base64编码字符串格式的图像
                navigator.camera.getPicture(function (imgUrl) {
//                    navigator.notification.vibrate(100);
                }, fail, {
                    quality:50,
                    destinationType:1,
                    sourceType:1
                });
            });

            $('#MJ_GoPhoLib').click(function (e) {
                //当成功得到一张照片的URI后被调用
                navigator.camera.getPicture(function (imgUrl) {
                }, fail, {
                    quality:50,
                    destinationType:1,
                    sourceType:0
                });
            });

            var mediaRec ;
            $('#go-voice').click(function(e){
                var src = "test3.mp3";
                mediaRec = new Media(src, this.success, this.error);
                mediaRec.startRecord();
            })
        }


        return {
            init:function () {
                console.log(1122);
                initMap();
                initOptEvent();
            }
        }
    })();

    window.MJ = window.MJ || {};
    window.MJ.markJour = markJour;

})();