<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

## My Prompt

I'm looking for the best LLM agentic skills for software product managers and agile product owners. Bonus points if they are customized to the wealth management industry. Feel free to ask clarifying questions.

## Perplexity Response

### 1. Where Models Agree

| Finding | GPT-5.6 Sol Thinking | Claude Opus 4.8 Thinking | Gemini 3.1 Pro Thinking | Evidence |
| :-- | :-- | :-- | :-- | :-- |
| “Agentic PM/PO” skills should encode repeatable workflows (not just prompt tricks) | ✓ | ✓ | ✓ | Skill libraries emphasize reusable frameworks, triggers, and process steps over ad‑hoc prompting.[^1_1][^1_2][^1_3] |
| Core PM skills to operationalize: discovery → prioritization → delivery/launch with strong artifacts | ✓ | ✓ | ✓ | PM skill catalogs cluster around problem discovery, prioritization/strategy, validation, launch readiness and post‑launch learning.[^1_2][^1_4][^1_5] |
| In regulated wealth management, “human-in-the-loop + supervision + documentation” is non‑negotiable | ✓ | ✓ | ✓ | FINRA reminds firms rules remain applicable; supervision (e.g., Rule 3110), governance, privacy, reliability, and accuracy must be addressed when using GenAI.[^1_6] |
| The best “skills” for PM/POs are composable + versionable (auditable) so you can govern behavior | ✓ | ✓ | ✓ | Skills are packaged instruction modules; teams can manage/standardize them centrally (open standard + enterprise management), aiding auditability and consistency.[^1_7][^1_8] |
| Finance-specific starter kits exist and are the fastest way to get wealth-management workflows working | ✓ | ✓ | ✓ | Anthropic’s financial-services repo includes wealth-management workflows/skills and MCP connectors, intended as reference agents/skills to customize.[^1_9] |


***

### 2. Where Models Disagree

| Topic | GPT-5.6 Sol Thinking | Claude Opus 4.8 Thinking | Gemini 3.1 Pro Thinking | Why They Differ |
| :-- | :-- | :-- | :-- | :-- |
| “Best” skill set: broad PM framework library vs PM-decision engine vs finance-vertical pack | Prefer broad, end-to-end PM library (discovery→strategy→delivery) as baseline | Prefer decision-quality PM skills (kill bad bets fast; reduce PRD theater) | Prefer finance-vertical workflow packs + connectors first, then add PM layers | They weight different failure modes: breadth/standardization vs decision quality vs domain fit + integration to finance data/tools.[^1_4][^1_2][^1_9] |
| Primary leverage for POs: backlog automation vs stakeholder alignment vs governance/risk control | Emphasize backlog/story decomposition and sprint-ready artifacts | Emphasize alignment, tradeoffs, and “reality checking” plans | Emphasize guardrails, data access boundaries, and supervision audit trails | Different assumptions about where teams lose time: ticket churn, misalignment, or compliance/safety risk in wealth management.[^1_2][^1_6][^1_4] |
| How wealth-management customization should be done | Add wealth-management “steering docs” + templates (PRDs, acceptance, comms) | Embed domain heuristics into discovery/prioritization (advisor workflows, client outcomes) | Start from prebuilt wealth-management agents/skills and adapt to firm processes | They disagree on starting point: generic PM rigor → domain overlays vs domain-first agents → PM rigor.[^1_9][^1_2] |


***

### 3. Unique Discoveries

| Model | Unique Finding | Why It Matters |
| :-- | :-- | :-- |
| Claude Opus 4.8 Thinking | A “PM skills repo” explicitly designed to *teach the human PM while guiding the agent* (pedagogic-first) | Helps you onboard PMs/POs and standardize quality simultaneously—useful if you’re building an internal PM/PO agent toolbox.[^1_4] |
| Gemini 3.1 Pro Thinking | Anthropic financial-services repo is designed to run both as plugin and via managed agents, implying a clean path to productionized agent workflows | Matters if you want PM/PO skills that can graduate into real orchestrated workflows with connectors and governance patterns.[^1_9] |
| GPT-5.6 Sol Thinking | FINRA’s notice highlights that GenAI use can implicate “virtually every area” depending on deployment, pushing PM/POs to treat compliance as a product requirement | Forces your PM skillset to include “regulatory impact mapping” as a first-class step, not a legal afterthought.[^1_6] |


***

### 4. Comprehensive Analysis

**High-confidence findings.** All three models converge on the idea that the “best” LLM agentic skills for PMs/POs aren’t clever prompts—they’re **repeatable, modular workflows** that reliably generate the same class of artifacts every time (problem framing, PRDs, stories, experiments, launch checks) and can be **versioned and governed**. This matters in agile environments because PM/PO work is mostly “decision + communication + decomposition.” Skills that consistently produce decision artifacts (assumptions, tradeoffs, acceptance criteria, decision logs) reduce cycle time and rework more than skills that merely draft prettier documents.[^1_2][^1_7][^1_1][^1_5]

