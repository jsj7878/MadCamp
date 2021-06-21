package org.zerock.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.zerock.domain.CrawlingInfo;
import org.zerock.service.StaticService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/static/*")
@AllArgsConstructor
public class StaticController {
	
	private StaticService service;
	
	
	@GetMapping("list")
	public void list(Model model) {
		List<CrawlingInfo> InfoList =service.getInfoList();
		model.addAttribute("crawlingInfo", InfoList);
		log.info("getList!");
		log.info(InfoList.size());
		log.info(InfoList.get(0));
		log.info(InfoList.get(0));
	}
	
	@PostMapping("take") 
	public void take(@Validated @RequestBody MultiValueMap<String, Object> newInfo ){ 
		Set<String>newInfoKeySet =  newInfo.keySet();

		Collection<List<Object>> newInfoValueSet = newInfo.values();
		Iterator<String> it = newInfoKeySet.iterator();
		Iterator<List<Object>> it2 = newInfoValueSet.iterator();
		
		while(it.hasNext()){
			String key = it.next();
			List<Object> value = it2.next();
			CrawlingInfo insertedInfo = new CrawlingInfo(key,Integer.parseInt(value.get(0).toString()));
			service.insertStatic(insertedInfo);
			
		}
		
	}
	
	@GetMapping("learn")
	public void learn(Model model){
		List<CrawlingInfo> InfoList =service.getInfoList();
		model.addAttribute("crawlingInfo", InfoList);
	}
	
	
	
	
}
