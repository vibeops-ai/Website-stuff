// All page wording lives here so it can be edited without touching layout code.
// Finding codes (F1 to F12) are shown to readers as plain labels such as "Critical case 1".

export const LABEL = {
  F1: 'Critical case 1', F2: 'Critical case 2',
  F3: 'High case 1', F4: 'High case 2', F5: 'High case 3', F6: 'High case 4',
  F7: 'Medium case 1', F8: 'Medium case 2', F9: 'Medium case 3', F10: 'Medium case 4',
  F11: 'Low case 1', F12: 'Low case 2',
}

export const hero = {
  title: ['Find the failures', "your benchmarks didn't catch,", 'before hospitals do.'],
  subtitle:
    'The independent, expert-led evaluation of your clinical AI through evidence-based clinical assessment, adversarial testing and workflow x population specific benchmarking',
  primaryCta: 'Fix Your Failures',
  secondaryCta: 'See A Workflow Demo',
}

export const whatWeDo = {
  eyebrow: 'What we do',
  title: 'A comprehensive assurance partner for clinical AI.',
  tags: ['Independent testing', 'Clinical depth', 'Hospital-ready evidence'],
  items: [
    { n: '01', title: 'Clinical Failure-Mode Intel', body: 'A growing bank of real-world failure modes, edge cases and adversarial scenarios across conditions, demographics and workflows.' },
    { n: '02', title: 'Adversarial Testing & Red-Teaming', body: 'Stress-test your model with difficult, realistic and deliberately challenging clinical inputs (e.g. negation, attribution, conflict, missing context).' },
    { n: '03', title: 'Clinical Benchmarking & Rubrics', body: 'Build workflow-specific evaluation rubrics, benchmark performance across scenarios and patient populations, and provide measurable findings.' },
    { n: '04', title: 'Hospital Readiness & Enterprise Support', body: 'Bring our experience working with hospitals to help you anticipate procurement, clinical governance and AI evaluation questions.' },
  ],
}

export const example = {
  sectionTitle: 'What an assessment looks like',
  sectionSubtitle: 'A synthetic example. Hover over the numbers and bars for detail.',
  meta: 'Independent clinical AI review · Illustrative example',
  eyebrow: 'Example assessment across clinical AI verticals',
  title: 'One clinical AI output can look right.',
  titleAccent: 'The evidence can tell a different story.',
  lede:
    'A fluent, well-structured response is not necessarily a supported clinical response. The gap appears when claims are checked against the source, the patient they refer to, and the workflow in which they will be used.',
  body: [
    'We evaluated a synthetic set of ',
    { strong: '40 pre-declared scenarios' },
    ' across clinical documentation, summarisation, medication instructions, triage and decision-support workflows. Each scenario was run three times. The checks focused on whether the output preserved what the source actually said, including who it referred to, what was denied, what remained uncertain and what had not yet happened.',
  ],
  stats: [
    { value: '40', label: 'Pre-declared cases', note: 'Across multiple clinical workflows', accent: true, detail: 'Every scenario and its expected behaviour was fixed before any model output was seen.' },
    { value: '120', label: 'Recorded runs', note: 'Three runs per case', detail: 'Each case was submitted three times under the same conditions to expose inconsistent answers.' },
    { value: '24/40', label: 'Cases with a finding', note: 'At least one issue observed', accent: true, detail: '60% of cases produced at least one output that departed from the evidence.' },
    { value: '31/120', label: 'Outputs flagged', note: 'One or more verification issues', detail: 'About one output in four carried at least one verification issue.' },
  ],
  question: {
    eyebrow: 'The assessment question',
    title: 'What exactly did the AI claim, and what in the available evidence supports it?',
    body: 'Every material claim is examined for source support, correct subject attribution, negation, timing, uncertainty, consistency and compliance with the configured workflow rules. The objective is not to judge whether an answer sounds plausible. It is to identify where the output departs from the evidence or the agreed constraints.',
  },
  chart: {
    title: 'Flagged outputs by pattern (illustrative)',
    max: 8,
    bars: [
      { label: 'Unsupported content', value: 8, color: 'bg-rust', detail: 'Claims with no support in the source.' },
      { label: 'Inconsistent repeat output', value: 7, color: 'bg-pine', detail: 'Same input, materially different answers across runs.' },
      { label: 'Wrong subject attribution', value: 6, color: 'bg-clay', detail: "Another person's information assigned to the patient." },
      { label: 'Omitted information', value: 5, color: 'bg-sand', detail: 'A relevant finding or qualifier dropped from the output.' },
      { label: 'Negation / uncertainty', value: 5, color: 'bg-clay', detail: 'Denied or uncertain statements returned as definite.' },
    ],
    note: 'Counts are synthetic and illustrative. One output may contain more than one issue; these category counts should not be summed to infer the number of defective outputs.',
  },
}

