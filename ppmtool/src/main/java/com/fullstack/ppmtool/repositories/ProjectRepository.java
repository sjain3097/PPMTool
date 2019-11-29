package com.fullstack.ppmtool.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.fullstack.ppmtool.domain.Project;
@Repository
public interface ProjectRepository extends CrudRepository<Project, Long>{
	Iterable<Project> findAllById(Iterable<Long> iterable );
	Project findByProjectIdentifier(String projectId);
	
	@Override
	public Iterable<Project> findAll();
	
}
