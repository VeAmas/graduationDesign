package com.model;

public class Vehicle {
    private String route;
    private String license;
    private String photo;
    private String model;
    private Integer purchasedDate;
    private String maintenance;
    private String km;
    private Integer lastRecordTime;
    private String curStat;
    
	public String getRoute() {
		return route;
	}
	public void setRoute(String route) {
		this.route = route;
	}
	public String getLicense() {
		return license;
	}
	public void setLicense(String license) {
		this.license = license;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public Integer getPurchasedDate() {
		return purchasedDate;
	}
	public void setPurchasedDate(Integer purchasedDate) {
		this.purchasedDate = purchasedDate;
	}
	public String getMaintenance() {
		return maintenance;
	}
	public void setMaintenance(String maintenance) {
		this.maintenance = maintenance;
	}
	public String getKm() {
		return km;
	}
	public void setKm(String km) {
		this.km = km;
	}
	public Integer getLastRecordTime() {
		return lastRecordTime;
	}
	public void setLastRecordTime(Integer lastRecordTime) {
		this.lastRecordTime = lastRecordTime;
	}
	public String getCurStat() {
		return curStat;
	}
	public void setCurStat(String curStat) {
		this.curStat = curStat;
	}
}