export const findings = [
  { id: 'F1', finding: 'Clinical information appears in the output without support in the source', severity: 'Critical', observed: '6/40 cases', repeat: 'Intermittent · 1–2/3 runs' },
  { id: 'F2', finding: 'Information about another person is assigned to the patient', severity: 'Critical', observed: '2/2 cases', repeat: 'Always · 6/6 runs' },
  { id: 'F3', finding: 'Identical input returns materially different answers', severity: 'High', observed: '9/40 cases', repeat: 'Intermittent' },
  { id: 'F4', finding: 'A denied symptom or condition is presented as present', severity: 'High', observed: '3/8 cases', repeat: 'Always in tested examples' },
  { id: 'F5', finding: 'A medication name, dose, unit, route or frequency is changed', severity: 'High', observed: '2/5 cases', repeat: 'Always in tested examples' },
  { id: 'F6', finding: 'A relevant finding or qualifier stated in the source is omitted', severity: 'High', observed: '5/40 cases', repeat: 'Intermittent' },
  { id: 'F7', finding: 'A planned or future event is described as completed or current', severity: 'Medium', observed: '2/4 cases', repeat: 'Intermittent' },
  { id: 'F8', finding: 'Uncertainty or qualification is removed from the source statement', severity: 'Medium', observed: '3/6 cases', repeat: 'Always in tested examples' },
  { id: 'F9', finding: 'Location, laterality or relationship between findings is misread', severity: 'Medium', observed: '1/3 cases', repeat: 'Always in tested examples' },
  { id: 'F10', finding: 'Older information is used despite a newer conflicting entry', severity: 'Medium', observed: '2/5 cases', repeat: 'Intermittent' },
  { id: 'F11', finding: 'Irrelevant or administrative text produces a clinical finding', severity: 'Low', observed: '1/6 cases', repeat: 'Intermittent' },
  { id: 'F12', finding: 'An escalation or priority is generated without support in input or rules', severity: 'Low', observed: '1/4 cases', repeat: 'Intermittent' },
]

export const severity = {
  title: 'All 12 findings,',
  titleAccent: 'and what they mean.',
  lede: 'Each finding describes a failure pattern that can arise across clinical AI products. The exact test criteria must be adapted to the product\'s intended use, input types, output format and downstream workflow.',
}

export const critical = {
  title: 'The two findings that',
  titleAccent: 'change the patient story.',
  lede: 'A single unsupported statement or attribution error can change the meaning of a summary, handoff, recommendation or record entry. These examples show the verification question behind each failure.',
  cases: [
    {
      id: 'F1',
      title: 'Clinical information appears that is nowhere in the source',
      observed: 'Observed in 6 of 40 synthetic cases · appeared on 1–2 of 3 repeat runs in the examples.',
      source: '"Patient reports intermittent dizziness. No chest pain. No shortness of breath."',
      output: '"Patient reports dizziness and chest pain."',
      checks: 'Whether each material claim can be traced to a supporting span or structured field in the source. It also checks whether a denied or normal finding has been turned into a positive assertion.',
      matters: 'Unsupported information can enter a clinical summary or downstream workflow as if it were documented fact. A fluent sentence does not reveal where the claim came from.',
      look: 'Require evidence support for each material claim. A claim with no adequate source support should be flagged for review rather than silently accepted.',
    },
    {
      id: 'F2',
      title: 'Information about another person is assigned to the patient',
      observed: 'Observed in 2 of 2 synthetic cases · reproduced on all 6 of 6 repeat runs.',
      source: '"Patient is generally well. Her father has a history of heart disease."',
      output: '"Patient has a history of heart disease."',
      checks: 'Who each statement refers to (patient, relative, caregiver or another person) and whether that subject remains attached to the information throughout generation.',
      matters: 'The fact may be true of someone mentioned in the note, but it is not necessarily true of the patient. Correct terminology does not correct a wrong subject.',
      look: 'Preserve subject attribution as an explicit property of each extracted claim. If the subject cannot be established from the source, require review.',
    },
  ],
  pattern: {
    title: 'The pattern connecting both findings, and why format checks cannot catch them',
    items: [
      { quote: '"The output is valid and well-formed."', note: 'Schema and format checks can pass.' },
      { quote: '"The content is not supported as written."', note: 'The source meaning has changed.' },
      { quote: '"Which evidence supports this claim for this patient?"', note: 'That is the missing verification question.' },
    ],
  },
}

