package com.fullstack.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fullstack.ppmtool.domain.Project;
import com.fullstack.ppmtool.exceptions.ProjectIdException;
import com.fullstack.ppmtool.repositories.ProjectRepositories;

@Service
public class ProjectService {
	@Autowired
	private ProjectRepositories projectRepository;
	
	public Project saveOrUpdateProject(Project project){
		try{
			return projectRepository.save(project);
		}catch(Exception e){
			throw new ProjectIdException("Project Id: '"+ project.getProjectIdentifier().toUpperCase()+"' already exist");
		}
	}
}
