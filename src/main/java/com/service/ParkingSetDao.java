package com.service;
import com.model.ParkingSet;


//用户业务逻辑接口
public interface ParkingSetDao {
	
	//用户登录方法
	public ParkingSet getParkingSetBySetId(String setId);
	public boolean addParkingSet(ParkingSet parkingSet);
	public boolean changeParkingSetVehicle(ParkingSet parkingSet);
	public boolean deleteParkingSet(String setId);
}