A second strong agreement is that in **wealth management**, agentic PM/PO skills must be designed around **supervision, auditability, privacy, and accuracy controls**. FINRA explicitly reminds member firms that rules are technology-neutral and still apply, and that if GenAI is used in supervision systems (or anywhere in the business), policies/procedures should address governance, model risk management, data privacy/integrity, reliability, and accuracy. In practice, that means your PM/PO “skills” should include structured checkpoints like: *What data is the agent allowed to see? What is the human approval gate? What gets logged for audit? What disclaimers and communications rules apply?*—before anyone argues about story points.[^1_6]

Third, there’s shared recognition that you don’t need to invent all of this. There are **existing PM skill libraries** (general PM workflows) and **finance/wealth management vertical packs** (domain workflows + connectors) that can be combined. The important meta-skill for PMs/POs is learning to operate these as composable modules rather than one giant “AI assistant” prompt.[^1_4][^1_9][^1_2]

**Areas of divergence.** The main disagreement is **where to start**. Claude Opus 4.8 Thinking’s preferred path is a broad PM framework library that’s pedagogic-first—helping the PM learn while standardizing the agent’s behavior. GPT-5.6 Sol Thinking leans toward “decision-quality” skills that are explicitly built to kill weak ideas early (problem clarity, assumption mapping, experiment design), reducing PRD theater. Gemini 3.1 Pro Thinking biases to domain-first: start from finance/wealth-management reference agents/skills and then layer in your PM workflows and templates.[^1_9][^1_4][^1_2]

These differences are mostly about your dominant risk:

- If your organization’s failure mode is **inconsistent PM craft** across teams, Claude’s approach (pedagogic skill library) helps standardize and level up.[^1_4]
- If your failure mode is **shipping the wrong thing**, GPT’s preference for discovery/prioritization decision engines is highest leverage.[^1_2]
- If your failure mode is **compliance + data integration complexity**, Gemini’s domain-first approach reduces time-to-value and keeps you closer to real wealth workflows.[^1_6][^1_9]

A second divergence is how to treat the PO role: backlog automation vs alignment vs governance. All are valid, but which you prioritize depends on whether your “constraint” is Jira churn, stakeholder thrash, or regulatory exposure.[^1_2][^1_6]

**Unique insights worth noting.** Claude Opus 4.8 Thinking’s “pedagogic-first” observation is particularly relevant if you want this to scale beyond a couple strong PMs—skills that coach the human while producing outputs create compounding returns in a large org. Gemini 3.1 Pro Thinking’s point about Anthropic’s financial-services repo being deployable via managed agents hints at a path where PM/PO skills can evolve into *operational workflows* (e.g., meeting-prep packets, client review packs) with connectors, not just documents. GPT-5.6 Sol Thinking’s compliance emphasis is a reminder that in wealth management, PM skills must encode “regulatory requirements as product requirements” early, not at release time.[^1_9][^1_4][^1_6]

**Recommendations.** If you want a practical “best set” for wealth-management PMs/POs: (1) adopt a **PM skill library** as your baseline (discovery→prioritization→delivery), (2) add a **wealth-management vertical pack** (client review, proposals, rebalancing, reporting) and treat it as your domain source of truth, and (3) add a **compliance/supervision gate skill** that PMs must run at intake (data classification, human approval gates, comms rules, audit logging expectations), explicitly aligned with FINRA’s GenAI obligations reminders.[^1_4][^1_6][^1_9]

Clarifying questions (so I can tailor the “best” set to your environment):

1) Are your PMs/POs primarily building **advisor-facing internal tools**, **client-facing experiences**, or **back-office/ops/compliance** systems?
2) What’s your preferred surface for skills: **Claude Code**, **Copilot**, **Jira/Confluence agents**, or a custom internal agent portal?
3) Do you need these skills to generate **Jira artifacts automatically** (epics/stories/AC), or mainly to produce **decision artifacts** (PRD, assumptions, experiment plans, tradeoff memos)?
<span style="display:none">[^1_10][^1_100][^1_101][^1_102][^1_103][^1_104][^1_105][^1_106][^1_107][^1_108][^1_109][^1_11][^1_110][^1_111][^1_112][^1_113][^1_114][^1_115][^1_116][^1_117][^1_118][^1_119][^1_12][^1_120][^1_121][^1_122][^1_123][^1_124][^1_125][^1_126][^1_127][^1_128][^1_129][^1_13][^1_130][^1_131][^1_132][^1_133][^1_134][^1_135][^1_136][^1_137][^1_138][^1_14][^1_15][^1_16][^1_17][^1_18][^1_19][^1_20][^1_21][^1_22][^1_23][^1_24][^1_25][^1_26][^1_27][^1_28][^1_29][^1_30][^1_31][^1_32][^1_33][^1_34][^1_35][^1_36][^1_37][^1_38][^1_39][^1_40][^1_41][^1_42][^1_43][^1_44][^1_45][^1_46][^1_47][^1_48][^1_49][^1_50][^1_51][^1_52][^1_53][^1_54][^1_55][^1_56][^1_57][^1_58][^1_59][^1_60][^1_61][^1_62][^1_63][^1_64][^1_65][^1_66][^1_67][^1_68][^1_69][^1_70][^1_71][^1_72][^1_73][^1_74][^1_75][^1_76][^1_77][^1_78][^1_79][^1_80][^1_81][^1_82][^1_83][^1_84][^1_85][^1_86][^1_87][^1_88][^1_89][^1_90][^1_91][^1_92][^1_93][^1_94][^1_95][^1_96][^1_97][^1_98][^1_99]</span>

