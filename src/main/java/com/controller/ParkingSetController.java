package com.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.model.Log;
import com.model.ParkingSet;
import com.model.ParkingSetQuery;
import com.model.User;
import com.model.Vehicle;
import com.service.ParkingSetDao;
import com.serviceImpl.LogDaoImpl;
import com.serviceImpl.ParkingDaoImpl;
import com.serviceImpl.ParkingSetDaoImpl;
import com.serviceImpl.VehicleDaoImpl;

import net.sf.json.JSONObject;

@RestController  
@RequestMapping(value = "/parkingSet")  
public class ParkingSetController {

	@Autowired
	ParkingSetDaoImpl parkingSetDao;
	
	@Autowired
	VehicleDaoImpl vehicleDao;
	
	@Autowired
	LogDaoImpl logDao;	
	
	@Autowired
	ParkingDaoImpl parkingDao;	
	

    @RequestMapping(value = "/queryParkingSet", method = RequestMethod.POST)  
    public ArrayList<ParkingSet> queryParkingSet(HttpSession httpSession, @RequestBody ParkingSetQuery psq) {  
	if (psq.getCurPage() != null && psq.getItemsPrePage() != null) {
		psq.setCurPage(psq.getCurPage() * psq.getItemsPrePage());
	} else if (psq.getCurPage() == null && psq.getItemsPrePage() == null) {
		psq.setCurPage(0);
		psq.setItemsPrePage(10000);
    }
    	ArrayList<ParkingSet> ps = parkingSetDao.queryParkingSet(psq);
        return ps;  
    }
    
    @RequestMapping(value = "/addParkingSet", method = RequestMethod.POST)  
    public boolean addParkingSet(@RequestBody ParkingSet parkingSet) {  
    	System.out.println(parkingSet);
        return parkingSetDao.addParkingSet(parkingSet);
    }
    
    @RequestMapping(value = "/getSetNum", method = RequestMethod.POST)  
    public Integer getSetNum(@RequestBody ParkingSetQuery psq) {  
		psq.setCurPage(0);
		psq.setItemsPrePage(10000);

    	ArrayList<ParkingSet> ps = parkingSetDao.queryParkingSet(psq);
        return ps.size();  
    }
    
    @RequestMapping(value = "/updateParkingSet", method = RequestMethod.POST)  
    public Boolean updateParkingSet(@RequestBody ParkingSet ps) {  
    	return parkingSetDao.updateParkingSet(ps);
    }

    @RequestMapping(value = "/deleteParkingSet", method = RequestMethod.POST)  
    public boolean deleteParkingSet(@RequestBody String setId) {  
    	System.out.println(setId);
        return parkingSetDao.deleteParkingSet(setId);
    }
    
    @RequestMapping(value = "/specify", method = RequestMethod.POST)  
    public Boolean specify(@RequestBody String sp) {  
    	JSONObject jo = JSONObject.fromObject(sp);
    	
    	String setId = jo.getString("setId");
    	Object l = jo.get("license");
    	String license = null;
    	if (l != null) {
    		license = (String) l;
    	}

    	ParkingSet targetP = null;
    	Vehicle curV = null;
    	Vehicle targetV = null;
    	
    	try {
    		ParkingSet curP = parkingSetDao.getParkingSetBySetId(setId);
        	
        	if (license != null) {
            	targetV = vehicleDao.getVehicleByLicense(license);  		
        	}    	
        	if (curP.getCurVehicle() != null) {
        		curV = vehicleDao.getVehicleByLicense(curP.getCurVehicle());
        	}
        	if (targetV != null && targetV.getCurSet() != null) {
        		targetP = parkingSetDao.getParkingSetBySetId(targetV.getCurSet());
        	}
        	
        	
        	curP.setCurVehicle(license);
        	parkingSetDao.updateParkingSet(curP);
        	
        	Log log = new Log();
        	log.setContent("移动车辆");
        	log.setType("移车");
        	log.setLicense(license);
        	log.setSet(curP.getName());
        	if (curP.getParkingId() != null) {        		
            	log.setParking(parkingDao.getParkingById(curP.getParkingId()).getName());        		
        	}
        	logDao.addLog(log);
        	
        	System.out.println("curp" + curP);

        	if (targetP != null) {
        		String t = null;
        		if (curV != null) {
        			t = curV.getLicense();
        			        			
        			log = new Log();
                	log.setContent("移动车辆");
                	log.setType("移车");
                	log.setLicense(curV.getLicense());
                	log.setSet(targetP.getName());
                	if (targetP.getParkingId() != null) {        		
                    	log.setParking(parkingDao.getParkingById(targetP.getParkingId()).getName());        		
                	}
                	logDao.addLog(log);
                	                	
        		}
        		targetP.setCurVehicle(t);
        		parkingSetDao.updateParkingSet(targetP);
        	}
        	if (curV != null) {
        		String t = null;
        		if (targetV != null) {
        			t = targetV.getCurSet();
        		}
        		curV.setCurSet(t);
        		vehicleDao.updateVehicle(curV);
        	}
        	if (targetV != null) {
        		targetV.setCurSet(setId);
        		vehicleDao.updateVehicle(targetV);
            	System.out.println("targetV" + targetV);
        	}
		} catch (Exception e) {
			return false;
		}
    	return true;
    }
}
