package com.service;
import java.util.ArrayList;

import com.model.User;
import com.model.Vehicle;
import com.model.VehicleQuery;


//用户业务逻辑接口
public interface VehicleDao {
	
	//用户登录方法
	public Vehicle getVehicleByLicense(String license);
	public boolean addVehicle(Vehicle vehicle);
	public boolean updateVehicle(Vehicle vehicle);
	public boolean deleteVehicle(String license);
	public boolean changeVehicleStatus(Vehicle vehicle);
	public boolean changeVehicleNestStart(Vehicle vehicle);
	public ArrayList<Vehicle> queryVehicle(VehicleQuery vehicleQuery);
	public ArrayList<String> getAllRoutes();
}
