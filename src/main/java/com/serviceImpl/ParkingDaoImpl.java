package com.serviceImpl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.DButil.DBAccess;
import com.model.Parking;
import com.model.ParkingQuery;
import com.model.ParkingSet;
import com.model.Vehicle;
import com.service.ParkingDao;

@Repository("ParkingDao")
public class ParkingDaoImpl implements ParkingDao {

	@Override
	public Parking getParkingById(String parkingId) {
		Parking p;
		ArrayList<ParkingSet> ps = new ArrayList<ParkingSet>();
		ArrayList<Vehicle> v = new ArrayList<Vehicle>();
		
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			p = sqlSession.selectOne("Parking.getParkingById", parkingId);
			List<Object> os = sqlSession.selectList("ParkingSet.getParkingSetByParkingId", parkingId);
			for	(int i = 0; i < os.size();i++){
				ps.add((ParkingSet)os.get(i));
			}
			os = sqlSession.selectList("Vehicle.getVehicleByParkingId", parkingId);
			for	(int i = 0; i < os.size();i++){
				v.add((Vehicle)os.get(i));
			}
			
			p.setSet(ps);
			p.setVehicles(v);
			return p;
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
	public ArrayList<Parking> queryParking(ParkingQuery pq) {
		ArrayList<Parking> v = new ArrayList<Parking>();
		
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			List<Object> os;
			os = sqlSession.selectList("Parking.queryParking", pq);
			for	(int i = 0; i < os.size(); i++){
				v.add((Parking)os.get(i));
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
