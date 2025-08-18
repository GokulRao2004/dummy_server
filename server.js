const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer();
const app = express();
const port = process.env.PORT || 3000;
// Use the CORS middleware
app.use(cors()); // Allows all origins by default

// Middleware to parse JSON bodies (with increased size limit)
app.use(express.json({ limit: "10mb" })); // Handles JSON payload

// Middleware to parse URL-encoded bodies (with increased size limit)
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Handles URL-encoded payload

const authenticateToken = (req, res, next) => {
  console.log("In authenticate token");
  const authHeader = req.headers["authorization"];
  const loginToken = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer token"
  // console.log('loginToken: ', loginToken);
  // console.log('Token: ', token);

  if (!loginToken) {
    return res.sendStatus(401); // No token provided
  }

  if (loginToken != token) {
    return res.sendStatus(401); // Token is invalid
  } else {
    // Save user info to request object
    next(); // Proceed to the next middleware or route handler
  }
};
const student_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1MjczNDkzOSwianRpIjoiNDMwYzlkYjItNTgwNi00MTFjLWFlYzYtODE2NTJmMmQyYTg3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjgiLCJuYmYiOjE3NTI3MzQ5MzksImNzcmYiOiJjNzg3OTM1Ny0zZGIwLTRiMGUtOTE4OS0xODRiMmE4NWE3NjEiLCJleHAiOjE3NTI3NzA5MzksInJvbGUiOiJzdHVkZW50IiwibmFtZSI6IkFtcnV0aGEgUmFvIn0.g-2DkOJT7rWkKOagnUtVv-QfNZDSkg_DddBMOuC3AFI";

const admin_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjMsInVzZXJuYW1lIjoiam9obl9kb2UiLCJyb2xlIjoiYWRtaW4ifQ.unsHQCc_McbecKoLBUx9hmBgwI-Fed8UuK6IZ-fcBII";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzNCIsInVzZXJfbmFtZSI6IlNocmVlIFJhbWEgVGFsZW50IFNvbHV0aW9ucyIsImV4cCI6MTcyNjkyMzA1MH0.dHgJSYwwOp27LJCmtq3KwoEZfx_2-BrwvHziTCpJrOM";

app.post("/auth/register", (req, res) => {
  console.log("Received data:", req.body);

  return res
    .status(200)
    .json({ message: "User signed up successfully.", token: student_token });
});

