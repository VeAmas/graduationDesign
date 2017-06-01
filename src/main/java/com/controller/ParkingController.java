package com.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.model.Log;
import com.model.LogQuery;
import com.model.Parking;
import com.model.ParkingQuery;
import com.model.ParkingSetQuery;
import com.model.VehicleQuery;
import com.serviceImpl.LogDaoImpl;
import com.serviceImpl.ParkingDaoImpl;
import com.serviceImpl.ParkingSetDaoImpl;
import com.serviceImpl.VehicleDaoImpl;

import net.sf.json.JSONObject;

@RestController  
@RequestMapping(value = "/parking")  
public class ParkingController {

	@Autowired
	ParkingDaoImpl parkingDao;
	
	@Autowired
	ParkingSetDaoImpl parkingSetDao;
	
	@Autowired
	VehicleDaoImpl vehicleDao;
	
	@Autowired
	LogDaoImpl logDao;	
	
    @RequestMapping(value = "/queryParking", method = RequestMethod.POST)  
    public ArrayList<Parking> queryParking(@RequestBody ParkingQuery pq) {  
	if (pq.getCurPage() != null && pq.getItemsPrePage() != null) {
		pq.setCurPage(pq.getCurPage() * pq.getItemsPrePage());
	} else if (pq.getCurPage() == null && pq.getItemsPrePage() == null) {
		pq.setCurPage(0);
		pq.setItemsPrePage(10000);
    }
    	ArrayList<Parking> p = parkingDao.queryParking(pq);
    	for (int i = 0; i < p.size(); i++) {
    		
    		ParkingSetQuery psq = new ParkingSetQuery();
    		psq.setParkingId(p.get(i).getParkingId());
    		psq.setCurPage(0);
    		psq.setItemsPrePage(10000);
    		p.get(i).setSetNum(parkingSetDao.queryParkingSet(psq).size());
    		
    		VehicleQuery vq = new VehicleQuery();
    		vq.setParkingId(p.get(i).getParkingId());
    		vq.setCurPage(0);
    		vq.setItemsPrePage(10000);
    		p.get(i).setVehicleNum(vehicleDao.queryVehicle(vq).size());
    	}
        return p;  
    }
	
    @RequestMapping(value = "/getParkingNum", method = RequestMethod.POST)  
    public Integer getParkingNum(@RequestBody ParkingQuery pq) {  
		pq.setCurPage(0);
		pq.setItemsPrePage(10000);
		
    	ArrayList<Parking> p = parkingDao.queryParking(pq);
        return p.size();  
    }
    
    @RequestMapping(value = "/addParking", method = RequestMethod.POST)  
    public Boolean addParking(@RequestBody Parking p) {      	
        return parkingDao.addParking(p);  
    }
    @RequestMapping(value = "/updateParking", method = RequestMethod.POST)  
    public Boolean updateParking(@RequestBody Parking p) {      	
        return parkingDao.modifyParking(p);  
    }
    @RequestMapping(value = "/deleteParking", method = RequestMethod.POST)  
    public Boolean deleteParking(@RequestBody String parkingId) {      	
        return parkingDao.deleteParking(parkingId);  
    }

    @RequestMapping(value = "/getReportVehicle", method = RequestMethod.POST)  
    public ArrayList<Integer> getReport(@RequestBody String json) {
    	JSONObject jo = JSONObject.fromObject(json);
    	
    	String parkingId = jo.getString("parking");
    	Integer month = jo.getInt("month");
    	String license = jo.getString("license");
    	
    	Integer startTime = 0;
    	Integer endTime = 0;
    	
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date d = new Date();
		Integer year = d.getYear() +1900;
		
		if(month < 0) {
			year -= 1;
			month *= -1;
		}
		String st = year.toString() + "-" + String.format("%02d", month) + "-01";
		String et = year.toString() + "-" + String.format("%02d", month + 1) + "-01";
		try {
			startTime = (int) (sdf.parse(st).getTime() / 1000);
			endTime = (int) (sdf.parse(et).getTime() / 1000);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}      	
    	
    	LogQuery vq = new LogQuery();
    	
    	vq.setType("出车");
    	vq.setParking(parkingId);
    	vq.setLicense(license);
    	vq.setStartTime(startTime);
    	vq.setEndTime(endTime);
    	vq.setItemsPrePage(10000);
    	vq.setCurPage(0);
    	
    	ArrayList<Integer> returnList = new ArrayList<>();
    	ArrayList<Log> logs = logDao.queryLog(vq);
    	
    	for (int i = 0; i < 31; i++, startTime += 86400) {
    		int count = 0;
    		for(int j = 0; j < logs.size(); j++) {
    			int t = logs.get(j).getTime();
    			if (t > startTime && t < startTime + 86400) {
    				count ++;
    			}
    		}
    		
    		returnList.add(count);
    	}
    	
    	System.out.println(logDao.queryLog(vq));
    	
    	return returnList;
    }
    
    
    @RequestMapping(value = "/getReportSet", method = RequestMethod.POST)  
    public ArrayList<Log> getReportSet(@RequestBody String json) {
    	JSONObject jo = JSONObject.fromObject(json);
    	
    	String parkingId = jo.getString("parking");
    	Integer month = jo.getInt("month");
    	String setName = jo.getString("setName");
    	
    	Integer startTime = 0;
    	Integer endTime = 0;
    	
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date d = new Date();
		Integer year = d.getYear() +1900;
		
		if(month < 0) {
			year -= 1;
			month *= -1;
		}
		String st = year.toString() + "-" + String.format("%02d", month) + "-01";
		String et = year.toString() + "-" + String.format("%02d", month + 1) + "-01";
		try {
			startTime = (int) (sdf.parse(st).getTime() / 1000);
			endTime = (int) (sdf.parse(et).getTime() / 1000);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}      	
    	
    	LogQuery vq = new LogQuery();
    	
    	vq.setType("移车");
    	vq.setParking(parkingId);
    	vq.setSet(setName);
    	vq.setItemsPrePage(10000);
    	vq.setCurPage(0);
    	
    	ArrayList<Log> logs = logDao.queryLog(vq);

    	ArrayList<Log> resultList = new ArrayList<Log>();
    	
    	Boolean f = true;
    	Boolean f1 = true;
    	for (int i = 0; i < logs.size(); i++) {
    		
			int t = logs.get(i).getTime();
			if (t > startTime && t < endTime) {
				if (f) {
					f = false;
					if (i - 1 >= 0) {
						logs.get(i-1).setLogId("-1");
						resultList.add(logs.get(i-1));
					}					
				}

				resultList.add(logs.get(i));
				
			}
			if (f1 && t>endTime) {
				f1 =false;
				logs.get(i).setLogId("-2");
				resultList.add(logs.get(i));
			}
    		
    	}
    	
    	System.out.println(logs);
    	
    	return resultList;
    }
    
    @RequestMapping(value = "/autoSpecify", method = RequestMethod.POST)  
    public Boolean autoSpecify(@RequestBody String parkingId) {
    	
        return false;
    }
    
}
