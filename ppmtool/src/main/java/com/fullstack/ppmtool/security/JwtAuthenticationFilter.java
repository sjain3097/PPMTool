package com.fullstack.ppmtool.security;


import java.io.IOException;
import java.util.Collections;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.fullstack.ppmtool.security.SecurityConstants.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fullstack.ppmtool.domain.User;
import com.fullstack.ppmtool.services.CustomUserDetailService;

public class JwtAuthenticationFilter extends OncePerRequestFilter{

	@Autowired
	private JwtTokenProvider tokenProvider;
	@Autowired
	private CustomUserDetailService userDetailService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try{
				String jwt = getJwtFromRequest(request);
				if(StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)){
					Long userId = tokenProvider.getUserIdFromJWT(jwt);
					User userDetails =  userDetailService.loadUserById(userId);
					UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
							userDetails, null, Collections.emptyList());
					auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					SecurityContextHolder.getContext().setAuthentication(auth);
				}
					
		}catch(Exception ex){
			logger.error("Could not set user authentidcation in security context");
		}
		
		filterChain.doFilter(request, response);
	}
	
	private String getJwtFromRequest(HttpServletRequest request){
		String bearerToken = request.getHeader(HEADER_STRING);
		if(StringUtils.hasText(bearerToken)&&bearerToken.startsWith(TOKEN_PREFIX)){
			return bearerToken.substring(7, bearerToken.length());
		}
		return null;
	}

}
