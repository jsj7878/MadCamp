package org.zerock.domain;

import java.util.Date;
import java.util.List;

import lombok.Data;


//데이터 객체를 생성할 때 lombok을 이용해주면 코딩을 짧게 할 수 있다.
@Data
public class BoardVO {
	private Long bno;
	private String title;
	private String content;
	private String writer;
	private Date regdate;
	private Date updateDate;
	
	private int replyCnt;
	
	private List<BoardAttachVO> attachList;
}
