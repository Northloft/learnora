"use strict";
/* Catalogue data. One entry per course. Edit here only.
   type: Tutorial | Essentials | Course. price is in INR (0 = free). Prices are PLACEHOLDERS until set by Navyug.
   sample: true marks demonstration content that is NOT an approved Navyug offering. It is labelled on every card and course page.
           Remove the flag only when Navyug has reviewed and approved the course.
   speciality: true puts a course in the EV and battery technology section of the homepage.
   keywords: extra search terms (acronyms such as EV or BMS). */
const courses = [
  /* ---- EV and battery technology (SAMPLE content, see lessons.js) ---- */
  {
    id: "ev-fundamentals", sample: true, speciality: true, type: "Tutorial", price: 0,
    title: "Electric Vehicles: The Basics", category: "Electric Vehicles", level: "Beginner", duration: 60, durationLabel: "1 hour",
    keywords: "EV electric vehicle BEV PHEV hybrid range regenerative braking",
    description: "See how an electric vehicle is put together, how it differs from hybrids, and what decides how far it can go.",
    artTitle: "Meet the EV.", symbol: "EV", background: "#E0E0E0", foreground: "#1A1A1A",
    outcomes: ["Describe the main parts of an electric vehicle.", "Compare battery electric, hybrid and plug-in hybrid vehicles.", "Explain regenerative braking and what affects range."]
  },
  {
    id: "ev-powertrain", sample: true, speciality: true, type: "Course", price: 1999,
    title: "Inside the EV Powertrain", category: "Electric Vehicles", level: "Intermediate", duration: 120, durationLabel: "2 hours",
    keywords: "EV motor inverter traction drivetrain converter efficiency",
    description: "Follow energy from the battery to the wheels and learn what the motor, inverter and converters each do.",
    artTitle: "Battery to wheels.", symbol: "⚡", background: "#E0E0E0", foreground: "#1A1A1A",
    outcomes: ["Describe how a traction motor produces torque.", "Explain the role of the inverter and the DC-DC converter.", "Trace energy flow and losses from battery to wheels."]
  },
  {
    id: "battery-fundamentals", sample: true, speciality: true, type: "Essentials", price: 499,
    title: "Battery Technology Fundamentals", category: "Battery Technology", level: "Beginner", duration: 90, durationLabel: "90 minutes",
    keywords: "battery lithium-ion cell pack capacity C-rate state of charge EV",
    description: "Understand how a lithium-ion cell works, how cells become packs, and how to read the numbers on a battery.",
    artTitle: "Cell to pack.", symbol: "▮▮", background: "#E0E0E0", foreground: "#1A1A1A",
    outcomes: ["Explain how a lithium-ion cell stores and releases energy.", "Distinguish a cell, a module and a pack.", "Read capacity, energy, C-rate and state of charge."]
  },
  {
    id: "bms-essentials", sample: true, speciality: true, type: "Course", price: 1999,
    title: "Battery Management Systems: Essentials", category: "Battery Technology", level: "Intermediate", duration: 150, durationLabel: "2.5 hours",
    keywords: "BMS battery management system balancing protection state of charge EV",
    description: "Learn what a battery management system measures, how it balances cells and estimates charge, and how it protects the pack.",
    artTitle: "Keep the pack safe.", symbol: "BMS", background: "#E0E0E0", foreground: "#1A1A1A",
    outcomes: ["Describe what a battery management system monitors.", "Explain cell balancing and state estimation.", "Identify the protection functions of a BMS."]
  },
  {
    id: "ev-charging-basics", sample: true, speciality: true, type: "Essentials", price: 499,
    title: "EV Charging Basics", category: "Charging Infrastructure", level: "Beginner", duration: 80, durationLabel: "80 minutes",
    keywords: "EV charging charger AC DC fast charging EVSE infrastructure connector kW",
    description: "Compare AC and DC charging, meet the parts of a charging system and estimate how long a charge takes.",
    artTitle: "Power up.", symbol: "kW", background: "#E0E0E0", foreground: "#1A1A1A",
    outcomes: ["Distinguish AC and DC charging.", "Describe the main parts of a charging system.", "Estimate charging time from energy and power."]
  },
  {
    id: "ev-policy-initiatives", sample: true, speciality: true, type: "Tutorial", price: 0,
    title: "EV Policy and Government Initiatives", category: "Electric Vehicles", level: "Beginner", duration: 60, durationLabel: "1 hour",
    keywords: "EV policy government initiatives incentives regulation scheme standards",
    description: "Learn why governments support electric mobility, the kinds of policy tools they use, and how to read an official source.",
    artTitle: "Read the policy.", symbol: "§", background: "#E0E0E0", foreground: "#1A1A1A",
    outcomes: ["Describe why governments support electric mobility.", "Identify common types of policy tool.", "Find and read an official policy source."]
  },
  /* ---- General catalogue ---- */
  {
    id: "business-foundations",
    featured: true,
    type: "Course",
    price: 1999,
    title: "Business Foundations",
    category: "Business",
    level: "Beginner",
    duration: 90,
    durationLabel: "90 minutes",
    description: "Understand how businesses create value, serve customers and turn ideas into useful products and services.",
    artTitle: "Think like a builder.",
    symbol: "↗",
    background: "#F2C94C",
    foreground: "#1A1A1A",
    outcomes: [
      "Explain how a business creates value.",
      "Identify customers and their basic needs.",
      "Describe the role of revenue, costs and value."
    ]
  },
  {
    id: "data-literacy",
    featured: true,
    type: "Course",
    price: 1999,
    title: "Data Literacy: The Essentials",
    category: "Technology",
    level: "Beginner",
    duration: 120,
    durationLabel: "2 hours",
    description: "Learn to read basic data, interpret charts and ask better questions before making decisions.",
    artTitle: "Make sense of data.",
    symbol: "01",
    background: "#D9E4DE",
    foreground: "#1A1A1A",
    outcomes: [
      "Distinguish common data types.",
      "Read and interpret simple charts.",
      "Recognize misleading data presentations."
    ]
  },
  {
    id: "brand-strategy",
    type: "Course",
    price: 1999,
    title: "Introduction to Brand Strategy",
    category: "Business",
    level: "Beginner",
    duration: 150,
    durationLabel: "2.5 hours",
    description: "Explore positioning, customer perception and the choices that help a brand stand out.",
    artTitle: "Make meaning matter.",
    symbol: "B.",
    background: "#E6DCD3",
    foreground: "#1A1A1A",
    outcomes: [
      "Distinguish a brand from its visual identity.",
      "Describe a target audience and its needs.",
      "Draft a basic positioning statement."
    ]
  },
  {
    id: "design-thinking",
    featured: true,
    type: "Course",
    price: 1999,
    title: "Design Thinking in Practice",
    category: "Design",
    level: "Beginner",
    duration: 100,
    durationLabel: "100 minutes",
    description: "Practice understanding user problems, generating ideas and testing early solutions.",
    artTitle: "Start with people.",
    symbol: "✳",
    background: "#DCD9EC",
    foreground: "#1A1A1A",
    outcomes: [
      "Describe the stages of design thinking.",
      "Write a clear problem statement.",
      "Plan a simple test for an idea."
    ]
  },
  {
    id: "web-fundamentals",
    type: "Essentials",
    price: 499,
    title: "How the Web Works",
    category: "Technology",
    level: "Beginner",
    duration: 80,
    durationLabel: "80 minutes",
    description: "Discover how browsers, websites, HTML, CSS and JavaScript work together to create web experiences.",
    artTitle: "Understand the web.",
    symbol: "</>",
    background: "#D9E5EE",
    foreground: "#1A1A1A",
    outcomes: [
      "Explain the role of a browser and a server.",
      "Describe the purpose of HTML, CSS and JavaScript.",
      "Identify the basic parts of a website."
    ]
  },
  {
    id: "better-thinking",
    type: "Tutorial",
    price: 0,
    title: "Thinking Clearly",
    category: "Personal Growth",
    level: "Beginner",
    duration: 60,
    durationLabel: "60 minutes",
    description: "Build a practical approach to questions, assumptions and everyday decisions.",
    artTitle: "Question the obvious.",
    symbol: "?",
    background: "#E7E2D3",
    foreground: "#1A1A1A",
    outcomes: [
      "Separate observations from assumptions.",
      "Ask more precise questions.",
      "Compare options using simple criteria."
    ]
  },
  {
    id: "spreadsheets-everyday",
    isNew: true,
    featured: true,
    type: "Tutorial",
    price: 0,
    title: "Spreadsheets for Everyday Work",
    category: "Technology",
    level: "Beginner",
    duration: 60,
    durationLabel: "1 hour",
    description: "Use spreadsheets to organise information, do simple calculations and see patterns in your data.",
    artTitle: "Make it add up.",
    symbol: "▦",
    background: "#D4E4F0",
    foreground: "#1A1A1A",
    outcomes: ["Organise information in rows, columns and tables.", "Use basic formulas to total, average and count.", "Turn a small data set into a clear chart."]
  },
  {
    id: "writing-clearly",
    isNew: true,
    featured: true,
    type: "Essentials",
    price: 499,
    title: "Writing Clearly at Work",
    category: "Personal Growth",
    level: "Beginner",
    duration: 75,
    durationLabel: "75 minutes",
    description: "Write emails, updates and short documents that people understand the first time they read them.",
    artTitle: "Say it simply.",
    symbol: "✎",
    background: "#F4C7A8",
    foreground: "#1A1A1A",
    outcomes: ["Plan a message around what the reader needs.", "Edit for shorter, clearer sentences.", "Match tone to the person and the situation."]
  },
  {
    id: "personal-finance",
    isNew: true,
    type: "Essentials",
    price: 499,
    title: "Personal Finance Basics",
    category: "Business",
    level: "Beginner",
    duration: 100,
    durationLabel: "100 minutes",
    description: "Understand budgets, saving, interest and risk well enough to make confident everyday money choices.",
    artTitle: "Know your money.",
    symbol: "₹",
    background: "#F6EFE0",
    foreground: "#1A1A1A",
    outcomes: ["Build a simple monthly budget.", "Explain how saving and interest work.", "Recognise common financial risks."]
  },
  {
    id: "project-planning",
    isNew: true,
    type: "Course",
    price: 1999,
    title: "Project Planning Basics",
    category: "Business",
    level: "Beginner",
    duration: 110,
    durationLabel: "110 minutes",
    description: "Break a goal into tasks, estimate time honestly and keep a small project on track.",
    artTitle: "Plan the work.",
    symbol: "▤",
    background: "#CFE0C8",
    foreground: "#1A1A1A",
    outcomes: ["Turn a goal into clear tasks.", "Estimate time and spot dependencies.", "Track progress and adjust the plan."]
  },
  {
    id: "user-research",
    isNew: true,
    featured: true,
    type: "Course",
    price: 1999,
    title: "Introduction to User Research",
    category: "Design",
    level: "Beginner",
    duration: 120,
    durationLabel: "2 hours",
    description: "Learn how to talk to people, listen for real needs and use what you hear to improve a product or service.",
    artTitle: "Ask. Listen.",
    symbol: "◔",
    background: "#DDD6EE",
    foreground: "#1A1A1A",
    outcomes: ["Write open, neutral interview questions.", "Run a short conversation and take useful notes.", "Summarise what you learned into a few insights."]
  },
  {
    id: "digital-safety",
    isNew: true,
    type: "Tutorial",
    price: 0,
    title: "Digital Safety Essentials",
    category: "Technology",
    level: "Beginner",
    duration: 70,
    durationLabel: "70 minutes",
    description: "Protect your accounts, spot common scams and keep your personal information safer online.",
    artTitle: "Stay safe online.",
    symbol: "◈",
    background: "#D4E4F0",
    foreground: "#1A1A1A",
    outcomes: ["Create and manage strong, unique passwords.", "Recognise phishing and common scams.", "Adjust privacy settings on everyday apps."]
  }
];

/* Categories. speciality: true groups a category under "EV and battery technology". image = course art used as the tile picture. */
const categories = [
  { name: "Electric Vehicles", speciality: true, image: "ev-fundamentals" },
  { name: "Battery Technology", speciality: true, image: "battery-fundamentals" },
  { name: "Charging Infrastructure", speciality: true, image: "ev-charging-basics" },
  { name: "Business", image: "business-foundations" },
  { name: "Technology", image: "data-literacy" },
  { name: "Design", image: "design-thinking" },
  { name: "Personal Growth", image: "better-thinking" }
];
