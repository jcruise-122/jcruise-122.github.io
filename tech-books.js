/* Additional safe, beginner-to-advanced technology courses. Cybersecurity content is defensive and authorization-focused. */
const techBooks = {
  cybersecurity: {
    title: "Learn Cybersecurity: Beginner to Advanced", subtitle: "Build a defensive security mindset for protecting people, data, and systems.", docs: "https://www.cisa.gov/secure-our-world", chapters: [
      ["Security mindset and authorization", "Cybersecurity is the practice of reducing risk to systems, information, and people. Start with ethics, privacy, and permission: work only on devices and services you own or have explicit authorization to assess. This course focuses on prevention, safe configuration, detection, recovery, and responsible reporting—not breaking into systems.", "A simple defensive cycle:\n1. Identify what matters.\n2. Understand likely risks.\n3. Apply sensible protections.\n4. Notice and respond to problems.\n5. Learn and improve.", "Write a short acceptable-use statement for a personal learning lab. Name the systems in scope and state that no public or third-party systems are targets."],
      ["Accounts, authentication, and privacy", "Use unique passwords stored in a reputable password manager, enable multifactor authentication, and review account recovery options. Keep devices and apps updated. Share only information needed for a task. Learn the difference between authentication (who you are) and authorization (what you may do).", "Account safety checklist:\n- Unique password for every account\n- Multifactor authentication enabled\n- Recovery email and phone reviewed\n- Old sessions and unused apps removed\n- Important files backed up", "Choose a personal account and complete a security review using its official settings. Do not share passwords or recovery codes."],
      ["Risk, assets, and threat modeling", "A practical risk assessment identifies important assets, possible ways they could be harmed, weaknesses, and the impact of an incident. Threat modeling helps teams ask what they are protecting, who needs access, what could go wrong, and which safeguards are proportional. Avoid collecting data you do not need.", "A small risk register:\nAsset: student contact list\nConcern: accidental disclosure\nImpact: privacy harm\nSafeguards: limited access, secure storage, retention limit\nReview date: next term", "Create a risk register for a fictional school club website. Focus on privacy, availability, and accidental exposure."],
      ["Secure development fundamentals", "Security belongs throughout software design and maintenance. Validate data at trust boundaries, encode output for its context, use parameterized database queries, keep secrets out of source control, and give each component only the access it needs. Use maintained dependencies and review changes before release.", "Safer application habits:\n- Validate input on the server\n- Encode output for its destination\n- Use parameterized database operations\n- Store secrets in managed configuration\n- Keep dependencies updated\n- Log events without exposing secrets", "Review a small application you own or a deliberately safe teaching sample. Make a checklist of input validation, output encoding, secret handling, and dependency updates."],
      ["Updates, backups, and secure configuration", "A secure baseline reduces unnecessary software, accounts, and exposed services. Apply vendor updates in a planned way, use standard accounts for everyday work, lock devices, and encrypt sensitive storage where appropriate. Maintain backups that are protected from accidental deletion and periodically verify that restoration works.", "A personal device maintenance plan:\n- Automatic security updates enabled\n- Screen lock and device encryption enabled\n- Unused apps removed\n- Backup schedule recorded\n- Restore test date recorded", "Create a maintenance and backup schedule for a device you own. Include a safe restore test that does not risk your only copy."],
      ["Defensive monitoring and incident response", "Monitoring should be lawful, proportionate, and respectful of privacy. Keep useful system and application records protected from alteration and limit who can view them. If you suspect an incident, follow your organization’s plan: report promptly, preserve relevant information, avoid speculative changes, and use approved support channels. Restore from trusted sources and review what can be improved.", "Incident response outline:\n1. Report through the approved contact.\n2. Record what you observed and when.\n3. Follow containment instructions from the responsible team.\n4. Preserve records according to policy.\n5. Recover and review the plan.", "Draft a one-page incident contact and recovery plan for a small community organization. Include who to notify and where verified backups are kept."],
      ["Governance, careers, and a safe capstone", "Organizations manage security through clear responsibilities, written policies, training, risk review, and continual improvement. Useful learning paths include IT support, secure software development, governance and risk, privacy, and defensive operations. Practice using intentionally designed training environments and follow their rules; never probe real systems without clear permission.", "Capstone deliverables:\n- Asset and data inventory\n- Plain-language risk register\n- Account and update checklist\n- Backup and recovery plan\n- Incident contact sheet\n- Lessons learned and next review date", "Prepare a defensive improvement plan for a fictional small library website. Explain priorities, user privacy, recovery steps, and how you would verify improvements without testing anyone else’s systems."]
    ]
  },
  networking: {
    title: "Learn Computer Networking: Beginner to Advanced", subtitle: "Understand how devices communicate and how to troubleshoot networks safely.", docs: "https://developer.mozilla.org/en-US/docs/Web/HTTP", chapters: [
      ["What a network does", "A network connects devices so they can exchange information. A local network links nearby devices; the internet connects many networks. Learn to describe a network diagram, distinguish a router from a switch, and troubleshoot only networks you are allowed to manage.", "A simple request path:\nYour device → local Wi-Fi/router → internet provider → destination service\nThe reply travels back through the connection.", "Draw the path from your phone to a website. Mark which devices and networks you control."],
      ["Addresses, ports, and names", "IP addresses help route data to a device interface. Ports identify services or conversations on a device. DNS translates human-friendly names to network addresses. These concepts help explain normal connections; do not scan or probe networks without explicit permission.", "Everyday concepts:\nIP address: where to route a packet\nPort: which service or conversation\nDNS: name-to-address lookup\nURL: identifies a web resource", "Explain, in your own words, how a browser can use a domain name to reach a website."],
      ["Protocols and the web", "Protocols define shared communication rules. TCP provides reliable ordered delivery; IP handles addressing and routing. HTTP describes web requests and responses, while HTTPS protects that web connection with encryption and identity checks. Modern applications may use other protocols too.", "A simplified web exchange:\nRequest: method + path + headers + optional body\nResponse: status + headers + optional body\nHTTPS protects the connection in transit.", "Use browser developer tools on a site you are permitted to visit and identify a request method and response status. Do not collect private data."],
      ["Wi-Fi and home network care", "Wi-Fi connects devices over radio. Use current router software, a unique administrator password, strong Wi-Fi security supported by your equipment, and a guest network for visitors or smart devices where available. Place equipment thoughtfully and ask your provider before changing settings you do not understand.", "Home network checklist:\n- Router software kept current\n- Administrator password changed from default\n- Strong supported Wi-Fi protection\n- Guest access reviewed\n- Unknown devices investigated through router support tools", "Review the settings of your own home router or ask its owner to review them with you. Record safe improvements without sharing credentials."],
      ["Troubleshooting and reliable services", "Troubleshoot from simple causes to complex ones: check power and cables, Wi-Fi connection, device settings, service status, and provider notices. Record the time and exact error. Reliability also depends on redundancy, monitoring, capacity, and recovery plans.", "A careful troubleshooting note:\nTime: when the problem began\nScope: one device or many\nObservation: exact message\nChange: what was changed\nOutcome: what happened next", "Write a troubleshooting guide for a fictional home network outage. Include safe checks and when to contact the provider."],
      ["Network design and project", "Network design balances performance, security, cost, and maintainability. Document trusted devices, guest access, critical services, and recovery contacts. Use monitoring approved by the network owner and protect any collected data. Practice with diagrams, simulators, or an isolated training setup.", "Small-office design questions:\n- Which users and devices need access?\n- Which services are essential?\n- How are guests separated?\n- How are configuration and backups protected?\n- Who responds to an outage?", "Design a network diagram for a small classroom. Explain guest Wi-Fi, essential services, privacy, and a simple recovery plan."]
    ]
  },
  linux: {
    title: "Learn Linux & the Command Line: Beginner to Advanced", subtitle: "Build confidence managing files, processes, and software on Linux systems.", docs: "https://www.kernel.org/doc/html/latest/", chapters: [
      ["Meet the terminal", "A terminal lets you interact with a shell by entering commands. Learn on a computer or virtual machine you own or are authorized to use. Commands may change files, so understand a command before running it and keep backups of important work.", "pwd       # show the current directory\nls        # list directory contents\ncd folder # move into a directory\nwhoami    # show the current account", "Open a terminal and use pwd, ls, and cd to navigate a practice folder you created."],
      ["Files, folders, and safe operations", "Linux represents many resources through files, but not every path is an ordinary document. Use your home directory for practice. Copy important files before making changes, check the current location, and be especially careful with recursive deletion or commands run with elevated privileges.", "mkdir practice\nprintf 'Hello\\n' > practice/hello.txt\ncat practice/hello.txt\ncp practice/hello.txt practice/copy.txt", "Create a folder with a few text files, list them, copy one, and explain what each command changed."],
      ["Permissions and accounts", "Permissions control which users can read, write, or execute a file. Use a standard account for ordinary work and request administrator privileges only for a trusted, understood task. Do not make files broadly writable just to bypass a permissions problem.", "ls -l practice/hello.txt\n# Review the owner and permission bits.\n# Change permissions only after you understand who needs access.", "Inspect permissions in your practice folder and describe which account can read or edit each file."],
      ["Processes and software updates", "A process is a running program. System tools can show processes and available storage. Install software through trusted distribution repositories or approved management tools, and apply updates according to the device owner’s policy. Avoid commands copied from untrusted sources.", "ps          # view processes for your session\ndf -h       # view filesystem space\n# Use your distribution's documented update process.", "Find a documented update guide for a Linux distribution you use. Summarize how it verifies and applies updates."],
      ["Shell scripts and automation", "Shell scripts automate repeated tasks. Quote variable expansions, use clear filenames, and test scripts against a sample directory before applying them to important data. A script should explain its purpose and stop safely when an expected step fails.", "#!/usr/bin/env bash\nset -eu\nfor file in ./*.txt; do\n  [ -e \"$file\" ] || continue\n  printf 'Text file: %s\\n' \"$file\"\ndone", "Write a script that lists text files in a test folder. Test it when the folder is empty and when filenames contain spaces."],
      ["System care and capstone", "Reliable system administration includes documentation, updates, backups, least privilege, and change planning. Keep a record of what you changed and how to undo it. Learn from official distribution documentation and practice in a disposable virtual machine when a task could affect system stability.", "Change record:\nPurpose:\nSystem and owner approval:\nFiles or settings affected:\nBackup and rollback plan:\nVerification result:", "Prepare a Linux workstation setup checklist for a student. Include account safety, updates, backups, and a safe practice workspace."]
    ]
  },
  databases: {
    title: "Learn Databases & SQL: Beginner to Advanced", subtitle: "Model reliable data and query it clearly and safely.", docs: "https://www.postgresql.org/docs/current/", chapters: [
      ["What a database is", "A database stores information in a structured way so applications can create, read, update, and remove records. A relational database organizes data into tables with rows and columns. Use a local practice database with fictional information while learning.", "A simple books table:\nbook_id | title       | author\n1       | River Road  | N. Author\n2       | Bright Sky  | M. Writer", "Sketch tables for a library with books and borrowers. Decide what information each table needs."],
      ["Tables, keys, and relationships", "A primary key uniquely identifies a row. A foreign key connects related records and can help preserve consistency. Choose data types thoughtfully, name fields clearly, and avoid storing the same fact in many places. A schema is the plan for the tables and their relationships.", "CREATE TABLE books (\n  id INTEGER PRIMARY KEY,\n  title TEXT NOT NULL,\n  author TEXT NOT NULL\n);", "Design a books table and a loans table. Identify primary and foreign keys and explain the relationship."],
      ["Querying with SQL", "SELECT retrieves data. WHERE filters rows, ORDER BY sorts them, and LIMIT can cap the result count. Use explicit columns instead of selecting everything when building an application. SQL dialects differ slightly, so consult the documentation for your database.", "SELECT title, author\nFROM books\nWHERE author = 'N. Author'\nORDER BY title;", "Write queries to list available books and sort them by title. Use sample data only."],
      ["Joins, grouping, and useful summaries", "Joins combine related rows using a matching condition. Aggregates such as COUNT and SUM summarize information. GROUP BY creates groups for those aggregates. Check whether a join can multiply rows unexpectedly, and test a query against a small sample first.", "SELECT books.title, COUNT(loans.id) AS loan_count\nFROM books\nLEFT JOIN loans ON loans.book_id = books.id\nGROUP BY books.id, books.title;", "Create a query that counts loans per book, including books that have never been borrowed."],
      ["Constraints, transactions, and indexes", "Constraints protect data rules, such as required values and unique identifiers. A transaction groups related changes so they succeed or fail together. Indexes can speed up some lookups but consume space and add write cost; measure using representative, authorized data before adding them.", "BEGIN;\nUPDATE books SET title = 'Updated title' WHERE id = 1;\nCOMMIT;\n-- Roll back instead if validation fails before commit.", "Describe a multi-step checkout transaction and what should happen if one step fails."],
      ["Safe application access and project", "Applications should pass values separately from SQL text using parameterized queries. Use accounts with only the permissions they need, protect credentials, and back up data. Test queries with empty, unusual, and invalid inputs. Avoid copying real personal information into a learning database.", "Parameterized-query idea:\nSQL: SELECT title FROM books WHERE id = :id\nValue: id = user-selected integer\nKeep SQL structure separate from user-provided values.", "Build a small fictional catalog with create, search, update, and delete operations. Use parameterized queries, constraints, and a documented backup plan."]
    ]
  },
  cloud: {
    title: "Learn Cloud Computing: Beginner to Advanced", subtitle: "Understand cloud services, responsible operations, and reliable design.", docs: "https://aws.amazon.com/what-is-cloud-computing/", chapters: [
      ["Cloud concepts", "Cloud computing provides computing resources through managed services. Common models include infrastructure, platform, and software services. Teams choose cloud services for flexibility, but remain responsible for selecting settings that fit their needs and obligations.", "A service decision:\nNeed: host a small website\nOptions: managed site platform or virtual server\nCompare: control, maintenance, cost, backup, access, and support", "Compare a managed website service with a virtual server for a fictional school club. List trade-offs without creating an account or spending money."],
      ["Regions, availability, and shared responsibility", "Cloud providers operate services in locations and availability zones. Availability design considers failure and recovery. Security responsibilities are shared: the provider protects underlying services while customers configure identity, data access, applications, and many service settings. Exact responsibilities depend on the service.", "Responsibility questions:\nWho manages the operating system?\nWho can access stored files?\nWho applies application updates?\nHow are backups restored?\nWhere is data stored?", "Make a shared-responsibility checklist for a fictional cloud file-sharing service."],
      ["Identity, data, and cost", "Use individual accounts, multifactor authentication, least privilege, and managed secrets. Classify data before storing it and follow privacy and retention requirements. Cloud resources can incur charges; set budgets and alerts, remove unused resources, and review cost estimates before deployment.", "Pre-deployment checklist:\n- Approved account and owner\n- Required data classification\n- Least-privilege access plan\n- Budget and alert plan\n- Backup and deletion plan", "Create a no-spend deployment checklist for a demo project. Include access, privacy, and cost controls."],
      ["Deployments and automation", "Infrastructure as code describes resources in reviewable files and can make changes repeatable. Keep secrets out of repositories, review proposed changes, and separate development from production. Start with small changes and have a rollback plan. Provider tooling varies, so follow current official documentation.", "Safe deployment workflow:\n1. Review the change.\n2. Estimate cost and permissions.\n3. Apply to a non-production environment.\n4. Verify health and access.\n5. Record or roll back the change.", "Draw a deployment workflow for a static learning website. Mark review, testing, access, and rollback steps."],
      ["Reliability, monitoring, and recovery", "Reliable systems define what users need and how quickly service should recover. Monitor health indicators without collecting unnecessary personal information. Back up important data, test restoration, and document who responds. A recovery plan should be understandable even when the primary operator is unavailable.", "Recovery plan essentials:\nService owner and contacts\nCritical data and backup location\nRecovery order\nVerification checks\nCommunication plan", "Write a recovery outline for a small educational website and specify how a restoration would be verified."],
      ["Architecture and capstone", "Good cloud architecture balances security, reliability, performance, cost, and sustainability. Avoid adopting services without a clear need. Document decisions, limits, and exit plans so data and applications can be moved or retired responsibly.", "Architecture review:\n- What is essential?\n- What can fail?\n- Who can change it?\n- What data is stored?\n- What will it cost?\n- How can it be restored or retired?", "Design a conceptual cloud solution for a class resource site. Include access control, backups, cost awareness, monitoring, and a retirement plan."]
    ]
  },
  datascience: {
    title: "Learn Data Science Foundations: Beginner to Advanced", subtitle: "Ask useful questions, analyze data carefully, and communicate evidence responsibly.", docs: "https://www.python.org/about/gettingstarted/", chapters: [
      ["Questions, data, and ethics", "Data science uses data and analytical methods to help answer questions. Begin by defining the decision or question, who may be affected, and what data is genuinely needed. Respect consent, privacy, and retention. A chart or model does not automatically prove a cause.", "A project question:\nQuestion: How can a library improve opening hours?\nUseful evidence: anonymized visit counts by time\nRisks: collecting identities unnecessarily\nDecision: compare a few schedule options", "Choose a school or community question and list the minimum data needed to explore it responsibly."],
      ["Collecting and organizing data", "A dataset is a structured collection of observations and variables. Keep units, labels, and collection methods documented. Check for missing values, duplicates, inconsistent formats, and sampling bias. Use fictional or public data with suitable permissions while practicing.", "Data quality checklist:\n- What does each row represent?\n- What does each column mean?\n- Which units are used?\n- Are values missing or duplicated?\n- Who is missing from the sample?", "Inspect a small public or invented dataset and write down three possible quality issues."],
      ["Descriptive statistics", "Descriptive statistics summarize observations. Mean is sensitive to extreme values; median is often more robust. Spread measures such as range or standard deviation help show variation. Always consider the population, sample size, and context when interpreting summaries.", "Values: 2, 3, 3, 4, 18\nMean: 6\nMedian: 3\nThe mean and median differ because one value is much larger.", "Calculate mean and median for a small invented list. Explain which better represents a typical value and why."],
      ["Visualization and communication", "A good visualization makes a comparison or pattern easier to understand without misleading people. Choose a chart suited to the question, label axes and units, show relevant context, and use accessible colors. Avoid implying certainty that the data cannot support.", "Chart review:\n- Clear title and question\n- Labeled axes and units\n- Appropriate scale\n- Source and time period\n- Accessible colors and text", "Sketch a chart for monthly library visits and write a neutral caption that does not claim cause."],
      ["Patterns, uncertainty, and simple models", "A pattern in a sample may not hold for everyone or in the future. Correlation is not proof of causation. Models simplify reality and can inherit bias from their data. Separate training and evaluation data when learning predictive methods, and describe uncertainty to decision-makers.", "Responsible interpretation:\nObservation: two measures changed together\nNot yet proven: one caused the other\nNext: check context, data quality, alternative explanations, and uncertainty", "Write a short explanation of a fictional trend and include one limitation and one alternative explanation."],
      ["Reproducible analysis and capstone", "A reproducible project records data sources, definitions, transformations, and assumptions. Keep code and notes organized, avoid publishing private data, and make conclusions traceable to evidence. Review results with people who understand the domain before recommending important decisions.", "Project outline:\nQuestion and intended decision\nPermitted dataset and limitations\nCleaning steps\nAnalysis and visuals\nFindings, uncertainty, and next steps", "Create a short report from a small permitted dataset. Include one visualization, a clear limitation, and a privacy review."]
    ]
  }
};

