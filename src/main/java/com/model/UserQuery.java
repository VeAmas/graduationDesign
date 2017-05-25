package com.model;

public class UserQuery {
	private Integer parkingId;
	private String name;
	private String route;
	private String curStat;
	private String gender;
	private Integer curPage;
	private Integer itemsPrePage;
	public Integer getParkingId() {
		return parkingId;
	}
	public void setParkingId(Integer parkingId) {
		this.parkingId = parkingId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getRoute() {
		return route;
	}
	public void setRoute(String route) {
		this.route = route;
	}
	public String getCurStat() {
		return curStat;
	}
	public void setCurStat(String curStat) {
		this.curStat = curStat;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
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
	
	
}
