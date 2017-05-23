package com.serviceImpl;

import java.io.IOException;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.DButil.DBAccess;
import com.model.ParkingSet;
import com.service.ParkingSetDao;

@Repository("ParkingSetDao")
public class ParkingSetDaoImpl implements ParkingSetDao {

	@Override
	public ParkingSet getParkingSetBySetId(String setId) {
		ParkingSet ps;
		
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			ps = sqlSession.selectOne("ParkingSet.getParkingSetBySetId", setId);
			return ps;
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
	public boolean addParkingSet(ParkingSet parkingSet) {

		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			sqlSession.insert("ParkingSet.addParkingSet", parkingSet);
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
	public boolean changeParkingSetVehicle(ParkingSet parkingSet) {
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			sqlSession.update("ParkingSet.changeParkingSetVehicle", parkingSet);
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
	public boolean deleteParkingSet(String setId) {
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			sqlSession.delete("ParkingSet.deleteParkingSet", setId);
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
