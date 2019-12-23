package com.fullstack.ppmtool.domain;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.ManyToAny;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class ProjectTask {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@Column(updatable=false, unique=true)
	private String projectSequence;
	@NotBlank(message="Please include a project summary")
	private String summary;
	private String acceptanceCriteria ;
	private String status;
	private Integer priority;
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date dueDate;
	@Column(updatable=false)
	private String projectIdentifier;
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date createAt;
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date updateAt;
	//Many to one with backlog
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="backlog_id", updatable=false, nullable=false )
	@JsonIgnore
	private Backlog backlog;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getProjectSequence() {
		return projectSequence;
	}

	public void setProjectSequence(String projectSequence) {
		this.projectSequence = projectSequence;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getAcceptanceCriteria() {
		return acceptanceCriteria;
	}

	public void setAcceptanceCriteria(String acceptanceCriteria) {
		this.acceptanceCriteria = acceptanceCriteria;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getPriority() {
		return priority;
	}

	public void setPriority(Integer priority) {
		this.priority = priority;
	}

	public Date getDueDate() {
		return dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

	public Backlog getBacklog() {
		return backlog;
	}

	public void setBacklog(Backlog backlog) {
		this.backlog = backlog;
	}

	public String getProjectIdentifier() {
		return projectIdentifier;
	}

	public void setProjectIdentifier(String projectIdentifier) {
		this.projectIdentifier = projectIdentifier;
	}

	public Date getCreateAt() {
		return createAt;
	}

	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}

	public Date getUpdateAt() {
		return updateAt;
	}

	public void setUpdateAt(Date updateAt) {
		this.updateAt = updateAt;
	}

	

	public ProjectTask(){
	}
	
	@PrePersist
	protected void onCreate(){
		this.createAt = new Date();
	}
	
	@PreUpdate
	protected void onUpdate(){
		this.updateAt = new Date();
	}

	@Override
	public String toString() {
		return "ProjectTask [id=" + id + ", projectSequence=" + projectSequence
				+ ", summary=" + summary + ", acceptanceCriteria="
				+ acceptanceCriteria + ", status=" + status + ", priority="
				+ priority + ", dueDate=" + dueDate + ", projectIdentifier="
				+ projectIdentifier + ", createAt=" + createAt + ", updateAt="
				+ updateAt + "]";
	}
	
	
	
	
}
