package com.fullstack.ppmtool.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import static com.fullstack.ppmtool.security.SecurityConstants.*;
import com.fullstack.ppmtool.domain.User;

@Component
public class JwtTokenProvider {
	public String generateToken(Authentication authentication){
		User user = (User)authentication.getPrincipal();
		Date now = new Date(System.currentTimeMillis());
		Date expiryDate = new Date(now.getTime()+EXPIRATION_TIME);
		String userId = Long.toString(user.getId());
		Map< String, Object> claims = new HashMap<String, Object>();
		claims.put("id", userId);
		claims.put("username", user.getUsername());
		claims.put("fullName", user.getFullName());
		return Jwts.builder()
				.setSubject(userId)
				.setClaims(claims)
				.setIssuedAt(now)
				.setExpiration(expiryDate)
				.signWith(SignatureAlgorithm.HS512, SECRET_KEY)
				.compact();
				
	}
}
