!function(){"use strict";function t(t,e,n){function o(){return r.readyState>3?200===r.status?s(r.responseText):c(r.responseText):null}var s="function"==typeof e?e:function(){},c="function"==typeof n?n:function(){},r=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");return r.open("GET",t),r.onreadystatechange=o,r.setRequestHeader("X-Requested-With","XMLHttpRequest"),r.send(),r}function e(t,e){t&&"undefined"!=typeof t.innerHTML&&(t.innerHTML=e)}var n=Math.round((new Date).getTime()/1e3),o=document.querySelector("span#vc_count");o&&t("/vc_counter.php?client_date="+n,function(t){console.log(t);var n="";e(o,n)});var s=document.querySelector("p#files-top-statspage");s&&t("/dl_statistics_display.php?sortBy=counter&sortOrder=DESC&list_type=top&top-max=10&output_type=json",function(t){var n=JSON.parse(t),o='<ul class="noDot">';n.forEach(function(t){var e='<span class="sp-tops-title">';e+='<a href="/dl_statistics_counter.php?DL_URL='+t.url_encoded+'">',e+=decodeURIComponent(t.filename_encoded),e+="</a>",e+="</span>",e+="<br>",e+='<span class="sp-tops-count">&nbsp;&nbsp;'+t.counter+" ",e+="download"+(1===parseInt(t.counter,10)?"":"s")+"</span>",o+="<li>"+e+"</li>"}),o+="</ul>",e(s,o)})}();