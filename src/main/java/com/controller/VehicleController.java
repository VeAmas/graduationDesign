package com.controller;

import java.util.ArrayList;
import java.util.Date;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.model.Log;
import com.model.User;
import com.model.Vehicle;
import com.model.VehicleQuery;
import com.serviceImpl.LogDaoImpl;
import com.serviceImpl.ParkingDaoImpl;
import com.serviceImpl.ParkingSetDaoImpl;
import com.serviceImpl.UserDaoImpl;
import com.serviceImpl.VehicleDaoImpl;

@RestController  
@RequestMapping(value = "/vehicle")  
public class VehicleController {

	@Autowired
	VehicleDaoImpl vehicleDao;
	
	@Autowired
	ParkingDaoImpl parkingDao;
	
	@Autowired
	ParkingSetDaoImpl parkingSetDao;
	
	@Autowired
	UserDaoImpl userDao;
	
	@Autowired
	LogDaoImpl logDao;

   @RequestMapping(value = "/queryVehicle", method = RequestMethod.POST)  
   public ArrayList<Vehicle> queryVehicle(HttpSession httpSession, @RequestBody VehicleQuery vq) {  
	   if (vq.getCurPage() != null && vq.getItemsPrePage() != null) {
		   vq.setCurPage(vq.getCurPage() * vq.getItemsPrePage());
	   } else if (vq.getCurPage() == null && vq.getItemsPrePage() == null) {
		   vq.setCurPage(0);
		   vq.setItemsPrePage(10000);
	   }
	   ArrayList<Vehicle> vs = vehicleDao.queryVehicle(vq);
	   for (int i = 0; i< vs.size(); i++) {
		   User u = userDao.getUserByUserVehicleLicense(vs.get(i).getLicense());
		   if (u != null) {
			   vs.get(i).setCurUser(u.getName());
			   System.out.println(vs.get(i).getLicense());
		   }
	   }
       return vs;  
   }
   
   @RequestMapping(value = "/getVehicleNum", method = RequestMethod.POST)  
   public Integer getVehicleNum(@RequestBody VehicleQuery vq) {  
	   vq.setCurPage(0);
	   vq.setItemsPrePage(10000);
	   
	   ArrayList<Vehicle> vs = vehicleDao.queryVehicle(vq);

       return vs.size();  
   }
   
   @RequestMapping(value = "/getVehicle", method = RequestMethod.POST)  
   public Vehicle getVehicle(@RequestBody String license) {  
   	Vehicle v = vehicleDao.getVehicleByLicense(license);
   	System.out.println(v);
       return v;  
   }
   
   @RequestMapping(value = "/updateVehicle", method = RequestMethod.POST)  
   public boolean updateVehicle(@RequestBody Vehicle vehicle) {
	   Vehicle v = vehicleDao.getVehicleByLicense(vehicle.getLicense());
	   Log l = new Log();
	   l.setLicense(vehicle.getLicense());
	   
	   if(!v.getCurStat().equals(vehicle.getCurStat())) {
		   if (vehicle.getCurStat().equals("出车")) {
			   l.setContent("出车");
			   l.setType("出车");
		   }else {
			   l.setContent("停车");
			   l.setType("停车");			   
		   }
		   if (vehicle.getParkingId() != null) {
			   l.setParking(parkingDao.getParkingById(vehicle.getParkingId().toString()).getName());
		   }
		   if (vehicle.getCurSet() != null) {
			   l.setSet(parkingSetDao.getParkingSetBySetId(vehicle.getCurSet()).getName());
		   }
		   
		   logDao.addLog(l);
	   }
	   
	   System.out.println(vehicle);
       return vehicleDao.updateVehicle(vehicle);
   }  
   
   @RequestMapping(value = "/deleteVehicle", method = RequestMethod.POST)  
   public boolean deleteVehicle(@RequestBody String license) {  
       return vehicleDao.deleteVehicle(license);
   }
   
   @RequestMapping(value = "/getAllRoutes", method = RequestMethod.POST)  
   public ArrayList<String> getAllRoutes() {  
       return vehicleDao.getAllRoutes();
   }

   @RequestMapping(value = "/addVehicle", method = RequestMethod.POST)  
   public boolean addVehicle(@RequestBody Vehicle vehicle) {  
   	System.out.println(vehicle);
       return vehicleDao.addVehicle(vehicle);
   }   
   
}
