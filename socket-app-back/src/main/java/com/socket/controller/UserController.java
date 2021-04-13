package com.socket.controller;

import org.springframework.data.domain.Page;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.socket.jpa.entity.UserEntity;
import com.socket.service.IUserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

	private IUserService userService;
	private SimpMessagingTemplate template;

	public UserController(IUserService userService, SimpMessagingTemplate template) {
		this.userService = userService;
		this.template = template;
	}

	@GetMapping
	public Page<UserEntity> getUsers(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "2") int size) {
		return this.userService.getUsers(page, size);
	}

	@PostMapping
	public UserEntity saveUsers(@RequestBody UserEntity userEntity) {
		if( userEntity.getId() == null ) {
			this.template.convertAndSend("/socket/user-created", "New user was created");
		} else {
			this.template.convertAndSend("/socket/user-created", "An user was updated");
		}
		return this.userService.saveUsers(userEntity);
	}

	@DeleteMapping("/{id}")
	public void saveUsers(@PathVariable int id) {
		this.template.convertAndSend("/socket/user-deleted","An user was deleted");
		this.userService.deleteUsers(id);
	}
}
