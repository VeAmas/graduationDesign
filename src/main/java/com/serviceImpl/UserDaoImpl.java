package com.serviceImpl;

import org.springframework.stereotype.Repository;

import com.model.User;
import com.service.UserDao;

@Repository("userDao")
public class UserDaoImpl implements UserDao {

	@Override
	public User getUserByUserId(String userId) {
		User u = new User();
		u.setUserId("asdfse");
		return u;
	}

}
