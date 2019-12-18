package com.fullstack.ppmtool.web;

import java.security.Principal;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.ppmtool.domain.Backlog;
import com.fullstack.ppmtool.domain.ProjectTask;
import com.fullstack.ppmtool.exceptions.ProjectNotFoundException;
import com.fullstack.ppmtool.repositories.BacklogRepository;
import com.fullstack.ppmtool.services.MapValidationErrorService;
import com.fullstack.ppmtool.services.ProjectTaskService;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {
	@Autowired
	private ProjectTaskService projectTaskService;
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@PostMapping("/{backlog_id}")
	public ResponseEntity<?> addPTtoBacklog(@Valid @RequestBody ProjectTask projectTask, 
				BindingResult result, @PathVariable String backlog_id, Principal principal){
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
		if(errorMap != null) return errorMap;
		ProjectTask projectTask1 = projectTaskService.addProjectTask(backlog_id, projectTask, principal.getName());
		return new ResponseEntity<ProjectTask>(projectTask1, HttpStatus.OK);
	}
	
	@GetMapping("/{backlog_id}")
	public ResponseEntity<Iterable<ProjectTask>> getProjectBacklog(@PathVariable String backlog_id, Principal principal){
		return new ResponseEntity<Iterable<ProjectTask>>(projectTaskService.findBacklogById(backlog_id, principal.getName()), HttpStatus.OK);
	}
	@GetMapping("/{backlog_id}/{project_sequence}")
	public ResponseEntity<ProjectTask> getProjectTask(@PathVariable("backlog_id") String backlog_id, 
			@PathVariable("project_sequence") String project_sequence, Principal principal){
		return new ResponseEntity<ProjectTask>(projectTaskService.findByPTProjectSequence(backlog_id, project_sequence, principal.getName()), HttpStatus.OK);
	}
	
	@PatchMapping("/{backlog_id}/{pt_id}")
	public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask,
			BindingResult result,@PathVariable String backlog_id, @PathVariable String pt_id,
			Principal principal ){
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
		if(errorMap != null) return errorMap;
		
		ProjectTask updateProject = projectTaskService.updatePTbyProjectSequence(projectTask, backlog_id, pt_id, 
				principal.getName());
		return new ResponseEntity<ProjectTask>(updateProject, HttpStatus.OK);
	}
	@DeleteMapping("/{backlog_id}/{pt_id}")
	public ResponseEntity<?> deleteProjectTask(@PathVariable String backlog_id, @PathVariable String pt_id, Principal principal){
		projectTaskService.deletePTByProjectSequence(backlog_id, pt_id, principal.getName());
		return new ResponseEntity<String>("projectTask:"+pt_id+" was deleted successfully", HttpStatus.OK);
	}
}
