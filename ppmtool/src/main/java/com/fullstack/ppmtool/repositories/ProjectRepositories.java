package com.fullstack.ppmtool.repositories;

import org.springframework.data.repository.CrudRepository;

import com.fullstack.ppmtool.domain.Project;

public interface ProjectRepositories extends CrudRepository<Project, Long>{
	Iterable<Project> findAllById(Iterable<Long> iterable );
}