<div align="center">⁂</div>

[^1_1]: https://pmprompt.com/agent-skills

[^1_2]: https://github.com/pratikshadake/claude-product-management-skills

[^1_3]: https://callsphere.ai/blog/hiring-and-skills-for-the-agentic-era-with-claude

[^1_4]: https://github.com/deanpeters/Product-Manager-Skills

[^1_5]: https://www.pragmaticinstitute.com/resources/articles/product/ai-agents-for-product-managers/

[^1_6]: https://www.finra.org/rules-guidance/notices/24-09

[^1_7]: https://siliconangle.com/2025/12/18/anthropic-makes-agent-skills-open-standard/

[^1_8]: https://wandb.ai/byyoung3/ml-news/reports/Anthropic-introduces-Agent-Skills---VmlldzoxNDc1NDg1MA

[^1_9]: https://github.com/OctagonAI/skills

[^1_10]: https://www.youtube.com/watch?v=lZHnQIUTqA0

[^1_11]: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview

[^1_12]: https://rywalker.com/research/anthropic-skills

[^1_13]: https://rywalker.com/research/bmad-method

[^1_14]: https://docs.bmad-method.org/reference/agents/

[^1_15]: https://www.youtube.com/watch?v=LorEJPrALcg

[^1_16]: https://dev.to/extinctsion/bmad-the-agile-framework-that-makes-ai-actually-predictable-5fe7

[^1_17]: https://mcpmarket.com/tools/skills/bmad-ai-product-manager

[^1_18]: https://www.youtube.com/watch?v=x6YhNYT4NrY

[^1_19]: https://www.agilegenesis.com/post/will-an-llm-replace-your-product-owner-by-2027

[^1_20]: https://mcpmarket.com/tools/skills/privacy-and-data-security-compliance

[^1_21]: https://mcpmarket.com/tools/skills/investment-adviser-compliance-manager

[^1_22]: https://mcpmarket.com/tools/skills/regulatory-reporting-compliance

[^1_23]: https://claudemarketplaces.com/skills/joellewis/finance_skills/regulatory-reporting

[^1_24]: https://mcpmarket.com/tools/skills/advertising-compliance

[^1_25]: https://www.claudeskillshq.com/skills/finance-compliance-pack

[^1_26]: https://www.layer3labs.io/guides/claude-skills-for-financial-advisors

[^1_27]: https://www.wealthmanagement.com/artificial-intelligence/sec-examiners-are-asking-rias-about-ai-governance-now

[^1_28]: https://www.kiteworks.com/regulatory-compliance/ai-governance-wealth-management-sec-compliance/

[^1_29]: https://chronexa.io/blog/ai-agents-us-financial-services-sec-finra-ria

[^1_30]: https://www.remoteopenclaw.com/skills/vasilyu1983/ai-agents-public/product-management

[^1_31]: https://medium.com/@harshnarayan2013/ai-powered-agile-automating-scrum-with-databricks-llms-crew-ai-21d2ffa47f0d

[^1_32]: https://www.nist.gov/itl/ai-risk-management-framework

[^1_33]: https://www.nist.gov/itl/ai-risk-management-framework/ai-risk-management-framework-resources

[^1_34]: https://www.skillsdirectory.com/skills/aj-geddes-pm

[^1_35]: https://www.panewslab.com/en/articles/019cd5be-c9b1-7526-9aba-e15c1e85657e

[^1_36]: https://medium.com/@gstarikov/waterfall-2-0-llm-driven-workflows-in-software-development-701dc8b287ba

[^1_37]: https://www.nimbleway.com/blog/anthropic-claude-agent-skills

[^1_38]: https://www.remoteopenclaw.com/agents/claude/alirezarezvani/claude-skills/cs-product-manager

[^1_39]: https://www.rohan-paul.com/p/anthropic-released-agent-skills-a

[^1_40]: https://aiskill.market/blog/best-product-manager-ai-agents-2026

[^1_41]: https://github.com/alirezarezvani/claude-skills/blob/main/INSTALLATION.md

[^1_42]: https://github.com/boticello/ali-claude-skills

[^1_43]: https://claudewave.com/en/repo/deanpeters-product-manager-skills

[^1_44]: https://www.delightpath.com/blog/6-ai-agents-for-product-managers

[^1_45]: https://www.aakashg.com/ai-agents-for-pms/

[^1_46]: https://heyalo.ai/skills/tag/product-management

[^1_47]: https://productleadersdayindia.org/blogs/ai-product-management-guide/best-ai-agents-product-managers.html

[^1_48]: https://productschool.com/blog/artificial-intelligence/ai-agents-product-managers

