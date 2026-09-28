# TrustCheck Mobile HCI Prototype Specification

**Document type:** Product + UX specification for spec-driven development  
**Project:** TrustCheck  
**Course context:** HCI group project  
**Primary deliverables:** Mobile-only interactive prototype + online portfolio/presentation site  
**Prototype implementation:** React + TypeScript recommended  
**Status:** Draft v1.0

---

## 1. Product Summary

**TrustCheck** is a mobile-first “Should I trust this?” security assistant for people who are unsure whether a message, link, QR code, screenshot, payment request, or login prompt is legitimate.

The app does not act like a traditional antivirus or technical scanner. Its main HCI value is that it:

1. accepts suspicious content in familiar formats,
2. identifies suspicious cues,
3. explains those cues in plain language,
4. communicates uncertainty without pretending to be infallible,
5. recommends a clear next action.

### Core product promise

> **TrustCheck helps non-expert users understand why something may be suspicious and what they should do next.**

### Primary target audience

Adults with low digital or security literacy, including many older adults.

### Secondary audience

- family members or caregivers helping less technical users,
- general users who occasionally receive suspicious digital content,
- users who benefit from large text, simple navigation, low cognitive load, or read-aloud support.

---

## 2. HCI Problem

Many security tools expose technical information such as domains, certificates, URL structure, threat scores, or generic “unsafe site” warnings. These signals are difficult for non-expert users to interpret.

The design problem is not only detecting threats. It is helping users make a decision.

### Problem statement

> Users with limited digital or security literacy can struggle to interpret technical security cues and conventional warnings. They need a clear, accessible way to understand why digital content may be suspicious and what safe action to take next.

---

## 3. Project Goals

### G-01 — Make suspicious content easy to check
A user should be able to submit common suspicious content with minimal steps.

### G-02 — Explain risk in plain language
The app should explain what it noticed without requiring cybersecurity knowledge.

### G-03 — Recommend a next action
Every completed analysis should tell the user what they should do next.

### G-04 — Reduce cognitive load
The interface should prioritize one decision at a time and avoid dense technical reports.

### G-05 — Support accessibility
The design should work with large text, strong contrast, clear labels, screen readers, and simple touch targets.

### G-06 — Calibrate trust
TrustCheck must never imply that an automated result guarantees safety.

### G-07 — Produce a meaningful 30+ screen prototype
The prototype must contain complete workflows rather than padding the screen count with cosmetic variations.

---

## 4. Non-Goals

The class prototype is **not**:

- a production antivirus,
- a malware sandbox,
- a guaranteed scam detector,
- a replacement for a bank, police department, FTC, or IT department,
- a password manager,
- a full email client,
- a full messaging client,
- a financial transaction platform,
- a legal or financial advice service.

The class prototype does **not** need a production backend.

For prototype purposes, analysis results may come from predefined scenarios and mock data.

---

## 5. Product Positioning

TrustCheck should be positioned as a **security interpretation and guidance layer**, not simply a scanner.

### Existing tool pattern

`Submit URL → malicious / clean`

### TrustCheck pattern

`Submit suspicious content → explain suspicious cues → explain why they matter → recommend next action → show how to verify independently`

### Key differentiators

- plain-language explanations,
- multimodal inputs,
- action-oriented guidance,
- accessibility-first interaction,
- visible uncertainty,
- education embedded into real decisions.

---

# 6. Platform Strategy

## 6.1 Product form

**Mobile-only app design**

Target visual viewport:

- Primary design width: **390 px**
- Target range: **360–430 px**
- Example frame: **390 × 844**

The experience should feel like a real mobile application even when displayed in a browser.

## 6.2 Recommended class implementation

For the class prototype, use:

- **React**
- **TypeScript**
- **Vite**
- **React Router**
- CSS Modules, Tailwind CSS, or ordinary CSS
- Lucide icons or another consistent icon set

### Why web React instead of a full native app?

