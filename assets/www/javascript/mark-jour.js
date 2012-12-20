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
            $('#go-pic').click(function(e){

            });
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