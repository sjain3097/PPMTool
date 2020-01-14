package com.fullstack.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fullstack.ppmtool.domain.Backlog;
import com.fullstack.ppmtool.domain.Project;
import com.fullstack.ppmtool.domain.User;
import com.fullstack.ppmtool.exceptions.ProjectIdException;
import com.fullstack.ppmtool.exceptions.ProjectNotFoundException;
import com.fullstack.ppmtool.repositories.ProjectRepository;
import com.fullstack.ppmtool.repositories.UserRepository;

@Service
public class ProjectService {
	@Autowired
	private ProjectRepository projectRepository;
	@Autowired
	private UserRepository userRepository;
	
	public Project saveProject(Project project, String username){
		try{
			User user = userRepository.findByUsername(username);
			
			project.setUser(user);
			project.setProjectLeader(user.getUsername());
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
	
	public Project findByIdentifier(String projectId, String username){	
		Project project = projectRepository.findByProjectIdentifier(projectId);
		if(project==null){
			throw new ProjectIdException("Project Id: '"+ projectId+"' does not exist");
		}
		if(!project.getProjectLeader().equals(username)){
			throw new ProjectNotFoundException("No such Project: "+project.getProjectIdentifier()+" exist in your account");
		}
		return project;
	}
	
	public Iterable<Project> findAllProjects(String username){
		return projectRepository.findAllByProjectLeader(username);
	}
	public void deleteProjectByIdentifier(String projectId, String username){
		
		projectRepository.delete(findByIdentifier(projectId, username));
	}
	public Project updateByProjectId(Project project, String projectId, String username){
			Project updateProject = projectRepository.findByProjectIdentifier(projectId);
			if(updateProject == null){
				throw new ProjectIdException("This Project id: '"+projectId+"' does not exist");
			}
			if(!updateProject.getProjectLeader().equals(username)){
				throw new ProjectNotFoundException("Project: "+updateProject.getProjectIdentifier()+" does not exists");
			}
			updateProject.setDescription(project.getDescription());
			updateProject.setProjectName(project.getProjectName());
			updateProject.setStartDate(project.getStartDate());
			updateProject.setEndDate(project.getEndDate());
			return projectRepository.save(updateProject);
		
	}
}