The course needs a clickable prototype and a website presentation mechanism. A React web prototype can:

- behave like a mobile app,
- be opened from the portfolio,
- run without installation,
- be hosted easily,
- support all required mock workflows,
- avoid spending time on native deployment.

### Future production path

A real product could later move to:

- React Native + Expo, or
- a native iOS / Android implementation.

That is outside the class prototype scope.

---

# 7. Delivery Architecture

Use one deployable web project with two presentation layers.

```text
/
├── Portfolio / presentation site
│   ├── Problem
│   ├── User research
│   ├── Target users
│   ├── Existing solutions
│   ├── Product gap
│   ├── HCI principles
│   ├── Low-fidelity wireframes
│   ├── High-fidelity designs
│   └── Launch Prototype
│
└── /prototype
    └── Mobile TrustCheck interactive prototype
```

The portfolio should be desktop-friendly.

The prototype itself should remain constrained to a phone-like viewport.

---

# 8. Core Information Architecture

Primary bottom navigation:

1. **Home**
2. **History**
3. **Learn**
4. **Settings**

The analysis flow should temporarily replace the bottom navigation when the user is completing a task.

### Home primary actions

- Check a Message
- Check a Link
- Scan a QR Code
- Check a Screenshot

Secondary entry:

- “Not sure what type this is?” → guided chooser

---

# 9. Core User Flow

```text
User sees something suspicious
        ↓
Open TrustCheck
        ↓
Choose content type
        ↓
Paste / scan / upload content
        ↓
Review what will be checked
        ↓
TrustCheck analyzes
        ↓
Result category
        ↓
Why TrustCheck is concerned
        ↓
Recommended next action
        ↓
Optional: verify, learn, save, or report
```

---

# 10. Risk Communication Model

Do **not** use “Safe” as an absolute guarantee.

Use three primary states:

### Lower Concern
> “We did not find obvious warning signs.”

Secondary copy:

> “That does not guarantee this is safe. If the request involves money, passwords, or personal information, verify it another way.”

### Needs Caution
> “We found some warning signs.”

Secondary copy:

> “Pause before clicking, replying, paying, or entering information.”

### High Risk
> “This looks strongly suspicious.”

Secondary copy:

> “Do not click the link, send money, or enter personal information.”

### Unknown / Unable to Verify

> “We could not verify this.”

This state is important. The app must be allowed to say that it does not know.

---

# 11. Core Findings Model

A result may contain one or more findings.

Each finding must have:

```ts
type Finding = {
  id: string;
  title: string;
  plainLanguageReason: string;
  severity: "info" | "caution" | "high";
  evidenceSnippet?: string;
  recommendedAction?: string;
};
```

Example:

```text
Title:
The link does not match the company name

Reason:
The message says it is from Chase, but the link goes to
"chase-login-security.example.net".

Why this matters:
Scammers often use addresses that look similar to real company websites.

Recommended action:
Do not open this link. Open the Chase app or type the bank's website yourself.
```

---

# 12. Supported Input Types

## FR-01 — Message / Text

User can:

- paste text,
- type text,
- choose an example scenario.

Prototype result may identify:

- urgency,
- pressure,
- requests for passwords,
- requests for money,
- gift card requests,
- suspicious links,
- impersonation language.

---

## FR-02 — Link

User can:

- paste a URL,
- view the full domain before analysis.

Prototype result may explain:

- unusual domain,
- misspelling,
- shortened link,
- mismatched company name,
- unfamiliar domain.

---

## FR-03 — QR Code

Prototype interaction:

1. open scanner,
2. show camera-style scan UI,
3. simulate QR detection,
4. reveal destination before opening it,
5. analyze destination.

The class version does not need production camera or QR decoding unless the group chooses to implement it.

---

## FR-04 — Screenshot

User can:

- choose “Take Photo”,
- choose “Upload Screenshot”,
- use an example image.

Prototype:

