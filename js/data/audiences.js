"use strict";
/* Content for the Industries, Universities and Government pages. Rendered by js/audience.js.
   Rules: no invented statistics, partners, results or testimonials. Numbers written as {courses}, {hours}, {spec}, {free}, {levels}, {formats}
   are calculated from js/data/courses.js. Track course lists use course ids from the catalogue. Organisation names come from js/data/home.js. */
window.NAVYUG_AUDIENCES = {

  industries: {
    title: "Navyug Learn for Industries",
    description: "Short, practical courses that help employees and teams build skills at work, with a speciality in EV and battery technology.",
    hero: {
      variant: "photo",
      h1: "Build the skills your workforce needs.",
      lead: "Short, practical courses for employees and teams, with a speciality in EV and battery technology alongside business, data and communication.",
      ticks: ["Self-paced learning on any device", "Lessons from one hour to two and a half", "Courses shaped around your roles on request"],
      cta: ["Talk to us", "#contact"], ghost: ["See the courses →", "#courses"]
    },
    stats: [["{courses}", "courses in the catalogue"], ["{hours}", "hours of learning content"], ["{spec}", "EV and battery courses"], ["{formats}", "course formats, from free tutorials to full courses"]],
    network: { eyebrow: "Industry and innovation", title: "Learning built with industry in mind", text: "Navyug Learn courses combine technical subjects with the practical skills teams use every day. Our learning network includes organisations from industry and innovation.", ticks: ["Technical depth in EV, battery and charging", "Everyday skills in data, planning and communication"], group: "Organisations and initiatives" },
    features: { id: "why", title: "What your team gets", items: [
      ["clock", "Courses people finish", "Short lessons and clear next steps, so learning fits around the working day instead of competing with it."],
      ["bolt", "Technical depth where it matters", "EV, battery, battery management and charging courses for engineering, service and operations teams."],
      ["chart", "Progress people can see", "Each learner sees the lessons they have completed and what comes next."],
      ["briefcase", "Content for your context", "Work with us to shape courses around your tools, roles and the way your business works."]
    ] },
    tracks: { id: "courses", eyebrow: "Learning tracks", title: "Choose the right track for your team", sub: "Each track groups courses around one area of work. Start with one, or combine them.", items: [
      { name: "EV and Battery Track", text: "For engineering, service and operations teams working with electric vehicles and their supporting systems.", courses: ["ev-fundamentals", "ev-powertrain", "battery-fundamentals", "bms-essentials", "ev-charging-basics"], more: ["Explore EV and battery courses", "explore.html?cat=Electric%20Vehicles"] },
      { name: "Business and Management Track", text: "For managers and teams who plan work, understand customers and handle money with confidence.", courses: ["business-foundations", "project-planning", "personal-finance", "brand-strategy"], more: ["Explore business courses", "explore.html?cat=Business"] },
      { name: "Data and Digital Track", text: "For teams that read data, work in spreadsheets and need to stay safe and capable online.", courses: ["data-literacy", "spreadsheets-everyday", "digital-safety", "web-fundamentals"], more: ["Explore data courses", "explore.html?cat=Data%20Science"] }
    ] },
    cards: { id: "sectors", title: "Learning for every kind of work", sub: "Examples of where Navyug courses can help. Tell us your industry and we will suggest where to start.", sector: true, items: [
      ["Automotive and EV ecosystem", "EV, battery, battery management and charging technology for engineering, service and operations teams."],
      ["Manufacturing and logistics", "Reading data, spotting problems early and improving how work gets done."],
      ["Energy and utilities", "Understanding electric mobility, charging infrastructure and the systems around them."],
      ["Retail and hospitality", "Clear communication and understanding customers."],
      ["Financial services", "Data literacy and sound judgement with numbers."],
      ["Technology and startups", "Web basics, data skills and clear communication for fast-moving teams."]
    ] },
    how: { id: "how", title: "How we work together", steps: [
      ["Tell us about your team", "Share the skills you want to build and who needs them."],
      ["Choose the courses", "Start from our catalogue or agree new courses to build."],
      ["Your team starts learning", "Employees enrol, learn at their own pace and track their progress."],
      ["Review and expand", "Look at what worked together and decide what comes next."]
    ] },
    faq: { id: "faq", items: [
      ["How big does a team need to be?", "There is no minimum. Tell us your team size and we will suggest a starting point."],
      ["What does it cost?", "Pricing depends on the programme. Send an enquiry and we will reply with options."],
      ["Can you build courses for our context?", "Yes. Tell us the roles and tools involved and we will agree a course outline with you."],
      ["Can progress be reported to managers?", "Each learner sees their own progress. Tell us what reporting your managers need."]
    ] },
    contact: { title: "Tell us what your team needs to learn.", text: "Share your company, who the learners are and what you want them to achieve. We will reply by email with options.", ticks: ["Tell us about your team and goals", "We reply by email with options", "No commitment to enquire"],
      orgLabel: "Company", extra: { name: "teamSize", label: "Team size", options: ["1–10", "11–50", "51–200", "More than 200"] } },
    cross: ["universities", "government", "individuals"]
  },

  campus: {
    title: "Navyug Learn for Universities",
    description: "Practical courses that sit alongside degree programmes, with a speciality in EV and battery technology.",
    hero: {
      variant: "band",
      h1: "Expand your curriculum with practical, job-relevant courses.",
      lead: "Add short technical and professional courses beside your degree programmes, so students graduate with practical skills as well as qualifications.",
      panel: [["book", "Practical courses", "Short, structured courses with clear outcomes."], ["bolt", "EV and battery technology", "Our speciality, for engineering and technology programmes."], ["clock", "Self-paced for students", "Learn alongside lectures, on any device."], ["users", "Support for faculty", "Course outlines and learning outcomes to plan with."]],
      cta: ["Contact us", "#contact"], ghost: ["See the courses →", "#courses"]
    },
    stats: [["{courses}", "courses in the catalogue"], ["{hours}", "hours of learning content"], ["{levels}", "levels, from beginner to intermediate"], ["{free}", "free tutorials students can start today"]],
    network: { eyebrow: "Education", title: "Institutions connected with Navyug Learn", text: "Navyug Learn is built to work with universities and colleges. Our learning network includes institutions in engineering, technology and management education.", ticks: ["Courses that complement degree programmes", "Outlines and outcomes shared for planning"], group: "Education" },
    features: { id: "why", title: "What your students get", items: [
      ["bolt", "Technical depth", "EV, battery, battery management and charging courses that go beyond the syllabus."],
      ["book", "Skills for every graduate", "Writing, clear thinking, data literacy and project planning for any programme."],
      ["clock", "Learning at their own pace", "Short lessons students can fit around lectures and exams."],
      ["chart", "Progress they can see", "Learners track completed lessons and keep notes beside each one."]
    ] },
    tracks: { id: "courses", eyebrow: "Programme areas", title: "Courses by programme area", sub: "Match courses to the programmes you run, or build a bundle with us.", items: [
      { name: "Engineering and Technology", text: "For engineering and technology programmes: electric vehicles, batteries, charging and web basics.", courses: ["ev-fundamentals", "ev-powertrain", "battery-fundamentals", "bms-essentials", "ev-charging-basics", "web-fundamentals"], more: ["Explore EV and battery courses", "explore.html?cat=Electric%20Vehicles"] },
      { name: "Management and Commerce", text: "For business and management programmes: planning, money, customers and brands.", courses: ["business-foundations", "personal-finance", "brand-strategy", "project-planning"], more: ["Explore business courses", "explore.html?cat=Business"] },
      { name: "Skills for Every Graduate", text: "For any programme: communication, thinking, data and research skills.", courses: ["writing-clearly", "better-thinking", "data-literacy", "user-research"], more: ["Explore all courses", "explore.html"] }
    ] },
    cards: { id: "uses", title: "How institutions use Navyug Learn", sub: "Three common ways to bring practical learning into a university.", items: [
      ["Alongside the degree", "Offer courses as supplementary or elective learning that adds practical skills to a programme."],
      ["Short skill programmes", "Run a course or a track as a focused programme for a cohort, department or batch."],
      ["Faculty and staff development", "Give faculty and support staff short courses on new technical and professional topics."]
    ] },
    how: { id: "how", title: "How we work together", steps: [
      ["Tell us about your programmes", "Share the departments, cohorts and skills you want to support."],
      ["Choose the courses", "Pick from the catalogue, or agree new courses to build with your faculty."],
      ["Students start learning", "Students enrol, learn at their own pace and track progress."],
      ["Review with faculty", "Look at what worked together and plan the next semester."]
    ] },
    faq: { id: "faq", items: [
      ["Can the courses count for credit?", "Credit is decided by your institution. We can share course outlines and learning outcomes to support that decision."],
      ["Which programmes are the courses suited to?", "Engineering and technology programmes can use the EV and battery courses. Management, commerce and general programmes can use the business, data and communication courses."],
      ["Can faculty shape the content?", "Yes. We can agree new courses or adapt existing ones with your faculty."],
      ["What does it cost?", "Pricing depends on the programme and the number of students. Send an enquiry and we will reply with options."]
    ] },
    contact: { title: "Talk to us about your programmes.", text: "Tell us about your institution, the programmes you run and the skills you want your students to build. We will reply by email with options.", ticks: ["Connect courses to your programmes", "Strengthen practical skills for students", "Support faculty with outlines and outcomes"],
      orgLabel: "Institution", extra: { name: "role", label: "Your role", options: ["Faculty", "Head of department", "Placement or training office", "Administration", "Other"] } },
    cross: ["industries", "government", "individuals"]
  },

  government: {
    title: "Navyug Learn for Governments",
    description: "Skills programmes for public servants and citizens, including EV, clean-mobility and policy learning.",
    hero: {
      variant: "photo",
      h1: "Build skills across the public sector.",
      lead: "Practical courses for departments, agencies and communities, including EV and clean-mobility learning, data skills and clear communication.",
      ticks: ["Programmes for public servants and departments", "Free tutorials that citizens can start today", "Tell us the languages your learners need"],
      cta: ["Contact us", "#contact"], ghost: ["See the courses →", "#courses"]
    },
    stats: [["{courses}", "courses in the catalogue"], ["{free}", "free tutorials open to everyone"], ["{spec}", "EV and battery courses"], ["{hours}", "hours of learning content"]],
    network: { eyebrow: "Public sector and enterprise", title: "Organisations connected with Navyug Learn", text: "Navyug Learn supports skills and enterprise initiatives. Our learning network includes organisations working on enterprise and innovation.", ticks: ["Courses for departments and agencies", "Learning open to citizens and communities"], group: "Organisations and initiatives", only: ["MSME", "Startup India", "OPJU Innovation Center"] },
    features: { id: "why", dark: true, title: "Government training built for impact", text: "Build in-demand skills with short, structured courses that public servants and citizens can take at their own pace.", items: [
      ["users", "Role-based programmes", "Programmes shaped around the roles and goals of your department or agency."],
      ["globe", "Learning for citizens", "Free tutorials open to everyone, so communities can start learning without a barrier."],
      ["bolt", "EV and clean-mobility literacy", "Courses on electric vehicles, batteries, charging infrastructure and the policy around them."],
      ["check", "Structured, self-paced delivery", "Short modules and lessons with clear outcomes, reviewed with you after each programme."]
    ] },
    tracks: { id: "courses", eyebrow: "Learning tracks", title: "Choose the right track for your department", sub: "Each track groups courses around one area of public service.", items: [
      { name: "Clean Mobility and Policy", text: "For teams working on electric mobility, charging infrastructure and the policy around them.", courses: ["ev-policy-initiatives", "ev-fundamentals", "ev-charging-basics", "battery-fundamentals"], more: ["Explore EV and battery courses", "explore.html?cat=Electric%20Vehicles"] },
      { name: "Digital and Data for Public Service", text: "For staff who work with data, spreadsheets and digital services every day.", courses: ["data-literacy", "spreadsheets-everyday", "digital-safety", "web-fundamentals"], more: ["Explore data courses", "explore.html?cat=Data%20Science"] },
      { name: "Service, Communication and Planning", text: "For teams that plan projects, write clearly and make sound decisions.", courses: ["writing-clearly", "project-planning", "better-thinking", "business-foundations"], more: ["Explore all courses", "explore.html"] }
    ] },
    cards: { id: "uses", title: "Programmes by audience", sub: "Navyug Learn can serve different groups within the same programme.", items: [
      ["Public servants", "Role-based courses in planning, communication, data and decision making."],
      ["Departments and agencies", "Programmes for whole teams, including EV, battery and charging technology for departments working on electric mobility."],
      ["Citizens and communities", "Free tutorials on electric vehicles, EV policy and everyday digital skills."]
    ] },
    how: { id: "how", title: "How we work together", steps: [
      ["Tell us about your department", "Share the roles, the skills needed and who the learners are."],
      ["Choose the courses", "Select from the catalogue or agree new courses to build."],
      ["Learners start", "Participants enrol, learn at their own pace and track their progress."],
      ["Review and plan next steps", "Review results with you and decide how the programme grows."]
    ] },
    faq: { id: "faq", items: [
      ["Which languages are the courses in?", "Courses are in English. Tell us which languages your learners need and we will discuss options."],
      ["Do you cover government EV initiatives?", "Our EV policy course explains why governments support electric mobility and how to read official policy sources. We can work with your department to add current scheme details."],
      ["Can citizens use the courses?", "Yes. Our tutorials are free and open to everyone, and other courses can be offered through a programme."],
      ["How is learner data handled?", "We agree with you how learner data is handled before any programme begins."],
      ["What does it cost?", "Pricing depends on the programme. Send an enquiry and we will reply with options."]
    ] },
    contact: { title: "Tell us about your department.", text: "Share your organisation, who the learners are and what you want them to achieve. We will reply by email with options.", ticks: ["Tell us about your department and learners", "We reply by email with options", "No commitment to enquire"],
      orgLabel: "Department or organisation", extra: { name: "level", label: "Type of organisation", options: ["Central government", "State government", "Local body", "Public sector organisation", "Other"] } },
    cross: ["industries", "universities", "individuals"]
  }
};