[^1_49]: https://www.linkedin.com/jobs/view/agile-product-owner-agent-enablement-circle-at-jobs-via-dice-4298828040

[^1_50]: https://www.lennysnewsletter.com/p/make-product-management-fun-again

[^1_51]: https://productagent.substack.com/p/part-2-the-top-skills-product-managers

[^1_52]: https://theloops.io/career/product-manager-agentic-ai/

[^1_53]: http://www.arxiv.org/pdf/2507.01069.pdf

[^1_54]: https://www.ijircce.com/admin/main/storage/app/pdf/oT5JpsbL5bXJhWB3BDEevja4vA5LzCDhFyVnYERe.pdf

[^1_55]: https://jobgether.com/offer/6a3d033b2da8cde35c72f98b-career-opportunities-ai-product-manager---agentic-platform-global-414376

[^1_56]: https://medium.com/@santhi.productleader/from-prd-to-prompt-how-building-my-own-ai-agents-rewrote-my-product-management-playbook-c390ab1fff36

[^1_57]: https://www.linkedin.com/posts/pusulurisrinivasa_ai-agenticai-llm-activity-7437646605631221760-Qnj_

[^1_58]: https://www.youtube.com/watch?v=2x_0xKbuIvE

[^1_59]: https://pmprompt.com/blog/ai-agent-skills-guide

[^1_60]: https://www.reddit.com/r/ProductManagement/comments/1pfud0q/new_product_owner_for_agentic_ai_solutions_what/

[^1_61]: https://docs.bmad-method.org/cs/reference/agents/

[^1_62]: https://medium.com/accelerated-analyst/mastering-the-bmad-method-a-better-approach-to-agile-ai-driven-development-for-modern-software-a77a6808a9a0

[^1_63]: https://devlabs.angelhack.com/blog/bmad-method/

[^1_64]: https://dev.to/bspann/bmad-method-ai-driven-agile-development-that-actually-works-part-1-core-framework-36n1

[^1_65]: https://medium.com/@visrow/what-is-bmad-method-a-simple-guide-to-the-future-of-ai-driven-development-412274f91419

[^1_66]: https://www.youtube.com/watch?v=YLGrENURe98\&vl=en-US

[^1_67]: https://github.com/bmadcode/BMAD-METHOD/blob/main/docs/user-guide.md

[^1_68]: https://zeyinlu-am.medium.com/is-bmad-the-framework-every-pm-and-ai-operator-should-master-38dd335057f4

[^1_69]: https://bennycheung.github.io/bmad-reclaiming-control-in-ai-dev

[^1_70]: https://www.institutepm.com/knowledge-hub/ai-pm-in-fintech

[^1_71]: https://www.linkedin.com/pulse/ai-skills-todays-product-managers-creating-meaningful-sourav-nayyar-tpxrc

[^1_72]: https://in.talent.com/view?id=29aed04dddb5

[^1_73]: https://www.linkedin.com/jobs/view/full-time-product-manager-ai-data-platforms-financial-services-at-jobs-via-dice-4370706764

[^1_74]: https://www.dice.com/job-detail/451d368c-0625-4e49-a828-3bb1d8c98b42

[^1_75]: https://aixfinance.work/guides/finance-to-ai-product-management

[^1_76]: https://www.epam.com/careers/job-listings/job.epamgdo_blt5gpro3lfen01i00b_en-us_London_UK.senior-ai-product-manager-digital-financial-products_london_uk

[^1_77]: https://jobs.dell.com/en/job/hopkinton/senior-ai-solutions-technical-product-manager-fintech/375/91429191936

[^1_78]: https://builtin.com/job/artificial-intelligence-aiml-product-manager/3158656

[^1_79]: https://github.com/AftermathFinance/skills

[^1_80]: https://github.com/Snowflake-Labs/sfguide-financial-advisor-for-asset-management

[^1_81]: https://amazon.jobs/en-gb/jobs/10466719/product-manager-finance-ai-aws-finance

[^1_82]: https://glean.smartcoder.ai/a/claude-agents-skills-for-investment-banking-research-pe-and--4gsrkw

[^1_83]: https://www.linkedin.com/jobs/view/product-owner-agentic-ai-wealth-management-at-cognizant-4320345798

[^1_84]: https://www.linkedin.com/jobs/view/senior-product-owner-agentic-workflows-at-kizen-4423040095

[^1_85]: https://jobs.citi.com/job/new-york/ai-agentic-marketplace-product-manager/287/90524329648

[^1_86]: https://scrumdayindia.org/blogs/agentic-product-owner/agentic-product-owner.html

[^1_87]: https://www.linkedin.com/pulse/software-machine-speed-agentic-agile-phil-beaumont-ll4ge

[^1_88]: https://www.agilevisa.com/insights/ai-redefining-product-owner

[^1_89]: https://www.salesmate.io/blog/ai-agentic-workflows/

[^1_90]: https://remotive.com/remote/jobs/product/product-manager-ai-agent-orchestrator-4456224