1. image preview,
2. “Reading screenshot…” state,
3. simulated extracted content,
4. result.

---

# 13. Result Screen Requirements

Every result screen must contain:

### Result summary
- clear risk state,
- short one-sentence recommendation.

### Findings
- maximum 3–5 findings at once,
- plain-language titles,
- expandable explanations.

### Recommended action
A visually dominant “What should I do?” section.

### Independent verification
Examples:

- open the company’s official app,
- type the website yourself,
- call the number on the back of your card,
- contact the person using a number you already know.

### Trust disclaimer
Short and non-alarming.

Example:

> “TrustCheck can miss scams. For sensitive requests, verify through an official source.”

---

# 14. Functional Requirements

## FR-05 — Analyze mock content

The prototype must support deterministic, predefined scenarios.

Recommended fixture structure:

```ts
type TrustCheckScenario = {
  id: string;
  inputType: "message" | "link" | "qr" | "screenshot";
  inputPreview: string;
  risk: "lower-concern" | "caution" | "high-risk" | "unknown";
  summary: string;
  findings: Finding[];
  nextSteps: string[];
};
```

No real AI model or live threat API is required.

---

## FR-06 — History

User can view prior mock checks.

Each history item shows:

- type,
- date/time,
- short preview,
- risk state.

Tapping an item opens the stored result.

---

## FR-07 — Learn

The Learn section contains short educational cards.

Topics:

- suspicious links,
- urgent payment requests,
- QR code scams,
- fake login pages,
- impersonation,
- how to verify a company.

Content should be short and example-driven.

---

## FR-08 — Accessibility settings

Settings should include:

- text size,
- high contrast mode,
- reduced motion,
- read-aloud toggle or simulated read-aloud option.

The app should remain understandable without relying on color alone.

---

## FR-09 — Privacy explanation

The prototype should contain a short privacy explanation.

Example:

> “TrustCheck only needs the content you choose to check. A real version should minimize storage and protect sensitive information.”

---

# 15. HCI Requirements

## UX-01 — One primary task per screen
Avoid placing multiple unrelated decisions on the same screen.

## UX-02 — Recognition over recall
Users should be shown examples and visible options rather than expected to remember terminology.

## UX-03 — Progressive disclosure
Show the result first. Technical or detailed information should require an intentional “Why?” or “Learn more” action.

## UX-04 — Minimal jargon
Avoid unexplained terms such as:

- URL,
- SSL,
- DNS,
- domain reputation,
- heuristic,
- threat intelligence.

If a technical term is necessary, define it immediately.

## UX-05 — Action before education
The user should know what to do before reading a long explanation.

## UX-06 — Consistent language
Use one vocabulary throughout the product.

Preferred terms:

- “link” rather than “URL” in primary copy,
- “warning sign” rather than “indicator,”
- “check” rather than “scan” except for QR,
- “suspicious” rather than alternating between suspicious, malicious, unsafe, fraudulent, etc.

## UX-07 — Do not shame users
Never use copy such as:

- “Obviously fake”
- “You should have known”
- “Dangerous mistake”

Use neutral guidance.

---

# 16. Accessibility Requirements

## ACC-01 — Touch targets
Interactive controls should target at least ~44 × 44 px.

## ACC-02 — Large text
Layouts must remain functional when text size increases.

## ACC-03 — Contrast
Text and controls should meet WCAG-style contrast expectations.

## ACC-04 — Do not rely on color
Risk states must use:

- icon,
- text label,
- color.

Example:

`⚠ High Risk`

not simply a red background.

## ACC-05 — Screen reader semantics
Buttons and icons must have meaningful accessible labels.

## ACC-06 — Simple navigation
Avoid deep navigation trees.

## ACC-07 — Reduced motion
Animations should not be necessary to understand state changes.

---

# 17. Visual Design Direction

The design should feel:

- calm,
- trustworthy,
- understandable,
- non-technical,
- non-alarming.

