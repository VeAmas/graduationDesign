package com.model;

public class ParkingSet {
	private Integer setId;
	private String name;
    private String available;
    private String curVehicle;
    private String parkingId;
    private Integer lastRecordTime;

    public Integer getSetId() {
		return setId;
	}
	public void setSetId(Integer setId) {
		this.setId = setId;
	}
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
	public String getCurVehicle() {
		return curVehicle;
	}
	public void setCurVehicle(String curVehicle) {
		this.curVehicle = curVehicle;
	}
	public Integer getLastRecordTime() {
		return lastRecordTime;
	}
	public void setLastRecordTime(Integer lastRecordTime) {
		this.lastRecordTime = lastRecordTime;
	}
	public String getParkingId() {
		return parkingId;
	}
	public void setParkingId(String parkingId) {
		this.parkingId = parkingId;
	}
	@Override
	public String toString() {
		return "ParkingSet [setId=" + setId + ", name=" + name + ", available=" + available + ", curVehicle="
				+ curVehicle + ", parkingId=" + parkingId + ", lastRecordTime=" + lastRecordTime + "]";
	}
    
}
