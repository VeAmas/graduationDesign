package com.model;

public class ParkingSet {
    private String name;
    private String available;
    private Vehicle curVehicle;
    private String lastRecordTime;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAvailable() {
		return available;
	}
	public void setAvailable(String available) {
		this.available = available;
	}
	public Vehicle getCurVehicle() {
		return curVehicle;
	}
	public void setCurVehicle(Vehicle curVehicle) {
		this.curVehicle = curVehicle;
	}
	public String getLastRecordTime() {
		return lastRecordTime;
	}
	public void setLastRecordTime(String lastRecordTime) {
		this.lastRecordTime = lastRecordTime;
	}
    
    
}
