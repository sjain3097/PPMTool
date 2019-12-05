package com.fullstack.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fullstack.ppmtool.domain.Backlog;
import com.fullstack.ppmtool.domain.Project;
import com.fullstack.ppmtool.exceptions.ProjectIdException;
import com.fullstack.ppmtool.repositories.ProjectRepository;

@Service
public class ProjectService {
	@Autowired
	private ProjectRepository projectRepository;
	
	public Project saveProject(Project project){
		try{
			project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
			if(project.getId()==null){
				Backlog backlog = new Backlog(); 
				project.setBacklog(backlog);
				backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
				backlog.setProject(project);
			}
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
	public Project deleteProjectByIdentifier(String projectId){
		Project project= projectRepository.findByProjectIdentifier(projectId);
		if(project == null){
			throw new ProjectIdException("This Project id: '"+projectId+"' does not exist and thus cannot delete it");
		}
		projectRepository.delete(project);
		return project;
	}
	public Project updateByProjectId(Project project, String projectId){
			Project updateProject = projectRepository.findByProjectIdentifier(projectId);
			if(updateProject == null){
				throw new ProjectIdException("This Project id: '"+projectId+"' does not exist");
			}
			updateProject.setDescription(project.getDescription());
			updateProject.setProjectName(project.getProjectName());
			updateProject.setStartDate(project.getStartDate());
			updateProject.setEndDate(project.getEndDate());
			return projectRepository.save(updateProject);
		
	}
}
