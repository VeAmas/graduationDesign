package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.model.User;
import com.serviceImpl.UserDaoImpl;

import net.sf.json.JSONObject;

@RestController  
@RequestMapping(value = "/user")  
public class UserController {
	@Autowired
	UserDaoImpl userDao;
	
    @RequestMapping(value = "/login", method = RequestMethod.POST)  
    public Boolean login(@RequestBody String many) {
    	JSONObject jo = JSONObject.fromObject(many);
    	
    	String userName = jo.getString("many");
    	String password = jo.getString("password");
    	User u = userDao.getUserByMany(userName);
    	if (u == null) {
    		return false;
    	}
    	if (u.getPassword().equals(password)) {
			return true;
		}
        return false;  
    }  
    
    @RequestMapping(value = "/getUserPhoto", method = RequestMethod.POST)  
    public String getUserPhoto(@RequestBody String many) {
    	
    	User u = userDao.getUserByMany(many);
    	if (u == null) {
    		return null;
    	}
    	return u.getPhoto();
    }
}
