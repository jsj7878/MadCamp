package org.zerock.service;

import java.util.List;

import org.zerock.domain.CrawlingInfo;

public interface StaticService {
	
	public void updateStatic(Integer value, String key);
	
	public List<CrawlingInfo> getInfoList();
	
	public void insertStatic(CrawlingInfo insertedInfo);
		
}
