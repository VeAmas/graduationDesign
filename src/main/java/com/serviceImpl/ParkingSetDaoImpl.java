package com.serviceImpl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.DButil.DBAccess;
import com.model.ParkingSet;
import com.model.ParkingSetQuery;
import com.model.Vehicle;
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
	public ArrayList<ParkingSet> queryParkingSet(ParkingSetQuery psq) {
		ArrayList<ParkingSet> v = new ArrayList<ParkingSet>();
		
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			List<Object> os;
			os = sqlSession.selectList("ParkingSet.queryParkingSet", psq);
			for	(int i = 0; i < os.size(); i++){
				v.add((ParkingSet)os.get(i));
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
	public boolean updateParkingSet(ParkingSet p) {
		// TODO Auto-generated method stub
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			sqlSession.update("ParkingSet.updateParkingSet", p);
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
