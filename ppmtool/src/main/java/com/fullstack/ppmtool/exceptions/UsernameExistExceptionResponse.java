package com.fullstack.ppmtool.exceptions;


public class UsernameExistExceptionResponse {
		private String username;

		public UsernameExistExceptionResponse(String username) {
			super();
			this.username = username;
		}

		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}
		
}
