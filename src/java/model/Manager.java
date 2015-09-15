/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

import java.util.ArrayList;
import java.util.HashMap;
import javax.websocket.Endpoint;
import javax.websocket.EndpointConfig;
import javax.websocket.Session;
import jdk.nashorn.internal.codegen.CompilerConstants;

/**
 *
 * @author sonnguyen
 */
public class Manager {

    private HashMap<String, User> users;
    private ArrayList<String> conversation;
    private static Manager manager;

    public static Manager getInstance() {
	if (manager != null) {
	    return manager;
	} else {
	    manager = new Manager();
	    return manager;
	}
    }

    private Manager() {
	this.users = new HashMap<>();
	this.conversation = new ArrayList<>();
    }

    public HashMap<String, User> getUsers() {
	return users;
    }

    public void setUsers(HashMap<String, User> users) {
	this.users = users;
    }

    public boolean checkLogin(String username, String password) {
	if (this.users.containsKey(username)) {
	    return this.users.get(username).getPassword().equals(password);
	} else {
	    return false;
	}
    }

    public boolean addUser(String username, String password) {
	if (!this.users.containsKey(username)) {
	    User user = new User(username, password);
	    this.users.put(user.getUsername(), user);
	    return true;
	} else {
	    return false;
	}
    }

    public boolean hasUser(String username) {
	return this.users.containsKey(username);
    }

    public ArrayList<String> getConversation() {
	return conversation;
    }
}