[^1_91]: https://www.gapinc.com/en-us/jobs/w45/8/product-manager-ii,-orchestration-workflow

[^1_92]: https://builtin.com/job/asset-management-investment-platform-ai-product-owner-associate/8131950

[^1_93]: https://www.indeed.com/viewjob?jk=2187090952568b43

[^1_94]: https://www.dice.com/job-detail/e392425b-6baa-4d54-abba-a6221e85efe4

[^1_95]: https://www.builtinsf.com/job/staff-product-manager-ai-agent-orchestration/9288286

[^1_96]: https://remotive.com/remote/jobs/product/principal-product-manager-agentic-orchestration-4868101

[^1_97]: https://www.linkedin.com/pulse/agentic-search-agile-engineering-process-asif-makhani-tgkpc

[^1_98]: https://legalai.guide/en/docs/claude/advanced/13-regulatory-compliance

[^1_99]: https://www.metacto.com/blogs/ai-agents-regulated-industries-compliance

[^1_100]: https://mcpmarket.com/tools/skills/financial-sales-practice-compliance

[^1_101]: https://claudereadiness.com/blog/claude-financial-services-guide/

[^1_102]: https://openai.com/careers/product-manager-agents-platform/

[^1_103]: https://downloads.regulations.gov/NIST-2024-0001-0015/attachment_1.pdf

[^1_104]: https://downloads.regulations.gov/NIST-2024-0001-0077/attachment_1.pdf

[^1_105]: https://www.youtube.com/watch?v=cvpawdcDZmo

[^1_106]: https://www.sec.gov/investment/im-guidance-2017-02.pdf

[^1_107]: https://docs.modulos.ai/frameworks/nist-ai-rmf/generative-ai-profile

[^1_108]: https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf

[^1_109]: https://www.sec.gov/files/20230406-iac-letter-ethical-ai.pdf

[^1_110]: https://aigovernance.com/entry/sec-ai-governance-guidance

[^1_111]: https://www.finra.org/rules-guidance/notices/25-07

[^1_112]: https://www.dlapiper.com/en-us/insights/publications/ai-outlook/2024/nist-releases-its-generative-artificial-intelligence-profile

[^1_113]: https://www.finra.org/sites/default/files/2024-01/2024-annual-regulatory-oversight-report.pdf

[^1_114]: https://news.bloomberglaw.com/us-law-week/finra-reminds-financial-firms-how-ai-use-poses-significant-risks

[^1_115]: https://kestra.io/careers/51b67438-6b1a-494a-acea-b3f25bc62070-product-manager-ai

[^1_116]: https://jpmc.fa.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_2001/job/210765728/?amp\&lastSelectedFacet=CATEGORIES\&selectedCategoriesFacet=300000086251864

[^1_117]: https://kestra.io/blogs/orchestrate-ai-agents-kestra

[^1_118]: https://nerdleveltech.com/jobs/kestra-technologies-product-manager-ai-productm

[^1_119]: https://www.remoteatlas.app/jobs/product-manager-ai-at-kestra

[^1_120]: https://bebee.com/us/jobs/senior-lead-product-manager-artificial-intelligence-ai-wealth-investment-management-usm-business-sys--theladde-86329018

[^1_121]: https://jobs.alven.co/jobs/kestra

[^1_122]: https://kestra.io/docs/ai-tools

[^1_123]: https://kestra.io/docs/ai-tools/ai-agents

[^1_124]: https://www.linkedin.com/jobs/view/product-owner-ai-at-nevis-4343767574

[^1_125]: https://www.ziprecruiter.com/c/U.S.-Bank/Job/Senior-Product-Manager-Agentic-AI-\&-Workflow-Transformation/-in-Charlotte,NC?jid=4f701ba9160c855e

[^1_126]: https://www.dice.com/job-detail/01792a0a-fe0b-478f-b6b8-680ef3f7d5f6

[^1_127]: https://builtin.com/job/ai-agentic-marketplace-product-manager/8178307

[^1_128]: https://www.linkedin.com/jobs/view/product-manager-claude-code-model-performance-at-anthropic-4424601692

[^1_129]: https://mcpmarket.com/tools/skills/agile-product-owner-agent-1

[^1_130]: https://www.youtube.com/watch?v=FhoaFOxr2xE

[^1_131]: https://medium.com/@rakesh.malloju/context-engineering-for-product-managers-the-next-big-10x-skill-38de541e8b9b

[^1_132]: https://www.youtube.com/watch?v=bYiXxeinhbg

[^1_133]: https://shows.acast.com/a-lheure-des-donnees/episodes/benoit-pimpaud-orchestration-kestra

[^1_134]: https://www.sachinrekhi.com/p/claude-code-for-product-managers

[^1_135]: https://ccforpms.com/

[^1_136]: https://mcpmarket.com/tools/skills/ai-product-owner

[^1_137]: https://www.scribd.com/document/1010978354/OceanofPDF-com-Claude-Code-for-Product-Managers-Robin-Jones

[^1_138]: https://www.linkedin.com/jobs/view/lead-ai-product-manager-with-retirement-wealth-domain-remote-at-jobs-via-dice-4424246594


