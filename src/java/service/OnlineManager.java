package service;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import model.Manager;

@ServerEndpoint(value = "/websocket")
public class OnlineManager {

    private Manager manager = Manager.getInstance();
    private static final Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());
    private static HashMap<String, String> peersName = new HashMap<>();

    public static HashMap<String, String> getPeersName() {
	return peersName;
    }

    @OnOpen
    public void onOpen(Session peer) {
	peers.add(peer);
    }

    @OnClose
    public void onClose(Session peer) {
	peers.remove(peer);

	for (Session p : peers) {
	    try {
		p.getBasicRemote().sendObject(peersName.get(peer.getId()) + ":just log out");
	    } catch (Exception ex) {
		Logger.getLogger(OnlineManager.class.getName()).log(Level.SEVERE, null, ex);
	    }
	}
	peersName.remove(peer.getId());

    }

    @OnMessage
    public void onMessage(String message, Session client) throws IOException, EncodeException {
	System.out.println(message);

	if (message.contains("login:")) {
	    String name = message.split(":")[1];
	    peersName.put(client.getId(), name);
	    System.out.println(name);
	    for (Session peer : peers) {
		peer.getBasicRemote().sendObject(name + ":just log in");
	    }
	} else {
	    manager.getConversation().add(message);
	    for (Session peer : peers) {
		peer.getBasicRemote().sendObject(message);
	    }
	}

    }

    @OnError
    public void onError(Throwable error) {
	System.err.println(error);
    }

}
