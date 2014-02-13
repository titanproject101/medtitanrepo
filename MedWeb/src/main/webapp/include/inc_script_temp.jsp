<head>
    <link rel="stylesheet" type="text/css" href="<c:url value="/media/css/cmsstyle.css"/>" title="Default">
    <link rel="stylesheet" type="text/css" href="<c:url value="/media/css/vzcss.css"/>" title="Default">
    <link rel="stylesheet" type="text/css" href="<c:url value="/media/temp/nv.d3.css"/>" title="Default">
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

    <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
	<script src="<c:url value="/media/js/temp/nv.d3.js"/>"></script>
	<script src="<c:url value="/media/js/temp/tooltip.js"/>"></script>
	<script src="<c:url value="/media/js/temp/utils.js"/>"></script>
	<script src="<c:url value="/media/js/temp/legend.js"/>"></script>
	<script src="<c:url value="/media/js/temp/axis.js"/>"></script>
	<script src="<c:url value="/media/js/temp/distribution.js"/>"></script>
	<script src="<c:url value="/media/js/temp/scatter.js"/>"></script>
	<script src="<c:url value="/media/js/temp/scatterChart.js"/>"></script>
	<script src="<c:url value="/media/js/temp/scatterPlusLineChart.js"/>"></script>
    
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