export const reproducibility = {
  title: 'Identical input.',
  titleAccent: 'Different clinical story.',
  lede: 'The same source is submitted repeatedly under the same test conditions. Stability is the share of runs that return the most common materially equivalent answer. A high stability score does not, by itself, establish correctness.',
  chart: {
    title: 'How often repeat runs gave the same answer',
    max: 100,
    unit: '%',
    bars: [
      { label: 'Multi-symptom note', value: 40, color: 'bg-rust', detail: '2 of 5 runs matched the most common answer.' },
      { label: 'Medication summary', value: 60, color: 'bg-clay', detail: '3 of 5 runs matched the most common answer.' },
      { label: 'Discharge summary', value: 60, color: 'bg-clay', detail: '3 of 5 runs matched the most common answer.' },
      { label: 'Short direct statement', value: 100, color: 'bg-pine', detail: 'Every run matched.' },
      { label: 'Clear normal finding', value: 100, color: 'bg-pine', detail: 'Every run matched.' },
    ],
    note: 'Synthetic illustration only. Three repeats per case are not enough to estimate a stable real-world failure rate.',
  },
  cases: [
    { id: 'F3', severity: 'High', title: 'Same input, different answer', input: 'Identical source note submitted three times.', output: 'Run 1 includes onset. Run 2 omits onset. Run 3 changes the timeline.', note: 'Material differences between repeats can alter the clinical story. A single inspected run does not show the range of possible outputs.' },
    { id: 'F4', severity: 'High', title: 'Negation over a list', input: '"Denies headache, chest pain or blurred vision."', output: '"Chest pain and blurred vision reported."', note: 'The negation is not applied to the full list. The verifier checks the scope of negation, not just the presence of a negation word.' },
    { id: 'F5', severity: 'High', title: 'Medication detail changes', input: '"Take 5 mg once daily."', output: '"Take 10 mg once daily."', note: 'The dose changes while the sentence remains plausible. Compare medication name, dose, unit, route and frequency wherever those fields are in scope.' },
    { id: 'F6', severity: 'High', title: 'A relevant detail disappears', input: '"New weakness began suddenly this morning."', output: '"Patient reports weakness."', note: 'The symptom remains, but onset is lost. The verifier checks whether material qualifiers, timing and context survive summarisation.' },
  ],
  repeat: {
    title: 'Which findings can a repeat test reach?',
    groups: [
      { tag: 'Reproduces every time', count: '6 findings', ids: ['F2', 'F4', 'F5', 'F8', 'F9', 'F10'], body: 'The same behaviour appears on every recorded run in the tested examples. Re-running does not expose the defect; the output is stable, but the underlying claim may still be wrong.' },
      { tag: 'Intermittent', count: '6 findings', ids: ['F1', 'F3', 'F6', 'F7', 'F11', 'F12'], body: 'The issue appears on only some runs or cases. A clean demonstration can therefore coexist with a failure on an input that was not repeated.' },
    ],
    why: { lead: 'Why both slip past review.', body: 'A consistent failure can look like a normal, confident answer. An intermittent failure can disappear on the one run someone happens to inspect. Both can return valid, well-formed output.' },
  },
}

