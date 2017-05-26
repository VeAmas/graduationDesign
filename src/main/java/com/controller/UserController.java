package com.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.model.User;
import com.model.UserQuery;
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
    public User getUserPhoto(@RequestBody String many) {
    	
    	User u = userDao.getUserByMany(many);
    	if (u == null) {
    		return null;
    	}
    	u.setPassword(null);
    	return u;
    }
    
    @RequestMapping(value = "/getUser", method = RequestMethod.POST)  
    public User getUser(@RequestBody String userId) {    	
    	User u = userDao.getUserByUserId(userId);
    	return u;
    }
    
    @RequestMapping(value = "/getUserByCurVehicle", method = RequestMethod.POST)  
    public User getUserByCurVehicle(@RequestBody String license) {    	
    	User u = userDao.getUserByUserVehicleLicense(license);
    	return u;
    }
    
    @RequestMapping(value = "/queryUser", method = RequestMethod.POST)  
    public ArrayList<User> queryUser(@RequestBody UserQuery uq) {    	
 	   if (uq.getCurPage() != null && uq.getItemsPrePage() != null) {
 		   uq.setCurPage(uq.getCurPage() * uq.getItemsPrePage());
	   } else if (uq.getCurPage() == null && uq.getItemsPrePage() == null) {
		   uq.setCurPage(0);
		   uq.setItemsPrePage(10000);
	   }   	
    	return userDao.queryUser(uq);
    }
    
    @RequestMapping(value = "/addUser", method = RequestMethod.POST)  
    public boolean addUser(@RequestBody User u) {  
    	System.out.println(u);
        return userDao.addUser(u);
    }
    
    @RequestMapping(value = "/updateUser", method = RequestMethod.POST)  
    public boolean updateUser(@RequestBody User user) {  
    	System.out.println(user);
        return userDao.updateUser(user);
    }
    
    @RequestMapping(value = "/deleteUser", method = RequestMethod.POST)  
    public boolean deleteUser(@RequestBody String userId) {  
        return userDao.deleteUser(userId);
    }
    
    
}
