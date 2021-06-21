package org.zerock.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.zerock.domain.BoardVO;
import org.zerock.domain.Criteria;
import org.zerock.domain.PageDTO;

import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class BoardMapperTests {
	@Autowired
	private BoardMapper boardMapper;
	
	@Test
	public void testGetList() {
		log.info("-----------------------");
		boardMapper.getList();
		
	}
	//key값을 알고 값을 넣는게 아니기 때문에 getbno하면 null이 나온다.
	@Test
	public void testInsert() {
		
		BoardVO vo = new BoardVO();
		vo.setTitle("aaatest 제목");
		vo.setContent("bbbtest 내용");
		vo.setWriter("ccctest 저자");
		
		boardMapper.insert(vo);
		log.info("-------------------------");
		log.info("after insert " + vo.getBno());
	}
	
	@Test
	public void testSelectKey() {
		
		BoardVO vo = new BoardVO();
		vo.setTitle("aaatest 제목");
		vo.setContent("bbbtest 내용");
		vo.setWriter("ccctest 저자");
		
		boardMapper.insertSelectKey(vo);
		log.info("-------------------------");
		log.info("after insert " + vo.getBno());
	}
	
	@Test
	public void testRead() {
		
		BoardVO vo = boardMapper.read(9L);
		log.info(vo);
		
	}
	
	@Test
	public void testDelete() {
		
		int count = boardMapper.delete(1L);
		log.info("COUNT = " + count);
		
	}
	
	@Test
	public void testUpdate() {
		BoardVO vo = new BoardVO();
		vo.setBno(9L);
		vo.setContent("수정한 내용");
		vo.setTitle("수정한 제목");
		vo.setWriter("수정한 저자");
	
		log.info("COUNT = " + boardMapper.update(vo));
		
	}
	
	@Test
	public void testPaging() {
		Criteria cri = new Criteria();
		
		List<BoardVO> list = boardMapper.getListWithPaging(cri);
		
		list.forEach(b -> log.info(b));
	}
	
	@Test
	public void testPageDTO() {
		
		Criteria cri = new Criteria();
		cri.setPageNum(21);
		
		PageDTO pageDTO = new PageDTO(cri, 250);
		
		log.info(pageDTO);
	}
}