app.post("/auth/login", (req, res) => {
  console.log("Received data:", req.body);

  const { email, password } = req.body;
  // console.log(phone === "a@a.com")
  if (email === "a@a.com" && password === "a") {
    const token = student_token;
    return res.status(200).json({ token });
  } else if (email == "a@a.com" && password === "b") {
    const token = admin_token;
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

app.post("/auth/register", (req, res) => {
  console.log("Received registration data:", req.body);

  return res.status(201).json({ message: "User registered successfully." });
});

app.post("/auth/verify_token", (req, res) => {
  try {
    return res.status(200).json({ valid: true });
  } catch (err) {
    return res.status(401).json({ valid: false, message: "invalid token" });
  }
});

let userProfile = {
  profile_pic: null, // or a URL string if available
  full_name: "John Doe",
  dob: "1990-05-15",
  contact_number: "9876543210",
  email: "john.doe@example.com",
  college_email: "john.doe@college.edu",
  usn: "1MC20CS001",
  github_link: "https://github.com/johndoe",
  linkedin_link: "https://linkedin.com/in/johndoe",
  address: "123 Mock Street, Mock City, MC 12345",
  languages: "English, Hindi",
  certifications: "AWS Certified Solutions Architect, Scrum Master",
  education: {
    tenth: {
      school: "Mock High School",
      year: "2006",
      gpa: "9.4",
    },
    pu: {
      college: "Mock Pre-University College",
      year: "2008",
      gpa: "88%",
    },
    engineering: {
      college: "Mock Engineering College",
      year: "2012",
      gpa: "8.5",
    },
  },
};

let up = {
  profile_pic: null,
  basic: {
    full_name: "John Doe",
    dob: "1990-05-15",
    usn: "1MC20CS001",
    college_email: "john.doe@college.edu",
    contact_number: "9876543210",
    email: "john.doe@example.com",
    address: "123 Mock Street, Mock City, MC 12345",
    department_id: "1",
    pass_out_year: "2026",
    github_link: "https://github.com/johndoe",
    linkedin_link: "https://linkedin.com/in/johndoe",
  },
  others: {
    bank_details: {
      bank_name: "SBI",
      account_number: "1234434534",
      ifsc: "SBIN121212",
    },
    aadhaar_number: "12323423565",
    passport_number: "DE234VD",
  },
  offers: [
    {
      id: "1753104571803",
      offer_type: "Internship",
      company_name: "Akamai",
      role: "Ai intern",
      location: "Bengaluru",
      status: "",
      compensation: "50000",
      compensation_period: "Monthly",
      start_date: "2025-07-01",
      end_date: "2025-07-29",
      comments: "No comments",
    },
    {
      id: "1753104604503",
      offer_type: "Full-time",
      company_name: "Thoughworks",
      role: "SDE 1",
      location: "Hyderabad",
      status: "",
      compensation: "1000000",
      compensation_period: "Annual",
      start_date: "2025-07-26",
      end_date: "2028-09-21",
      comments: "No comments",
    },
  ],
  education: {
    tenth: {
      school: "Mock High School",
      year: "2006",
      gpa: "9.4",
    },
    pu: {
      college: "Mock Pre-University College",
      year: "2008",
      gpa: "88%",
    },
    graduation: {
      college: "RNSIT",
      year: "2023",
      gpa: "33",
      active_backlogs: "",
    },
    post_graduation: {
      college: "RNSIT",
      year: "2036",
      gpa: "99",
      active_backlogs: "1",
    },
    engineering: {
      college: "Mock Engineering College",
      year: "2012",
      gpa: "8.5",
    },
    academic_performance: {
      sem1: { gpa: "8", closed_backlogs: "", new_backlogs: "" },
      sem2: { gpa: "8", closed_backlogs: "", new_backlogs: "" },
      sem3: { gpa: "8", closed_backlogs: "", new_backlogs: "" },
      sem4: { gpa: "8", closed_backlogs: "", new_backlogs: "" },
      sem5: { gpa: "8", closed_backlogs: "", new_backlogs: "" },
      sem6: { gpa: "8", closed_backlogs: "", new_backlogs: "" },
      sem7: { gpa: "8", closed_backlogs: "", new_backlogs: "" },
      sem8: { gpa: "", closed_backlogs: "", new_backlogs: "" },
    },
  },

  experience: {
    role_title: "Data Engineer",
    professional_summary: "I want to be a engineer.",
    skills: {
      programming_languages: ["Python"],
      frameworks: ["Express"],
      tools: ["Webpack"],
      soft_skills: ["Communication"],
      other_skills: ["REST APIs"],
    },
    work_experience: [
      {
        job_title: "Software Engineer",
        company_name: "Google",
        start_date: "2022-06",
        end_date: "2024-01",
        location: "Mountain View, CA",
        description:
          "Worked on improving the performance of Google Search indexing systems, implemented microservices, and mentored junior developers.",
      },
      {
        job_title: "Backend Developer",
        company_name: "Stripe",
        start_date: "2020-03",
        end_date: "2022-05",
        location: "Remote",
        description:
          "Developed APIs for payment processing, optimized database queries for scalability, and contributed to CI/CD pipeline automation.",
      },
    ],

    internships: [
      {
        job_title: "AI Intern",
        company_name: "OpenAI",
        start_date: "2023-06",
        end_date: "2023-12",
        location: "San Francisco, CA",
        description:
          "Researched NLP models for conversational AI, experimented with reinforcement learning, and documented model evaluation metrics.",
      },
      {
        job_title: "Frontend Intern",
        company_name: "Spotify",
        start_date: "2022-01",
        end_date: "2022-06",
        location: "Stockholm, Sweden",
        description:
          "Built UI components with React, improved accessibility features, and collaborated with UX designers on user engagement tools.",
      },
    ],

    projects: [
      {
        title: "Title",
        technologies: "react",
        team_size: "2",
        description: "Description",
        links: "p2.com",
      },
    ],
  },
  achievements: {
    certifications: [
      {
        name: "AI 900",
        authority: "Microsoft",
        issue_date: "2025-07-31",
        expiration_date: "2025-07-03",
        credential_id: "123123",
        credential_url: "zx",
      },
    ],
    awards: [
      {
        title: "Branch Topper",
        issuer: "RNSIT",
        date: "2025-07-01",
        description: "",
      },
    ],
    volunteer_experience: [
      {
        organization: "ISIS",
        role: "Terrorist",
        start_date: "2025-01-01",
        end_date: "2026-01-01",
        description: "Bomb",
      },
    ],
    interests_and_hobbies: {
      languages: ["sdfsdfsdfsdfsdf"],
      interests: ["Running"],
    },
    publications: [
      {
        title: "PPublication 1",
        publisher: "Google",
        date: "2025-07-01",
        link: "no.com",
        description: "This is a great publication",
      },
    ],
  },
};

app.get("/auth/profile", (req, res) => {
  console.log("req: ", up);
  res.status(200).json({ ...up });
});

app.get("/auth/profile/complete", (req, res) => {
  const randomNumber = Math.floor(Math.random() * 11) + 3; // 0–10 + 10 => 10–20
  console.log("randomNumber: ", randomNumber);
  const isComplete = randomNumber > 10;

  res.status(200).json({ isComplete });
});

app.post("/auth/profile", (req, res) => {
  console.log("req: ", req.body);
  res.status(200).json();
});

app.post("/auth/job/apply", (req, res) => {
  // Simulate processing delay

  res.status(200).json({ message: "Application submitted successfully" });
});

app.post("/auth/otp/send", (req, res) => {
  // Here you would typically generate and send an OTP
  // For mock, we'll always send the OTP '123456'
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Simulate sending OTP to the phone number
  console.log(`Sending OTP ${email}`);

  return res.status(200).json({ message: "OTP sent successfully" });
});

app.post("/auth/otp/resend", (req, res) => {
  // Here you would typically generate and send an OTP
  // For mock, we'll always send the OTP '123456'
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Simulate sending OTP to the phone number
  console.log(`Sending OTP ${email}`);

  return res.status(200).json({ message: "OTP sent successfully" });
});

// Mock OTP verification endpoint
app.post("/auth/otp/verify", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res
      .status(400)
      .json({ message: "Phone number and OTP are required" });
  }

  // Hardcoded OTP is '123456'
  if (otp === "123456") {
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
});

app.get("/auth/billing", (req, res) => {
  res.json({
    totalLicenses: 1000,
    usedLicenses: 870,
    licenseExpiry: "31-Dec-2025",
    planType: "Annual",
    billingEmail: "admin@college.edu",
    billingAddress: "123 College Street, India",
    lastPayment: "01-Jul-2025",
    paymentMethod: "Visa •••• 1234",
    dueAmount: 1250,
    whatsapp: {
      messagesSent: 3560,
      costPerMessage: 0.35,
      totalChargeThisMonth: 1246,
      billingCycle: "Monthly",
    },
    paymentHistory: [],
  });
});

let plans = {
  plans: [
    {
      name: "Basic Plan",
      cost: "$10/month",
      description: "Perfect for individuals & small teams.",
      longDescription:
        "Get started quickly with all the essentials for a small team. The Basic Plan includes the core tools you need to manage your work and grow. Whether you're just starting your business or managing a small team, this plan covers all the basics without overloading you with unnecessary features.",
      features: [
        "  Task Management",
        "  Email Support",
        "  Up to 5 Users",
        "  1GB Cloud Storage",
      ],
    },
    {
      name: "Pro Plan",
      cost: "$30/month",
      description: "Scale your team with advanced features.",
      longDescription:
        "Take your business to the next level with the Pro Plan. This plan includes everything in the Basic Plan, but with advanced collaboration features, customizable workflows, and more integrations. Perfect for growing teams that need more power and flexibility to manage bigger projects and data.",
      features: [
        "  All Basic Plan Features",
        "  Advanced Reporting",
        "  Team Collaboration Tools",
        "  Priority Email Support",
        "  10GB Cloud Storage",
      ],
    },
    {
      name: "Enterprise Plan",
      cost: "$50/month",
      description: "Unlock the ultimate suite for large teams.",
      longDescription:
        "For businesses with ambitious goals, the Enterprise Plan is the best choice. This plan provides everything in the Pro Plan, but with unlimited users, unlimited storage, and custom solutions tailored for large teams and enterprises. Get personalized support, priority response times, and dedicated account managers to ensure the highest level of service.",
      features: [
        "  All Pro Plan Features",
        "  Unlimited Users",
        "  Custom Integrations",
        "  Dedicated Account Manager",
        "  100GB+ Cloud Storage",
        "  VIP Support (24/7)",
      ],
    },
  ],
};

app.get("/auth/plan", (req, res) => {
  res.json({ plan: plans, selected: "Pro Plan" });
});

let mockJobs = Array.from({ length: 100 }, (_, i) => {
  const roles = [
    "Frontend Developer",
    "Backend Engineer",
    "Full Stack Developer",
    "Data Scientist",
  ];
  const companies = ["Google", "Microsoft", "Amazon", "Netflix", "Meta"];
  const locations = ["Bangalore", "Mumbai", "Remote", "Delhi", "Hyderabad"];
  const remoteTypes = ["Remote", "Onsite", "Hybrid"];

  const role = roles[i % roles.length];
  const company = companies[i % companies.length];
  const location = locations[i % locations.length];
  const remoteType = remoteTypes[i % remoteTypes.length];
  const remote = remoteType === "Remote";

  return {
    logo: "https://i.ibb.co/hFJgrGNR/googlelogo.png",
    id: i + 1,
    company,
    role,
    location,
    remoteType,
    remote,
    experience: `${1 + (i % 5)}-${2 + (i % 5)} years`,
    salary: `${6 + (i % 5)}-${10 + (i % 5)} LPA`,
    postedOn: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
    starred: false, // default starred status is false,
    link: "https://www.google.com",
    templateId: 18,
  };
});

let mockJobsApplied = Array.from({ length: 10 }, (_, i) => {
  const roles = [
    "Frontend Developer",
    "Backend Engineer",
    "Full Stack Developer",
    "Data Scientist",
  ];
  const companies = ["Google", "Microsoft", "Amazon", "Netflix", "Meta"];
  const locations = ["Bangalore", "Mumbai", "Remote", "Delhi", "Hyderabad"];
  const remoteTypes = ["Remote", "Onsite", "Hybrid"];
  const statuses = ["in_progess", "selected", "rejected"];

  const role = roles[i % roles.length];
  const status = statuses[i % statuses.length];
  const company = companies[i % companies.length];
  const location = locations[i % locations.length];
  const remoteType = remoteTypes[i % remoteTypes.length];
  const remote = remoteType === "Remote";

  return {
    logo: "https://i.ibb.co/hFJgrGNR/googlelogo.png",
    id: i + 1,
    company,
    role,
    status,
    location,
    remoteType,
    remote,
    experience: `${1 + (i % 5)}-${2 + (i % 5)} years`,
    salary: `${6 + (i % 5)}-${10 + (i % 5)} LPA`,
    postedOn: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
    starred: false, // default starred status is false,
    link: "https://www.google.com",
    templateId: 18,
  };
});

// Mock in-memory store for starred jobs per user
let userStarredJobs = {}; // { userId: [jobId1, jobId2, ...] }

app.get("/auth/job", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  const search = req.query.search?.toLowerCase() || "";
  const location = req.query.location || "";
  const remote = req.query.remote === "true"; // Convert 'true'/'false' to boolean
  const userId = req.query.userId || "default"; // Assuming user ID is passed

  let filtered = mockJobs.filter((job) => {
    const matchesSearch =
      job.role.toLowerCase().includes(search) ||
      job.company.toLowerCase().includes(search);
    const matchesLocation = location ? job.location === location : true;
    const matchesRemote = remote ? job.remote : true; // Filter by remote status
    return matchesSearch && matchesLocation && matchesRemote;
  });

  // Check if the user has starred jobs
  const starredJobs = userStarredJobs[userId] || [];
  filtered = filtered.map((job) => ({
    ...job,
    starred: starredJobs.includes(job.id), // mark jobs that the user has starred
  }));

  const totalPages = Math.ceil(filtered.length / limit);
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  res.json({
    jobs: paginated,
    totalPages,
  });
});

app.get("/auth/job/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userId = req.query.userId || "default"; // If you want starred status per user

  const job = mockJobs.find((j) => j.id === id);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  // For demonstration, let's add a deadline field (e.g., 30 days after postedOn)
  const postedDate = new Date(job.postedOn);
  const deadlineDate = new Date(postedDate);
  deadlineDate.setDate(deadlineDate.getDate() + 30);

  // Check starred status for user
  const starredJobs = userStarredJobs[userId] || [];
  const isStarred = starredJobs.includes(job.id);

  res.json({
    job: {
      id: job.id,
      company: job.company,
      logo: job.logo,
      role: job.role,
      location: job.location,
      remoteType: job.remoteType,
      remote: job.remote,
      experience: job.experience,
      salary: job.salary,
      postedOn: job.postedOn,
      deadline: deadlineDate.toISOString().split("T")[0], // YYYY-MM-DD format
      starred: isStarred,
      link: job.link,
      templateId: job.templateId,
      description: `
        We are seeking an experienced Software Engineer to join our dynamic team. 
        In this role, you will work closely with cross-functional teams to design, 
        develop, and deploy high-quality software solutions. You will be responsible 
        for writing clean, maintainable code, participating in code reviews, and 
        driving the technical direction of projects.

        Responsibilities:
        - Develop scalable and efficient code
        - Collaborate with product managers, designers, and engineers
        - Ensure code quality through testing and reviews
        - Participate in sprint planning and agile ceremonies
        - Continuously improve software engineering practices

        Requirements:
        - Bachelor’s degree in Computer Science or related field
        - 3+ years of experience in software development
        - Proficient in JavaScript, React, Node.js (or your stack)
        - Familiarity with cloud platforms like AWS or Azure
        - Excellent problem-solving and communication skills

        Benefits:
        - Competitive salary and stock options
        - Flexible working hours and remote-friendly environment
        - Health insurance and wellness programs
        - Learning and development opportunities
        - Supportive and inclusive company culture
      `,
    },
  });
});