Avoid a “hacker” aesthetic.

Do not use:

- neon green terminal visuals,
- skull icons,
- excessive red,
- cybersecurity stock imagery.

### Suggested visual style

- white / light neutral background,
- soft blue primary accent,
- strong dark text,
- restrained caution colors,
- rounded cards,
- simple line icons,
- generous spacing.

### Typography

Use a highly readable sans-serif.

Possible system stacks:

```css
font-family:
  Inter,
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

---

# 18. Component Inventory

Reusable components should include:

- `AppHeader`
- `BottomNavigation`
- `PrimaryButton`
- `SecondaryButton`
- `InputTypeCard`
- `RiskBadge`
- `FindingCard`
- `NextStepCard`
- `HistoryItem`
- `EducationalCard`
- `AccessibilityToggle`
- `ProgressIndicator`
- `Modal`
- `ConfirmationSheet`
- `PhoneFrame` for presentation mode

---

# 19. Prototype Screen Inventory

Target: **34 distinct screens/states**

## Workflow A — Onboarding

### S01 — Welcome
Goal: explain TrustCheck in one sentence.

### S02 — What TrustCheck Does
Explain the four content types.

### S03 — Trust & Limits
Explain that TrustCheck helps but cannot guarantee safety.

### S04 — Accessibility Setup
Text size, contrast, read-aloud preference.

---

## Workflow B — Home / Content Selection

### S05 — Home
Primary content-type actions.

### S06 — “What should I check?” Helper
Guided chooser for uncertain users.

---

## Workflow C — Suspicious Message

### S07 — Message Input
Paste or type suspicious message.

### S08 — Message Review
Preview submitted content.

### S09 — Checking Message
Visible system-status feedback.

### S10 — Message Result
Risk summary + findings.

### S11 — Message Finding Detail
Explain one warning sign.

### S12 — Message Next Steps
Concrete recommendation.

---

## Workflow D — Link

### S13 — Link Input
Paste link.

### S14 — Link Review
Show domain prominently before analysis.

### S15 — Checking Link
Progress state.

### S16 — Link Result
Risk summary.

### S17 — Domain Explanation
Visually distinguish company claim from actual domain.

### S18 — Verify Official Site
Teach independent verification.

---

## Workflow E — QR Code

### S19 — QR Scanner
Camera-style scanner.

### S20 — QR Detected
Reveal destination before continuing.

### S21 — Checking QR Destination
Analysis progress.

### S22 — QR Result
Risk summary.

### S23 — QR Explanation
Why QR codes can hide destinations.

---

## Workflow F — Screenshot

### S24 — Screenshot Source
Take photo / upload screenshot / use sample.

### S25 — Screenshot Preview
Confirm image.

### S26 — Reading Screenshot
OCR-style progress.

### S27 — Screenshot Result
Risk summary.

### S28 — Highlighted Screenshot
Show suspicious regions/copy.

---

## Workflow G — History

### S29 — History
List previous checks.

### S30 — History Detail
Re-open a prior result.

---

## Workflow H — Learn

### S31 — Learn
Topic cards.

### S32 — Scam Lesson Detail
Short example-based educational article.

---

## Workflow I — Settings / Privacy

### S33 — Settings
Accessibility + app preferences.

### S34 — Privacy & Trust
Explain data handling, limitations, and user control.

---

# 20. Required Prototype Paths

The interactive prototype must support at least these end-to-end paths.

## Path P-01 — Suspicious SMS

```text
Home
→ Check Message
→ Paste content
→ Review
→ Checking
→ High Risk Result
→ Why?
→ What should I do?
→ Home
```

## Path P-02 — Suspicious Link

```text
Home
→ Check Link
→ Paste link
→ Review domain
→ Checking
→ Caution Result
→ Explain domain
→ Verify official site
```

## Path P-03 — QR Scam

```text
Home
→ Scan QR
→ Detect QR
→ Show hidden destination
→ Analyze
→ High Risk
→ Explain
→ Next step
```

## Path P-04 — Screenshot

```text
Home
→ Screenshot
→ Select image
→ Confirm
→ Reading
→ Result
→ Highlight suspicious content
```

## Path P-05 — Education

```text
Learn
→ QR Scams
→ Example
→ Back to Learn
```

## Path P-06 — Accessibility

```text
Settings
→ Increase text size
→ Return Home
→ Verify layout still works
```

---

# 21. Prototype Data Scenarios

At minimum create these fixtures:

### D-01 — Fake bank text
Risk: High Risk

Message:
> “CHASE ALERT: Your account has been locked. Verify now at chase-secure-login.example.”

Findings:

- urgent pressure,
- suspicious link,
- asks user to “verify” account.

---

### D-02 — Legitimate-looking but uncertain message
Risk: Needs Caution

Purpose:
Show that TrustCheck can express uncertainty rather than always generating a dramatic warning.

---

### D-03 — Obvious gift-card scam
Risk: High Risk

Purpose:
Payment scam workflow.

---

### D-04 — QR payment scam
Risk: High Risk

Purpose:
Demonstrate hidden destinations.

---

### D-05 — Benign example
Risk: Lower Concern

Important:
Copy must still avoid guaranteeing safety.

---

### D-06 — Unable to verify
Risk: Unknown

Purpose:
Demonstrate responsible uncertainty.

---

# 22. Error States

The prototype should include reusable error handling.

### E-01 — Empty content
> “Add something for TrustCheck to check.”

### E-02 — Invalid link
> “We could not recognize this as a link. Check the address and try again.”

### E-03 — Unreadable screenshot
> “We could not read enough of this image. Try a clearer screenshot or paste the message instead.”

### E-04 — Analysis unavailable
> “We could not complete the check right now. Do not assume the content is safe.”

---

# 23. Security + Trust Design Rules

## SEC-01
Never display “100% safe.”

## SEC-02
Never make a high-stakes recommendation based only on a visual color cue.

## SEC-03
Never tell the user to contact a suspicious sender using contact information contained in the suspicious message.

## SEC-04
Verification guidance should prefer an independently obtained source.

Example:

> “Open your banking app directly.”

not:

> “Call the number in this message.”

## SEC-05
Do not expose fake technical precision such as:

> “92.7% chance this is a scam”

unless a real validated model actually supports it.

For the prototype, categorical language is safer.

---

# 24. Copy Style Guide

Use:

- short sentences,
- active voice,
- familiar words,
- direct next steps.

### Good

> “This link does not match the company name.”

> “Do not enter your password here.”

> “Open the company’s official app instead.”

### Avoid

> “A domain-name mismatch anomaly was detected.”

> “The threat confidence is elevated.”

> “SSL validation failed.”

---

# 25. Mock Analysis Behavior

The prototype does not need real detection.

Use scenario IDs or input matching.

Example:

```ts
if (input.includes("chase-secure-login")) {
  return scenarios.fakeBankText;
}
```

or provide an “Use Example” button.

This allows the group to focus on:

- interaction design,
- usability,
- accessibility,
- explanation quality,
- workflow completeness.

---

# 26. Suggested React Route Map

```text
/
├── /portfolio
│
├── /prototype
│   ├── /onboarding
│   ├── /home
│   ├── /check/message
│   ├── /check/message/review
│   ├── /check/link
│   ├── /check/link/review
│   ├── /check/qr
│   ├── /check/screenshot
│   ├── /analyzing
│   ├── /result/:scenarioId
│   ├── /result/:scenarioId/finding/:findingId
│   ├── /result/:scenarioId/next-steps
│   ├── /history
│   ├── /history/:scenarioId
│   ├── /learn
│   ├── /learn/:topicId
│   ├── /settings
│   └── /privacy
```

Exact route structure is flexible. UX behavior matters more than URL shape.

---

# 27. Suggested Project Structure

```text
src/
├── app/
│   ├── App.tsx
│   └── router.tsx
│
├── components/
│   ├── AppHeader.tsx
│   ├── BottomNavigation.tsx
│   ├── FindingCard.tsx
│   ├── RiskBadge.tsx
│   └── ...
│
├── features/
│   ├── onboarding/
│   ├── checks/
│   ├── results/
│   ├── history/
│   ├── learn/
│   └── settings/
│
├── data/
│   ├── scenarios.ts
│   └── lessons.ts
│
├── pages/
│   ├── portfolio/
│   └── prototype/
│
├── styles/
│   └── ...
│
└── types/
    └── trustcheck.ts