---

## My Prompt

1. Primarily advisor-facing and back-office internal tools. 
2. The primary surface is Jira/Confluence and GitHub Copilot.
3. Jira artifacts

Claude's prioritization in the previous search is the most aligned with my needs.

## Perplexity Response

### 1. Where Models Agree

| Finding | GPT-5.6 Sol | Claude Opus 4.8 Thinking | Gemini 3.1 Pro Thinking | Evidence |
| :-- | :-- | :-- | :-- | :-- |
| Use a decision-quality PM/PO skill library as the “brain,” then generate Jira artifacts | ✓ | ✓ | ✓ | All recommend a workflow that drives discovery/decision rigor first, then outputs epics/stories/AC for Jira consumption.[^2_1][^2_2] |
| Make the system Jira/Confluence-native (not “docs in chat”), with an integration bridge to create/update issues | ✓ | ✓ | ✓ | TWG skills and Atlassian/GitHub integrations exist to push content into Jira/Confluence and keep work auditable in-system.[^2_3][^2_4] |
| Add wealth-management-specific guardrails: approvals, audit trails, privacy/data boundaries, compliance review gates | ✓ | ✓ | ✓ | FINRA emphasizes governance, privacy/integrity, reliability/accuracy; models propose compliance gate skills and maker-checker style prompts.[^2_5] |
| Use a readiness/DoR critic gate before handing tickets to Copilot coding agent | ✓ | ✓ | ✓ | Models propose a “Readiness Critic / DoR enforcer” to prevent ambiguous stories from going to implementation agents.[^2_6][^2_7] |
| Leverage existing skill packs (PM skills + finance verticals) but customize to firm process and Jira schema | ✓ | ✓ | ✓ | Dean Peters PM skills as baseline; Anthropic finance repo for domain workflows; then adapt to internal policies and fields.[^2_1][^2_8] |


***

### 2. Where Models Disagree

| Topic | GPT-5.6 Sol | Claude Opus 4.8 Thinking | Gemini 3.1 Pro Thinking | Why They Differ |
| :-- | :-- | :-- | :-- | :-- |
| Best “bridge” for Jira/Confluence write actions | TWG CLI skills as safest cross-agent bridge | TWG + Copilot for Jira as primary path | Rovo agents / Jira Automation calling LLM, plus repo instructions | Different assumptions on what you can standardize org-wide (TWG universal `.agents/skills` vs Atlassian-native Rovo vs bespoke automation).[^2_3][^2_7][^2_4] |
| How to encode wealth-management compliance | Build a custom regulatory impact mapper that cites internal WSP/policy in Confluence | Add a mandatory compliance-gate skill + mine finance-vertical repo for domain workflow structure | A focused Reg S‑P / data-boundary auditor + 17a‑4 style audit trail checks | Different depth: “policy-linked, structured fields” vs “gate at intake” vs “privacy boundary + recordkeeping.”[^2_5][^2_8] |
| Primary format for making Jira tickets executable for Copilot | Mixed: structured assertions + selective Gherkin (don’t force everything) | Standard PM templates + AC where appropriate | Strong push for EARS + strict GWT/BDD to drive test-first coding | Different views on when BDD is best vs when structured non-Gherkin requirements are clearer (telemetry, retention, contracts). |


***

### 3. Unique Discoveries

| Model | Unique Finding | Why It Matters |
| :-- | :-- | :-- |
| Claude Opus 4.8 Thinking | Practical “three-layer stack”: PM decision skills (Dean Peters) + Jira write bridge (TWG/Copilot for Jira) + wealth-management domain pack (Anthropic financial-services) | This matches your preference and gives a concrete adoption path without inventing everything.[^2_1][^2_3][^2_8] |
| GPT-5.6 Sol | A detailed internal target architecture with explicit roles (Discovery Facilitator → Workflow Modeler → Regulatory Impact Analyst → Decomposer → Jira Writer → Readiness Critic → Copilot handoff) | Useful as your operating model for agent responsibilities and approvals (especially in regulated workflows).[^2_5] |
| Gemini 3.1 Pro Thinking | “Executable spec” emphasis: use EARS + GWT as the lingua franca so Copilot can reliably generate tests and implementation | Good if your main goal is turning Jira AC into test cases and code with minimal back-and-forth. |


***

### 4. Comprehensive Analysis

**High-confidence findings.** The models converge on a design that fits your stated constraints: keep the **authoritative workflow in Jira/Confluence**, use agentic skills to **coach the PO and produce Jira artifacts**, and only then hand well-formed tickets to **GitHub Copilot coding agent** for implementation. This is materially different from “write a PRD faster”: it’s an assembly line where each skill has a specific purpose (discovery, decomposition, compliance gating, readiness checking). GPT-5.6 Sol’s explicit role separation is especially aligned with regulated wealth management, where you want clear ownership of *who decided what* and *what evidence exists* when auditors ask later.[^2_5][^2_4][^2_3]

