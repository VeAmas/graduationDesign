package com.model;

import java.util.ArrayList;

public class Parking {
	private ArrayList<ParkingSet> set;
	private ArrayList<Vehicle> vehicles;
	private String name;
	
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
	
}
