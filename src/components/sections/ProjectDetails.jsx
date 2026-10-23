export default function ProjectDetails({ project }) {
  if (!project) return null
  return <details className="project-details"><summary>Inside the project<span aria-hidden="true">+</span></summary><div className="project-details-body"><div><h4 className="eyebrow">Dataset</h4><p>{project.dataset}</p></div><div><h4 className="eyebrow">Approach</h4><p>{project.approach}</p></div><div><h4 className="eyebrow">Evaluation context</h4><p>{project.note}</p><a href={`${project.github}#readme`} target="_blank" rel="noreferrer">Read the source README ↗</a></div></div></details>
}
