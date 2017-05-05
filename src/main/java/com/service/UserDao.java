package com.service;
import com.model.User;


//用户业务逻辑接口
public interface UserDao {
	
	//用户登录方法
	public User getUserByUserId(String userId);
}
