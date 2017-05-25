package com.model;

public class VehicleQuery {
	private Integer parkingId;
	private String license;
	private String route;
	private String curStat;
	private Integer curPage;
	private Integer itemsPrePage;
	public Integer getParkingId() {
		return parkingId;
	}
	public void setParkingId(Integer parkingId) {
		this.parkingId = parkingId;
	}
	public String getLicense() {
		return license;
	}
	public void setLicense(String license) {
		this.license = license;
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
		return "VehicleQuery [parkingId=" + parkingId + ", license=" + license + ", route=" + route + ", curStat="
				+ curStat + ", curPage=" + curPage + ", itemsPrePage=" + itemsPrePage + "]";
	}
	
	
}
