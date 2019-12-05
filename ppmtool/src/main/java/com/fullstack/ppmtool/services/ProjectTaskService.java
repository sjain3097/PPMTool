package com.fullstack.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fullstack.ppmtool.domain.Backlog;
import com.fullstack.ppmtool.domain.ProjectTask;
import com.fullstack.ppmtool.repositories.BacklogRepository;
import com.fullstack.ppmtool.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {
	 @Autowired
	 private BacklogRepository backlogRepository;
	 @Autowired
	 private ProjectTaskRepository projectTaskRepository;
	 
	 public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask){
		 Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
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
}