// Star/Unstar a job
app.post("/auth/job/star", (req, res) => {
  const { userId, jobId } = req.body;

  if (!userId || !jobId) {
    return res.status(400).json({ error: "Missing userId or jobId" });
  }

  if (!userStarredJobs[userId]) {
    userStarredJobs[userId] = [];
  }

  const starredIndex = userStarredJobs[userId].indexOf(jobId);

  if (starredIndex !== -1) {
    // If already starred, unstar it
    userStarredJobs[userId].splice(starredIndex, 1);
  } else {
    // If not starred, star it
    userStarredJobs[userId].push(jobId);
  }

  res.status(200).json({ message: "Job starred status updated successfully" });
});

// Get starred jobs with pagination
app.get("/auth/job/starred_job", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const userId = req.query.userId || "default"; // Assuming user ID is passed

  // Get the starred job IDs for the user
  const starredJobIds = userStarredJobs[userId] || [];

  // Filter the mockJobs array to get the starred jobs
  const starredJobs = mockJobs.filter((job) => starredJobIds.includes(job.id));

  // Paginate the starred jobs
  const totalPages = Math.ceil(starredJobs.length / limit);
  const paginatedStarredJobs = starredJobs.slice(
    (page - 1) * limit,
    page * limit
  );

  // Set the `starred` field to `true` for each job
  const starredJobsWithFlag = paginatedStarredJobs.map((job) => ({
    ...job,
    starred: true,
  }));

  res.json({
    starredJobs: starredJobsWithFlag,
    totalPages,
  });
});

const mockResumeData = {
  personal_details: {
    fullName: "Goku",
    phone: "12345667899",
    email: "a@a.com",
    linkedin: "linkedin.in",
    github: "github.com",
    portfolio: "a.com",
    location: "Bengaluru ",
    summary: "About Me and my goals",
  },
  skills: {
    programming_languages: ["Python", "Java"],
    frameworks: ["Pytorch"],
    tools: ["Vscode"],
    soft_skills: ["Soft-skills"],
    other_skills: ["Tech-SKils"],
  },

  projects: [
    {
      title: "Project 1",
      technologies: "react, js, node",
      teamSize: "1",
      description: "no impact",
      links: "https://www.link.com",
    },
  ],
  education: [
    {
      institution: "RNS Institute of Technology",
      degree: "Bachelors",
      fieldOfStudy: "PCMB",
      startDate: "2025-11",
      endDate: "2025-12",
      grade: "9.5",
    },
  ],
  certifications: [
    {
      name: "Cert1 ",
      authority: "Coursera",
      issueDate: "2025-01",
      expirationDate: "2025-11",
      credentialId: "12312hk123j1",
      credentialUrl: "url.com",
    },
  ],

  awards: [
    {
      title: "Award 1",
      issuer: "Issuer 1",
      date: "2025-01",
      description: "Desc",
    },
  ],

  work_experience: [
    {
      job_title: "Software Engineer",
      company_name: "Google",
      start_date: "2022-06",
      end_date: "2024-01",
      location: "Mountain View, CA",
      description:
        "Worked on improving the performance of Google Search indexing systems, implemented microservices, and mentored junior developers.",
    },
    {
      job_title: "Backend Developer",
      company_name: "Stripe",
      start_date: "2020-03",
      end_date: "2022-05",
      location: "Remote",
      description:
        "Developed APIs for payment processing, optimized database queries for scalability, and contributed to CI/CD pipeline automation.",
    },
  ],

  internships: [
    {
      job_title: "AI Intern",
      company_name: "OpenAI",
      start_date: "2023-06",
      end_date: "2023-12",
      location: "San Francisco, CA",
      description:
        "Researched NLP models for conversational AI, experimented with reinforcement learning, and documented model evaluation metrics.",
    },
    {
      job_title: "Frontend Intern",
      company_name: "Spotify",
      start_date: "2022-01",
      end_date: "2022-06",
      location: "Stockholm, Sweden",
      description:
        "Built UI components with React, improved accessibility features, and collaborated with UX designers on user engagement tools.",
    },
  ],

  volunteer_experience: [
    {
      organization: "Volunteer 1",
      role: "Student Technical Support – Faculty Development Program",
      startDate: "2025-01",
      endDate: "2025-02",
      description: "Desc",
    },
  ],
  interests: {
    languages: ["Kannada", "English", "Hindi"],
    interests: ["Painting", "Running"],
  },

  publications: [
    {
      title: "Pub 1",
      publisher: "Google",
      date: "2025-01",
      link: "ex.com",
      description: "Desc",
    },
  ],
};

const mockResumeData2 = {
  personal_details: {
    fullName: "Goku",
    phone: "12345667899",
    email: "a@a.com",
  },
  skills: {
    programming_languages: ["Python", "Java"],
  },
};
const mockResumes = [
  {
    id: "1",
    name: "John Doe",
    json: mockResumeData,
    starred: false,
  },
  {
    id: "2",
    name: "Jane Smith",
    json: mockResumeData,
    starred: true,
  },
  {
    id: "3",
    name: "Ali Khan",
    json: mockResumeData,
    starred: false,
  },
  {
    id: "4",
    name: "Priya Patel",
    json: mockResumeData,
    starred: false,
  },
  {
    id: "5",
    name: "Carlos Garcia",
    json: mockResumeData,
    starred: true,
  },
];

app.get("/auth/resume", (req, res) => {
  res.json({ resumes: [] });
});

app.post("/auth/resume/rename", (req, res) => {
  const request = req.body;
  res.status(200).json("Success");
});

app.post("/auth/resume", (req, res) => {
  const request = req.body;
  res.status(200).json({ id: 1, name: "Sallu", json: {} });
});