```

---

# 28. Presentation Site Specification

The portfolio site is the presentation mechanism.

It should tell the story of the design rather than merely display screenshots.

## PRES-01 — Hero

Include:

- TrustCheck name,
- one-sentence product definition,
- mobile mockup hero image,
- “Launch Prototype” button.

---

## PRES-02 — Problem

Explain:

- what users struggle with,
- why conventional warnings can fail,
- why this is an HCI problem rather than only a cybersecurity problem.

---

## PRES-03 — Target Users

Show:

- primary audience,
- needs,
- frustrations,
- accessibility considerations.

Avoid stereotypes.

---

## PRES-04 — Research

Summarize the strongest research findings.

Use only sources the group has reviewed and verified.

---

## PRES-05 — Existing Solutions

Show a concise comparison.

Focus on:

- current tool,
- what it does,
- what remains difficult for the user.

---

## PRES-06 — Product Gap

Explain that TrustCheck focuses on:

> understanding + action

rather than only:

> detection + warning

---

## PRES-07 — HCI Design Principles

Show how research became design decisions.

Example:

```text
Finding:
Users may not understand technical warnings.

Design response:
Use one plain-language explanation and one recommended action.
```

---

## PRES-08 — Design Process

Include:

- early sketches,
- low-fidelity wireframes,
- revisions,
- final high-fidelity screens.

---

## PRES-09 — Workflows

Present the main user flows.

Do not show 34 screenshots in one giant grid.

Group them by task.

---

## PRES-10 — Interactive Prototype

Provide a visible button or embedded phone frame.

---

## PRES-11 — Limitations

Acknowledge:

- false positives,
- false negatives,
- over-trust,
- privacy,
- scope,
- prototype uses simulated analysis.

This is a strength in an HCI presentation because it shows awareness of system limitations.

---

# 29. Research-to-Design Traceability

| Research / problem finding | Design response |
|---|---|
| Technical security language is difficult for non-experts | Plain-language explanations |
| Users may ignore dense warnings | Short result summary + progressive disclosure |
| Users need recognizable cues | Highlight suspicious text/domain visually |
| QR codes hide destinations | Reveal QR destination before any action |
| Users may over-trust automated tools | Explicit uncertainty + limits |
| Older / low-literacy users may need reduced complexity | Large controls, minimal navigation, short steps |
| Users need action, not only diagnosis | Dedicated “What should I do?” section |
| Screenshots/messages may contain sensitive information | Privacy explanation + minimal-data concept |

---

# 30. Acceptance Criteria

## AC-01
A first-time user can explain what TrustCheck does after viewing the welcome screen.

## AC-02
A user can begin checking any supported content type from Home in no more than two taps.

## AC-03
Every analysis result states:

- risk category,
- why,
- recommended next action.

## AC-04
Every result can be understood without cybersecurity terminology.

## AC-05
The app never guarantees that content is safe.

## AC-06
The high-risk flow clearly discourages clicking, paying, or entering credentials.

## AC-07
The prototype contains at least 30 meaningful screens/states.

## AC-08
The prototype demonstrates at least four full content-checking workflows.

## AC-09
The interface remains usable with the prototype's larger-text setting enabled.

## AC-10
Risk states remain understandable in grayscale or without relying on color.

## AC-11
The presentation site links directly to the interactive prototype.

## AC-12
The portfolio explains how research influenced specific design decisions.

---

# 31. Suggested Development Phases

## Phase 1 — Information architecture
Deliver:

- finalized screen map,
- route map,
- user flows,
- scenario data.

## Phase 2 — Low-fidelity wireframes
Deliver:

- all core workflows,
- no visual polish,
- test navigation and screen count.

## Phase 3 — Design system
Deliver:

- typography,
- spacing,
- buttons,
- risk badges,
- finding cards,
- icons.

## Phase 4 — High-fidelity mobile screens
Deliver:

- complete app visual design.

## Phase 5 — Interactive React prototype
Deliver:

- working navigation,
- mock analysis,
- history,
- settings,
- education.

## Phase 6 — Portfolio site
Deliver:

- research story,
- design process,
- prototype launch.

## Phase 7 — Usability review
Test:

- whether users understand each risk state,
- whether users know what action to take,
- whether wording is understandable,
- whether navigation is obvious.

---

# 32. Usability Test Tasks

If the group performs primary research or usability testing, use tasks rather than asking whether users “like” the idea.

### Task 1
> “You receive this text from your bank. You are not sure if it is real. Show me what you would do using TrustCheck.”

Observe:

- where they tap,
- whether they understand input categories,
- whether they understand the result,
- what action they take.

### Task 2
> “You see this QR code on a parking meter. Check where it leads before paying.”

### Task 3
> “TrustCheck says it found some warning signs but cannot confirm that the message is a scam. Explain what you think that means.”

This task specifically evaluates trust calibration.

### Useful metrics

- task completion,
- wrong taps,
- time to result,
- whether the user correctly interprets the recommendation,
- whether the user can explain why the content was suspicious.

---

# 33. Open Product Decisions

The group should decide these before high-fidelity design:

1. Is the primary audience specifically older adults or broadly low-security-literacy adults?
2. Should “Check Message” combine SMS and email, or should they be separate?
3. Should TrustCheck support a trusted-contact feature in the class prototype?
4. Should the app include real read-aloud behavior or only show the control?
5. Should the history be persistent or reset on reload?
6. How much educational content belongs in the MVP?
7. Which four content types will receive the deepest prototype workflows?
8. What exact wording will be used for the three risk levels?

---

# 34. Recommended MVP

For the class prototype, keep the final MVP to:

- onboarding,
- Home,
- message checking,
- link checking,
- QR checking,
- screenshot checking,
- analysis/loading state,
- plain-language result,
- finding details,
- recommended next action,
- history,
- short Learn section,
- accessibility settings,
- privacy/limitations screen.

Do not build a real AI detection backend unless the class specifically requires functional detection.

The quality of the **interaction model and explanation design** matters more to this HCI project than the accuracy of a fake production security engine.

---

# 35. Academic / Project Constraint

This specification is a planning artifact.

The group should independently:

- review the research,
- validate the wording,
- create the submitted low-fidelity designs,
- make final visual decisions,
- implement and test the prototype,
- ensure all submitted work complies with course rules regarding AI-assisted work.

---

# 36. Definition of Done

TrustCheck is ready for class presentation when:

- [ ] The portfolio clearly explains the HCI problem.
- [ ] The target audience is supported by research.
- [ ] The product gap is explained relative to existing tools.
- [ ] Low-fidelity wireframes exist.
- [ ] At least 30 meaningful high-fidelity screens/states exist.
- [ ] Four or more full checking workflows are clickable.
- [ ] Results explain both **why** and **what next**.
- [ ] Uncertainty is communicated responsibly.
- [ ] Accessibility settings are demonstrated.
- [ ] The site includes research → design traceability.
- [ ] The portfolio links directly to the prototype.
- [ ] The group can present directly from the website.
