package com.model;

public class ParkingQuery {
	private String name;
	private Integer curPage;
	private Integer itemsPrePage;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
		return "ParkingQuery [name=" + name + ", curPage=" + curPage + ", itemsPrePage=" + itemsPrePage + "]";
	}
	
}
