package org.zerock.domain;


import lombok.Data;

@Data
public class CrawlingInfo {
	private String name;
	private Integer number;

	public CrawlingInfo(String name, Integer number) {
		this.name = name;
		this.number = number;
	}
}
