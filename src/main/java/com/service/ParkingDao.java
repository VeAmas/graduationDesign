package com.service;
import com.model.Parking;
import com.model.ParkingSet;


//用户业务逻辑接口
public interface ParkingDao {
	
	//用户登录方法
	public Parking getParkingById(String parkingId);
}
