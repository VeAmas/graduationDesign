package com.model;

public class UserQuery {
	private String name;
	private String userType;
	private String gender;
	private Integer curPage;
	private Integer itemsPrePage;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
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
	@Override
	public String toString() {
		return "UserQuery [name=" + name + ", userType=" + userType + ", gender=" + gender + ", curPage=" + curPage
				+ ", itemsPrePage=" + itemsPrePage + "]";
	}
	
}
