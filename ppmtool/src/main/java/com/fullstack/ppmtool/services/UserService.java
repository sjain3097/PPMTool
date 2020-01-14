package com.fullstack.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.fullstack.ppmtool.domain.User;
import com.fullstack.ppmtool.exceptions.UsernameExistException;
import com.fullstack.ppmtool.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public User saveUser(User newUser){
		try {
			newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
			newUser.setConfirmPassword(null);
			return userRepository.save(newUser);			
		} catch (Exception e) {
			throw new UsernameExistException(newUser.getUsername() + " already exists");
		}

	}
}
