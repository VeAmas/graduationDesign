package com.model;

public class VehicleQuery {
	private String route;
    private Integer parkingId;
    private String curStat;
    
	public String getRoute() {
		return route;
	}
	public void setRoute(String route) {
		this.route = route;
	}
	public Integer getParkingId() {
		return parkingId;
	}
	public void setParkingId(Integer parkingId) {
		this.parkingId = parkingId;
	}
	public String getCurStat() {
		return curStat;
	}
	public void setCurStat(String curStat) {
		this.curStat = curStat;
	}
}