export const scope = {
  title: 'Medium and lower-severity findings',
  lede: 'Smaller blast radius in the examples below; still relevant where the affected detail informs a clinical decision, handoff or record entry.',
  cases: [
    { id: 'F7', severity: 'Medium', title: 'A future event is described as completed', input: '"Patient is scheduled for an MRI next week."', output: '"MRI completed; results pending."', note: 'A planned investigation becomes an asserted completed event. Check temporal status: planned, ongoing, completed or historical.' },
    { id: 'F8', severity: 'Medium', title: 'Uncertainty is removed', input: '"Possible infection; further tests required."', output: '"Patient has an infection."', note: 'A tentative statement becomes definitive. Output certainty should not exceed the certainty expressed in the source.' },
    { id: 'F9', severity: 'Medium', title: 'Location or relationship is misread', input: '"No swelling in the left leg; mild swelling in the right ankle."', output: '"Bilateral leg swelling."', note: 'A localised finding is broadened. Check laterality, anatomical location and relationships between findings.' },
    { id: 'F10', severity: 'Medium', title: 'Older information overrides a newer entry', input: 'Earlier record: medication active. Newer record: medication stopped.', output: 'Summary lists the medication as current.', note: 'The output uses stale context. Check source date, event time and precedence rules when multiple records conflict.' },
    { id: 'F11', severity: 'Low', title: 'Administrative text creates a clinical finding', input: '"Please call the clinic after 3 PM."', output: '"Patient has afternoon fatigue."', note: "Non-clinical content is turned into a clinical statement. Check whether extracted claims belong to the task's intended scope." },
    { id: 'F12', severity: 'Low', title: 'Escalation is not supported by the input or rules', input: 'No configured escalation trigger is present.', output: 'Output is routed to an urgent review queue.', note: 'Workflow action exceeds the configured criteria. Check that escalation is tied to explicit rules and available evidence.' },
  ],
  limits: {
    eyebrow: 'Two limits on what this evaluation establishes',
    tested: { title: 'What was tested', body: 'Whether sampled outputs were supported by supplied evidence, preserved material context, behaved consistently across repeats and respected the specific rules included in the test plan.' },
    notEstablished: { title: 'What was not established', body: 'Clinical safety across all patients, sensitivity across every population or condition, real-world outcome improvement, regulatory compliance or the frequency of failures outside the tested sample.' },
    scope: { lead: 'Scope of the claim.', body: 'Observed rates describe only the synthetic test set. Small repeat counts do not establish stable probabilities. Pre-declared checks can identify only the behaviours they are designed to examine; raw outputs may reveal additional issues requiring new tests.' },
  },
  closer: { strong: 'A passing test is evidence about the cases tested, not proof that untested cases will behave the same way.', body: ' The report should state the sample, conditions, repeat count and limitations beside every reported rate.' },
}

export const drift = {
  title: 'Same input, five runs.',
  titleAccent: 'Where answers drifted.',
  lede: 'Each case was run five times with the same input. "Runs deviating" counts outputs that did not match the case\'s reference finding. "Distinct answers" counts materially different answer versions observed across those runs.',
  badge: '7 of 20 test cases varied',
  rows: [
    { id: 'img-01', runs: '5', distinct: '3', deviating: '40%', changed: 'Reference: no acute fracture. Outputs ranged from "no fracture" to "possible fracture" and "fracture present".' },
    { id: 'img-02', runs: '5', distinct: '3', deviating: '40%', changed: 'Reference: right lower-lobe opacity. One run shifted the location to the left; another described bilateral findings.' },
    { id: 'tri-03', runs: '5', distinct: '2', deviating: '20%', changed: 'Reference: routine follow-up. One run escalated the same presentation to urgent review.' },
    { id: 'sum-04', runs: '5', distinct: '3', deviating: '40%', changed: 'Reference: symptom denied. Two runs returned the symptom as present in the generated summary.' },
    { id: '3 more', runs: '5 each', distinct: '2 each', deviating: '20% each', changed: 'Variations involved medication dose, certainty, event timing and whether a finding was present or absent.' },
  ],
  totals: [
    'Across all 20 scored cases, ', { strong: '10 of 100 runs (10%)' }, ' differed from the reference finding. Within the 7 cases that showed run-to-run variation, ', { strong: '10 of 35 runs (28.6%)' }, ' differed from the reference. These are illustrative sample observations, not a deployment failure rate.',
  ],
  establish: {
    title: 'What this repeat-run review does, and does not, establish',
    points: [
      { lead: 'Reference agreement is not the same as clinical accuracy.', body: 'The reference finding is the expected answer for each constructed test case. This comparison shows whether the model matched it; it does not establish performance across real patients.' },
      { lead: 'Rates are observed in this sample, not calibrated.', body: 'With five runs per case, "1 in 5" describes what happened in these runs. It is not a stable estimate of how often the model will fail in deployment.' },
      { lead: 'Variation is measured across repeated runs.', body: 'The same case is submitted more than once. Different answers can reveal instability even when each answer sounds plausible on its own.' },
      { lead: 'A stable answer can still be wrong.', body: 'Repeatability alone is not proof of correctness. The output must also be checked against the reference finding, source evidence and configured clinical constraints.' },
    ],
  },
  vendors: {
    eyebrow: 'Why this matters for clinical AI vendors',
    quote: 'A model can produce a different clinical story from the same patient input, and a single successful demonstration may never reveal it.',
    body: 'GoodHart compares each output with the available evidence and configured requirements, then checks whether the same failure reappears across runs. The objective is to expose both output drift and unsupported claims before they proceed downstream.',
  },
}

