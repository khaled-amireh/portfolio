import assert from 'node:assert/strict'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'
import { readFile } from 'node:fs/promises'

// Compile and render every scaffold without launching a browser or server port.
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx')
  const html = renderToStaticMarkup(createElement(App))
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1)
  assert.match(html, /<main id="main" tabindex="-1"/)
  assert.match(html, /Skip to content/)
  assert.doesNotMatch(html, /Editable portfolio copy/)
  assert.match(html, /KA \/ INTELLIGENCE/)
  assert.match(html, /Khaled/)
  assert.match(html, /Amireh/)
  assert.match(html, /Explore My Work/)
  const { portfolio } = await vite.ssrLoadModule('/src/data/portfolio.js')
  assert.equal(portfolio.person.name, 'Khaled Amireh')
  assert.match(html, /Al-Zaytoonah University of Jordan/)
  assert.equal((html.match(/aria-controls="about-network-detail"/g) ?? []).length, 6)
  assert.equal(portfolio.hero.isPlaceholder, true)
  assert.deepEqual(portfolio.skills.flatMap((category) => category.tools), ['Python', 'SQL', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'Git & GitHub', 'Jupyter Notebook', 'Google Colab', 'VS Code', 'Excel', 'Power BI', 'Oracle Fusion Cloud'])
  assert.equal((html.match(/data-skills-cluster/g) ?? []).length, 4)
  assert.equal((html.match(/data-skills-tool=/g) ?? []).length, 14)
  assert.equal(portfolio.projects.length, 6)
  assert.equal((html.match(/id="projects"/g) ?? []).length, 1)
  assert.equal(new Set(portfolio.projects.map((project) => project.github)).size, 6)
  for (const project of portfolio.projects) {
    assert.ok(project.title && project.description && project.technologies.length && project.cover)
    assert.ok(project.github.startsWith('https://github.com/khaled-amireh/'))
  }
  assert.equal(portfolio.experience.length, 1)
  assert.equal(portfolio.education.length, 1)
  assert.equal(portfolio.experience[0].role, 'Oracle Cloud Technical Intern')
  assert.equal(portfolio.education[0].status, 'Currently pursuing')
  assert.match(html, /id="experience"/)
  assert.match(html, /id="education"/)
  assert.match(html, /Oracle BI Publisher/)
  assert.match(html, /2028 \(Expected\)/)
  assert.equal(portfolio.certifications.length, 2)
  assert.match(html, /id="certifications"/)
  assert.match(html, /PCEP-30-02/)
  assert.match(html, /57 total hours/)
  assert.equal((html.match(/class="credential-image-wrap"/g) ?? []).length, 2)
  assert.equal((html.match(/class="credential-action"/g) ?? []).length, 2)
  assert.equal(portfolio.contact.email, 'khaledamireh55@gmail.com')
  assert.equal(portfolio.contact.whatsapp, 'https://wa.me/962797232936')
  assert.equal(portfolio.contact.github, 'https://github.com/khaled-amireh')
  assert.equal(portfolio.contact.linkedin, 'https://www.linkedin.com/in/khaled-amireh-0633b3355/')
  assert.equal((html.match(/id="contact"/g) ?? []).length, 1)
  for (const href of ['mailto:khaledamireh55@gmail.com', 'https://wa.me/962797232936', 'https://github.com/khaled-amireh', 'https://www.linkedin.com/in/khaled-amireh-0633b3355/']) {
    assert.ok(html.includes(`href="${href}"`), `Missing contact link: ${href}`)
  }
  assert.match(html, /Back to top/)
  const files = []
  for (const file of files) {
    const { default: Component } = await vite.ssrLoadModule(`/src/components/${file}.jsx`)
    assert.equal(renderToStaticMarkup(createElement(Component)), '')
    assert.match(renderToStaticMarkup(createElement(Component, { preview: true })), /Content pending/)
  }
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]))
  for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(target), `Missing anchor: ${target}`)
  const styles = await readFile('src/styles/shell.css', 'utf8')
  assert.match(styles, /max-width: 760px/)
  assert.match(styles, /max-width: 400px/)
  assert.match(styles, /minmax\(0, 1fr\)/)
  const tokens = await readFile('src/styles/tokens.css', 'utf8')
  assert.match(tokens, /--text-display: clamp\(/)
  assert.match(tokens, /--spacing-gutter: clamp\(/)
  const heroStyles = await readFile('src/styles/hero.css', 'utf8')
  assert.match(heroStyles, /max-width: 767px/)
  assert.match(heroStyles, /max-width: 359px/)
  assert.match(heroStyles, /\.hero-stage \{ height: auto;/)
  assert.match(heroStyles, /\.hero-reduced \.hero-stage \{ position: relative;/)

  const { createFaceData, createConnectionData } = await import('../src/components/hero/neuralGeometry.js')
  const { qualityLevels } = await vite.ssrLoadModule('/src/hooks/useDeviceQuality.js')
  const counts = []
  for (const [name, quality] of Object.entries(qualityLevels)) {
    const data = createFaceData(quality.step)
    counts.push(data.count)
    assert.equal(data.positions.length, data.count * 3)
    for (const array of [data.positions, data.scatter, data.targets, data.seeds, data.kinds]) {
      assert.ok(Array.from(array).every(Number.isFinite), `${name}: non-finite geometry`)
    }
    assert.equal(data.positions.length, data.scatter.length)
    assert.equal(data.positions.length, data.targets.length)
    assert.deepEqual(data.positions, createFaceData(quality.step).positions, 'Geometry must be deterministic')
    const eyes = Array.from(data.kinds).filter((kind) => kind === 1).length
    assert.ok(eyes > 100, 'Both optical structures must survive quality reduction')
    const xs = Array.from(data.positions).filter((_, i) => i % 3 === 0)
    const ys = Array.from(data.positions).filter((_, i) => i % 3 === 1)
    assert.ok(Math.max(...ys) - Math.min(...ys) > Math.max(...xs) - Math.min(...xs), 'Face should be taller than wide')
    console.log(`${name} quality: ${data.count} facial points; DPR capped at ${quality.dpr}`)
  }
  assert.ok(counts[0] < counts[1] && counts[1] < counts[2])
  const connections = createConnectionData()
  assert.equal(connections.positions.length % 6, 0)
  assert.ok(connections.positions.length / 6 < 100, 'Neural paths must remain sparse')
  assert.equal(connections.positions.length, connections.targets.length)
  console.log('PASS: Complete portfolio render; one H1; verified contact links and footer; two credentials; six projects; and responsive CSS foundations.')
  console.log('Visual viewport and browser interaction checks require an available browser.')
} finally {
  await vite.close()
}
