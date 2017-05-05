package com.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;  
import org.springframework.web.bind.annotation.PathVariable;  
import org.springframework.web.bind.annotation.RequestBody;  
import org.springframework.web.bind.annotation.RequestMapping;  
import org.springframework.web.bind.annotation.RequestMethod;  
import org.springframework.web.bind.annotation.RequestParam;  
import org.springframework.web.bind.annotation.RestController;

import com.model.User;
import com.serviceImpl.UserDaoImpl;  
  

@RestController  
@RequestMapping(value = "/index")  
public class exampleController {

	@Autowired
	UserDaoImpl userDao;
    /** 
     * 简单post请求 
     *  
     * @param name 
     * @param pwd 
     * @return 
     */  
    @RequestMapping(value = "/testpost", method = RequestMethod.POST)  
    public String testpost() {  
    	User u = userDao.getUserByUserId("1235");
        System.out.println(u.getUserId());  
        return u.getUserId();  
    }  
}