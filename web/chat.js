
var wsUri = "ws://" + document.location.host + "/ChatApp" + "/websocket";
var websocket = new WebSocket(wsUri);

var username = document.getElementsByTagName("a")[0].innerHTML;
username = username.split(" - ")[0];
var previousSender;

websocket.onopen = function (evt) {
    websocket.send("login:" + username);
};

websocket.onmessage = function (evt) {
    onMessage(evt)
};

websocket.onerror = function (evt) {
};

websocket.onclose = function (evt) {
};

//These methods initial runs to load previous conversation
var onlineUsersURL = "api/onlineUsers";
$.getJSON(onlineUsersURL, {}, function (result) {

    for (var i = 0; i < result.length; i++) {
	addOnlineUser(result[i]);
    }
});

var conversationURL = "api/conversation";
$.getJSON(conversationURL, {}, function (result) {

    for (var i = 0; i < result.length; i++) {
	var sender = result[i].split(":")[0];
	var content = result[i].split(":")[1];

	addConversation(sender, content);
    }
});

var output = document.getElementById("output");

$("#sendMessage").click(function () {
    var text = $("#contentSMS").val();
    if (text != "") {
	websocket.send(username + ":" + text);
	$("#contentSMS").val("");
    }
});

function addOnlineUser(name) {
    var table = document.getElementById("onlineUsers");
    var row = table.insertRow(1);
    var cell = row.insertCell(0);
    cell.innerHTML = name;
}

function removeOfflineUser(name) {
    var table = document.getElementById("onlineUsers");
    for (var i = 0; i < table.rows.length; i++) {
	if (table.rows[i].innerHTML.search(name) != -1) {
	    table.deleteRow(i);
	}
    }
}

function onMessage(evt) {

    var sender = evt.data.split(":")[0];
    var content = evt.data.split(":")[1];

    if (content == "just log in") {
	addOnlineUser(sender);
    } else if (content == "just log out") {
	removeOfflineUser(sender);
    } else {
	addConversation(sender, content);
    }
}

function addConversation(sender, content) {
    if (previousSender == sender) {
	$(".panel-body div:last p").append("<br>" + content);
    } else {
	var spanTag = document.createElement("span");

	var imgTag = document.createElement("img");
	imgTag.className = "img-circle";
	if (sender == username) {
	    spanTag.className = "chat-img pull-right";
	    imgTag.setAttribute("src", "img/ME.gif");
	} else {
	    spanTag.className = "chat-img pull-left";
	    imgTag.setAttribute("src", "img/U.gif");
	}

	spanTag.appendChild(imgTag);
	$(".chatScrollBar").append(spanTag);

	var divTag = document.createElement("div");
	divTag.className = "chat-body clearfix";

	var strongTag = document.createElement("strong");
	strongTag.innerHTML = sender;

	divTag.appendChild(strongTag);

	var paragraph = document.createElement("p");

	if (username == sender) {
	    paragraph.style.paddingRight = "50px";
	} else {
	    paragraph.style.paddingLeft = "50px";
	}

	var decoded = $("<div/>").html(content).text();

	paragraph.innerHTML = decoded;

	divTag.appendChild(paragraph);
	$(".chatScrollBar").append(divTag);

	previousSender = sender;
    }

    var height = 0;
    $(".chatScrollBar div").each(function (i, value) {
	height += parseInt($(this).height()) + 200;
    });

    $('.chatScrollBar').animate({scrollTop: height}, 0);
}

$(document).keypress(function (e) {
    if (e.which == 13) {
	var text = $("#contentSMS").val();
	if (text != "") {
	    websocket.send(username + ":" + text);
	    $("#contentSMS").val("");
	}
    }
});
