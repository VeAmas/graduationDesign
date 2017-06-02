package com.service;
import java.util.ArrayList;

import com.model.Parking;
import com.model.ParkingQuery;
import com.model.ParkingSet;
import com.model.SceneData;


//用户业务逻辑接口
public interface ParkingDao {
	
	//用户登录方法
	public Parking getParkingById(String parkingId);
	public ArrayList<Parking> queryParking(ParkingQuery pq);
	public Boolean addParking (Parking p);
	public Boolean modifyParking (Parking p);
	public Boolean deleteParking (String parkingId);
	public Parking getParkingByName(String name);
	public Boolean addSceneData(SceneData sd);
	public Boolean updateSceneData(SceneData sd);
	public SceneData getSceneData(String parkingId);
}