app.delete("/auth/resume", (req, res) => {
  const request = req.body;
  res.status(200).json("Success");
});

app.get("/auth/resume/:id", (req, res) => {
  const id = req.params;
  console.log("id: ", id);

  res.json({ ...mockResumeData });
});

const generateCoverLetter = () => {
  return `Dear Hiring Manager,

I am writing to express my interest in the position at your company. 
Please find attached my resume. Below is a summary of how my skills align with the job requirements.

    

Looking forward to hearing from you.

Best regards,
[Your Name]
  `;
};

cl = generateCoverLetter();
let coverLetters = [
  { id: "1234", cover_letter: cl, starred: true, name: "Infosys" },
  {
    id: "1233",
    cover_letter: cl,
    starred: false,
    name: "Bosch",
  },
];

app.put("/auth/cover_letter/:id", upload.single("jdFile"), (req, res) => {
  console.log(req.file);
  console.log("Decoded form data:", req.body);
  res.status(200).json({ message: "success" });
});

app.get("/auth/cover_letter/:id", (req, res) => {
  const id = req.params;
  console.log("id: ", id);

  res.json({
    resumeId: "1",
    content: cl,
  });
});

app.post("/auth/cover_letter/generate", upload.single("jdFile"), (req, res) => {
  const { resumeId } = req.body;
  const jobDescription = req.body.jobDescription;
  const file = req.file;

  console.log("File:", file?.originalname);

  if (!jobDescription && !file) {
    return res
      .status(400)
      .json({ error: "Job description text or file is required." });
  }

  const selectedResume = mockResumes.find((resume) => resume.id === resumeId);
  // Normally you'd use jobDescription or parse file.buffer here

  const coverLetter = generateCoverLetter();

  const newCoverLetter = { id: Date.now().toString(), content: coverLetter };
  coverLetters.push(newCoverLetter);

  res.json({ coverLetter });
});
// POST: Upload JD file
app.post("/auth/upload_jd", upload.single("jdFile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const mockJdText =
    "This is a mock job description extracted from the PDF file.";
  res.json({ jobDescription: mockJdText });
});

// GET: Get all cover letters
app.get("/auth/cover_letter", (req, res) => {
  res.json({ cover_letters: coverLetters });
});

app.post("/auth/resume/star", (req, res) => {
  console.log(req.body);
  res.json({ message: "successful" }).status(200);
});

app.post("/auth/cover_letter/star", (req, res) => {
  console.log(req.body);
  res.json({ message: "successful" }).status(200);
});

app.put("/auth/resume/:id", (req, res) => {
  const id = req.params;
  console.log("Req Data", req.body);
  res.status(200).json({ message: "updated successfully" });
});

app.get("/auth/job/filters", (req, res) => {
  // Simulate fake filter data
  const fakeData = {
    locations: ["New York", "San Francisco", "Remote", "London"],
    roles: ["Developer", "Designer", "Product Manager"],
    // You can add salary ranges or experience options if needed
  };

  // To test empty data, you can send empty arrays here, e.g.
  // const fakeData = { locations: [], roles: [] };

  res.json(fakeData);
});

app.get("/auth/admin/job/:id/languages", (req, res) => {
  const allLanguages = [
    "JavaScript",
    "Python",
    "Ruby",
    "Go",
    "Rust",
    "C++",
    "Java",
    "TypeScript",
  ];
  const shuffled = allLanguages.sort(() => 0.5 - Math.random());
  const randomLanguages = shuffled.slice(0, 3);
  res.json({ languages: randomLanguages });
});

let mockInterviews = [
  {
    id: "1",
    name: "Frontend Developer",
    score: 20,
    date: "2025-05-12T10:00:00Z",
    feedback:
      "Needs improvement in React component design and state management.",
  },
  {
    id: "2",
    name: "Backend Engineer",
    score: 40,
    date: "2025-03-12T10:00:00Z",
    feedback:
      "Basic understanding of REST APIs, but struggled with database schema design.",
  },
  {
    id: "3",
    name: "Backend Engineer",
    score: 60,
    date: "2025-03-12T14:00:00Z",
    feedback:
      "Good knowledge of server-side logic but needs to improve on security aspects.",
  },
  {
    id: "4",
    name: "Backend Engineer",
    score: 80,
    date: "2025-03-12T16:00:00Z",
    feedback:
      "Strong coding skills and problem-solving, just minor optimizations needed.",
  },
  {
    id: "5",
    name: "Backend Engineer",
    score: 100,
    date: "2025-03-12T18:00:00Z",
    feedback: "Excellent performance, nailed all questions with clean code.",
  },
];

app.post("/auth/interview/new", (req, res) => {
  // Mock response
  const mockInterviewId = Math.floor(Math.random() * 1000000);

  return res.json({ id: mockInterviewId });
});

app.get("/auth/interview", (req, res) => {
  res.json(mockInterviews);
});

const fakeResult = {
  max_score: 100,
  obtained_score: 87,
  max_mcq_score: 10,
  obtained_mcq_score: 8,
  overall_feedback: "Strong JS knowledge, but CSS needs improvement.",
  evaluation: {
    mcq: [
      {
        difficulty: "medium",
        skill_tag: "JavaScript",
        question_text: "What is a closure in JavaScript?",
        options: [
          "A block of code that executes immediately",
          "A way to bind this to a function",
          "A function that remembers its lexical scope",
          "A type of JavaScript object",
        ],
        correct_answer: "A function that remembers its lexical scope",
        user_answer: "A function that remembers its lexical scope",
        score: 9,
      },
      {
        difficulty: "medium",
        skill_tag: "React",
        question_text: "What are hooks in React?",
        options: [
          "Functions that let you use state and other React features",
          "A way to fetch data in React",
          "A debugging tool",
          "An HTML attribute",
        ],
        correct_answer:
          "Functions that let you use state and other React features",
        user_answer:
          "Functions that let you use state and other React features",
        score: 8,
      },
    ],
    short_answer: [
      {
        difficulty: "easy",
        skill_tag: "CSS",
        question_text:
          "Explain the difference between relative, absolute, fixed, and sticky positioning in CSS.",
        user_answer:
          "Relative positions relative to itself, absolute to its parent, fixed to viewport, sticky between relative and fixed.",
        relevancy_score: 5,
        score: 6,
        feedback: "Good start, but could add more examples for clarity.",
        correct_answer:
          "Relative offsets element from its normal position, absolute positions relative to nearest positioned ancestor, fixed relative to viewport, sticky toggles between relative and fixed.",
      },
    ],
    scenario: [
      {
        difficulty: "medium",
        skill_tag: "React + CSS",
        question_text:
          "Given a design mockup, how would you structure your components and styles for reusability?",
        user_answer:
          "Break into smaller functional components, use CSS modules, maintain theme variables.",
        relevancy_score: 7,
        score: 8,
        feedback: "Solid answer. Could mention accessibility considerations.",
        correct_answer:
          "Break into reusable functional components, use CSS modules or styled-components, maintain theme variables, and ensure accessibility.",
      },
    ],
    languages: {
      JavaScript: [
        {
          difficulty: "medium",
          skill_tag: "JavaScript",
          question_text: "Explain event delegation in JavaScript.",
          user_answer:
            "Attaching event handlers to a parent element to manage child events.",
          relevancy_score: 8,
          score: 9,
          feedback: "Excellent and concise.",
          correct_answer:
            "Event delegation is the practice of attaching a single event handler to a parent element to handle events on its child elements.",
        },
      ],
    },
  },
};

app.get("/auth/interview/result/:id", (req, res) => {
  res.json({ evaluation: null });
});

