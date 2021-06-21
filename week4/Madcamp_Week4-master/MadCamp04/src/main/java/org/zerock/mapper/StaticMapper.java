package org.zerock.mapper;

import java.util.List;

import org.zerock.domain.CrawlingInfo;

public interface StaticMapper {
	
	public List<CrawlingInfo> getList();
	
	//public void insert(Integer value, String key);
	
	public int update(Integer value, String key);

	public void insert(CrawlingInfo insertedInfo);
	
}
