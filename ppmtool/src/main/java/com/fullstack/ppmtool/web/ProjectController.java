package com.fullstack.ppmtool.web;



import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;








import com.fullstack.ppmtool.domain.Project;
import com.fullstack.ppmtool.services.MapValidationErrorService;
import com.fullstack.ppmtool.services.ProjectService;

@RestController
@RequestMapping("/api/project")
public class ProjectController {
	@Autowired
	private ProjectService projectService;
	@Autowired
	private MapValidationErrorService validationErrorService;;
	
	@PostMapping("")
	public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result){
		ResponseEntity<?> mapValidationService = validationErrorService.mapValidationService(result);
		if(mapValidationService!=null){
			return mapValidationService;
		}
		Project saveOrUpdateProject = projectService.saveOrUpdateProject(project);
		return new ResponseEntity<Project> (saveOrUpdateProject, HttpStatus.CREATED);
	}
}
