package org.zerock.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.zerock.domain.BoardVO;
import org.zerock.service.BoardService;

import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class BoardServiceTests {
	@Autowired
	private BoardService boardService;
	
	@Test
	public void testPrint() {
		log.info(boardService);
	}
	
	@Test
	public void testServiceInsert() {
		
		BoardVO vo = new BoardVO();
		vo.setTitle("servicetest 제목");
		vo.setContent("servicetest 내용");
		vo.setWriter("servicetest 저자");
		
		boardService.register(vo);
		log.info("-------------------------");
		log.info("after insert " + vo.getBno());
	}
	
	/*
	 * @Test public void testServiceGetList() { boardService.getList().forEach(board
	 * -> log.info(board));
	 * 
	 * }
	 * 
	 * @Test public void testServiceSelectKey() {
	 * 
	 * BoardVO vo = new BoardVO(); vo.setTitle("servicetest 제목");
	 * vo.setContent("servicetest 내용"); vo.setWriter("servicetest 저자");
	 * 
	 * long count = boardService.register(vo); log.info("--------삽입 행의 bno는" + count
	 * + "이다.--------"); log.info("after insert " + vo.getBno()); }
	 */
	
	@Test
	public void testServiceRemove() {
		
		log.info(boardService.remove(24L) + "-------------------삭제 완료---------------------");
	}

}