app.get("/auth/interview/new/:id", (req, res) => {
  const data = {
    jd_id: parseInt(req.params.id, 10),
    questions: {
      mcq: [
        {
          question_id: 1,
          difficulty: "easy",
          skill_tag: "REST API",
          question_text: "What is the primary function of a REST API?",
          options: [
            { option_id: 11, text: "Create a user interface" },
            { option_id: 12, text: "Connect frontend and backend" },
            { option_id: 13, text: "Style web pages" },
            { option_id: 14, text: "Manage state" },
          ],
        },
        {
          question_id: 4,
          difficulty: "easy",
          skill_tag: "REST API",
          question_text: "What is the primary function of a REST API?",
          options: [
            { option_id: 11, text: "Create a user interface" },
            { option_id: 12, text: "Connect frontend and backend" },
            { option_id: 13, text: "Style web pages" },
            { option_id: 14, text: "Manage state" },
          ],
        },
        {
          question_id: 7,
          difficulty: "easy",
          skill_tag: "REST API",
          question_text: "What is the primary function of a REST API?",
          options: [
            { option_id: 11, text: "Create a user interface" },
            { option_id: 12, text: "Connect frontend and backend" },
            { option_id: 13, text: "Style web pages" },
            { option_id: 14, text: "Manage state" },
          ],
        },
        {
          question_id: 3,
          difficulty: "easy",
          skill_tag: "REST API",
          question_text: "What is the primary function of a REST API?",
          options: [
            { option_id: 11, text: "Create a user interface" },
            { option_id: 12, text: "Connect frontend and backend" },
            { option_id: 13, text: "Style web pages" },
            { option_id: 14, text: "Manage state" },
          ],
        },
      ],
      short_answer: [
        {
          question_id: 2,
          difficulty: "medium",
          skill_tag: "Flask",
          question_text:
            "What is the purpose of the `debug=True` flag in Flask?",
        },
        {
          question_id: 3,
          difficulty: "medium",
          skill_tag: "REST API",
          question_text:
            "Explain the difference between PUT and PATCH methods in REST APIs.",
        },
      ],
      scenario: [
        {
          question_id: 4,
          difficulty: "medium",
          skill_tag: "PostgreSQL",
          question_text:
            "Your web app is loading slowly. You suspect the database is the bottleneck. What steps would you take to investigate and fix the issue?",
        },
      ],
      languages: [
        {
          question_id: 5,
          difficulty: "easy",
          skill_tag: "Python Basics",
          question_text:
            "What is the difference between a list and a tuple in Python?",
        },
        {
          question_id: 6,
          difficulty: "medium",
          skill_tag: "Functions",
          question_text:
            "What are *args and **kwargs used for in Python functions?",
        },
      ],
    },
    duration: 500,
  };

  res.json(data);
});

app.post("/auth/interview/submit", (req, res) => {
  console.log("Answers submitted:", req.body);
  res.status(200).jsonp({ message: "Interview submitted successfully" });
});

// Define your resume HTML and CSS

app.post("/auth/template", (req, res) => {
  const resumeData = req.body.resume;

  const resumeHTML = `
  <div class="resume-wrapper">
    <header class="header">
      <h1 class="name">${resumeData["personal_details"].fullName}</h1>
      <div class="contact-info">
        <p>Email: ${resumeData["personal_details"].email} | Phone: ${
    resumeData["personal_details"].phone
  }</p>
        <p>LinkedIn: ${resumeData["personal_details"].linkedin} | Website: ${
    resumeData["personal_details"].portfolio
  }</p>
      </div>
    </header>

    <div class="resume-content">
      <div class="column">
        <!-- Work Experience -->
        <section class="section">
          <h2 class="heading2">Work Experience</h2>
          ${resumeData["work_experience"].workExperience
            .map(
              (work) => `
            <div class="work-item">
              <h3 class="heading3">${work.company}</h3>
              <p><strong>Role:</strong> ${work.title}</p>
              <p><strong>Location:</strong> ${
                work.location || "Location"
              } | <strong>Duration:</strong> ${work.startDate} – ${
                work.endDate
              }</p>
              <ul class="list">
                ${
                  work.responsibilities
                    ? `<li class="list-item">${work.responsibilities}</li>`
                    : ""
                }
                ${
                  work.achievements
                    ? `<li class="list-item">${work.achievements}</li>`
                    : ""
                }
              </ul>
            </div>`
            )
            .join("")}
        </section>

        <!-- Projects -->
        <section class="section">
          <h2 class="heading2">Projects</h2>
          ${resumeData["projects"].projects
            .map(
              (project) => `
            <div class="project-item">
              <h3 class="heading3">${project.title}</h3>
              <p><strong>Technologies:</strong> ${project.technologies}</p>
              <p><strong>Impact:</strong> ${project.impact}</p>
              <p><strong>Links:</strong> <a href="${project.links}" target="_blank" rel="noopener noreferrer">${project.links}</a></p>
            </div>`
            )
            .join("")}
        </section>

        <!-- Education -->
        <section class="section">
          <h2 class="heading2">Education</h2>
          ${resumeData["education"].education
            .map(
              (edu) => `
            <div class="education-item">
              <h3 class="heading3">${edu.institution}</h3>
              <p><strong>Degree:</strong> ${edu.degree} in ${edu.fieldOfStudy}</p>
              <p><strong>Duration:</strong> ${edu.startDate} – ${edu.endDate}</p>
              <p><strong>Grade:</strong> ${edu.grade}</p>
            </div>`
            )
            .join("")}
        </section>

        <!-- Skills -->
        <section class="section">
          <h2 class="heading2">Skills</h2>
          <p><strong>Programming:</strong> ${resumeData[
            "skills"
          ].programming_languages.join(", ")}</p>
          <p><strong>Frameworks:</strong> ${resumeData[
            "skills"
          ].frameworks.join(", ")}</p>
          <p><strong>Tools:</strong> ${resumeData["skills"].tools.join(
            ", "
          )}</p>
          <p><strong>Soft Skills:</strong> ${resumeData[
            "skills"
          ].soft_skills.join(", ")}</p>
          <p><strong>Other Skills:</strong> ${resumeData[
            "skills"
          ].other_skills.join(", ")}</p>
        </section>
      </div>

      <div class="column2">
        <!-- Awards & Achievements -->
        <section class="section">
          <h2 class="heading2">Awards & Achievements</h2>
          ${resumeData["awards-&-achievements"].awards
            .map(
              (award) => `
            <div class="award-item">
              <h3 class="heading3">${award.title}</h3>
              <p><strong>Issuer:</strong> ${award.issuer}</p>
              <p><strong>Date:</strong> ${award.date}</p>
              <p><strong>Description:</strong> ${award.description}</p>
            </div>`
            )
            .join("")}
        </section>

        <!-- Volunteer Experience -->
        <section class="section">
          <h2 class="heading2">Volunteer Experience</h2>
          ${resumeData["volunteer-experience"].volunteerExperience
            .map(
              (volunteer) => `
            <div class="volunteer-item">
              <h3 class="heading3">${volunteer.organization}</h3>
              <p><strong>Role:</strong> ${volunteer.role}</p>
              <p><strong>Duration:</strong> ${volunteer.startDate} – ${volunteer.endDate}</p>
              <p><strong>Description:</strong> ${volunteer.description}</p>
            </div>`
            )
            .join("")}
        </section>
      </div>
    </div>
  </div>`;

  const resumeCSS = `
  /* General styles for wrapper and layout */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .resume-wrapper {
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  .header {
    text-align: center;
    margin-bottom: 40px;
  }

  .name {
    font-size: 2.5em;
  }

  .contact-info p {
    margin: 5px 0;
    font-size: 1em;
    color: #000;
  }

  .resume-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
  }

  .column {
    width: 58%;
  }

  .column2 {
    width: 38%;
  }

  .section {
    margin-bottom: 20px;
  }

  .heading2 {
    color: #4e4e4e;
    font-size: 18pt;
    padding-bottom: 2mm;
    font-weight: bold;
  }

  .heading3 {
    font-size: 14pt;
    color: #333;
    padding-bottom: 1mm;
  }

  .list {
    padding-left: 20px;
  }

  .list-item {
    margin-bottom: 8px;
  }

  a {
    
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  /* Work Experience */
  .work_experience .work-item {
    margin-bottom: 15px;
  }

  .work_experience p {
    font-size: 1em;
    color: #000;
  }

  /* Projects */
  .projects .project-item {
    margin-bottom: 15px;
  }

  .projects p {
    font-size: 1em;
    color: #000;
  }

  /* Education */
  .education .education-item {
    margin-bottom: 15px;
  }

  .education p {
    font-size: 1em;
    color: black;
  }

  /* Skills */
  .skills p {
    font-size: 1em;
    color: #000;
  }

  /* Awards */
  .awards .award-item {
    margin-bottom: 15px;
  }

  .awards p {
    font-size: 1em;
    color: #000;
  }

  /* Volunteer */
  .volunteer .volunteer-item {
    margin-bottom: 15px;
  }

  .volunteer p {
    font-size: 1em;
    color: #000;
  }
  `;

  // Return the HTML and CSS as JSON
  res.json({
    html: resumeHTML,
    css: resumeCSS,
  });
});