// The original language books load first. Replace the fallback only when a new technology-course key is selected.
const selectedTechBook = techBooks[new URLSearchParams(window.location.search).get("book")];
if (selectedTechBook) {
  const title = document.getElementById("book-title");
  const subtitle = document.getElementById("book-subtitle");
  const contents = document.getElementById("contents");
  const main = document.getElementById("book-content");
  document.title = `${selectedTechBook.title} | Benes Papers`;
  title.textContent = selectedTechBook.title;
  subtitle.textContent = selectedTechBook.subtitle;
  contents.replaceChildren();
  main.replaceChildren();

  const intro = document.createElement("section");
  intro.className = "intro";
  intro.id = "start";
  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = "Beginner → Intermediate → Advanced";
  const heading = document.createElement("h2");
  heading.textContent = "Welcome!";
  const description = document.createElement("p");
  description.textContent = "Work through the lessons, review the examples, and complete the practice tasks. Build knowledge step by step, ask questions, and use responsible, ethical practices throughout.";
  intro.append(tag, heading, description);
  if (new URLSearchParams(window.location.search).get("book") === "cybersecurity") {
    const notice = document.createElement("p");
    notice.className = "callout";
    notice.textContent = "Safety and authorization: this course is for defensive learning. Practice only on systems you own or have explicit permission to assess. The lessons do not authorize testing public or third-party systems.";
    intro.append(notice);
  }
  main.append(intro);

  selectedTechBook.chapters.forEach(([chapterTitle, explanation, example, exercise], index) => {
    const id = `lesson-${index + 1}`;
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${id}`;
    link.textContent = chapterTitle;
    item.append(link);
    contents.append(item);

    const article = document.createElement("article");
    article.id = id;
    const h2 = document.createElement("h2");
    h2.textContent = `${index + 1}. ${chapterTitle}`;
    const p = document.createElement("p");
    p.textContent = explanation;
    const pre = document.createElement("pre");
    const code = document.createElement("code");
    code.textContent = example;
    pre.append(code);
    const task = document.createElement("div");
    task.className = "exercise";
    const strong = document.createElement("strong");
    strong.textContent = "Try it: ";
    task.append(strong, document.createTextNode(exercise));
    article.append(h2, p, pre, task);
    main.append(article);
  });

  const finish = document.createElement("section");
  finish.className = "endmatter";
  const finishTitle = document.createElement("h2");
  finishTitle.textContent = "Keep learning";
  const finishText = document.createElement("p");
  finishText.textContent = "Choose a small project, write down your assumptions, and improve it in safe, reviewable steps. Use trusted documentation and follow applicable policies and laws.";
  const docs = document.createElement("a");
  docs.href = selectedTechBook.docs;
  docs.textContent = "Explore trusted documentation";
  docs.target = "_blank";
  docs.rel = "noopener noreferrer";
  const back = document.createElement("p");
  const backLink = document.createElement("a");
  backLink.href = "programming-books.html";
  backLink.textContent = "Browse all programming and tech books";
  back.append(backLink);
  finish.append(finishTitle, finishText, docs, back);
  main.append(finish);
}
