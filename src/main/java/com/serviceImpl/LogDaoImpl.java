package com.serviceImpl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.DButil.DBAccess;
import com.model.Log;
import com.model.LogQuery;
import com.service.LogDao;

@Repository("LogDao")
public class LogDaoImpl implements LogDao {

	@Override
	public Boolean addLog(Log l) {
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			sqlSession.insert("Log.addLog", l);
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
	public ArrayList<Log> queryLog(LogQuery lq) {
		ArrayList<Log> v = new ArrayList<Log>();
		
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			List<Object> os;
			os = sqlSession.selectList("Log.queryLog", lq);
			for	(int i = 0; i < os.size(); i++){
				v.add((Log)os.get(i));
			}
			return v;
		}catch(IOException e){
			e.printStackTrace();
		}finally{
			if(sqlSession != null){
				sqlSession.close();
			}			
		}
		return null;
	}

}
