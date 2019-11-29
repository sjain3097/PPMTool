package com.fullstack.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fullstack.ppmtool.domain.Project;
import com.fullstack.ppmtool.exceptions.ProjectIdException;
import com.fullstack.ppmtool.repositories.ProjectRepository;

@Service
public class ProjectService {
	@Autowired
	private ProjectRepository projectRepository;
	
	public Project saveOrUpdateProject(Project project){
		try{
			return projectRepository.save(project);
		}catch(Exception e){
			throw new ProjectIdException("Project Id: '"+ project.getProjectIdentifier().toUpperCase()+"' already exist");
		}
	}
	
	public Project findByIdentifier(String projectId){	
		Project project = projectRepository.findByProjectIdentifier(projectId);
		if(project==null){
			throw new ProjectIdException("Project Id: '"+ projectId+"' does not exist");
		}
		return project;
	}
	
	public Iterable<Project> findAllProjects(){
		return projectRepository.findAll();
	}
}
