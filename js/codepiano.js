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
/* 页面加载后执行 */
!function ($) {
  $(function(){
    /* 初始化dataTable */
    if($('#post-data')[0]){
      $('#post-data').dataTable(datatablesConfig);
    }
    /* 初始化tooltip */
    if($('#support a')[0]){
      $('#support a').tooltip(tooltipConfig);
    }

    /* 目录页导航 */
    var url = window.location.href;
    if(url.indexOf('categories.html') > -1){
      $('#categories-nav a').click(function (e){
        $(this).tab('show');
      })

      /* 自动打开链接中的锚点 */
      var matches = url.match(/categories\.html(#.*)/);
      if(matches){
        $('#categories-nav a[href="' + matches[1] + '"]').tab('show');
      }else{
        $('#categories-nav a:first').tab('show');
      }
    } 
  });
}(window.jQuery);

/* 切换技术支持列表的样式 */
function toggleSupport(){
  $('#support').toggleClass('dispear').toggleClass('show');
  return false;
}

/* datatables设置 */
datatablesConfig = {
  "aaSorting": [[ 0, "desc" ],[ 1, "asc" ],[ 2, "asc" ]],
  "sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
  "sWrapper": "dataTables_wrapper form-inline",
  "sPaginationType": "bootstrap",
  "oLanguage":{
    "sProcessing":   "处理中...",
    "sLengthMenu":   "显示 _MENU_ 篇文章",
    "sZeroRecords":  "没有匹配文章",
    "sInfo":         "显示第 _START_ 至 _END_ 篇文章，共 _TOTAL_ 篇",
    "sInfoEmpty":    "显示第 0 至 0 篇文章，共 0 项",
    "sInfoFiltered": "(由 _MAX_ 篇文章过滤)",
    "sInfoPostFix":  "",
    "sSearch":       "检索:",
    "sUrl":          "",
    "oPaginate": {
      "sFirst":    "首页",
      "sPrevious": "上页",
      "sNext":     "下页",
      "sLast":     "末页"
    }
  }
}

/* tooltip设置 */
tooltipConfig = {
  "placement": "right",
  "delay": { show: 200, hide: 100 }
}
