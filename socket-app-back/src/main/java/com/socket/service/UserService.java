package com.socket.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.socket.jpa.entity.UserEntity;
import com.socket.jpa.repository.UserRepository;

@Service
public class UserService implements IUserService {

	private UserRepository repository;

	public UserService(UserRepository repository) {
		this.repository = repository;
	}

	@Override
	public Page<UserEntity> getUsers(int page, int size) {
		return this.repository.findAll(PageRequest.of(page, size, Sort.by("id").ascending()));
	}

	@Override
	public UserEntity saveUsers(UserEntity userEntity) {
		return this.repository.save(userEntity);
	}

	@Override
	public void deleteUsers(int id) {
		this.repository.deleteById(Long.valueOf(id));
	}
}
