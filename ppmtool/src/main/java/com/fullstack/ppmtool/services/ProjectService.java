package com.fullstack.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fullstack.ppmtool.repositories.ProjectRepositories;

@Service
public class ProjectService {
	@Autowired
	private ProjectRepositories projectRepository;
	
	public Project saveOrUpdateProject(Project project){
		return projectRepository.save(project);
	}
}
