package com.controller;


import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;  
import org.springframework.web.bind.annotation.PathVariable;  
import org.springframework.web.bind.annotation.RequestBody;  
import org.springframework.web.bind.annotation.RequestMapping;  
import org.springframework.web.bind.annotation.RequestMethod;  
import org.springframework.web.bind.annotation.RequestParam;  
import org.springframework.web.bind.annotation.RestController;

import com.model.Parking;
import com.model.ParkingSet;
import com.model.User;
import com.model.UserQuery;
import com.model.Vehicle;
import com.model.VehicleQuery;
import com.serviceImpl.ParkingDaoImpl;
import com.serviceImpl.ParkingSetDaoImpl;
import com.serviceImpl.UserDaoImpl;
import com.serviceImpl.VehicleDaoImpl;
  

@RestController  
@RequestMapping(value = "/index")  
public class exampleController {

	@Autowired
	UserDaoImpl userDao;
	
	@Autowired
	VehicleDaoImpl vehicleDao;
	
	@Autowired
	ParkingSetDaoImpl parkingSetDao;
	
	@Autowired
	ParkingDaoImpl parkingDao;
    /** 
     * 简单post请求 
     *  
     * @param name 
     * @param pwd 
     * @return 
     */  
    @RequestMapping(value = "/testpost", method = RequestMethod.POST)  
    public User testpost(@RequestBody String userId) {  
    	User u = userDao.getUserByUserId(userId);
        return u;  
    }  

    @RequestMapping(value = "/getVehicle", method = RequestMethod.POST)  
    public Vehicle getVehicle(@RequestBody String license) {  
    	Vehicle v = vehicleDao.getVehicleByLicense(license);
    	System.out.println(v);
        return v;  
    }  
    
    @RequestMapping(value = "/addUser", method = RequestMethod.POST)  
    public boolean addUser(@RequestBody User u) {  
    	System.out.println(u);
        return userDao.addUser(u);
    }  
    @RequestMapping(value = "/getParkingSet", method = RequestMethod.POST)  
    public ParkingSet getParkingSet(@RequestBody String setId) {  
    	System.out.println(setId);
        return parkingSetDao.getParkingSetBySetId(setId);
    }  
    @RequestMapping(value = "/addVehicle", method = RequestMethod.POST)  
    public boolean addVehicle(@RequestBody Vehicle vehicle) {  
    	System.out.println(vehicle);
        return vehicleDao.addVehicle(vehicle);
    }   
    @RequestMapping(value = "/updateVehicle", method = RequestMethod.POST)  
    public boolean updateVehicle(@RequestBody Vehicle vehicle) {  
    	System.out.println(vehicle);
        return vehicleDao.updateVehicle(vehicle);
    }  
    @RequestMapping(value = "/deleteVehicle", method = RequestMethod.POST)  
    public boolean deleteVehicle(@RequestBody String license) {  
    	System.out.println(license);
        return vehicleDao.deleteVehicle(license);
    }
    @RequestMapping(value = "/changeVehicleStatus", method = RequestMethod.POST)  
    public boolean changeVehicleStatus(@RequestBody Vehicle vehicle) {  
    	System.out.println(vehicle);
        return vehicleDao.changeVehicleStatus(vehicle);
    }
    @RequestMapping(value = "/changeVehicleNestStart", method = RequestMethod.POST)  
    public boolean changeVehicleNestStart(@RequestBody Vehicle vehicle) {  
    	System.out.println(vehicle);
        return vehicleDao.changeVehicleNestStart(vehicle);
    }
    @RequestMapping(value = "/addParkingSet", method = RequestMethod.POST)  
    public boolean addParkingSet(@RequestBody ParkingSet parkingSet) {  
    	System.out.println(parkingSet);
        return parkingSetDao.addParkingSet(parkingSet);
    }
    @RequestMapping(value = "/deleteParkingSet", method = RequestMethod.POST)  
    public boolean deleteParkingSet(@RequestBody String setId) {  
    	System.out.println(setId);
        return parkingSetDao.deleteParkingSet(setId);
    }
    @RequestMapping(value = "/changeParkingSetVehicle", method = RequestMethod.POST)  
    public boolean changeParkingSetVehicle(@RequestBody ParkingSet parkingSet) {  
    	System.out.println(parkingSet);
        return parkingSetDao.changeParkingSetVehicle(parkingSet);
    }
    @RequestMapping(value = "/getParkingById", method = RequestMethod.POST)  
    public Parking getParkingById(@RequestBody String parkingId) {  
    	System.out.println(parkingId);
        return parkingDao.getParkingById(parkingId);
    }
    @RequestMapping(value = "/queryUser", method = RequestMethod.POST)  
    public ArrayList<User> queryUser(@RequestBody UserQuery userQuery) {  
    	System.out.println(userQuery);
        return userDao.queryUser(userQuery);
    }
    @RequestMapping(value = "/updateUser", method = RequestMethod.POST)  
    public boolean updateUser(@RequestBody User user) {  
    	System.out.println(user);
        return userDao.updateUser(user);
    }
    @RequestMapping(value = "/queryVehicle", method = RequestMethod.POST)  
    public ArrayList<Vehicle> queryVehicle(@RequestBody VehicleQuery vehicleQuery) {  
    	System.out.println(vehicleQuery);
        return vehicleDao.queryVehicle(vehicleQuery);
    }
}