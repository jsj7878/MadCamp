package org.zerock.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.zerock.domain.CrawlingInfo;
import org.zerock.mapper.StaticMapper;

import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.extern.log4j.Log4j;


@Log4j
@Service
@AllArgsConstructor
public class StaticServiceImpl implements StaticService {
	
	@Setter(onMethod_ = @Autowired)
	private StaticMapper mapper;
	
	public void updateStatic(Integer value, String key) {
		
		log.info("updateStatic..." + value + key);
		
		mapper.update(value, key);
		
	}
	
	
	public List<CrawlingInfo> getInfoList(){
		
		log.info("getStaticList...");
		
		return mapper.getList();
		
	}
	
	public void insertStatic(CrawlingInfo insertedInfo) {
		log.info("insertStatic..."+ insertedInfo);
		mapper.insert(insertedInfo);
	}
		
	
}