All models also agree that **wealth-management customization is mostly about controls and data boundaries**, not fancy finance language. In practice: maker/checker approvals, role-based entitlements, audit evidence, retention implications, and “what happens on exceptions” (custodian API failures, stale data, restriction checks). FINRA’s reminder that rules remain applicable and that firms should consider governance, privacy/integrity, reliability and accuracy makes it reasonable to bake a “regulatory impact / compliance context” section (or custom fields) into every epic/story generated by the agent. That turns compliance into a repeatable intake step instead of a late-stage scramble.[^2_5]

Finally, there’s strong agreement that your best foundation—given your preference for Claude’s earlier prioritization—is **deanpeters/Product-Manager-Skills** for decision rigor and artifact quality, then **a bridge** that actually writes/updates Jira/Confluence artifacts (rather than leaving humans to copy/paste). This directly supports your “Jira artifacts” requirement.[^2_1][^2_3]

**Areas of divergence.** The biggest practical choice you need to make is the “hands layer”: TWG vs Atlassian Rovo automation vs Copilot-for-Jira. Claude Opus 4.8 Thinking and GPT-5.6 Sol both like TWG because it standardizes skills into a universal `.agents/skills` layout used across multiple agents and emphasizes write-safety semantics—valuable in your environment. Gemini is more willing to rely on Atlassian-native Rovo agents and Jira Automation, which can be very effective for in-product workflows but may be harder to keep consistent across Copilot + repo-based engineering agents if you want one shared skill contract.[^2_3]

The second divergence is formatting strategy for acceptance criteria. Gemini pushes hardest for strict GWT/EARS everywhere to make tickets “executable.” That’s often great for behavioral rules, but GPT-5.6 Sol cautions (correctly, in enterprise systems) that not everything belongs in Gherkin—data contracts, audit logging, retention class, observability, and security constraints are frequently clearer as structured requirement blocks. The best synthesis for your use case is: **BDD for user-visible behavior + structured NFR/control checklists for everything else**.

**Unique insights worth noting.** Claude Opus 4.8 Thinking’s three-layer stack is the cleanest blueprint for what you asked: (1) decision-quality PM skills, (2) Jira/Confluence write bridge, (3) wealth-management domain pack. GPT-5.6 Sol’s “Readiness Critic” gate is the single highest leverage control if you want Copilot to succeed on the first pass—because it prevents under-specified tickets from ever entering implementation. Gemini’s executable-spec framing is worth adopting specifically as a “Copilot readiness contract”: if the agent can translate the Jira ticket into tests without inventing requirements, the ticket is ready.[^2_8][^2_7][^2_1][^2_3]

**Recommendations.** Implement an organization-owned **PO Story System** with these *8 skills/modules* (names are suggestions), optimized for advisor-facing + back-office workflows and Jira artifact output:

1) **Discovery Facilitator** (interactive intake → problem/outcome/roles) using Dean Peters discovery skills.[^2_1]
2) **Workflow Modeler (Advisor/Ops)** producing a Confluence workflow + exceptions + approval points.
3) **Reg/Privacy Boundary Gate** (Reg S‑P + audit trail + supervision prompts) aligned to FINRA guidance.[^2_5]
4) **Outcome + Assumption Mapper** (metrics, guardrails, experiment/validation plan).
5) **Epic/Story Decomposer** (vertical slices; not layer-based work).
6) **Jira Artifact Writer** (your exact Jira schema + labels + links + custom fields).
7) **Definition-of-Ready / Readiness Critic** (blocking questions, contradictions, missing evidence).
8) **Copilot Handoff Packager** (summarize into a bounded “implementation packet,” then allow assignment to Copilot coding agent when Ready).

If you answer one more question, I can give you a concrete Jira field schema + templates: **What Jira issue types and custom fields do you already have (or want)** for (a) epics vs stories vs subtasks, and (b) compliance/risk flags (e.g., “touches NPPI,” “books \& records impact,” “requires principal approval”)?
<span style="display:none">[^2_10][^2_11][^2_12][^2_13][^2_14][^2_15][^2_16][^2_17][^2_18][^2_19][^2_20][^2_21][^2_22][^2_23][^2_24][^2_25][^2_26][^2_27][^2_28][^2_29][^2_30][^2_31][^2_32][^2_33][^2_34][^2_35][^2_36][^2_37][^2_38][^2_39][^2_40][^2_41][^2_42][^2_43][^2_44][^2_45][^2_46][^2_47][^2_48][^2_49][^2_50][^2_51][^2_52][^2_53][^2_9]</span>

<div align="center">⁂</div>

[^2_1]: https://github.com/deanpeters/Product-Manager-Skills

[^2_2]: https://siliconangle.com/2025/12/18/anthropic-makes-agent-skills-open-standard/

[^2_3]: https://developer.atlassian.com/cloud/twg-cli/agents/skills/

[^2_4]: https://github.blog/changelog/2026-03-05-github-copilot-coding-agent-for-jira-is-now-in-public-preview/

[^2_5]: https://www.finra.org/rules-guidance/notices/24-09

[^2_6]: https://www.atlassian.com/software/rovo/use-cases/agent-product-requirements-expert

