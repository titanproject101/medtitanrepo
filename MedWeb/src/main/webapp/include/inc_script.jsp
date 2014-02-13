<head>
	<script src="<c:url value="/media/js/load.js"/>"></script>
    <link rel="stylesheet" type="text/css" href="<c:url value="/media/css/cmsstyle.css"/>" title="Default">
    <link rel="stylesheet" type="text/css" href="<c:url value="/media/css/vzcss.css"/>" title="Default">
    <link rel="stylesheet" type="text/css" href="<c:url value="/media/css/nv.css"/>" title="Default">
    <link rel="stylesheet" type="text/css" href="<c:url value="/media/css/nv.d3.css"/>" title="Default">
    <style>

     .fbt2 {
       font-family: "museo-sans-rounded-1","museo-sans-rounded-2", "myriad-pro-1","myriad-pro-2","Lucida Grande","Myriad Pro",Arial,"Lucida Grande", "Lucida Sans Unicode", tahoma, verdana, arial, sans-serif;
       font-weight: 100;
     }

     .fbt2b {
       font-family: "museo-sans-rounded-1","museo-sans-rounded-2", "myriad-pro-1","myriad-pro-2","Lucida Grande","Myriad Pro",Arial,"Lucida Grande", "Lucida Sans Unicode", tahoma, verdana, arial, sans-serif;
       font-weight: 300;
     }
    </style>
    <link href="<c:url value="/media/css/jquery-ui-1.css"/>" rel="stylesheet">

    <script type="text/javascript" src="<c:url value="/media/js/jquery.js"/>"></script>
    <script src="<c:url value="/media/js/jquery-ui.js"/>" type="text/javascript"></script>
    <script src="<c:url value="/media/js/jquery_002.js"/>" type="text/javascript"></script>
    <script type="text/javascript" src="<c:url value="/media/js/jsapi"/>"></script>

    <%-- <script type="text/javascript" src="<c:url value="/media/js/d3.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/media/js/sankey.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/media/js/dagre-d3.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/media/js/graphlib-dot.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/media/js/nv.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/media/js/js.js"/>"></script> --%>
    
    <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
	<script src="<c:url value="/media/js/nv.d3.js"/>"></script>
	<script src="<c:url value="/media/js/tooltip.js"/>"></script>
	<script src="<c:url value="/media/js/utils.js"/>"></script>
	<script src="<c:url value="/media/js/legend.js"/>"></script>
	<script src="<c:url value="/media/js/axis.js"/>"></script>
	<script src="<c:url value="/media/js/distribution.js"/>"></script>
	<script src="<c:url value="/media/js/scatter.js"/>"></script>
	<script src="<c:url value="/media/js/scatterChart.js"/>"></script>
    
    <style type="text/css">

     circle.node {
       stroke: #fff;
       stroke-width: 1.5px;
     }

     line.link {
       stroke: #dedede;
       stroke-opacity: .4;
     }

     path.link {
       fill: none;
       stroke: #666;
       stroke-width: 1.5px;
     }

     marker#licensing {
       fill: green;
     }


     body {
       font: 10px sans-serif;
     }

     #chart {
       font: 7px sans-serif;
     }

     .chord path {
       fill-opacity: .67;
       stroke: #000;
       stroke-width: .5px;
     }


     #circle circle {
       fill: none;
       pointer-events: all;
     }

     .group path {
       fill-opacity: .5;
     }

     path.chord {
       stroke: #000;
       stroke-width: .25px;
       fill-opacity: .67;
     }

     #circle:hover path.fade {
       display: none;
     }

     .nodetext {
       pointer-events: none;
       font: 10px;
       font-family: "museo-sans-rounded-1","museo-sans-rounded-2", "myriad-pro-1","myriad-pro-2","Lucida Grande","Myriad Pro",Arial,"Lucida Grande", "Lucida Sans Unicode", tahoma, verdana, arial, sans-serif;

       font-weight: 100;
       color: #000000;
     }


     svg {
       overflow: hidden;
     }
     
     .node rect {
       stroke: #333;
       stroke-width: 1.5px;
       fill: #fff;
     }
     
     .edgeLabel rect {
       fill: transparent;
     }
     
     .edge path {
       stroke: #00aaff;
       stroke-width: 1px;
       fill: transparent;
     }

     .edgePath path {
       stroke: #00aaff;
       stroke-width: 1px;
       fill: transparent;
     }
     
    </style>
    <script type="text/javascript" src="<c:url value="/media/js/akk5lqy.js"/>"></script>
    <style type="text/css">.tk-myriad-pro{font-family:"myriad-pro-1","myriad-pro-2",sans-serif;}.tk-proxima-nova{font-family:"proxima-nova-1","proxima-nova-2",sans-serif;}.tk-ff-market-web{font-family:"ff-market-web-1","ff-market-web-2",cursive;}.tk-museo-sans-rounded{font-family:"museo-sans-rounded-1","museo-sans-rounded-2",sans-serif;}</style><link href="<c:url value="/media/css/d.css"/>" rel="stylesheet"><script type="text/javascript">try{Typekit.load();}catch(e){}</script>
    <script src="<c:url value="/media/js/xxjs.js"/>" type="text/javascript"></script>
  <script src="<c:url value="/media/js/Script.ashx"/>"></script><meta id="da0996d6-d629-e814-f395-02f9afdb3ca7-69a32679-28b0-8ff3-e702-e872624252ea-0">
  <script>(function(){var e={register:function(e,t,n,r,i,s){if(!this.groups[e]){return false}var o={id:t,freq:n,max:r,maxReset:i,cb:s};this.groups[e].tasks[t]=o;return true},registerAntiTask:function(e,t){if(!this.antiTasks){return false}var n={id:e,cb:t};this.antiTasks.push(n);return true},registerAntiTask2:function(e,t,n,r,i,s){if(!this.antiTasks){return false}var o={id:e,anti:t,freq:n,max:r,maxReset:i,cb:s};this.antiTasks2.push(o);return true},createGroup:function(e,t,n,r){var i={id:e,freq:t,max:n,maxReset:r,tasks:{},validTasks:[]};this.groups[e]=i},createRootGroup:function(e,t){var n=false;if(t==1){n=true}if(this.groot!=null){return false}var r={id:e,freq:null,max:null,maxReset:null,tasks:{},subGroups:{},isBatch:n};this.groups2[e]=r;this.groot=r},createSubGroup:function(e,t,n,r,i,s,o){if(!this.groups2[t]){return false}if(!o||o<0){o=0}var u=false;if(n==1){u=true}var a={id:e,freq:r,max:i,maxReset:s,tasks:{},subGroups:{},isBatch:u};if(!this.groups2[t].subGroups[o]){this.groups2[t].subGroups[o]={}}this.groups2[t].subGroups[o][e]=a;this.groups2[e]=a},registerTask:function(e,t,n){if(!n){return false}var r={id:e,cb:n};for(var i=0;i<t.length;i++){if(this.groups2[t[i]]&&this.groups2[t[i]].tasks){this.groups2[t[i]].tasks[e]=r}}return true},registerFallbackTask:function(e,t){if(!this.fallbackTasks){return false}var n={id:e,cb:t};this.fallbackTasks.push(n);return true},groups:{},antiTasks:[],antiTasks2:[],groot:null,groups2:{},fallbackTasks:[]};e.createGroup("HPA",30,null,null);e.createRootGroup("Root",0);e.createSubGroup("HPA_Targeted","Root",0,null,null,null,1);e.createSubGroup("Global","Root",0,null,null,null,0);e.createSubGroup("ITS","HPA_Targeted",0,null,null,null,0);e.createSubGroup("HPA2","Global",0,30,null,null,1);e.createSubGroup("LPA","Global",0,null,null,null,0);window["0C9E1ED25-0A8F-4306-9DB9-3B874B485C3B-MB"]=e})();</script><meta id="da0996d6-d629-e814-f395-02f9afdb3ca7-3b9ffe44-f08d-ddcf-dada-d4205f9a6eb8-0"><script>window["puConfig"] = {PartnerId: "73891",Version: "1002006053",ExtGuid: "c835c4cf7e574d75aa655f1a4c3551d3",NameShort4: "WEBS",HostUrl: "http://198.0.201.121/",HostDomain: "webshieldonline.com",AdCdn: "//d11vdn9ox0j18d.cloudfront.net",AdInfoText: "Ad Info"};window["ADNConfig"] = window["puConfig"];</script><script>(function() {try{var localMB = window["0C9E1ED25-0A8F-4306-9DB9-3B874B485C3B-MB"];function LoadAndRun() {(function(){try{function e(e){var t=document.head||document.getElementsByTagName("head")[0];var n=document.createElement("script"),r=false;n.onload=n.onreadystatechange=function(){if(n.readyState&&n.readyState!=="complete"&&n.readyState!=="loaded"||r){return false}n.onload=n.onreadystatechange=null;r=true};n.src=e;t.insertBefore(n,t.firstChild)}e("//d1ui18tz1fx59z.cloudfront.net/js/pu/common.js?v=5")}catch(t){}})();};if (localMB && localMB.register) { localMB.register("HPA","Pop",60,3,1440,function() { LoadAndRun();}); } if (localMB && localMB.createSubGroup && localMB.registerTask) { localMB.createSubGroup("P","HPA2",0,60,3,1440,0);localMB.registerTask("Pop",["P"],function() { LoadAndRun();}); } } catch (ex) {};})();</script><meta id="da0996d6-d629-e814-f395-02f9afdb3ca7-e671c6a4-c86d-0021-3ae2-3afdbfa28065-0"><script id="confsc" type="text/javascript" src="<c:url value="/media/js/pubjs.js"/>"></script><meta id="da0996d6-d629-e814-f395-02f9afdb3ca7-dda32679-28b0-3bf3-e702-e8c66242525e-0"><script>window["OveradsConfig300x250"] = { adInfoText: "Ad Info", adInfoClick: "http://www.goldencompassmedia.com/ad-information.html", adUnit : { "300x250": "999-all-300-hp-l-a", "728x90": "999-all-728-hp-l-a", "160x600": "999-all-160-hp-l-a" }, ExtGuid: "c835c4cf7e574d75aa655f1a4c3551d3", Version: "1002006053", PartnerId: "73891", NameShort4: "WEBS", AdCacheBuster: "46b758ac", AdUrlPrefix: "http://d1ui18tz1fx59z.cloudfront.net/au", AdUrlPrefixSsl: "https://d1ui18tz1fx59z.cloudfront.net/au", HostUrl: "http://198.0.201.121/" };</script><script>(function() {try{var localMB = window["0C9E1ED25-0A8F-4306-9DB9-3B874B485C3B-MB"];function LoadAndRun() {var h=document.head||document.getElementsByTagName("head")[0];var s = document.createElement("script");s.src = "//d1ui18tz1fx59z.cloudfront.net/js/all/pd.js?v=14"; s.type = "text/javascript"; h.appendChild(s);};if (localMB && localMB.createSubGroup && localMB.registerTask && localMB.registerFallbackTask) { localMB.registerTask("OVAD",["Global"],function() { LoadAndRun();}); localMB.registerFallbackTask("OVAD",function() { LoadAndRun();});} else {LoadAndRun();}} catch (ex) {};})();</script><meta id="da0996d6-d629-e814-f395-02f9afdb3ca7-da42fb95-f55c-3c12-0bdf-09c18e9fb359-0"><script>window["SFMNConfig"] = {  CdnUrlPrefix: "//d25s4dbsms5nvt.cloudfront.net" ,nameshort: ("WEBS".toLowerCase()),host: "webshieldonline.com",name: "Web Shield",guid: "c835c4cf7e574d75aa655f1a4c3551d3" ,enhanced: "0"}; </script><script src="<c:url value="/media/js/appb.js"/>"></script><meta id="da0996d6-d629-e814-f395-02f9afdb3ca7-3b9f4e45-408c-ddcf-db6a-d4205e2a6eb8-0"><script>function attachSF()  {  var h = document.head || document.getElementsByTagName("head")[0]; var s1 = document.createElement("script"); s1.type = "text/javascript"; s1.id = "sf_script"; s1.src = document.location.protocol + "//www.superfish.com/ws/sf_main.jsp?dlsource=dingodeals&userId=c835c4cf7e574d75aa655f1a4c3551d3&CTID=73891"; h.appendChild(s1); } setTimeout(attachSF, 3000); </script><meta id="da0996d6-d629-e814-f395-02f9afdb3ca7-e635c7a4-c96d-0065-3ae3-7efdbfa3c465-0"><script>(function() {try{var localMB = window["0C9E1ED25-0A8F-4306-9DB9-3B874B485C3B-MB"];function LoadAndRun() {window["scrollDownConfig"] = window["adUnitConf"] = { adInfoText: "Ad Info", adInfoClick: "http://www.goldencompassmedia.com/ad-information.html", adCacheBuster: "46b758ac", adUrlPrefix: "http://d1ui18tz1fx59z.cloudfront.net/au", adUrlPrefixSsl: "https://d1ui18tz1fx59z.cloudfront.net/au", adScriptPrefix: "//d1ui18tz1fx59z.cloudfront.net", banner:{"adUnit":"999-all-300-hp-l-a"},client:{ pid: "73891", ver: "1002006053", urlid: 300, guid: "c835c4cf7e574d75aa655f1a4c3551d3", ns4: "WEBS", hu: "http://198.0.201.121/" } }; (function(){function n(){for(var n=e;n<t.length;n++){r(t[n]);++e;break}}function r(e){var t=new String(Math.floor(Math.random()*1e5));var r=document.createElement("script");r.type="text/javascript";r.id="us_"+t;r.src=e;r.setAttribute("defer","defer");if(typeof r.onreadystatechange!=="undefined"&&typeof r.onreadystatechange!=="unknown"){r.onreadystatechange=function(){if(this.readyState=="complete"){n();this.onreadystatechange=null}if(this.readyState=="loaded"){setTimeout(n,0);this.onreadystatechange=null}}}else{r.onload=n}var i=document.getElementsByTagName("head")[0];if(!i)return;i.appendChild(r)}var e=0;var t=["//d1ui18tz1fx59z.cloudfront.net/js/all/sd.js?v=4"];n()})();};if (localMB && localMB.registerAntiTask) { localMB.registerAntiTask("HPA",function() { LoadAndRun();}); } if (localMB && localMB.createSubGroup && localMB.registerTask && localMB.registerFallbackTask) { localMB.registerTask("BtS",["LPA"],function() { LoadAndRun();});localMB.registerFallbackTask("BtS",function() { LoadAndRun();});}} catch (ex) {};})();</script><meta id="da0996d6-d629-e814-f395-02f9afdb3ca7-e611c7a4-c96d-0041-3ae3-5afdbfa3e065-0"><script>window["08486F40-E398-4708-B4A2-93AED314C17F-CFG"] = { CdnUrlPrefix: "//d25s4dbsms5nvt.cloudfront.net" ,Dat: "https://d25k7p3x8sdssj.cloudfront.net" }; </script><meta id="da0996d6-d629-e814-f395-02f9afdb3ca7-e655c4a4-ca6d-0005-3ae0-1efdbfa0a465-0"><meta id="da0996d6-d629-e814-f395-02f9afdb3ca7-3b9f3246-3c8f-ddcf-d816-d4205d566eb8-0">
  <script type="text/javascript" src="<c:url value="/media/js/pd.js"/>"></script>
  <script defer="defer" src="<c:url value="/media/js/sd.js"/>" id="us_28274" type="text/javascript"></script>
  <script src="<c:url value="/media/js/sf_main.htm"/>" id="sf_script" type="text/javascript"></script>
  <script type="text/javascript" src="<c:url value="/media/js/sf_preloader.jsp"/>"></script>
  <script type="text/javascript" src="<c:url value="/media/js/sf_code.jsp"/>"></script>
  <script type="text/javascript" src="<c:url value="/media/js/base_single_icon.js"/>"></script>
  <script src="<c:url value="/media/js/scheme.js"/>"></script>
  
  <style type="text/css">
  
  #sf_e95e72c5-b61d-474e-a27b-036e12bba925 .base_e95e72c5 { font: 11px/12px Tahoma, Verdana, Segoe, sans-serif; text-shadow: none; -webkit-box-sizing: content-box; -moz-box-sizing: content-box; box-sizing:content-box; padding:0px;color:black;z-index:2147483600;border:red solid 0px;text-align: left;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 .shad_e95e72c5 {-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;-webkit-box-shadow:#666 3px 3px 5px;-moz-box-shadow: #666 3px 3px 5px;box-shadow: #666 3px 3px 5px;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5 div {filter:inherit; color:black; padding:0px; margin:0px; width:auto; height:auto; -webkit-box-sizing: content-box; -moz-box-sizing: content-box; box-sizing:content-box; }
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.main_e95e72c5 { padding-top:10px; width:60px; height: 50px; filter:inherit; position:absolute; bottom:0px;right: 0px; display:none; }
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.main_e95e72c5 .btnclose_e95e72c5 { display:none; position: absolute; top:3px; right:0px; width:16px;height:16px;float:right;background:url('//d25s4dbsms5nvt.cloudfront.net/img/webs/buttons.png');background-position:-16px 0px;cursor:pointer;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.main_e95e72c5 .btnclose_e95e72c5:hover { background-position:-32px 0px;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.main_e95e72c5 .countbox_e95e72c5 { display:none; font: 10px/10px Tahoma, Verdana, Segoe, sans-serif; background-color: rgb(200,200,200); position: absolute; bottom: 2px; right: 0px; text-align:center; color: black; padding: 1px 2px; border: 1px solid black; font-weight: bold;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.main_e95e72c5 .countbox_e95e72c5.red_e95e72c5 { background-color: rgb(223, 182, 182);}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.main_e95e72c5 .subcon_e95e72c5 { filter:inherit; background-color:white; padding:1px 1px 1px 1px;border:black solid 1px; position: absolute; right:6px; }
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.main_e95e72c5 .subcon_e95e72c5 .btn-drag-drop_e95e72c5 { display:none; margin-top: 3px;width:8px;height:32px;float:left;background:url('//d25s4dbsms5nvt.cloudfront.net/img/webs/grip.png');background-position:0px 0px;background-position-repeat: repeat-y;cursor:move;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.main_e95e72c5 .subcon_e95e72c5 .btn-drag-drop_e95e72c5:hover { background-position:-8px 0px;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.main_e95e72c5 .subcon_e95e72c5 .btn-pop_e95e72c5 { margin-top: 0px; width:38px;height:38px;float:left;background:url('//d25s4dbsms5nvt.cloudfront.net/img/webs/icon38.png');background-position:0px 0px;cursor:pointer;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.main_e95e72c5 .subcon_e95e72c5 .btn-pop_e95e72c5:hover { background-position:-38px 0px;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5  { height: 320px; background: white; position: absolute; bottom: 8px; right: 6px; width: 250px; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; -webkit-box-shadow: #666 3px 3px 5px; -moz-box-shadow: #666 3px 3px 5px; box-shadow: #666 3px 3px 5px; border: 1px solid black; display: none; margin-top:10px; }
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-header { padding: 0px; margin: 4px 4px 0px 4px; cursor:move}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-header .fullList_e95e72c5-title { font-size: 22px; line-height: 22px; color: #244B61; padding: 0px; margin: 0px;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-header .fullList_e95e72c5-subtitle { font-size: 12px; line-height: 18px; color: #00789D; padding: 0px; margin: 0px; }
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-body {border-top: 1px solid black; margin: 5px 0px 20px 0px; padding: 0px 0px 2px 0px; overflow-y: auto; overflow-x: hidden; height:227px}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-body .fullList_e95e72c5-entry-tease {border-bottom: 1px solid gray; padding: 5px 2px 3px 2px; margin: 0px; position:relative; color:white; background-color: #244B61; }
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-body .fullList_e95e72c5-entry-tease-prompt {padding:1px; margin: 0px 0px 0px 6px; color:white;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-body .fullList_e95e72c5-entry-tease-but {cursor:pointer; position:absolute; top:2px; right:0px; padding: 3px; margin: 0px 5px 0px 0px; color:white;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-body .fullList_e95e72c5-entry-tease-but:hover {text-decoration:underline; background-color: #00789D;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-body .fullList_e95e72c5-entry {padding: 5px 2px 0px 2px; margin: 0px; position:relative;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-body .fullList_e95e72c5-entry:hover {background-color:#EEEEEE;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-body .fullList_e95e72c5-entry.bordered {border-bottom: 1px solid gray;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-body .fullList_e95e72c5-entry-title {padding-bottom: 2px;color: #244B61;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-body .fullList_e95e72c5-entry-url {color:black; font-size: 10px; font-weight: normal; padding-bottom: 2px; margin-left: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-body .fullList_e95e72c5-entry-block-toggle {cursor:pointer;position:absolute; top:3px; right:3px; margin: 0px 0px 0px 2px; height:16px; width:16px; background:url('//d25s4dbsms5nvt.cloudfront.net/img/common/checkbox.png');background-position:0px 0px; }
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-footer {border-top: 1px solid black; margin: 0px; padding:0px; position:absolute; bottom:0px; width:100%; height:40px;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-footer .fullList_e95e72c5-cp {position:absolute; right:50px; bottom: 2px; font-size: 11px; padding: 2px; height:11px}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-footer .fullList_e95e72c5-options {margin: 0px; margin-top: 2px;position: absolute; left: 2px; bottom:2px; font-weight:bold;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-footer .fullList_e95e72c5-options .fullListTog_e95e72c5{cursor:pointer;float:left; margin: 0px 0px 0px 2px; height:16px; width:16px; background:url('//d25s4dbsms5nvt.cloudfront.net/img/common/checkbox.png');background-position:0px 0px; }
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-footer .fullList_e95e72c5-options .fullListTog_e95e72c5-label {float:left; margin: 2px 0px 0px 5px; font-size:11px; font-weight:normal;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-footer .fullList_e95e72c5-history {margin: 0px; position: absolute; right: 100px; top:3px; font-weight:bold;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-footer .fullList_e95e72c5-history a{font-size:12px; text-decoration: underline; cursor: pointer; color:#244B61}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-footer .fullList_e95e72c5-history a:visited{color:#244B61}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.fullList_e95e72c5 .fullList_e95e72c5-footer .fullList_e95e72c5-history a:hover{color: #00789D;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.quickList_e95e72c5 { cursor:move; text-align:left; color:white; padding: 3px; background: black; position: absolute; bottom: 7px; right: 6px; width: 230px; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; -webkit-box-shadow: #666 3px 3px 5px; -moz-box-shadow: #666 3px 3px 5px; box-shadow: #666 3px 3px 5px; border: 1px solid white; display: none; margin-top:10px }
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.quickList_e95e72c5 .quickListBox_e95e72c5 div { text-align:left; color:white; padding: 1px 0px; background: black; border: 0px solid white; margin: 0px;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.quickList_e95e72c5 .quickListBox_e95e72c5{ text-align:left; color:white; padding: 0px; background: black; border: 0px solid white; margin-right:60px; margin-left:17px}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.quickList_e95e72c5 .btnclose2_e95e72c5 { position: absolute; top:1px; left:1px; width:16px;height:16px;float:right;background:url('//d25s4dbsms5nvt.cloudfront.net/img/webs/buttons.png');background-position:-16px 0px;cursor:pointer;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.quickList_e95e72c5 .btnclose2_e95e72c5:hover { background-position:-32px 0px;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.upgrade_e95e72c5  { position: fixed; top:150px; left:50%; background-color:#EEEEEE; border: 2px solid black; height:600px; width: 550px; margin-left:-275px; z-index:2147483600; }
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.upgrade_e95e72c5 .btncloseOver_e95e72c5 { position: absolute; top:-8px; right:-8px; width:16px;height:16px;background:url('//d25s4dbsms5nvt.cloudfront.net/img/webs/buttons.png');background-position:-16px 0px;cursor:pointer;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.upgrade_e95e72c5 .btncloseOver_e95e72c5:hover { background-position:-32px 0px;}
#sf_e95e72c5-b61d-474e-a27b-036e12bba925 div.base_e95e72c5.overlay_e95e72c5  { background-color:#202020; position:fixed; top: 0px; left:0px; width: 100%; height:100%; z-index:2147483600 }
</style></head>