export const controls = {
  title: 'What holds up,',
  titleAccent: 'and what closes the gap.',
  lede: 'Every failure pattern maps to a control that can be specified, tested and recorded.',
  dimensions: [
    { lead: 'Source support.', body: 'Material claims can be traced to the available patient evidence or source record.' },
    { lead: 'Temporal integrity.', body: 'Planned, current, completed and historical events are not conflated.' },
    { lead: 'Subject attribution.', body: 'Patient information is distinguished from information about relatives, caregivers or other people.' },
    { lead: 'Structured output.', body: 'Required fields, formats, permitted values and in-scope attributes are preserved.' },
    { lead: 'Negation and uncertainty.', body: 'Denied, possible, suspected and unconfirmed statements retain their original meaning.' },
    { lead: 'Workflow constraints.', body: 'Outputs respect configured rules before being released to the next step.' },
  ],
  dimensionsNote: 'A real assessment should report a strength only when it was demonstrated by the actual test evidence. This generic example does not assert that a particular model passed these checks.',
  table: [
    { id: 'F1', behaviour: 'Unsupported information added', control: 'Claim-to-source evidence check', evidence: 'Supporting span or explicit unsupported status' },
    { id: 'F2', behaviour: 'Wrong person attribution', control: 'Subject attribution check', evidence: 'Patient / non-patient subject retained' },
    { id: 'F3', behaviour: 'Same input, different output', control: 'Repeat-run comparison', evidence: 'Material differences across runs' },
    { id: 'F4', behaviour: 'Negated item returned as present', control: 'Negation-scope verification', evidence: 'Denied items remain denied' },
    { id: 'F5', behaviour: 'Medication detail altered', control: 'Field-level comparison', evidence: 'Name, dose, unit, route and frequency' },
    { id: 'F6–F12', label: 'Other cases', behaviour: 'Omission, timing, uncertainty, context or workflow error', control: 'Task-specific evidence and rule checks', evidence: 'Relevant context retained; unsupported action flagged' },
  ],
  steps: [
    { n: '01', tag: 'Define', lead: 'Scope the product.', body: 'Agree intended use, inputs, outputs, workflow boundaries and evaluation criteria.' },
    { n: '02', tag: 'Probe', lead: 'Test behaviour.', body: 'Run representative, edge-case and adversarial scenarios, including repeat runs.' },
    { n: '03', tag: 'Verify', lead: 'Check evidence.', body: 'Compare outputs with available patient context, configured rules and constraints.' },
    { n: '04', tag: 'Report', lead: 'Document findings.', body: 'Record examples, observed rates, severity, limitations and controls to investigate.' },
  ],
  releaseNote: 'In runtime verification, an output may be RELEASED, placed on HOLD or SUPPRESSED. RELEASE means no configured rule was triggered; it is not a guarantee of clinical correctness.',
  runtime: { lead: 'From assessment to runtime verification.', body: "A point-in-time assessment examines a defined sample. GoodHart's runtime assurance layer is designed to check individual AI outputs as they are produced, against available patient evidence, configured clinical rules and workflow constraints. Depending on the configured checks, an output may be RELEASED, placed on HOLD or SUPPRESSED. RELEASE means no configured verification rule was triggered; it is not a guarantee of clinical correctness." },
  outcome: {
    eyebrow: 'The outcome',
    title: 'A documented view of what the model gets right, where it departs from the evidence, and what should be checked next.',
    tagline: 'AI generates. GoodHart verifies. Clinicians decide.',
  },
}

export const footer = {
  name: 'GoodHart Labs',
  line: 'Independent assurance for clinical AI',
  tagline: 'AI generates. GoodHart verifies. Clinicians decide.',
  email: 'hi@ghartlabs.com',
  site: 'ghartlabs.com',
  disclaimer: 'All case IDs, reference findings, outputs and metrics on this page are synthetic examples created to explain the assessment method. They are not results from a customer engagement or a measured GoodHart evaluation.',
}

export const POSITIONS = [
  'Chief Executive Officer',
  'Chief Technology Officer',
  'Chief Information Officer',
  'Chief Medical Officer',
  'Founder',
  'Head of Product',
  'Engineering or Machine Learning Lead',
  'Other',
]
