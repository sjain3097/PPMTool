package com.fullstack.ppmtool.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.ppmtool.services.ProjectService;

@RestController
@RequestMapping("/api/project")
public class ProjectController {
	@Autowired
	private ProjectService projectService;
	
}
