function initOtherTrip(){
    var myScroll,
        pullDownEl, pullDownOffset,
        pullUpEl, pullUpOffset,
        generatedCount = 0;
    function pullDownAction () {
        setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
//            var el, li, i;
//            el = document.getElementById('thelist');
//
//            for (i=0; i<3; i++) {
//                li = document.createElement('li');
//                li.innerText = 'Generated row ' + (++generatedCount);
//                el.insertBefore(li, el.childNodes[0]);
//            }
//
//            myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
            $.getJSON('http://106.187.55.160:65244/json/get_tour_detail/1/1?callback=?', null, function(data) {
                if(data.code=="0"){
                    var addcontent='<li><a href="#">'+
                        '<img src="image/album-bb.jpg" />'+
                        '<h3>'+data.trip_name+'</h3>'+
                        '<p>'+data.trip_create_date+'</p>'+
                        '<p><span class="routeto">'+data.route_list.length+'</span><span class="photos">'+data.route_list.length+'</span><span class="records">'+data.route_list.length+'</span></p>'+
                        '</a></li>';
//            var trip=[{"user_id":1,"trip_id":1,"user_name":"\u6d4b\u8bd5\u7528\u62371","trip_create_date":"2012-12-23 13:11:11","trip_name":"\u6d4b\u8bd5\u65c5\u90141","trip_begin_date":"2012-12-19 13:11:11","trip_end_date":"2012-12-20 13:11:11","route_count":20,"photo_count":20,"sound_count":20},{"user_id":2,"trip_id":2,"user_name":"\u6d4b\u8bd5\u7528\u62372","trip_create_date":"2012-12-23 13:11:11","trip_name":"\u6d4b\u8bd5\u65c5\u90142","trip_begin_date":"2012-12-19 13:11:11","trip_end_date":"2012-12-20 13:11:11","route_count":20,"photo_count":20,"sound_count":20},{"user_id":3,"trip_id":3,"user_name":"\u6d4b\u8bd5\u7528\u62373","trip_create_date":"2012-12-23 13:11:11","trip_name":"\u6d4b\u8bd5\u65c5\u90143","trip_begin_date":"2012-12-19 13:11:11","trip_end_date":"2012-12-20 13:11:11","route_count":20,"photo_count":20,"sound_count":20},{"user_id":4,"trip_id":4,"user_name":"\u6d4b\u8bd5\u7528\u62374","trip_create_date":"2012-12-23 13:11:11","trip_name":"\u6d4b\u8bd5\u65c5\u90144","trip_begin_date":"2012-12-19 13:11:11","trip_end_date":"2012-12-20 13:11:11","route_count":20,"photo_count":20,"sound_count":20}];
                    $('.listviewul').append(addcontent);
                    $("#thepage").page();
                    $(".listviewul").listview('refresh');
                }
            });
        }, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
    }
    function pullUpAction () {
        setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
            var el, li, i;
            el = document.getElementById('thelist');

            for (i=0; i<3; i++) {
                li = document.createElement('li');
                li.innerText = 'Generated row ' + (++generatedCount);
                el.appendChild(li, el.childNodes[0]);
            }

            myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
        }, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
    }
    function loaded() {
//        pullDownEl = document.getElementById('pullDown');
//        pullDownOffset = pullDownEl.offsetHeight;
        pullUpEl = document.getElementById('pullUp');
        pullUpOffset = pullUpEl.offsetHeight;

        myScroll = new iScroll('wrapper', {
            useTransition: true,
//            topOffset: pullDownOffset,
            onRefresh: function () {
//                if (pullDownEl.className.match('loading')) {
//                    pullDownEl.className = '';
//                    pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
//                } else
                if (pullUpEl.className.match('loading')) {
                    pullUpEl.className = '';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
                }
            },
            onScrollMove: function () {
//                if (this.y > 5 && !pullDownEl.className.match('flip')) {
//                    pullDownEl.className = 'flip';
//                    pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
//                    this.minScrollY = 0;
//                } else if (this.y < 5 && pullDownEl.className.match('flip')) {
//                    pullDownEl.className = '';
//                    pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
//                    this.minScrollY = -pullDownOffset;
//                } else
                if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'flip';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
                    this.maxScrollY = this.maxScrollY;
                } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                    pullUpEl.className = '';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
                    this.maxScrollY = pullUpOffset;
                }
            },
            onScrollEnd: function () {
//                if (pullDownEl.className.match('flip')) {
//                    pullDownEl.className = 'loading';
//                    pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
//                    pullDownAction();	// Execute custom function (ajax call?)
//                } else if (pullUpEl.className.match('flip')) {
//                    pullUpEl.className = 'loading';
//                    pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';
//                    pullUpAction();	// Execute custom function (ajax call?)
//                }
                pullDownAction();	// Execute custom function (ajax call?)
            }
        });
        setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
    }
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
}
