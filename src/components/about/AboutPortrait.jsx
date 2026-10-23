import portrait from '../../assets/images/khaled-cinematic.png'
import { portfolio } from '../../data/portfolio'

export default function AboutPortrait() {
  const { about } = portfolio
  return <figure className="about-portrait about-portrait-cinematic">
    <div className="about-portrait-frame" data-about-portrait>
      <div className="about-portrait-orbit" aria-hidden="true" />
      <div className="about-portrait-image" data-about-parallax>
        <img src={portrait} width="1144" height="1375" alt={`Portrait of ${portfolio.person.name} in a dark jacket`} loading="lazy" decoding="async" />
      </div>
      <div className="about-light-sweep" aria-hidden="true" />
    </div>
    <figcaption className="eyebrow">{about.portraitCaption}</figcaption>
  </figure>
}