let adminProfile = {
  full_name: "John Doe",
  dob: "1990-01-01",
  contact_number: null,
  email: "john.doe@example.com",
  employee_id: "HAJ12235",
  department_id: "None",
  designation: "Assistant Placement Officer",
  address: "123 Admin St, City, Country",
  profile_pic: null, // Assume this is just filename or null
};

let collegeProfile = {
  name: "Example University",
  code: "EXU123",
  email: "contact@exampleuniversity.edu",
  contact: "0987654321",
  address: "456 College Ave, City, Country",
};

// GET Admin Profile
app.get("/auth/admin/admin_profile", (req, res) => {
  res.json({ ...adminProfile, college: collegeProfile });
});

// GET College Profile
app.get("/auth/admin/college", (req, res) => {
  res.json({ ...collegeProfile });
});

// PUT Admin Profile
app.post("/auth/admin/admin_profile", (req, res) => {
  const {
    full_name,
    dob,
    contact_number,
    email,
    employee_id,
    designation,
    department_id,
    address,
    profile_pic,
  } = req.body;

  // Basic validation example
  if (!full_name || !contact_number || !email || !address) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  adminProfile = {
    full_name,
    dob,
    contact_number,
    email,
    employee_id,
    designation,
    department_id,
    address,
    profile_pic,
  };

  return res.json({
    message: "Admin profile updated successfully.",
  });
});

// PUT College Profile
app.post("/auth/admin/college", (req, res) => {
  return res.json({
    message: "College profile updated successfully.",
  });
});

app.put("/auth/admin/college", (req, res) => {
  return res.json({
    message: "College profile updated successfully.",
  });
});

const branches = ["CSE", "ECE", "EEE", "ME", "CE"];

const students = Array.from({ length: 120 }, (_, i) => {
  const branch = branches[i % branches.length];

  // Sample internships and offers
  const sampleInternships = [
    {
      company: "TechCorp",
      duration: "3 months",
      salary: "10,000 INR/month",
    },
    {
      company: "InnovateX",
      duration: "2 months",
      salary: "8,000 INR/month",
    },
  ];

  const sampleOffers = [
    {
      company: "Infosys",
      duration: "Full-Time",
      salary: "6 LPA",
    },
    {
      company: "TCS",
      duration: "Full-Time",
      salary: "5.5 LPA",
    },
  ];

  return {
    id: i + 1,
    name: `Student ${i + 1}`,
    year: 2,
    usn: `ROLL${1000 + i}`,
    branch,
    cgpa: (Math.random() * 2 + 6).toFixed(2), // 6.00 - 8.00
    isPlaced: Math.random() > 0.5,
    passOutYear: 2024 + (i % 3), // 2024, 2025, 2026
    phone: `+91-9876543${String(100 + i).slice(-3)}`,
    email: `student${i + 1}@example.com`,
    collegeEmail: `s${i + 1}@college.edu`,
    aadhaarNumber: `XXXX-XXXX-XXXX-${String(1000 + i).slice(-4)}`,
    bankDetails: {
      bankName: "Bank of Example",
      accountNumber: `1234567890${i}`,
      ifsc: "EXAMPL0001",
    },
    activeBacklogs: Math.floor(Math.random() * 3), // 0–2 backlogs
    resumeUrl: `/resumes/student${i + 1}.pdf`,
    internships: Math.random() > 0.4 ? [sampleInternships[i % 2]] : [],
    placementOffers: Math.random() > 0.6 ? [sampleOffers[i % 2]] : [],
  };
});

// Route
app.get("/auth/admin/student/:id", (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const student = students.find((s) => s.id === studentId);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json(student);
});

// GET /auth/admin/branch
app.get("/auth/admin/branch", (req, res) => {
  res.json([...new Set(students.map((s) => s.branch))]);
});

// GET /auth/admin/student
app.get("/auth/admin/student", (req, res) => {
  const { page = 1, search = "", branch = "", passOutYear = "" } = req.query;

  const pageSize = 10;

  let filtered = students;

  if (search) {
    const lowerSearch = search.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(lowerSearch) ||
        s.rollNo.toLowerCase().includes(lowerSearch)
    );
  }

  if (branch) {
    filtered = filtered.filter((s) => s.branch === branch);
  }

  if (passOutYear) {
    filtered = filtered.filter(
      (s) => String(s.passOutYear) === String(passOutYear)
    );
  }

  const totalPages = Math.ceil(filtered.length / pageSize);
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);
  const trimmedStudents = paginated.map((s) => ({
    id: s.id,
    name: s.name,
    usn: s.usn,
    branch: s.branch,
    cgpa: s.cgpa,
    isPlaced: s.isPlaced,
  }));

  res.json({
    students: trimmedStudents,
    totalPages,
  });
});

dept = [
  {
    id: 1,
    name: "Computer Science & Engineering",
    code: "CSE",
    coordinator_name: "Prof. Anjali Sharma",
    coordinator_email: "anjali.s@college.edu",
  },
  {
    id: 2,
    name: "Mechanical Engineering",
    code: "ME",
    coordinator_name: "Prof. Vikram Singh",
    coordinator_email: "vikram.s@college.edu",
  },
  {
    id: 3,
    name: "Electronics & Communication",
    code: "ECE",
    coordinator_name: "Dr. R. Mehta",
    coordinator_email: "mehta.r@college.edu",
  },
];
bands = [
  {
    id: 1,
    name: "Dream Offer",
    rule: { type: "GREATER_THAN", value1: 1500000, value2: null },
  },
  {
    id: 2,
    name: "Super Dream",
    rule: { type: "BETWEEN", value1: 1000000, value2: 1500000 },
  },
  {
    id: 3,
    name: "Core Offer",
    rule: { type: "BETWEEN", value1: 600000, value2: 1000000 },
  },
];

// --- Helper to simulate network delay ---
const simulateDelay = (req, res, next) => {
  setTimeout(next, Math.floor(Math.random() * 800) + 200); // 200-1000ms delay
};

// --- Department Routes ---

// GET /api/departments
app.get("/auth/admin/department", (req, res) => {
  console.log("GET /api/departments - Responding with:", dept);
  res.status(200).json(dept);
});

// PUT /api/departments
app.put("/auth/admin/department", (req, res) => {
  const { departments } = req.body;

  if (!Array.isArray(departments)) {
    return res
      .status(400)
      .json({ message: "Invalid payload. 'departments' must be an array." });
  }

  // Basic validation for the received data
  for (const dept of departments) {
    if (!dept.id || !dept.name || !dept.code) {
      return res.status(400).json({
        message: `Invalid department object received. Missing required fields: ${JSON.stringify(
          dept
        )}`,
      });
    }
  }

  // Update the in-memory database
  dept = departments;
  console.log("PUT /api/departments - Database updated:", departments);

  res.status(200).json({ message: "Departments updated successfully." });
});

// --- Band Routes ---

// GET /api/bands
app.get("/auth/admin/bands", (req, res) => {
  console.log("GET /api/bands - Responding with:", bands);
  res.status(200).json(bands);
});

// PUT /api/bands
app.put("/auth/admin/bands", (req, res) => {
  const { bands } = req.body;

  if (!Array.isArray(bands)) {
    return res
      .status(400)
      .json({ message: "Invalid payload. 'bands' must be an array." });
  }

  // Basic validation
  for (const band of bands) {
    if (!band.id || !band.name) {
      return res.status(400).json({
        message: `Invalid band object received. Missing required fields: ${JSON.stringify(
          band
        )}`,
      });
    }
  }

  // Update the in-memory database
  console.log("PUT /api/bands - Database updated:", bands);

  res.status(200).json({ message: "Bands updated successfully." });
});

