package com.fullstack.ppmtool.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import com.fullstack.ppmtool.domain.User;

@Component
public class UserValidator implements Validator{

	@Override
	public boolean supports(Class<?> aClass) {
		return User.class.equals(aClass);
	}

	@Override
	public void validate(Object object, Errors errors) {
		User user = (User) object;
		if(user.getPassword() == null){
			return;
		}
		if(user.getPassword().length()<6){
			errors.rejectValue("password", "Length", "Password must be atleast 6 characters" );
		}
		if(!user.getPassword().equals(user.getConfirmPassword())){
			errors.rejectValue("confirmPassword", "Match", "Passwords must match");
		}
	}

}
