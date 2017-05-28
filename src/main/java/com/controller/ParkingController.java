package com.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.model.Parking;
import com.model.ParkingQuery;
import com.model.ParkingSetQuery;
import com.model.VehicleQuery;
import com.serviceImpl.ParkingDaoImpl;
import com.serviceImpl.ParkingSetDaoImpl;
import com.serviceImpl.VehicleDaoImpl;

@RestController  
@RequestMapping(value = "/parking")  
public class ParkingController {

	@Autowired
	ParkingDaoImpl parkingDao;
	
	@Autowired
	ParkingSetDaoImpl parkingSetDao;
	
	@Autowired
	VehicleDaoImpl vehicleDao;
	
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
}