[^2_7]: https://support.atlassian.com/rovo/docs/work-with-rovo-dev-in-automations/

[^2_8]: https://github.com/OctagonAI/skills

[^2_9]: https://github.com/pratikshadake/claude-product-management-skills

[^2_10]: https://www.atlassian.com/software/rovo/guides/end-user-guide/using-rovo-with-specific-atlassian-cloud-apps

[^2_11]: https://github.blog/changelog/2026-03-25-github-copilot-for-jira-public-preview-enhancements/

[^2_12]: https://github.blog/changelog/2026-04-22-github-copilot-for-jira-our-latest-enhancements/

[^2_13]: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent

[^2_14]: https://pmprompt.com/agent-skills

[^2_15]: https://github.com/marketplace/github-copilot-for-jira

[^2_16]: https://github.com/features/copilot/agents

[^2_17]: https://www.mindstudio.ai/blog/agentic-coding-workflow-claude-code-jira-walkthrough

[^2_18]: https://www.linkedin.com/posts/diwakarsinghbamentor_i-used-to-spend-2-hours-every-sprint-writing-activity-7460684797435170817-_iqI

[^2_19]: https://mcpmarket.com/tools/skills/privacy-and-data-security-compliance

[^2_20]: https://mcpmarket.com/tools/skills/investment-adviser-compliance-manager

[^2_21]: https://mcpmarket.com/tools/skills/advertising-compliance

[^2_22]: https://mcpmarket.com/tools/skills/regulatory-reporting-compliance

[^2_23]: https://mcpmarket.com/tools/skills/financial-sales-practice-compliance

[^2_24]: https://claude-plugins.dev/skills/@openshift-eng/ai-helpers/create-epic

[^2_25]: https://www.youtube.com/watch?v=CWzjZLpPbLM

[^2_26]: https://github.com/deanpeters/Product-Manager-Skills/blob/main/AGENTS.md

[^2_27]: https://www.youtube.com/watch?v=zVR86U8HCXk

[^2_28]: https://docs.github.com/zh/enterprise-cloud@latest/copilot/how-tos/use-copilot-agents/cloud-agent/integrate-cloud-agent-with-jira

[^2_29]: https://lobehub.com/mcp/sairajeshk-jira-mcp-integration

[^2_30]: https://claude-plugins.dev/skills/@johncarpenter/claude-code-resources/prd-generator

[^2_31]: https://claudeimplementation.com/blog/claude-jira-integration

[^2_32]: https://docs.github.com/de/copilot/how-tos/use-copilot-agents/cloud-agent/integrate-cloud-agent-with-jira

[^2_33]: https://support.atlassian.com/rovo/docs/atlassian-agents/

[^2_34]: https://www.youtube.com/watch?v=j56GosRjZr0

[^2_35]: https://www.youtube.com/watch?v=ql1MIvohHqE

[^2_36]: https://lobehub.com/pt-BR/mcp/gidanis-copilot-jira-mcp

[^2_37]: https://www.youtube.com/watch?v=3BvSH0F85Zg

[^2_38]: https://github.com/alambertt/mcp-jira-example

[^2_39]: https://medium.com/@carloverzeri/how-to-setup-copilot-mcp-for-jira-and-confluence-c9699522dc0c

[^2_40]: https://www.youtube.com/watch?v=xcoBQaEmuWY

[^2_41]: https://medium.com/learnings-from-the-paas/boosting-your-productivity-with-github-copilot-agent-mode-using-jira-and-github-mcp-servers-88e923efe79a

[^2_42]: https://ecanarys.com/from-jira-story-to-done-how-github-copilot-atlassian-mcp-server-delivered-an-entire-feature-autonomously/

[^2_43]: https://www.bitovi.com/ai-enablement-blog/how-github-copilot-completed-my-jira-ticket-in-2-minutes

[^2_44]: https://www.released.so/jira-product-management/auto-generate-public-description-rovo-jira-automation

[^2_45]: https://community.atlassian.com/forums/Rovo-questions/Automated-Issue-Creation-without-User-Confirmation-in-Rovo-and/qaq-p/3190147

[^2_46]: https://community.atlassian.com/forums/Jira-Service-Management/Automation-Set-approval-when-creating-issue/qaq-p/2771511

[^2_47]: https://community.atlassian.com/forums/App-Central-articles/Rovo-Agents-How-To-Use-and-Transform-Your-Jira-Workflows/ba-p/3117887

[^2_48]: https://docs.github.com/en/copilot/reference

[^2_49]: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/integrate-cloud-agent-with-jira

[^2_50]: https://docs.github.com/ja/copilot/how-tos/use-copilot-agents/cloud-agent/integrate-cloud-agent-with-jira

[^2_51]: https://www.youtube.com/watch?v=FjwGvfl6sNk

[^2_52]: https://docs.github.com/ko/enterprise-cloud@latest/copilot/how-tos/use-copilot-agents/cloud-agent/integrate-cloud-agent-with-jira

[^2_53]: https://www.atlassian.com/blog/it-teams/automate-approval-workflows-in-jira

