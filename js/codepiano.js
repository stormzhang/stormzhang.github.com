/* =============================================================================
#     FileName: codepiano.js
#         Desc: javascript for blog
#       Author: codepiano
#        Email: anyexingchen999@qq.com
#     HomePage: http://www.weibo.com/anyexingchen
#      Version: 0.0.1
#   LastChange: 2013-05-12 01:39:30
#      History:
============================================================================= */

function showSupport(){
  $('#support li').map(function(index,element){
    var wrapObj = $(element);
    wrapObj.css('display','block');
    $('a', wrapObj).css('border-color','#DDDDDD').css('color','#BF008F');
    ;
  });
  return false;
}
