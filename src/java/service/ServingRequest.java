/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import com.google.gson.Gson;
import java.util.HashMap;
import java.util.Map;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import model.Manager;

/**
 * REST Web Service
 *
 * @author sonnguyen
 */
@Path("")
public class ServingRequest {

    private Manager manager = Manager.getInstance();

    @Context
    private UriInfo context;

    public ServingRequest() {
    }

    @GET
    @Path("/isAvailable/{username}")
    @Produces(MediaType.APPLICATION_JSON)
    public String isAvailable(@PathParam("username") String username) {
	System.out.println(username);
	Gson gson = new Gson();
	return gson.toJson(!manager.hasUser(username));
    }

    @GET
    @Path("/users")
    @Produces(MediaType.APPLICATION_JSON)
    public String users(@PathParam("username") String username) {
	Gson gson = new Gson();
	return gson.toJson(manager.getUsers().keySet());
    }

    @GET
    @Path("/onlineUsers")
    @Produces(MediaType.APPLICATION_JSON)
    public String onlineUsers() {
	HashMap<String, String> onlineUsers = OnlineManager.getPeersName();
	return new Gson().toJson(onlineUsers.values());
    }

    @GET
    @Path("conversation")
    @Produces(MediaType.APPLICATION_JSON)
    public String getConversation() {
	return new Gson().toJson(manager.getConversation());
    }

    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    public String login(@FormParam("username") String username, @FormParam("password") String password) {
	return new Gson().toJson(manager.checkLogin(username, password));
    }

    @POST
    @Path("/register")
    @Produces(MediaType.APPLICATION_JSON)
    public String register(@FormParam("username") String username, @FormParam("password") String password) {
	return new Gson().toJson(manager.addUser(username, password));
    }
}
