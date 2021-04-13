package com.socket.service;

import org.springframework.data.domain.Page;

import com.socket.jpa.entity.UserEntity;

public interface IUserService {

	public Page<UserEntity> getUsers(int page, int size);
	
	public UserEntity saveUsers( UserEntity userEntity );
	
	public void deleteUsers( int id);
}
