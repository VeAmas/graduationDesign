package com.model;

public class SceneData {
	private String parkingId;
	private String data;
	
	
	public String getParkingId() {
		return parkingId;
	}
	public void setParkingId(String parkingId) {
		this.parkingId = parkingId;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	@Override
	public String toString() {
		return "SceneData [parkingId=" + parkingId + ", data=" + data + "]";
	}
	
	
}
