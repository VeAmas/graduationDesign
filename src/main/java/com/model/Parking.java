package com.model;

import java.util.ArrayList;

public class Parking {
	private Integer parkingId;
	private ArrayList<ParkingSet> set;
	private ArrayList<Vehicle> vehicles;
	private String name;
	private String address;
	
	public ArrayList<ParkingSet> getSet() {
		return set;
	}
	public void setSet(ArrayList<ParkingSet> set) {
		this.set = set;
	}
	public ArrayList<Vehicle> getVehicles() {
		return vehicles;
	}
	public void setVehicles(ArrayList<Vehicle> vehicles) {
		this.vehicles = vehicles;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getParkingId() {
		return parkingId;
	}
	public void setParkingId(Integer parkingId) {
		this.parkingId = parkingId;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	@Override
	public String toString() {
		return "Parking [parkingId=" + parkingId + ", set=" + set + ", vehicles=" + vehicles + ", name=" + name
				+ ", address=" + address + "]";
	}
	
}
