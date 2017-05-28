package com.serviceImpl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.DButil.DBAccess;
import com.model.ParkingSet;
import com.model.User;
import com.model.Vehicle;
import com.model.VehicleQuery;
import com.service.VehicleDao;

@Repository("VehicleDao")
public class VehicleDaoImpl implements VehicleDao {

	@Override
	public Vehicle getVehicleByLicense(String license) {
		System.out.println(license);
		Vehicle v;
		
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			v = sqlSession.selectOne("Vehicle.getVehicleByLicense", license);
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
	public boolean addVehicle(Vehicle vehicle) {
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			sqlSession.insert("Vehicle.addVehicle", vehicle);
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
	public boolean updateVehicle(Vehicle vehicle) {
		// TODO Auto-generated method stub
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			sqlSession.update("Vehicle.updateVehicle", vehicle);
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
	public boolean deleteVehicle(String license) {
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			sqlSession.delete("Vehicle.deleteVehicle", license);
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
	public boolean changeVehicleStatus(Vehicle vehicle) {
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			sqlSession.update("Vehicle.changeVehicleStatus", vehicle);
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
	public boolean changeVehicleNestStart(Vehicle vehicle) {
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			sqlSession.update("Vehicle.changeVehicleNestStart", vehicle);
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
	public ArrayList<Vehicle> queryVehicle(VehicleQuery vehicleQuery) {	
		ArrayList<Vehicle> v = new ArrayList<Vehicle>();
		
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			List<Object> os;
			os = sqlSession.selectList("Vehicle.queryVehicle", vehicleQuery);
			for	(int i = 0; i < os.size(); i++){
				v.add((Vehicle)os.get(i));
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
	public ArrayList<String> getAllRoutes() {
		ArrayList<String> res = new ArrayList<String>();
		DBAccess dbAccess = new DBAccess();
		SqlSession sqlSession = null;
		try{
			sqlSession = dbAccess.getSqlSession();
			List<Object> os;
			os = sqlSession.selectList("Vehicle.getAllRoutes");
			for (int i = 0; i< os.size(); i++) {
				res.add((String)os.get(i));
			}
			return res;
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
