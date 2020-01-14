package com.fullstack.ppmtool.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.fullstack.ppmtool.security.SecurityConstants.TOKEN_PREFIX;

import com.fullstack.ppmtool.domain.User;
import com.fullstack.ppmtool.payload.JWTLoginSuccessResponse;
import com.fullstack.ppmtool.payload.LoginRequest;
import com.fullstack.ppmtool.security.JwtTokenProvider;
import com.fullstack.ppmtool.services.MapValidationErrorService;
import com.fullstack.ppmtool.services.UserService;
import com.fullstack.ppmtool.validator.UserValidator;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	@Autowired
	private UserService userService;
	@Autowired
	private UserValidator userValidator;
	@Autowired
	private JwtTokenProvider tokenProvider;
	@Autowired
	private MapValidationErrorService errorService;
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
		ResponseEntity<?> errorMap = errorService.mapValidationService(result);
		if(errorMap != null ){
			return errorMap;
		}
		Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							loginRequest.getUsername(),
							loginRequest.getPassword()
					)
				);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);
		return new ResponseEntity<Object>(new JWTLoginSuccessResponse(true, jwt), HttpStatus.OK);
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
		userValidator.validate(user, result);
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
		if(errorMap!=null){
			return errorMap;
		}
		
		User newUser = userService.saveUser(user);
		return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
		
	}
}
