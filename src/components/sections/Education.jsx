import { portfolio } from '../../data/portfolio'

export default function Education() {
  const education = portfolio.education[0]
  return <article id="education" className="journey-entry journey-education" aria-labelledby="education-title" data-journey-entry>
    <div className="journey-rail" aria-hidden="true"><span className="journey-node" /></div>
    <div className="journey-date"><span className="eyebrow">{portfolio.journeySection.educationLabel}</span><p><time dateTime={education.start}>{education.start}</time> — <time dateTime={education.expectedEnd}>{education.expectedEnd}</time></p></div>
    <div className="journey-content"><div className="journey-content-top"><span className="eyebrow">{education.status}</span><span className="journey-education-mark" aria-hidden="true">AI<span> / </span>28</span></div>
      <h3 id="education-title">{education.degree}</h3>
      <p className="journey-organization">{education.institution}</p>
      <p className="journey-education-period">{education.period}</p>
    </div>
  </article>
}
