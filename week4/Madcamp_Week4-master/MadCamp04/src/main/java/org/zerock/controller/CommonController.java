package org.zerock.controller;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.zerock.domain.BoardVO;
import org.zerock.domain.MemberVO;
import org.zerock.service.MemberService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@AllArgsConstructor
public class CommonController {
	
	private MemberService mservice;
	
	@GetMapping("/accessError")
	public void accessDenied(Authentication auth, Model model) {
		log.info("access denied: " + auth);
		model.addAttribute("msg", "Access Denied");
	}

	@GetMapping("/customLogin")
	public void loginInput(String error, String logout, Model model) {

		log.info("error: " + error);
		log.info("logout: " + logout);

		if (error != null) {
			model.addAttribute("error", "Login Error Check Your Account");
		}

		if (logout != null) {
			model.addAttribute("logout", "Logout!!");
		}
	}
	@GetMapping("/customLogout")
	public void logoutGET() {
		log.info("custom logout");
	}
	
	@GetMapping("/new")
	public void newGET() {
		log.info("register get==========================");
	}
	
	@PostMapping("/new")
	public String newPOST(MemberVO member) {
		log.info("register post");
		
		mservice.add(member);
		
		return "redirect:/customLogin";
	}
}
