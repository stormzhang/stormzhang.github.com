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