// GET /auth/admin/student/:id

const roles = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "UI/UX Designer",
  "DevOps Engineer",
];
const locations = [
  "New York",
  "San Francisco",
  "Remote",
  "London",
  "Bangalore",
];
const jobTypes = ["Full-time", "Part-time", "Internship", "Contract"];

const backlogPolicies = [
  "No backlog",
  "1 backlog allowed",
  "2 backlogs allowed",
  "More than 2 allowed",
];
const statuses = ["Open", "Closed", "Paused"];
// Mock jobs data
const allJobs = Array.from({ length: 100 }).map((_, i) => {
  const role = roles[i % roles.length];
  const location = locations[i % locations.length];
  const jobType = jobTypes[i % jobTypes.length];
  const isInternship = jobType === "Internship";

  // Select 1-3 random departments for each job
  const numDepts = (i % 3) + 1; // 1, 2, or 3 departments
  const selectedDepts = [];
  for (let j = 0; j < numDepts; j++) {
    const deptIndex = (i + j) % dept.length;
    if (!selectedDepts.includes(dept[deptIndex].name)) {
      selectedDepts.push(dept[deptIndex].name);
    }
  }

  return {
    id: i + 1,
    job_title: role,
    company_name: `Company ${i + 1}`,
    job_location: location,
    job_type: jobType,
    remote: location === "Remote",
    experience: (i % 5) + 1,

    // CTC fields (for non-internships)
    ctc: isInternship ? null : 60000 + i * 1000,
    ctc_period: isInternship ? null : "annual",

    // Stipend fields (for internships)
    stipend: isInternship ? 500 + i * 50 : null,
    stipend_period: isInternship ? "monthly" : null,

    // Application tracking
    applications: (i * 7) % 50,
    total_applicants: (i * 7) % 50,

    // Job details
    description: `This is a ${role} position at Company ${
      i + 1
    }. We are looking for talented individuals to join our team in ${location}. This role requires ${
      (i % 5) + 1
    } years of experience.`,
    requirements: `- ${
      (i % 5) + 1
    }+ years of experience\n- Strong technical skills\n- Team player\n- Excellent communication skills`,
    other_requirements: i % 2 === 0 ? "Must be willing to relocate" : null,

    // Contact and eligibility
    contact_email: `hr@company${i + 1}.com`,
    eligible_departments: selectedDepts,
    passout_year: (2025 + (i % 3)).toString(),

    // Academic requirements
    cgpa_requirement: (6.0 + (i % 4) * 0.5).toFixed(1),
    backlog_policy: backlogPolicies[i % backlogPolicies.length],

    // Scheduling
    number_of_rounds: 3,
    add_schedule_later: i % 4 === 0,
    rounds: [
      {
        date: "2025-08-07",
        start_time: "09:00",
        end_time: "11:00",
        location: `Room ${(i % 10) + 1}`,
        description: "Technical Round - Programming and problem solving",
      },
      {
        date: "2025-08-08",
        start_time: "14:00",
        end_time: "15:30",
        location: `Room ${((i + 1) % 10) + 1}`,
        description: "HR Round - Behavioral and cultural fit",
      },
      {
        date: "2025-08-09",
        start_time: "10:30",
        end_time: "12:00",
        location: `Room ${((i + 2) % 10) + 1}`,
        description: "Final Round - Manager interview",
      },
    ],

    // Dates and status
    application_deadline: new Date(
      Date.now() + (i % 30) * 24 * 60 * 60 * 1000
    ).toISOString(),

    // File handling (would be null for mock data)
    jd_file: null,
  };
});
const appliedJobs = Array.from({ length: 100 }).map((_, i) => {
  const role = roles[i % roles.length];
  const location = locations[i % locations.length];
  const statuses = ["in_progress", "selected", "rejected"];
  const status = statuses[i % statuses.length];

  return {
    logo: "https://i.ibb.co/hFJgrGNR/googlelogo.png",
    id: i + 1,
    job_title: role,
    company_name: `Company ${i + 1}`,
    job_location: location,
    remote: location === "Remote",
    experience: (i % 5) + 1,
    ctc: 60000 + i * 1000,
    ctc_period: "annual",
    stipend: 500 + i * 1000,
    stipend_period: "monthly",
    rounds: [
      {
        date: "2025-08-07",
        start_time: "20:56",
        end_time: "17:59",
        location: "12",
        description: "333",
      },
      {
        date: "2025-08-07",
        start_time: "20:56",
        end_time: "17:59",
        location: "12",
        description: "333",
      },
    ],
    applications: (i * 7) % 50,
    application_deadline: new Date(
      Date.now() + (i % 30) * 24 * 60 * 60 * 1000
    ).toISOString(),
    applicant_status: status,
  };
});

// Mock starred jobs per userId (userId 1 has starred jobs with odd IDs)
const starredByUser = {
  1: allJobs.filter((job) => job.id % 2 === 1).map((job) => job.id),
};

// Endpoint: jobFilters
app.get("/auth/admin/job/filters", (req, res) => {
  res.json({ roles, locations });
});

// Helper: filter, search, sort, paginate jobs
function filterJobs(jobs, filters) {
  let filtered = jobs;

  if (filters.search) {
    const s = filters.search.toLowerCase();
    filtered = filtered.filter(
      (job) =>
        job.role.toLowerCase().includes(s) ||
        job.company.toLowerCase().includes(s) ||
        job.location.toLowerCase().includes(s)
    );
  }

  if (filters.role && filters.role.length > 0) {
    filtered = filtered.filter((job) => filters.role.includes(job.role));
  }

  if (filters.location && filters.location.length > 0) {
    filtered = filtered.filter((job) =>
      filters.location.includes(job.location)
    );
  }

  if (filters.remote !== undefined) {
    if (filters.remote === "true" || filters.remote === true) {
      filtered = filtered.filter((job) => job.remote === true);
    }
  }

  // Sort
  switch (filters.sortBy) {
    case "salary":
      filtered.sort((a, b) => b.salary - a.salary);
      break;
    case "applications":
      filtered.sort((a, b) => b.applications - a.applications);
      break;
    case "experience":
      filtered.sort((a, b) => b.experience - a.experience);
      break;
    case "status":
      filtered.sort((a, b) => a.status.localeCompare(b.status));
      break;
    case "deadline":
    default:
      filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  }

  return filtered;
}

app.get("/auth/admin/job", (req, res) => {
  const {
    page = 1,
    search = "",
    role = "",
    location = "",
    remote,
    sortBy = "deadline",
  } = req.query;

  const roleFilters = role ? role.split(",") : [];
  const locationFilters = location ? location.split(",") : [];

  let filteredJobs = filterJobs(allJobs, {
    search,
    role: roleFilters,
    location: locationFilters,
    remote,
    sortBy,
  });

  // Pagination
  const pageSize = 10;
  const currentPage = parseInt(page, 10);
  const totalPages = Math.ceil(filteredJobs.length / pageSize);
  const pagedJobs = filteredJobs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  res.json({
    jobs: pagedJobs,
    pages: totalPages,
  });
});

app.get("/auth/admin/applied_job", (req, res) => {
  const {
    page = 1,
    search = "",
    role = "",
    location = "",
    remote,
    sortBy = "deadline",
  } = req.query;

  const roleFilters = role ? role.split(",") : [];
  const locationFilters = location ? location.split(",") : [];

  let filteredJobs = filterJobs(appliedJobs, {
    search,
    role: roleFilters,
    location: locationFilters,
    remote,
    sortBy,
  });

  // Pagination
  const pageSize = 10;
  const currentPage = parseInt(page, 10);
  const totalPages = Math.ceil(filteredJobs.length / pageSize);
  const pagedJobs = filteredJobs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  res.json({
    jobs: pagedJobs,
    pages: totalPages,
  });
});

// Route 1: Get job details only
app.get("/auth/admin/job/:jobId", (req, res) => {
  const jobId = parseInt(req.params.jobId, 10);
  const job = allJobs.find((j) => j.id === jobId);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  // Return in the new required format:
  res.json(job);
});

