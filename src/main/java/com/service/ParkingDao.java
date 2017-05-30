package com.service;
import java.util.ArrayList;

import com.model.Parking;
import com.model.ParkingQuery;
import com.model.ParkingSet;


//用户业务逻辑接口
public interface ParkingDao {
	
	//用户登录方法
	public Parking getParkingById(String parkingId);
	public ArrayList<Parking> queryParking(ParkingQuery pq);
	public Boolean addParking (Parking p);
}
