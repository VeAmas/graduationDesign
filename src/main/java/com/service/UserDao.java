package com.service;
import java.util.ArrayList;

import com.model.User;
import com.model.UserQuery;


//用户业务逻辑接口
public interface UserDao {
	
	//用户登录方法
	public User getUserByUserId(String userId);
	public boolean addUser(User user);
	public ArrayList<User> queryUser(UserQuery userQuery);
	public boolean updateUser(User user);
}