// Route 2: Get applicants for a specific job with pagination and filters
app.get("/auth/admin/job/:jobId/applicants", (req, res) => {
  const jobId = parseInt(req.params.jobId, 10);
  const job = allJobs.find((j) => j.id === jobId);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  const { page = 1, limit = 10, search = "", dateFilter = "" } = req.query;
  const currentPage = parseInt(page, 10);
  const perPage = parseInt(limit, 10);

  // Mock applicants data with random applied dates
  const shuffledApplicants = students.map((student) => ({
    ...student,
    appliedAt: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
  }));

  // Apply search filter
  const filteredApplicants = shuffledApplicants.filter((applicant) => {
    const searchTerm = search.toLowerCase();
    return (
      applicant.name.toLowerCase().includes(searchTerm) ||
      applicant.email.toLowerCase().includes(searchTerm)
    );
  });

  // Apply date filter
  const filteredByDate = dateFilter
    ? filteredApplicants.filter((applicant) => {
        const appliedDate = new Date(applicant.appliedAt);
        const filterDate = new Date(dateFilter);
        return (
          appliedDate.getFullYear() === filterDate.getFullYear() &&
          appliedDate.getMonth() === filterDate.getMonth()
        );
      })
    : filteredApplicants;

  // Pagination
  const totalApplicants = filteredByDate.length;
  const totalPages = Math.ceil(totalApplicants / perPage);
  const paginatedApplicants = filteredByDate.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const applicantsResponse = paginatedApplicants.map((applicant) => ({
    id: applicant.id,
    name: applicant.name,
    branch: applicant.branch,
    usn: applicant.usn,
    email: applicant.email,
    appliedAt: applicant.appliedAt,
  }));

  res.json({
    applicants: applicantsResponse,
    totalPages,
    currentPage,
  });
});

const jobb = {
  jobTitle: "Software Engineer",
  companyName: "Tech Corp",
  jobLocation: "San Francisco, CA",
  jobType: "Full-time",
  applicationDeadline: "2023-12-31",
  description: "We are looking for a passionate software engineer...",
  requirements: "Proficiency in JavaScript, React, etc.",
  otherRequirements: "Experience with cloud technologies",
  salaryRange: "80,000 - 100,000 USD",
  contactEmail: "jobs@techcorp.com",
  eligibleBranches: ["Computer Science", "Electronics and Communication"],
  cgpaRequirement: "7.5",
  backlogRequirement: "No backlog",
  jdPdf: null,
  passoutYear: "2024",
};

app.get("/auth/admin/job/edit/:jobId", (req, res) => {
  res.status(200).json({ ...jobb });
});

app.get("/auth/admin/job/starred", (req, res) => {
  const { userId, page = 1 } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  const starredJobIds = starredByUser[userId] || [];

  // Get starred jobs
  const starredJobs = allJobs.filter((job) => starredJobIds.includes(job.id));

  // Pagination for starred jobs
  const pageSize = 10;
  const currentPage = parseInt(page, 10);
  const totalPages = Math.ceil(starredJobs.length / pageSize);
  const pagedJobs = starredJobs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  res.json({
    starredJobs: pagedJobs,
    totalPages,
  });
});

// Endpoint to toggle star status
app.post("/auth/admin/job/star", (req, res) => {
  const { userId, jobId } = req.body;
  if (!userId || !jobId) {
    return res.status(400).json({ error: "Missing userId or jobId" });
  }

  if (!starredByUser[userId]) {
    starredByUser[userId] = [];
  }

  const idx = starredByUser[userId].indexOf(jobId);
  if (idx >= 0) {
    starredByUser[userId].splice(idx, 1); // unstar
  } else {
    starredByUser[userId].push(jobId); // star
  }

  res.json({ success: true });
});

app.get("/auth/admin/job/create/eligibility_options", (req, res) => {
  res.json({
    branches: [
      "Computer Science",
      "Electronics",
      "Mechanical",
      "Civil",
      "Electrical",
      "Chemical",
      "Biotechnology",
      "Information Technology",
    ],
    passoutYears: [2024, 2025, 2026, 2027],
  });
});

app.post("/auth/admin/job", upload.none(), (req, res) => {
  res.status(200).json({
    msg: "Successful",
  });
});
app.put("/auth/admin/job/:id", upload.none(), (req, res) => {
  console.log("req.body: ", req.body.rounds); // Contains form fields
  res.status(200).json({
    msg: "Successful",
  });
});

app.get("/auth/admin/department", (req, res) => {
  res.json(dept);
});

app.get("/auth/admin/bands", (req, res) => {
  res.json(bands);
});

app.post("/auth/resume/optimize", upload.single("file"), (req, res) => {
  const { resume } = req.body;
  const resumeJson = JSON.parse(resume);
  const file = req.file;

  // You can parse the PDF here if needed with pdf-parse

  const optimizedResume = {
    personal_details: {
      fullName: "Gokulaaaaa",
      phone: "12667899",
      email: "asdfsdf@a.com",
      linkedin: "linkedin.in",
      github: "github.com",
      portfolio: "a.com",
      location: "Bengaluru ",
      summary: "About Me and my goals",
    },
    skills: {
      programming_languages: ["Python", "Java"],
      frameworks: ["Pytorch"],
      tools: ["Vscode"],
      soft_skills: ["Soft-skills"],
      other_skills: ["Tech-SKils"],
    },
    work_experience: [
      {
        title: "SSE1",
        company: "Akamai",
        startDate: "2024-01",
        endDate: "2025-02",
        responsibilities: "None",
        achievements: "Guided Missile launch",
      },
    ],

    projects: [
      {
        title: "Project 1",
        technologies: "react, js, node",
        teamSize: "1",
        impact: "no impacsdfsdft",
        links: "https://asdasd.link.com",
      },
    ],
    education: [
      {
        institution: "RNS Institute of Technology",
        degree: "Bachelors",
        fieldOfStudy: "PCMB",
        startDate: "2025-11",
        endDate: "2025-12",
        grade: "9.5",
      },
    ],
    certifications: [
      {
        name: "Cert1 ",
        authority: "Coursera",
        issueDate: "2025-01",
        expirationDate: "2025-11",
        credentialId: "12asdsad312hk123j1",
        credentialUrl: "url.com",
      },
    ],
    internships: [
      {
        company: "Akamai",
        position: "AI Intern",
        startDate: "2023-01",
        endDate: "2025-05",
        location: "Bengaluru ",
      },
    ],
    "awards-&-achievements": {
      awards: [
        {
          title: "Award 1",
          issuer: "Issuer 1",
          date: "2025-01",
          description: "Desc",
        },
      ],
    },
    "volunteer-experience": {
      volunteerExperience: [
        {
          organization: "Volunteer 1",
          role: "Student Technical Support – Faculty Development Program",
          startDate: "2025-01",
          endDate: "2025-02",
          description: "Desdfsdfsdfsd sd fsd fsd sdf sd sdf s sdd fsdsc",
        },
      ],
    },
    "interests-&-hobbies": {
      languages: ["Kannada", "English", "Hindi"],
      interests: ["Painting", "Running"],
    },
    "publications-&-research": {
      publications: [
        {
          title: "Pub 1",
          publisher: "Google",
          date: "2025-01",
          link: "ex.com",
          description: "Desc",
        },
      ],
    },
  };
  setTimeout(() => {
    res.json({ optimizedResume });
  }, 1500);
});

app.get("/auth/template", (req, res) => {
  res.json([
    {
      id: 1,
      img: "https://i.ibb.co/d08t1nVD/Screenshot-2025-07-26-170647.png",
      name: "classic",
    },
    {
      id: 2,
      img: "https://i.ibb.co/m5cq9c44/Screenshot-2025-07-26-170631.png",
      name: "awesome",
    },
    {
      id: 3,
      img: "https://i.ibb.co/C5ZDygYx/Screenshot-2025-07-26-170704.png",
      name: "modern",
    },
  ]);
});

app.post("/auth/admin/student", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({
    message: `File ${req.file.originalname} uploaded successfully`,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000`, port);
});
