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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;















import com.fullstack.ppmtool.domain.Project;
import com.fullstack.ppmtool.repositories.ProjectRepository;
import com.fullstack.ppmtool.services.MapValidationErrorService;
import com.fullstack.ppmtool.services.ProjectService;

@RestController
@RequestMapping("/api/project")
@CrossOrigin
public class ProjectController {
	@Autowired
	private ProjectService projectService;
	@Autowired
	private MapValidationErrorService validationErrorService;;
	
	@PostMapping("")
	public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result, Principal principal){
		//System.out.println(principal+"+++++++++++++++++++++++++++++++++++++++++");
		ResponseEntity<?> mapValidationService = validationErrorService.mapValidationService(result);
		if(mapValidationService!=null){
			return mapValidationService;
		}
		Project saveOrUpdateProject = projectService.saveProject(project, principal.getName());
		return new ResponseEntity<Project> (saveOrUpdateProject, HttpStatus.CREATED);
	}
	
	@GetMapping("/{projectId}")
	public ResponseEntity<?> getProjectById(@PathVariable("projectId") String projectId, Principal principal){
		Project project = projectService.findByIdentifier(projectId.toUpperCase(), principal.getName());
		return new ResponseEntity<Project> (project, HttpStatus.OK);
	}
	
	@GetMapping("/all")
	public Iterable<Project> getAllProjects(Principal principal){
		return projectService.findAllProjects(principal.getName());
	}
	
	@DeleteMapping("/{projectId}")
	public ResponseEntity<?> deleteProjectById(@PathVariable("projectId") String projectId ,Principal principal){
		projectService.deleteProjectByIdentifier(projectId.toUpperCase(), principal.getName());
		return new ResponseEntity<String>("Project: "+projectId +" is deleted", HttpStatus.OK);
	}
	
	@PutMapping("")
	public ResponseEntity<?> updateProjectById(@Valid @RequestBody Project project,  BindingResult result,  Principal principal){
		ResponseEntity<?> mapValidationService = validationErrorService.mapValidationService(result);
		if(mapValidationService!=null){
			return mapValidationService;
		}
		Project updatedProject = projectService.updateByProjectId(project, project.getProjectIdentifier().toUpperCase(), principal.getName());
		return new ResponseEntity<Project>(updatedProject, HttpStatus.OK);
	}
}
