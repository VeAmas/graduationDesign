package com.service;
import java.util.ArrayList;

import com.model.ParkingSet;
import com.model.ParkingSetQuery;


//用户业务逻辑接口
public interface ParkingSetDao {
	
	//用户登录方法
	public ParkingSet getParkingSetBySetId(String setId);
	public ArrayList<ParkingSet> queryParkingSet(ParkingSetQuery psq);
	public boolean addParkingSet(ParkingSet parkingSet);
	public boolean changeParkingSetVehicle(ParkingSet parkingSet);
	public boolean updateParkingSet(ParkingSet p);
	public boolean deleteParkingSet(String setId);
}
