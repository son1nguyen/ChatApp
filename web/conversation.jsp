<%--
    Document   : Conversation
    Created on : Apr 16, 2015, 11:51:29 AM
    Author     : sonnguyen
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
	<title>TODO supply a title</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/bootstrap-theme.min.css" rel="stylesheet">
	<style type="text/css">
	    li {
		list-style-type: none;
	    }
	    .chatScrollBar{
		width: inherit;
		height: 350px;
		overflow: scroll;
	    }
	    .friendScrollbar{
		width: inherit;
		height: 450px;
		overflow: scroll;
	    }

	</style>
    </head>
    <body class="container">
	<%
	    String username = (String) request.getAttribute("username") + " - ";
	%>
	<div class="row">
	    <nav class="navbar navbar-default navbar-fixed-top container-fluid" style="background-color: #269abc">
		<div class="navbar-header">
		    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#collapse">
			<span class="sr-only">Toggle navigation</span>
			<span class="glyphicon glyphicon-arrow-down"></span>
			MENU
		    </button>
		</div>
		<div class="collapse navbar-collapse" id="collapse">
		    <div id="signin" class="navbar-form navbar-right">
			<a href="index.html" class="btn btn-danger"><%=username%>Log Out</a>
		    </div>
		</div>
	    </nav>
	</div>

	<div class="row" style="padding-top:70px; font-size: 13px !important">
	    <div class="col-sm-9">
		<div class="panel panel-primary">
		    <div class="panel-heading text-center">
			CHAT CONVERSATION
		    </div>
		    <div class="panel-body chatScrollBar">
			<!--The chat content is here-->
		    </div>
		    <div class="panel-footer">
			<div class="input-group input-group-sm">
			    <input id="contentSMS" type="text" class="form-control" placeholder="Enter Message" />
			    <span class="input-group-btn">
				<button id="sendMessage" class="btn btn-primary" type="button">SEND</button>
			    </span>
			</div>
		    </div>
		</div>


	    </div>

	    <div class="col-sm-3 text-center">
		<table id="onlineUsers" class="table table-hover">
		    <tr><td><h4>Online Users</h4></td></tr>
		</table>
	    </div>

	</div>

	<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="chat.js"></script>
    </body>
</html>

