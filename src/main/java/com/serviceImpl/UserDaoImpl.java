package com.serviceImpl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.DButil.DBAccess;
import com.model.User;
import com.model.UserQuery;
import com.service.UserDao;

@Repository("userDao")
public class UserDaoImpl implements UserDao {

	@Override
	public User getUserByUserId(String userId) {
		User u = new User();	
		
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			u = sqlSession.selectOne("User.getUserByUserId", userId);
			return u;
		}catch(IOException e){
			e.printStackTrace();
		}finally{
			if(sqlSession != null){
				sqlSession.close();
			}			
		}
		return null;
	}
	
	@Override
	public User getUserByUserVehicleLicense(String license) {
		User u = new User();	
		
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			u = sqlSession.selectOne("User.getUserByUserVehicleLicense", license);
			return u;
		}catch(IOException e){
			e.printStackTrace();
		}finally{
			if(sqlSession != null){
				sqlSession.close();
			}			
		}
		return null;
	}
	
	@Override
	public User getUserByMany(String many) {
		User u = new User();	
		
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			u = sqlSession.selectOne("User.getUserByMany", many);
			return u;
		}catch(IOException e){
			e.printStackTrace();
		}finally{
			if(sqlSession != null){
				sqlSession.close();
			}			
		}
		return null;
	}

	@Override
	public boolean addUser(User user) {
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			sqlSession.insert("User.addUser", user);
			sqlSession.commit();
			return true;
		}catch(IOException e){
			e.printStackTrace();
		}finally{
			if(sqlSession != null){
				sqlSession.close();
			}			
		}
		return false;
	}

	@Override
	public ArrayList<User> queryUser(UserQuery userQuery) {
		ArrayList<User> u = new ArrayList<User>();	
		
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			List<Object> os;
			os = sqlSession.selectList("User.queryUser", userQuery);
			for	(int i = 0; i < os.size(); i++){
				u.add((User)os.get(i));
			}
			return u;
		}catch(IOException e){
			e.printStackTrace();
		}finally{
			if(sqlSession != null){
				sqlSession.close();
			}			
		}
		return null;
	}

	@Override
	public boolean updateUser(User user) {
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			sqlSession.update("User.updateUser", user);
			sqlSession.commit();
			return true;
		}catch(IOException e){
			e.printStackTrace();
		}finally{
			if(sqlSession != null){
				sqlSession.close();
			}			
		}
		return false;	
	}
	
	@Override
	public boolean deleteUser(String userId) {
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			sqlSession.delete("User.deleteUser", userId);
			sqlSession.commit();
			return true;
		}catch(IOException e){
			e.printStackTrace();
		}finally{
			if(sqlSession != null){
				sqlSession.close();
			}			
		}
		return false;
	}

}
