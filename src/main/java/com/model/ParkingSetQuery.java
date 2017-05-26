package com.model;

public class ParkingSetQuery {
	private String name;
	private Integer parkingId;
	private String available;
	private Integer curPage;
	private Integer itemsPrePage;
	
	
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
	public String getAvailable() {
		return available;
	}
	public void setAvailable(String available) {
		this.available = available;
	}
	public Integer getCurPage() {
		return curPage;
	}
	public void setCurPage(Integer curPage) {
		this.curPage = curPage;
	}
	public Integer getItemsPrePage() {
		return itemsPrePage;
	}
	public void setItemsPrePage(Integer itemsPrePage) {
		this.itemsPrePage = itemsPrePage;
	}
	@Override
	public String toString() {
		return "ParkingSetQuery [name=" + name + ", parkingId=" + parkingId + ", available=" + available + ", curPage="
				+ curPage + ", itemsPrePage=" + itemsPrePage + "]";
	}	
}
