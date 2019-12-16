package com.fullstack.ppmtool.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

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
	//validate the token
	public boolean validateToken(String token){
		try{
			Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
			return true;
		}catch(SignatureException ex){
			System.out.println("Invalid JWT signature");
		}catch(MalformedJwtException ex){
			System.out.println("Invalid JWT token");
		}catch (ExpiredJwtException ex) {
			System.out.println("Expired JWT token");
		}catch(UnsupportedJwtException ex){
			System.out.println("Unsupported JWT token");
		}catch (IllegalArgumentException ex) {
			System.out.println("JWT claims string is empty");
		}
		return false;
	}
	
	//Get userId from token
	public Long getUserIdFromJWT(String token){
		Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
		Long id = Long.parseLong((String) claims.get("id"));
		return id;
	}
}
