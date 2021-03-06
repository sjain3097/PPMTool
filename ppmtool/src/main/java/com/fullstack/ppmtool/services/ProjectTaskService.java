package com.fullstack.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fullstack.ppmtool.domain.Backlog;
import com.fullstack.ppmtool.domain.Project;
import com.fullstack.ppmtool.domain.ProjectTask;
import com.fullstack.ppmtool.exceptions.ProjectIdException;
import com.fullstack.ppmtool.exceptions.ProjectNotFoundException;
import com.fullstack.ppmtool.repositories.BacklogRepository;
import com.fullstack.ppmtool.repositories.ProjectRepository;
import com.fullstack.ppmtool.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {
	 @Autowired
	 private BacklogRepository backlogRepository;
	 @Autowired
	 private ProjectTaskRepository projectTaskRepository;
	 @Autowired
	 private ProjectRepository projectRepository;
	 @Autowired
	 private ProjectService projectService;
	 public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask, String username){
			 Backlog backlog = projectService.findByIdentifier(projectIdentifier, username).getBacklog();//backlogRepository.findByProjectIdentifier(projectIdentifier);
			 projectTask.setBacklog(backlog);
			 Integer BacklogSequence = backlog.getPTSequence();
			 BacklogSequence++;
			 backlog.setPTSequence(BacklogSequence);
			 projectTask.setProjectSequence(projectIdentifier+"-"+BacklogSequence);
			 projectTask.setProjectIdentifier(projectIdentifier);
			 if(projectTask.getPriority()==null || projectTask.getPriority()==0 ){
				 projectTask.setPriority(3);
			 }
			 if(projectTask.getStatus()=="" || projectTask.getStatus()==null){
				 projectTask.setStatus("TO_DO");
			 }
			 return projectTaskRepository.save(projectTask);
		
	 }
	 
	 public Iterable<ProjectTask> findBacklogById(String id, String username){
		 projectService.findByIdentifier(id, username);
		 return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
	 }
	 
	 public ProjectTask findByPTProjectSequence(String backlog_id, String pt_id, String username){
		 	projectService.findByIdentifier(backlog_id, username);
			ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_id);
			if(projectTask == null){
				throw new ProjectNotFoundException("project task does not exist");
			}
			if(!projectTask.getProjectIdentifier().equals(backlog_id) ){
				throw new ProjectNotFoundException("Project_task "+pt_id+" does not exist in Project "+backlog_id);
			}
		 ProjectTask projectTask1 = projectTaskRepository.findByProjectSequence(pt_id);
		 return projectTask1;
	 }
	 
	 public ProjectTask updatePTbyProjectSequence(ProjectTask updatedTask, String backlog_id, String pt_id, 
			 String username){
		projectService.findByIdentifier(backlog_id, username);
		ProjectTask projectTask = findByPTProjectSequence(backlog_id, pt_id, username);
		projectTask = updatedTask;
		return projectTaskRepository.save(projectTask);
	 }
	 
	 public void deletePTByProjectSequence(String backlog_id, String pt_id, String username) {
		 projectService.findByIdentifier(backlog_id, username);
		 ProjectTask projectTask = findByPTProjectSequence(backlog_id, pt_id, username);
		 projectTaskRepository.delete(projectTask);
	 }
}
