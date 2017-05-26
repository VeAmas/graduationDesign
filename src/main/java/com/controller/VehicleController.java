package com.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.model.User;
import com.model.Vehicle;
import com.model.VehicleQuery;
import com.serviceImpl.VehicleDaoImpl;

@RestController  
@RequestMapping(value = "/vehicle")  
public class VehicleController {

	@Autowired
	VehicleDaoImpl vehicleDao;

   @RequestMapping(value = "/queryVehicle", method = RequestMethod.POST)  
   public ArrayList<Vehicle> queryVehicle(@RequestBody VehicleQuery vq) {  
	   if (vq.getCurPage() != null && vq.getItemsPrePage() != null) {
		   vq.setCurPage(vq.getCurPage() * vq.getItemsPrePage());
	   } else if (vq.getCurPage() == null && vq.getItemsPrePage() == null) {
		   vq.setCurPage(0);
		   vq.setItemsPrePage(10000);
	   }
	   ArrayList<Vehicle> vs = vehicleDao.queryVehicle(vq);
       return vs;  
   }
   
   @RequestMapping(value = "/getVehicle", method = RequestMethod.POST)  
   public Vehicle getVehicle(@RequestBody String license) {  
   	Vehicle v = vehicleDao.getVehicleByLicense(license);
   	System.out.println(v);
       return v;  
   }
   
   @RequestMapping(value = "/updateVehicle", method = RequestMethod.POST)  
   public boolean updateVehicle(@RequestBody Vehicle vehicle) {
       return vehicleDao.updateVehicle(vehicle);
   }  
   
   @RequestMapping(value = "/deleteVehicle", method = RequestMethod.POST)  
   public boolean deleteVehicle(@RequestBody String license) {  
       return vehicleDao.deleteVehicle(license);
   }
}
