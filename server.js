const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer();
const app= express();
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

const clg_admin =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJyb2xlIjoiY29sbGVnZV9hZG1pbiIsInVzZXJfaWQiOiIxMjMiLCJpc3MiOiJ0ZXN0LWlzc3VlciIsImF1ZCI6InRlc3QtYXVkaWVuY2UiLCJpYXQiOjE3NTYzODgyNjQsIm5iZiI6MTc1NjM4ODI2NCwiZXhwIjoxNzU2MzkxODY0fQ.rP-bSWdFDMbTG7MJeLaDX63p_NmIKKqCRiwn2se8H98";
const admin_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjMsInVzZXJuYW1lIjoiam9obl9kb2UiLCJyb2xlIjoiYWRtaW4ifQ.unsHQCc_McbecKoLBUx9hmBgwI-Fed8UuK6IZ-fcBII";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzNCIsInVzZXJfbmFtZSI6IlNocmVlIFJhbWEgVGFsZW50IFNvbHV0aW9ucyIsImV4cCI6MTcyNjkyMzA1MH0.dHgJSYwwOp27LJCmtq3KwoEZfx_2-BrwvHziTCpJrOM";

app.get("/auth/admin/job/filters", (req, res) => {
console.log('req: ', req);
  console.log("inside filters");  
  res.json({ roles, locations });
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
  } else if (email == "a@a.com" && password === "c") {
    const token = clg_admin;
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

// 1. Send OTP (for both email and phone)
app.post("/auth/otp/email/send", (req, res) => {
  console.log("Request to send email OTP:", req.body);
  res.status(200).json({ message: "OTP sent successfully." });
});

app.post("/auth/otp/phone/send", (req, res) => {
  console.log("Request to send phone OTP:", req.body);
  res.status(200).json({ message: "OTP sent successfully." });
});

// 2. Verify OTP (for both email and phone)
// This handler covers all OTP verification endpoints.
const handleOtpVerification = (req, res) => {
  const { otp } = req.body;
  console.log("Received OTP verification request:", req.body);

  if (otp === "123456") {
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
};

app.post("/auth/otp/verify", handleOtpVerification);
app.post("/auth/otp/email/verify", handleOtpVerification);
app.post("/auth/otp/phone/verify", handleOtpVerification);

// 3. Fetch hardcoded phone number
app.get("/auth/user_phone", (req, res) => {
  console.log("Request to fetch phone by email:", req.query);
  res.status(200).json({ phone: "9876543210" });
});
const hardcodedDetails = {
  full_name: "John Doe",
  dob: "2000-05-15",
  usn: "1RV20CS123",
  personal_email: "johndoe@example.com",
  address: "123 Main Street, Cityville",
  department_id: 1, // must match one from your frontend department list
  pass_out_year: "2026",
};
// 4. Fetch hardcoded user details
app.get("/auth/user_details", (req, res) => {
  console.log("Request to fetch details by email:", req.query);
  res.status(200).json(hardcodedDetails);
});

// 5. Fetch hardcoded departments

// 6. Final Registration
app.post("/auth/register", (req, res) => {
  console.log("Received final registration data:", req.body);
  return res
    .status(200)
    .json({ message: "User signed up successfully.", token: student_token });
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
        description: "Desc",
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

app.get("/auth/profile/eligibility", (req, res) => {
  const randomNumber = Math.floor(Math.random() * 11) + 3; // 0–10 + 10 => 10–20
  console.log("randomNumber: ", randomNumber);
  const is_eligible = true;

  res.status(200).json({ is_eligible });
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

// let mockJobs = Array.from({ length: 100 }, (_, i) => {
//   const roles = [
//     "Frontend Developer",
//     "Backend Engineer",
//     "Full Stack Developer",
//     "Data Scientist",
//   ];
//   const companies = ["Google", "Microsoft", "Amazon", "Netflix", "Meta"];
//   const locations = ["Bangalore", "Mumbai", "Remote", "Delhi", "Hyderabad"];
//   const remoteTypes = ["Remote", "Onsite", "Hybrid"];

//   const job_title = roles[i % roles.length];
//   const company_name = companies[i % companies.length];
//   const location = locations[i % locations.length];
//   const remoteType = remoteTypes[i % remoteTypes.length];
//   const remote = remoteType === "Remote";

//   return {
//     logo: "https://i.ibb.co/hFJgrGNR/googlelogo.png",
//     id: String(i + 1),
//     company_name,
//     job_title,
//     location,
//     remoteType,
//     remote,
//     experience: `${1 + (i % 5)}-${2 + (i % 5)} years`,
//     salary: `${6 + (i % 5)}-${10 + (i % 5)} LPA`,
//     postedOn: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
//     starred: false, // default starred status is false,
//     link: "https://www.google.com",
//     templateId: 18,
//   };
// });

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

  const job_title = roles[i % roles.length];
  const status = statuses[i % statuses.length];
  const company_name = companies[i % companies.length];
  const location = locations[i % locations.length];
  const remoteType = remoteTypes[i % remoteTypes.length];
  const remote = remoteType === "Remote";

  return {
    logo: "https://i.ibb.co/hFJgrGNR/googlelogo.png",
    id: i + 1,
    company_name,
    job_title,
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

let mockJobs = Array.from({ length: 100 }, (_, i) => {
  const roles = [
    "Frontend Developer",
    "Backend Engineer",
    "Full Stack Developer",
    "Data Scientist",
  ];
  const companies = ["Google", "Microsoft", "Amazon", "Netflix", "Meta"];
  const locations = ["Bangalore", "Mumbai", "Pune", "Delhi", "Hyderabad"];
  const remoteTypes = ["Remote", "On-site", "Hybrid"];
  const statuses = ["Open", "Closed"];
  
  const job_title = roles[i % roles.length];
  const company_name = companies[i % companies.length];
  const job_location = locations[i % locations.length];
  const remoteType = remoteTypes[i % remoteTypes.length];
  const remote = remoteType === "Remote";
  const work_mode = remoteType;
  
  // Generate realistic dates
  const postedDate = new Date(Date.now() - i * 86400000);
  const application_deadline = new Date(Date.now() + (30 - (i % 30)) * 86400000);
  
  return {
    id: String(i + 1),
    company_name,
    job_title,
    job_location,
    band: ["Dream", "Core", "Super Dream", "Test"][i % 4],
    work_mode,
    remote,
    job_type: [["Full-time"], ["Internship"], ["Full-time", "Internship"], ["Part-time"]][i % 4],
    ctc: (6 + (i % 10)) * 100000,
    ctc_period: "annual",
    stipend: i % 3 === 0 ? (20000 + (i % 5) * 5000) : null,
    stipend_period: i % 3 === 0 ? "monthly" : null,
    applications: Math.floor(Math.random() * 150),
    application_deadline: application_deadline.toISOString().split("T")[0],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    postedOn: postedDate.toISOString().split("T")[0],
    logo: null, // or a logo URL if you have one
    description: `We are looking for a talented ${job_title} to join our team at ${company_name}. This is a great opportunity to grow your skills and work on challenging projects.`,
    contact_email: `careers@${company_name.toLowerCase()}.com`,
    whatsapp_group_link: `https://chat.whatsapp.com/group${i}`,
    eligible_departments: ["CSE", "IT", "ECE"][i % 3],
    cgpa_requirement: (6.0 + (i % 10) * 0.1).toFixed(1),
    backlog_policy: ["No backlog", "1 backlog allowed", "2 backlogs allowed"][i % 3],
    passout_year: String(2025 + (i % 3)),
    rounds: [
      {
        id: `round-${i}-1`,
        date: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
        start_time: "10:00",
        end_time: "11:00",
        location: "Online",
        description: "Online Assessment",
      },
      {
        id: `round-${i}-2`,
        date: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
        start_time: "14:00",
        end_time: "15:30",
        location: job_location,
        description: "Technical Interview",
      },
    ],
    starred: false, // default starred status
  };
});

app.get("/auth/admin/job", (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const search = req.query.search?.toLowerCase() || "";
    const location = req.query.location || "";
    const role = req.query.role || "";
    const remote = req.query.remote || "";
    const sortBy = req.query.sortBy || "deadline";
    const sortOrder = req.query.sortOrder || "asc";
    const userId = req.query.userId || "default";

    // Filter jobs
    let filtered = mockJobs.filter((job) => {
      // Search filter
      const matchesSearch =
        search === "" ||
        job.job_title.toLowerCase().includes(search) ||
        job.company_name.toLowerCase().includes(search) ||
        job.job_location.toLowerCase().includes(search);

      // Location filter
      const matchesLocation = location === "" || job.job_location === location;

      // Role filter
      const matchesRole = role === "" || job.job_title.toLowerCase().includes(role.toLowerCase());

      // Remote/Work Mode filter
      const matchesRemote =
        remote === "" ||
        job.work_mode === remote ||
        (remote === "Remote" && job.remote) ||
        (remote === "On-site" && !job.remote);

      return matchesSearch && matchesLocation && matchesRole && matchesRemote;
    });

    // Mark starred jobs
    const starredJobs = userStarredJobs[userId] || [];
    filtered = filtered.map((job) => ({
      ...job,
      starred: starredJobs.includes(job.id),
    }));

    // Sorting
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "deadline":
          aValue = new Date(a.application_deadline);
          bValue = new Date(b.application_deadline);
          break;
        case "salary":
        case "ctc":
          aValue = a.ctc || 0;
          bValue = b.ctc || 0;
          break;
        case "applications":
          aValue = a.applications || 0;
          bValue = b.applications || 0;
          break;
        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
        case "company_name":
          aValue = a.company_name.toLowerCase();
          bValue = b.company_name.toLowerCase();
          break;
        case "job_title":
          aValue = a.job_title.toLowerCase();
          bValue = b.job_title.toLowerCase();
          break;
        case "job_location":
          aValue = a.job_location.toLowerCase();
          bValue = b.job_location.toLowerCase();
          break;
        case "application_deadline":
          aValue = new Date(a.application_deadline);
          bValue = new Date(b.application_deadline);
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    // Pagination
    const totalPages = Math.ceil(filtered.length / limit);
    const validPage = Math.min(Math.max(page, 1), totalPages || 1);
    const paginated = filtered.slice((validPage - 1) * limit, validPage * limit);

    // Return response matching the JobView component requirements
    res.json({
      jobs: paginated,
      total_pages: totalPages,
      current_page: validPage,
      total_jobs: filtered.length,
    });
  } catch (error) {
    console.error("Error in GET /auth/admin/job:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

const generateMockResults = (page = 1, limit = 10, sortKey = 'rank', sortDirection = 'asc', search = '') => {
  const names = [
    'Rahul Kumar', 'Priya Singh', 'Arjun Patel', 'Neha Sharma', 'Vikram Reddy',
    'Ananya Gupta', 'Rohan Verma', 'Divya Nair', 'Aditya Sinha', 'Pooja Desai',
    'Amit Kumar', 'Sneha Bhat', 'Nikhil Menon', 'Kavya Iyer', 'Sanjay Rao',
    'Sakshi Kulkarni', 'Varun Chopra', 'Isha Mishra', 'Harshit Jain', 'Yuki Tanaka'
  ];

  const usns = [
    '1AB21CS001', '1AB21CS002', '1AB21CS003', '1AB21CS004', '1AB21CS005',
    '1AB21CS006', '1AB21CS007', '1AB21CS008', '1AB21CS009', '1AB21CS010',
    '1AB21CS011', '1AB21CS012', '1AB21CS013', '1AB21CS014', '1AB21CS015',
    '1AB21CS016', '1AB21CS017', '1AB21CS018', '1AB21CS019', '1AB21CS020'
  ];

  const generateScore = (seed) => {
    // Use seeded random for consistency
    const random = Math.sin(seed * 12.9898) * 43758.5453;
    return Math.round(((random - Math.floor(random)) * 35 + 60) * 100) / 100;
  };

  // Generate results
  let results = names.map((name, idx) => ({
    id: `result_${idx + 1}`,
    name: name,
    usn: usns[idx],
    score: generateScore(idx),
    rank: idx + 1,
    selection_status: idx % 3 === 0 ? 'REJECTED' : 'SELECTED'
  }));

  // Apply search filter
  if (search && search.trim() !== '') {
    results = results.filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.usn.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Apply sorting
  if (sortKey && results.length > 0) {
    results.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal === undefined || bVal === undefined) return 0;

      if (typeof aVal === 'string') {
        return sortDirection === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return sortDirection === 'asc'
        ? aVal - bVal
        : bVal - aVal;
    });

    // Re-rank after sorting
    results = results.map((r, idx) => ({
      ...r,
      rank: idx + 1
    }));
  }

  // Calculate comprehensive statistics
  const scores = results.map(r => r.score);
  const selectedCount = results.filter(r => r.selection_status === 'SELECTED').length;

  if (scores.length === 0) {
    return {
      results: [],
      stats: {
        total_selected: 0,
        avg_score: 0,
        max_score: 0,
        min_score: 0,
        median_score: 0,
        std_deviation: 0,
        selection_rate: 0
      },
      totalPages: 0,
      currentPage: 1,
      totalResults: 0
    };
  }

  const sortedScores = [...scores].sort((a, b) => a - b);
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const variance = scores.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / scores.length;
  const stdDev = Math.sqrt(variance);
  const median = sortedScores.length % 2 === 0
    ? (sortedScores[sortedScores.length / 2 - 1] + sortedScores[sortedScores.length / 2]) / 2
    : sortedScores[Math.floor(sortedScores.length / 2)];

  const stats = {
    total_selected: results.length,
    avg_score: Math.round(mean * 100) / 100,
    max_score: Math.round(Math.max(...scores) * 100) / 100,
    min_score: Math.round(Math.min(...scores) * 100) / 100,
    median_score: Math.round(median * 100) / 100,
    std_deviation: Math.round(stdDev * 100) / 100,
    selection_rate: Math.round((selectedCount / results.length) * 10000) / 100
  };

  // Apply pagination
  const totalPages = Math.ceil(results.length / limit);
  const startIdx = (page - 1) * limit;
  const endIdx = startIdx + limit;
  const paginatedResults = results.slice(startIdx, endIdx);

  return {
    results: paginatedResults,
    stats: stats,
    totalPages: totalPages,
    currentPage: parseInt(page),
    totalResults: results.length
  };
};

// ========== ROUTES ==========

// Get results for a specific interview
app.get('/auth/admin/interview/:interviewId/results', (req, res) => {
  try {
    const { page = 1, limit = 10, sortKey = 'rank', sortDirection = 'asc', search = '' } = req.query;

    const data = generateMockResults(
      parseInt(page),
      parseInt(limit),
      sortKey,
      sortDirection,
      search
    );

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Failed to fetch results', message: error.message });
  }
});
// app.get("/auth/admin/job", (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = 10;

//   const search = req.query.search?.toLowerCase() || "";
//   const location = req.query.location || "";
//   const remote = req.query.remote === "true"; // Convert 'true'/'false' to boolean
//   const userId = req.query.userId || "default"; // Assuming user ID is passed

//   let filtered = mockJobs.filter((job) => {
//     const matchesSearch =
//       job.job_title.toLowerCase().includes(search) ||
//       job.company_name.toLowerCase().includes(search);
//     const matchesLocation = location ? job.location === location : true;
//     const matchesRemote = remote ? job.remote : true; // Filter by remote status
//     return matchesSearch && matchesLocation && matchesRemote;
//   });

//   // Check if the user has starred jobs
//   const starredJobs = userStarredJobs[userId] || [];
//   filtered = filtered.map((job) => ({
//     ...job,
//     starred: starredJobs.includes(job.id), // mark jobs that the user has starred
//   }));

//   const totalPages = Math.ceil(filtered.length / limit);
//   const paginated = filtered.slice((page - 1) * limit, page * limit);

//   res.json({
//     jobs: paginated,
//     total_pages : totalPages,
//     current_page : parseInt(page)
//   });
// });

app.get("/auth/job", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  const search = req.query.search?.toLowerCase() || "";
  const location = req.query.location || "";
  const remote = req.query.remote === "true"; // Convert 'true'/'false' to boolean
  const userId = req.query.userId || "default"; // Assuming user ID is passed

  let filtered = mockJobs.filter((job) => {
    const matchesSearch =
      job.job_title.toLowerCase().includes(search) ||
      job.company_name.toLowerCase().includes(search);
    const matchesLocation = location ? job.location === location : true;
    const matchesRemote = remote ? job.remote : true; // Filter by remote status
    return matchesSearch && matchesLocation && matchesRemote;
  });

  // Check if the user has starred jobs
  const starredJobs = userStarredJobs[userId] || [];
  filtered = filtered.map((job) => ({
    ...job,
    is_applied: Math.random() < 0.5, // mark jobs that the user has starred
  }));

  const totalPages = Math.ceil(filtered.length / limit);
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  res.json({
    jobs: paginated,
    current_page  : page,
    total_pages:totalPages,
  });
});

app.get("/auth/admin/job/:id", (req, res) => {
  const id = req.params.id;
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
  "add_schedule_later": false,
  "application_deadline": "2025-09-30",
  "backlog_policy": "More than 2 allowed",
  "band_id": 1,
  "cgpa_requirement": 3.0,
  "company_name": "Sumukha AI Private Limited",
  "contact_email": "gokul@gmail.com",
  "ctc": 2500000.0,
  "ctc_period": "annual",
  "description": "Sumukha AI Pvt Ltd is a fast-growing technology solutions provider committed to delivering innovative digital experiences. We\u2019re looking for a creative Web Designer to join our team and help shape modern, user-friendly websites.\r\nRole Overview\r\nAs a Web Designer, you will be responsible for designing visually appealing, responsive, and intuitive websites that align with our brand and client needs. You\u2019ll collaborate with developers, content teams, and marketing professionals to bring concepts to life.\r\nKey Responsibilities\r\nDesign and maintain website layouts, graphics, and UI elements.\r\nEnsure websites are mobile-friendly, accessible, and optimized\r\nWork closely with cross-functional teams to deliver seamless user experiences.\r\nStay updated with design trends and implement best practices.\r\nBachelor\u2019s degree in Web/Graphic Design or equivalent experience\r\nProficiency in tools like Figma, Adobe XD, Photoshop, Illustrator.\r\nStrong understanding of HTML, CSS, and UX/UI principles.\r\nCreative mindset with excellent attention to detail.\r\nWhy Join Us?\r\nAt SAI Pvt Ltd, you\u2019ll work on diverse projects, grow your skills, and be part of a collaborative and innovative environment.",
  "eligible_departments": [
    "AIML",
    "CE",
    "ME"
  ],
  "id": "1",
  "job_location": "New York",
  "job_title": "Web Designer",
  "job_type": [
    "Full-time"
  ],
  "languages": [],
  "number_of_rounds": 0,
  "other_requirements": null,
  "passout_year": 2027,
  "posted_on": "2025-09-21T13:34:22.711470",
  "remote": false,
  "requirements": null,
  "rounds": [
    {
      "date": "2025-09-30",
      "description": "Tech Round 1 of 1002",
      "end_time": "13:00",
      "id": "825b3b3f-198b-4193-946e-5094d61c37ff",
      "job_id": "5daa000b-64ae-4687-ac17-57afb3ab0a69",
      "location": "Mini Audi 102",
      "start_time": "12:00",
      "order" : 0
    },
    {
      "date": "2025-10-01",
      "description": "Tech Round 2 of 1002",
      "end_time": "09:30",
      "id": "ec54c28c-50ed-494e-ae67-b77fc5c5c03f",
      "job_id": "5daa000b-64ae-4687-ac17-57afb3ab0a69",
      "location": "Mini Audi 02",
      "start_time": "08:00",
      "order" : 1
    }
  ],
  "status": "Open",
  "stipend": null,
  "stipend_period": "monthly",
  "total_applicants": 2,
  "whatsapp_group_link": "https://chat.whatsapp.com/a",
  "work_mode": "Hybrid"
})
});

app.get("/auth/job/:id", (req, res) => {
  const id = req.params.id;
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
  "add_schedule_later": false,
  "application_deadline": "2025-09-30",
  "backlog_policy": "More than 2 allowed",
  "band_id": 1,
  "cgpa_requirement": 3.0,
  "company_name": "Sumukha AI Private Limited",
  "contact_email": "gokul@gmail.com",
  "ctc": 2500000.0,
  "ctc_period": "annual",
  "description": "Sumukha AI Pvt Ltd is a fast-growing technology solutions provider committed to delivering innovative digital experiences. We\u2019re looking for a creative Web Designer to join our team and help shape modern, user-friendly websites.\r\nRole Overview\r\nAs a Web Designer, you will be responsible for designing visually appealing, responsive, and intuitive websites that align with our brand and client needs. You\u2019ll collaborate with developers, content teams, and marketing professionals to bring concepts to life.\r\nKey Responsibilities\r\nDesign and maintain website layouts, graphics, and UI elements.\r\nEnsure websites are mobile-friendly, accessible, and optimized\r\nWork closely with cross-functional teams to deliver seamless user experiences.\r\nStay updated with design trends and implement best practices.\r\nBachelor\u2019s degree in Web/Graphic Design or equivalent experience\r\nProficiency in tools like Figma, Adobe XD, Photoshop, Illustrator.\r\nStrong understanding of HTML, CSS, and UX/UI principles.\r\nCreative mindset with excellent attention to detail.\r\nWhy Join Us?\r\nAt SAI Pvt Ltd, you\u2019ll work on diverse projects, grow your skills, and be part of a collaborative and innovative environment.",
  "eligible_departments": [
    "AIML",
    "CE",
    "ME"
  ],
  "id": "1",
  "job_location": "New York",
  "job_title": "Web Designer",
  "job_type": [
    "Full-time"
  ],
  "languages": [],
  "number_of_rounds": 0,
  "other_requirements": null,
  "passout_year": 2027,
  "posted_on": "2025-09-21T13:34:22.711470",
  "remote": false,
  "requirements": null,
  "rounds": [
    {
      "date": "2025-09-30",
      "description": "Tech Round 1 of 1002",
      "end_time": "13:00",
      "id": "825b3b3f-198b-4193-946e-5094d61c37ff",
      "job_id": "5daa000b-64ae-4687-ac17-57afb3ab0a69",
      "location": "Mini Audi 102",
      "start_time": "12:00",
      "order" : 1
    },
    {
      "date": "2025-10-01",
      "description": "Tech Round 2 of 1002",
      "end_time": "09:30",
      "id": "ec54c28c-50ed-494e-ae67-b77fc5c5c03f",
      "job_id": "5daa000b-64ae-4687-ac17-57afb3ab0a69",
      "location": "Mini Audi 02",
      "start_time": "08:00",
      "order" : 2

    }
  ],
  "status": "Open",
  "stipend": null,
  "stipend_period": "monthly",
  "total_applicants": 2,
  "whatsapp_group_link": "https://chat.whatsapp.com/a",
  "work_mode": "Hybrid",
  "is_applied" : true
})
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

// const mockResumeData = {
//   personal_details: {
//     fullName: "Goku",
//     phone: "12345667899",
//     email: "a@a.com",
//     linkedin: "linkedin.in",
//     github: "github.com",
//     portfolio: "a.com",
//     location: "Bengaluru ",
//     summary: "About Me and my goals",
//   },
//   skills: {
//     programming_languages: ["Python", "Java"],
//     frameworks: ["Pytorch"],
//     tools: ["Vscode"],
//     soft_skills: ["Soft-skills"],
//     other_skills: ["Tech-SKils"],
//   },

//   projects: [
//     {
//       title: "Project 1",
//       technologies: "react, js, node",
//       teamSize: "1",
//       description: "no impact",
//       links: "https://www.link.com",
//     },
//   ],
//   education: [
//     {
//       institution: "RNS Institute of Technology",
//       degree: "Bachelors",
//       fieldOfStudy: "PCMB",
//       startDate: "2025-11",
//       endDate: "2025-12",
//       grade: "9.5",
//     },
//   ],
//   certifications: [
//     {
//       name: "Cert1 ",
//       authority: "Coursera",
//       issueDate: "2025-01",
//       expirationDate: "2025-11",
//       credentialId: "12312hk123j1",
//       credentialUrl: "url.com",
//     },
//   ],

//   awards: [
//     {
//       title: "Award 1",
//       issuer: "Issuer 1",
//       date: "2025-01",
//       description: "Desc",
//     },
//   ],

//   work_experience: [
//     {
//       job_title: "Software Engineer",
//       company_name: "Google",
//       start_date: "2022-06",
//       end_date: "2024-01",
//       location: "Mountain View, CA",
//       description:
//         "Worked on improving the performance of Google Search indexing systems, implemented microservices, and mentored junior developers.",
//     },
//     {
//       job_title: "Backend Developer",
//       company_name: "Stripe",
//       start_date: "2020-03",
//       end_date: "2022-05",
//       location: "Remote",
//       description:
//         "Developed APIs for payment processing, optimized database queries for scalability, and contributed to CI/CD pipeline automation.",
//     },
//   ],

//   internships: [
//     {
//       job_title: "AI Intern",
//       company_name: "OpenAI",
//       start_date: "2023-06",
//       end_date: "2023-12",
//       location: "San Francisco, CA",
//       description:
//         "Researched NLP models for conversational AI, experimented with reinforcement learning, and documented model evaluation metrics.",
//     },
//     {
//       job_title: "Frontend Intern",
//       company_name: "Spotify",
//       start_date: "2022-01",
//       end_date: "2022-06",
//       location: "Stockholm, Sweden",
//       description:
//         "Built UI components with React, improved accessibility features, and collaborated with UX designers on user engagement tools.",
//     },
//   ],

//   volunteer_experience: [
//     {
//       organization: "Volunteer 1",
//       role: "Student Technical Support – Faculty Development Program",
//       startDate: "2025-01",
//       endDate: "2025-02",
//       description: "Desc",
//     },
//   ],
//   interests: {
//     languages: ["Kannada", "English", "Hindi"],
//     interests: ["Painting", "Running"],
//   },

//   publications: [
//     {
//       title: "Pub 1",
//       publisher: "Google",
//       date: "2025-01",
//       link: "ex.com",
//       description: "Desc",
//     },
//   ],
// };

const mockResumeData = up;
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
    json: up,
    starred: false,
  },
  {
    id: "2",
    name: "Jane Smith",
    json: up,
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
  res.json({ resumes: mockResumes });
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
  res.json({ evaluation: fakeResult.evaluation });
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
            "Your web appis loading slowly. You suspect the database is the bottleneck. What steps would you take to investigate and fix the issue?",
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

app.post("/auth/interview/submit/:id", (req, res) => {
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
  // General Tab -> Basic Information
  college_name: "Example University",
  college_code: "EXU123",
  establishment_year: "1998",

  // General Tab -> Location and Contact
  college_address: "456 College Ave, City, Country",
  pincode: "560001",
  college_phone: "0987654321",
  college_email: "contact@exampleuniversity.edu",

  // General Tab -> Affiliation and Personnel
  aicte_code: "1-12345678",
  affiliation_number: "UNIV-AFF-9876",
  principal_name: "Dr. John Smith",
  principal_email: "principal@exampleuniversity.edu",
  principal_phone: "+91-9988776655",

  // Students Tab
  exam_month_odd_sem: "December", // Changed
  exam_month_even_sem: "June", // Added
  allowed_email_domains: ["exampleuniversity.edu"],

  // Email Tab
  sending_email: "noreply@exampleuniversity.edu",
  app_password: "your_app_password_here",

  // WhatsApp Tab
  wa_phone_number_id: "100001234567890",
  wa_business_account_id: "200001234567890",
  wa_access_token: "your_whatsapp_access_token_here",
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

// Data store (using 'let' to allow modification)
let departments = [
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

let jobBands = [
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

// Helper to generate a new ID for created items
const getNextId = (arr) => {
  if (arr.length === 0) return 1;
  return Math.max(...arr.map((item) => item.id)) + 1;
};

// --- Department Routes ---

// GET /auth/departments - Get all departments
app.get("/auth/admin/department", (req, res) => {
  console.log("GET /auth/admin/department - Responding with all departments.");
  res.status(200).json(departments);
});

// POST /auth/departments - Add a new department
app.post("/auth/admin/department", (req, res) => {
  const { name, code, coordinator_name, coordinator_email } = req.body;

  if (!name || !code) {
    return res
      .status(400)
      .json({ message: "Department name and code are required." });
  }

  const newDepartment = {
    id: getNextId(departments),
    name: name.trim(),
    code: code.trim(),
    coordinator_name: coordinator_name?.trim() || "",
    coordinator_email: coordinator_email?.trim() || "",
  };

  departments.push(newDepartment);
  console.log("POST /auth/admin/department - Added:", newDepartment);
  res.status(201).json(newDepartment); // Return the newly created department, as expected by the frontend
});

// POST /api/departments/:id - Update an existing department
app.post("/auth/admin/department/:id", (req, res) => {
  const departmentId = parseInt(req.params.id, 10);
  const departmentIndex = departments.findIndex((d) => d.id === departmentId);

  if (departmentIndex === -1) {
    return res.status(404).json({ message: "Department not found." });
  }

  const updatedDepartment = { ...departments[departmentIndex], ...req.body };
  departments[departmentIndex] = updatedDepartment;

  console.log(
    `POST /auth/admin/department/${departmentId} - Updated to:`,
    updatedDepartment
  );
  res.status(200).json(updatedDepartment); // Return the updated data
});

// DELETE /api/departments/:id - Delete a department
app.delete("/auth/admin/department/:id", (req, res) => {
  const departmentId = parseInt(req.params.id, 10);
  const initialLength = departments.length;
  departments = departments.filter((d) => d.id !== departmentId);

  if (departments.length === initialLength) {
    return res.status(404).json({ message: "Department not found." });
  }

  console.log(
    `DELETE /auth/admin/department/${departmentId} - Department deleted.`
  );
  res.status(200).json({ message: "Department deleted successfully." });
});

// --- Band Routes ---

// GET /api/bands - Get all bands
app.get("/auth/admin/bands", (req, res) => {
  console.log("GET /auth/admin/bands - Responding with all bands.");
  res.status(200).json(jobBands);
});

// POST /api/bands - Add a new band
app.post("/auth/admin/bands", (req, res) => {
  const { name, rule } = req.body;

  if (
    !name ||
    !rule ||
    !rule.type ||
    rule.value1 === undefined ||
    rule.value1 === ""
  ) {
    return res
      .status(400)
      .json({ message: "Band name and a valid rule are required." });
  }

  const newBand = {
    id: getNextId(jobBands),
    name: name.trim(),
    rule,
  };

  jobBands.push(newBand);
  console.log("POST /auth/admin/bands - Added:", newBand);
  res.status(201).json(newBand); // Return the newly created band
});

// POST /api/bands/:id - Update an existing band
app.post("/auth/admin/bands/:id", (req, res) => {
  const bandId = parseInt(req.params.id, 10);
  const bandIndex = jobBands.findIndex((b) => b.id === bandId);

  if (bandIndex === -1) {
    return res.status(404).json({ message: "Band not found." });
  }

  const updatedBand = { ...jobBands[bandIndex], ...req.body };
  jobBands[bandIndex] = updatedBand;

  console.log(`POST /auth/admin/bands/${bandId} - Updated to:`, updatedBand);
  res.status(200).json(updatedBand); // Return the updated data
});

// DELETE /api/bands/:id - Delete a band
app.delete("/auth/admin/bands/:id", (req, res) => {
  const bandId = parseInt(req.params.id, 10);
  const initialLength = jobBands.length;
  jobBands = jobBands.filter((b) => b.id !== bandId);

  if (jobBands.length === initialLength) {
    return res.status(404).json({ message: "Band not found." });
  }

  console.log(`DELETE /auth/admin/bands/${bandId} - Band deleted.`);
  res.status(200).json({ message: "Band deleted successfully." });
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
    id: String(i + 1),
    job_title: role,
    company_name: `Company ${i + 1}`,
    job_location: location,
    job_type: [jobType],
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


app.get("/auth/admin/job/:jobId/rounds", (req, res) => {
  const { jobId } = req.params;
  const job = allJobs.find((j) => j.id === jobId);
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json({ rounds: job.rounds });
});

// --- NEW: Update rounds for a job ---
app.post("/auth/admin/job/:jobId/rounds", (req, res) => {
  res.json({ message: "Rounds updated successfully" });
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


app.get("/auth/applied_job", (req, res) => {
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


// Route 2: Get applicants for a specific job with pagination and filters
app.get("/auth/admin/job/:jobId/applicants", (req, res) => {
  const jobId = parseInt(req.params.jobId, 10);
  const job = allJobs[0]

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
// --- Route 3: Update single applicant status ---
app.put("/auth/admin/job/:jobId/applicant/:id/status", (req, res) => {
  const { jobId, id } = req.params;
  const { round_statuses } = req.body;
  console.log("Updating applicant", id, "for job", jobId);

  // const applicant = students.find((s) => s.id === id);
  // if (!applicant) {
  //   return res.status(404).json({ error: "Applicant not found" });
  // }

  // applicant.round_statuses = round_statuses;
  res.json({ message: "Applicant status updated" });
});
app.put("/auth/admin/job/:jobId/applicant/:id/status", (req, res) => {
  const { jobId, id } = req.params;
  const { round_statuses } = req.body;
  console.log("Updating applicant", id, "for job", jobId);

  // const applicant = students.find((s) => s.id === id);
  // if (!applicant) {
  //   return res.status(404).json({ error: "Applicant not found" });
  // }

  // applicant.round_statuses = round_statuses;
  res.json({ message: "Applicant status updated" });
});

// --- Route 4: Bulk update applicant statuses ---
app.put("/auth/admin/job/:jobId/applicants/status/bulk", (req, res) => {
  const { jobId } = req.params;
  const { applicantIds, roundIndex, status } = req.body;

  let updated = 0;
  students.forEach((s) => {
    if (applicantIds.includes(s.id)) {
      if (!s.round_statuses) {
        s.round_statuses = [];
      }
      s.round_statuses[roundIndex] = status;
      updated++;
    }
  });

  res.json({ message: "Bulk status update successful", updated });
});
const jobb = {
  job_title: "Software Engineer",
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
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

let NEXT_ID = 1;
const makeApplicant = (id, batch_id) => ({
  id,
  name: `Student-${id}`,
  email: `student${id}@college.edu`,
  batch_id: batch_id,
  status: "PENDING",
});
const futureISO = () => {
  const now = Date.now();
  return new Date(
    now + Math.random() * 15 * 24 * 60 * 60 * 1_000
  ).toISOString();
};

const makeInterview = () => {
  const id = `INT-${NEXT_ID++}`;
  const job = rand(mockJobs);
  const mode = rand(["ONLINE", "ON_CAMPUS", "COMPANY_SITE"]);

  let batches = [];
  let test_details = [];
  let company_address = null;

  if (mode !== "COMPANY_SITE") {
    const batchCount = Math.floor(Math.random() * 2) + 1;
    batches = Array.from({ length: batchCount }, (_, i) => ({
      venue: mode === "ON_CAMPUS" ? `Hall-${String.fromCharCode(65 + i)}` : null,
      start: futureISO(),
      end: futureISO(6),
    }));

    test_details = [
      {
        category: "TECHNICAL",
        difficulties: ["MED", "HARD"],
        question_count: 20,
      },
      {
        category: "APTITUDE",
        difficulties: ["EASY", "MED"],
        question_count: 15,
      },
    ];
  } else {
      company_address = {
          street: "123 Tech Park",
          city: "Bengaluru",
          state: "Karnataka",
          zip: "560100"
      };
  }

  return {
    id,
    job_id: job.id,
    job_title: job.job_title,
    company_name: job.company_name,
    department_ids: null, // Default for job-specific
    pass_out_year: null, // Default for job-specific
    mode,
    online_link: mode === "ONLINE" ? "https://meet.example.com/new-interview" : null,
    company_address,
    batches,
    test_details,
    cutoff: { type: "PERCENT", value: 65 },
    special_instructions: "Candidates should join 10 minutes early.",
    contact_person: {
      name: "John Doe",
      phone: "+91-9988776655",
      email: "john.doe@example.com",
    },
  };
};

// UPDATED: In-memory DB with the new data structure
const interviews = [
  {
    id: "INT-101",
    job_id: 1,
    company_name: "Akamai",
    job_title: "SDE",
    department_ids: null,
    pass_out_year: null,
    mode: "ON_CAMPUS",
    online_link: null,
    company_address: null,
    batches: [
      {
        venue: "Auditorium-A",
        start: "2025-11-12T09:00:00.000Z",
        end: "2025-11-12T10:30:00.000Z",
      },
      {
        venue: "Auditorium-B",
        start: "2025-11-12T11:00:00.000Z",
        end: "2025-11-12T12:30:00.000Z",
      },
    ],
    // New `test_details` structure
    test_details: [
        {
            category: "TECHNICAL",
            difficulties: ["MED", "HARD"],
            question_count: 30
        },
        {
            category: "APTITUDE",
            difficulties: ["MED"],
            question_count: 20
        }
    ],
    cutoff: {
      type: "PERCENT",
      value: 75,
    },
    special_instructions:
      "Candidates must bring a printed copy of their resume and a valid government-issued photo ID. Laptops are required for the coding round.",
    contact_person: {
      name: "Rohit Verma",
      phone: "9876543210",
      email: "rohit.v@akamai.com",
    },
  },
];
// ─── single route ───
app.get("/auth/admin/interviews", (_, res) => res.json(interviews));
/* ───────── schedule (create) ───────── */
app.post("/auth/admin/interview/schedule", (req, res) => {
  console.log("\n📥 Received Interview Schedule Payload:\n");
  console.dir(req.body, { depth: null });

  // Create a new interview object using the request body
  const newInterview = {
      ...req.body, // The entire valid payload from the frontend
      id: `INT-${NEXT_ID++}`, // Assign a new ID
      // Add any other server-generated properties if needed
      company_name: mockJobs.find(j => j.id === req.body.job_id)?.company_name,
      job_title: mockJobs.find(j => j.id === req.body.job_id)?.job_title,
  };
  interviews.push(newInterview);

  res
    .status(200)
    .json({ id: newInterview.id, message: "Interview scheduled successfully (mock)" });
});

// --- Read one interview by ID ---
app.get("/auth/admin/interview/:id", (req, res) => {
  const interview = interviews.find((i) => i.id == req.params.id);
  if (!interview)
    return res.status(404).json({ message: "Interview not found" });
  res.json(interview);
});

// --- Update an existing interview ---
app.put("/auth/admin/interview/:id", (req, res) => {
  const idx = interviews.findIndex((i) => i.id == req.params.id);
  if (idx === -1)
    return res.status(404).json({ message: "Interview not found" });

  // Merge the updated fields from the request body
  interviews[idx] = { ...interviews[idx], ...req.body };
  
  console.log(`\n✏️  Interview ${req.params.id} updated with payload:\n`);
  console.dir(req.body, { depth: null });

  res.status(200).json({ message: "Interview updated successfully (mock)" });
});
/* ───────── applicants list ───────── */


// Use 'let' to allow modification for status updates
let allApplicants = [
  {
    id: 1,
    name: "Aarav Sharma",
    usn: "1CR21CS001",
    email: "aarav@example.com",
    batch_id: "B1",
    status: "PENDING",
  },
  {
    id: 2,
    name: "Saanvi Gupta",
    usn: "1CR21CS002",
    email: "saanvi@example.com",
    batch_id: "B2",
    status: "ALLOWED",
  },
  {
    id: 3,
    name: "Vivaan Singh",
    usn: "1CR21EC003",
    email: "vivaan@example.com",
    batch_id: "B1",
    status: "BLOCKED",
  },
  {
    id: 4,
    name: "Myra Reddy",
    usn: "1CR21EE004",
    email: "myra@example.com",
    batch_id: "B3",
    status: "PENDING",
  },
  {
    id: 5,
    name: "Advik Patel",
    usn: "1CR21CS005",
    email: "advik@example.com",
    batch_id: "B2",
    status: "PENDING",
  },
  {
    id: 6,
    name: "Ananya Iyer",
    usn: "1CR21IS006",
    email: "ananya@example.com",
    batch_id: "B1",
    status: "ALLOWED",
  },
  {
    id: 7,
    name: "Kabir Kumar",
    usn: "1CR21ME007",
    email: "kabir@example.com",
    batch_id: "B3",
    status: "BLOCKED",
  },
  {
    id: 8,
    name: "Diya Mehta",
    usn: "1CR21CS008",
    email: "diya@example.com",
    batch_id: "B2",
    status: "PENDING",
  },
  {
    id: 9,
    name: "Reyansh Joshi",
    usn: "1CR21CV009",
    email: "reyansh@example.com",
    batch_id: "B1",
    status: "PENDING",
  },
  {
    id: 10,
    name: "Kiara Nair",
    usn: "1CR21CS010",
    email: "kiara@example.com",
    batch_id: "B3",
    status: "PENDING",
  },
  {
    id: 11,
    name: "Zoya Khan",
    usn: "1CR21EC011",
    email: "zoya@example.com",
    batch_id: "B1",
    status: "ALLOWED",
  },
  {
    id: 12,
    name: "Ishaan Agarwal",
    usn: "1CR21CS012",
    email: "ishaan@example.com",
    batch_id: "B2",
    status: "PENDING",
  },
  // Add more to test pagination
  ...Array.from({ length: 15 }, (_, i) => ({
    id: 13 + i,
    name: `Student Name ${i + 1}`,
    usn: `1CR21ZZ${String(i + 1).padStart(3, "0")}`,
    email: `student${i + 1}@example.com`,
    batch_id: ["B1", "B2", "B3"][i % 3],
    status: "PENDING",
  })),
];

// --- API ENDPOINTS ---

// GET Interview Details
// app.get("/auth/admin/interview/:id", (req, res) => {
//   const interview = interviews.find(i => i.id === req.params.id);
//   if (!interview) return res.status(404).json({ message: "Interview not found" });
//   res.json(interview);
// });

// GET Applicants with full filtering and pagination
app.get("/auth/admin/interview/:id/applicants", (req, res) => {
  const { page = 1, limit = 10, batch_id, status, search } = req.query;

  let filtered = [...allApplicants];

  if (batch_id) filtered = filtered.filter((a) => a.batch_id === batch_id);
  if (status && status !== "ALL")
    filtered = filtered.filter((a) => a.status === status);
  if (search)
    filtered = filtered.filter((a) =>
      a.usn.toLowerCase().includes(search.toLowerCase())
    );

  const totalApplicants = filtered.length;
  const totalPages = Math.ceil(totalApplicants / parseInt(limit));
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  setTimeout(() => {
    // Simulate network delay
    res.json({
      totalApplicants,
      totalPages,
      currentPage: parseInt(page),
      applicants: paginated,
    });
  }, 300);
});

// POST Update status for multiple applicants by their IDs
app.post("/auth/admin/interview/:id/applicants/status", (req, res) => {
  const { applicant_ids = [], status } = req.body;

  allApplicants = allApplicants.map((app) =>
    applicant_ids.includes(app.id) ? { ...app, status } : app
  );

  console.log(`Updated ${applicant_ids.length} applicants to ${status}`);
  res.json({
    message: `Successfully updated ${applicant_ids.length} applicants.`,
  });
});

// POST Update status for multiple applicants by their USNs
app.post("/auth/admin/interview/:id/applicants/status-by-usn", (req, res) => {
  const { usns = [], status } = req.body;
  const lowerCaseUsns = new Set(usns.map((u) => u.toLowerCase()));

  let updatedCount = 0;
  allApplicants = allApplicants.map((app) => {
    if (lowerCaseUsns.has(app.usn.toLowerCase())) {
      updatedCount++;
      return { ...app, status };
    }
    return app;
  });

  console.log(`Updated ${updatedCount} applicants by USN to ${status}`);
  res.json({ message: `Successfully updated ${updatedCount} applicants.` });
});

const ALL_INTERVIEWS_DB = {
  upcoming: Array.from({ length: 8 }, (_, i) => ({
    id: `intv-up-${i}`,
    job_title: `Upcoming Job ${i + 1}`,
    company_name: `Tech Innovators`,
    date: `2025-09-${15 + i}T10:00:00Z`,
    status: "upcoming",
  })),

  attended: [
    {
      id: "intv-at-0",
      job_title: "Attended Role 1",
      company_name: "Solutions Co.",
      date: "2025-08-10T11:00:00Z",
      status: "attended",
      selection_status: "selected",
    },
    {
      id: "intv-at-1",
      job_title: "Attended Role 2",
      company_name: "Solutions Co.",
      date: "2025-08-11T11:00:00Z",
      status: "attended",
      selection_status: "rejected",
    },
    {
      id: "intv-at-2",
      job_title: "Attended Role 3",
      company_name: "Solutions Co.",
      date: "2025-08-12T11:00:00Z",
      status: "attended",
      selection_status: "pending",
    },
    {
      id: "intv-at-3",
      job_title: "Attended Role 4",
      company_name: "Solutions Co.",
      date: "2025-08-13T11:00:00Z",
      status: "attended",
      selection_status: "selected",
    },
  ],

  missed: Array.from({ length: 2 }, (_, i) => ({
    id: `intv-ms-${i}`,
    job_title: `Missed Opportunity ${i + 1}`,
    company_name: `Global Corp`,
    date: `2025-08-${1 + i}T16:00:00Z`,
    status: "missed",
  })),
};

// The API endpoint your React component will call
app.get("/auth/scheduled_interview", (req, res) => {
  const { status } = req.query; // e.g., ?status=upcoming

  console.log(`Received request for interviews with status: ${status}`);

  // Simulate network delay
  setTimeout(() => {
    if (status && ALL_INTERVIEWS_DB[status]) {
      res.status(200).json(ALL_INTERVIEWS_DB[status]);
    } else {
      res
        .status(404)
        .json({ message: `No interviews found for status: ${status}` });
    }
  }, 100); // 500ms delay
});

app.get("/auth/scheduled_interview/interview_status/:id", (req, res) => {
  const { id } = req.params;
  console.log(`[Status Check] Received request for ID: ${id}`);

  // Scenario 1: Interview is not yet available (e.g., starts in the future)
  if (id.startsWith("intv-up-0")) {
    return res.status(200).json({
      available: false,
      remaining_time: 120, // 2 minutes
    });
  }

  // Scenario 2: A server error occurs
  if (id.startsWith("API-ERROR")) {
    return res.status(500).json({ message: "A database error occurred." });
  }

  // Default Scenario: Interview is available
  return res.status(200).json({
    available: true,
  });
});

/*
 * =================================================================
 *  API ENDPOINT: /api/interview/:id/student-status
 *  Checks if the specific student is allowed to take the test.
 * =================================================================
 */
app.get("/auth/scheduled_interview/student_status/:id", (req, res) => {
  const { id } = req.params;
  console.log(`[Student Status Check] Received request for ID: ${id}`);

  // Scenario 1: Student is explicitly blocked
  if (id.startsWith("intv-up-1")) {
    return res.status(200).json({ allowed: false });
  }

  // Scenario 2: Student's participation requires manual approval
  if (id.startsWith("intv-up-2")) {
    return res.status(200).json({ allowed: null });
  }

  // Default Scenario: Student is allowed
  return res.status(200).json({ allowed: true });
});

/*
 * =================================================================
 *  API ENDPOINT: /api/interview/:id/questions
 *  Fetches the questions, duration, and section order for the test.
 * =================================================================
 */
app.get("/auth/scheduled_interview/questions/:id", (req, res) => {
  const { id } = req.params;
  console.log(`[Get Questions] Received request for ID: ${id}`);

  // Scenario 1: Interview is configured but has no questions/sections
  if (id.startsWith("NO-QUESTIONS")) {
    return res.status(200).json({
      duration: 3600,
      sectionOrder: [],
      questions: {},
    });
  }

  // Default "Happy Path" Scenario: A fully configured interview
  return res.status(200).json({
    duration: 3600,
    sectionOrder: ["APTITUDE", "VOCABULARY", "GENERAL"],
    questions: {
      APTITUDE: {
        mcq: [
          {
            question_id: "apt-mcq-1",
            question_text:
              "If a train travels 120km in 2 hours, what is its speed?",
            options: [
              { option_id: 1, text: "60 km/h" },
              { option_id: 2, text: "80 km/h" },
            ],
          },
          {
            question_id: "apt-mcq-2",
            question_text:
              "If a train travels 120km in 2 hours, what is its speed?",
            options: [
              { option_id: 1, text: "60 km/h" },
              { option_id: 2, text: "80 km/h" },
            ],
          },
          {
            question_id: "apt-mcq-3",
            question_text:
              "If a train travels 120km in 2 hours, what is its speed?",
            options: [
              { option_id: 1, text: "60 km/h" },
              { option_id: 2, text: "80 km/h" },
            ],
          },
        ],
        short_answer: [
          {
            question_id: "apt-sa-1",
            question_text:
              "Explain the difference between permutation and combination.",
          },
          {
            question_id: "apt-sa-2",
            question_text:
              "Explain the difference between permutation and combination.",
          },
          {
            question_id: "apt-sa-3",
            question_text:
              "Explain the difference between permutation and combination.",
          },
        ],
      },
      VOCABULARY: {
        mcq: [
          {
            question_id: "voc-mcq-1",
            question_text: "Which word is a synonym for 'ephemeral'?",
            options: [
              { option_id: 1, text: "Everlasting" },
              { option_id: 2, text: "Fleeting" },
            ],
          },
        ],
        short_answer: [
          {
            question_id: "apt-sa-1",
            question_text:
              "Explain the difference between permutation and combination.",
          },
          {
            question_id: "apt-sa-2",
            question_text:
              "Explain the difference between permutation and combination.",
          },
          {
            question_id: "apt-sa-3",
            question_text:
              "Explain the difference between permutation and combination.",
          },
        ],
      },
      GENERAL: {
        short_answer: [
          {
            question_id: "apt-sa-1",
            question_text:
              "Explain the difference between permutation and combination.",
          },
          {
            question_id: "apt-sa-2",
            question_text:
              "Explain the difference between permutation and combination.",
          },
          {
            question_id: "apt-sa-3",
            question_text:
              "Explain the difference between permutation and combination.",
          },
        ],
      },
    },
  });
});

/*
 * =================================================================
 *  API ENDPOINT: /api/interview/:id/submit-results
 *  Receives the student's answers.
 * =================================================================
 */
app.post("/auth/scheduled_interview/submit/:id", (req, res) => {
  const { id } = req.params;
  const { answers } = req.body;

  console.log(`[Submit Results] Received submission for ID: ${id}`);
  console.log("Received Answers:", JSON.stringify(answers, null, 2));

  // You can add logic here to simulate a submission failure if needed
  if (!answers) {
    return res
      .status(400)
      .json({ message: "Bad Request: No answers provided." });
  }

  return res.status(200).json({
    message: "Interview submitted successfully!",
    resultId: `res-${id}`,
  });
});

const interviewResultData = {
  max_score: 100,
  obtained_score: 87,
  max_mcq_score: 20,
  obtained_mcq_score: 17,
  overall_feedback:
    "The candidate demonstrates a very strong understanding of advanced JavaScript concepts and React principles. The approach to component structure and state management is solid. The area for improvement would be in providing more detailed, textbook-style definitions for CSS concepts, although the practical application seems fine.",
  questions: {
    "JavaScript (Advanced)": {
      mcq: [
        {
          question_id: "js-mcq-1",
          difficulty: "medium",
          skill_tag: "JavaScript",
          question_text: "What is a closure in JavaScript?",
          options: [
            { option_id: 1, text: "A block of code that executes immediately" },
            { option_id: 2, text: "A way to bind `this` to a function" },
            {
              option_id: 3,
              text: "A function that remembers its lexical scope",
            },
            { option_id: 4, text: "A type of JavaScript object" },
          ],
          correct_answer: "A function that remembers its lexical scope",
          user_answer: "A function that remembers its lexical scope",
          score: 10,
        },
      ],
      short_answer: [
        {
          question_id: "jsadv-sa-1",
          difficulty: "hard",
          skill_tag: "JavaScript",
          question_text: "Explain event delegation in JavaScript.",
          user_answer:
            "It's a pattern where you attach a single event handler to a parent element to manage events on its descendants. This is more efficient than adding an event listener to every single child element.",
          relevancy_score: 9,
          score: 9,
          feedback:
            "Excellent and concise explanation. Captures the core benefit of the pattern.",
          correct_answer:
            "Event delegation is the practice of attaching a single event handler to a parent element to handle events that 'bubble up' from its child elements. This avoids attaching handlers to multiple individual nodes and can handle dynamically added children.",
        },
      ],
    },
    React: {
      mcq: [
        {
          question_id: "react-mcq-1",
          difficulty: "easy",
          skill_tag: "React",
          question_text: "What are hooks in React?",
          options: [
            {
              option_id: 1,
              text: "Functions that let you use state and other React features in functional components",
            },
            { option_id: 2, text: "A way to fetch data in React" },
            { option_id: 3, text: "An HTML attribute for components" },
            { option_id: 4, text: "A replacement for props" },
          ],
          correct_answer:
            "Functions that let you use state and other React features in functional components",
          user_answer:
            "A function that lets you use state and other React features in functional components", // A slightly incorrect user answer for demonstration
          score: 7, // Score reflects the slight inaccuracy
        },
      ],
      short_answer: [],
    },
    CSS: {
      short_answer: [
        {
          question_id: "css-sa-1",
          difficulty: "easy",
          skill_tag: "CSS",
          question_text:
            "Explain the difference between `rem` and `em` units in CSS.",
          user_answer:
            "Both are relative units. 'em' is relative to the font-size of its direct parent, whereas 'rem' is relative to the root (<html>) font-size.",
          relevancy_score: 8,
          score: 8,
          feedback: "Correct. This is a clear and accurate distinction.",
          correct_answer:
            "The `em` unit is relative to the font-size of its parent element, which can lead to compounding size changes. The `rem` (root em) unit is relative only to the font-size of the root `html` element, providing a more predictable and stable base for scaling.",
        },
      ],
      mcq: [],
    },
    "React + CSS": {
      short_answer: [
        {
          question_id: "reactcss-sa-1",
          difficulty: "medium",
          skill_tag: "React, CSS",
          question_text:
            "Given a design mockup, how would you structure your components and styles for reusability?",
          user_answer:
            "I would break the UI down into small, atomic components (like Button, Input). Then, I'd compose them into larger organism components. For styling, I prefer CSS Modules to keep styles scoped locally and use a global theme file for variables like colors and spacing.",
          relevancy_score: 9,
          score: 9,
          feedback:
            "Solid, modern approach. Mentioning atomic design principles and scoped styling demonstrates a strong understanding of maintainable front-end architecture.",
          correct_answer:
            "A good approach involves breaking the design into reusable functional components (atomic design). Styles can be managed using scoped solutions like CSS Modules or CSS-in-JS libraries (e.g., Styled Components). A centralized theme file for design tokens (colors, fonts, spacing) should be used to ensure consistency.",
        },
      ],
      mcq: [],
    },
  },
};

// Data for the /selection/:id endpoint
const allSelectedStudents = [
  { name: "Priya Sharma", usn: "1RN22CS120" },
  { name: "Rohan Gupta", usn: "1RN22AI045" },
  { name: "Anjali Mehta", usn: "1RN22IS011" },
  { name: "Vikram Singh", usn: "1RN22CS210" },
  { name: "Sneha Reddy", usn: "1RN22AI101" },
];

const selectionDataForSelectedStudent = {
  selected: true,
  selected_students: allSelectedStudents,
};

const selectionDataForNotSelectedStudent = {
  selected: false,
  selected_students: allSelectedStudents,
};

// --- API ENDPOINTS ---

// Endpoint for interview results
app.get("/auth/scheduled_interview/result/:id", (req, res) => {
  const { id } = req.params;
  console.log(
    `[${new Date().toLocaleTimeString()}] GET /api/interview/result/${id} - Returning mock result data.`
  );

  // Simulate a network delay
  setTimeout(() => {
    res.status(200).json(interviewResultData);
  }, 500); // 0.5 second delay
});

// Endpoint for selection status
app.get("/auth/scheduled_interview/selection/:id", (req, res) => {
  const { id } = req.params;
  console.log(
    `[${new Date().toLocaleTimeString()}] GET /api/interview/selection/${id} - Returning mock selection data.`
  );

  // Simple logic to test both "selected" and "not selected" cases
  // If the ID contains the word "fail" or an even number, return not selected.
  let responseData;
  if (id.includes("fail") || parseInt(id.slice(-1)) % 2 === 0) {
    console.log(` -> Responding with 'Not Selected' status for ID: ${id}`);
    responseData = selectionDataForNotSelectedStudent;
  } else {
    console.log(` -> Responding with 'Selected' status for ID: ${id}`);
    responseData = selectionDataForSelectedStudent;
  }

  // Simulate a network delay
  setTimeout(() => {
    res.status(200).json(responseData);
  }, 800); // 0.8 second delay
});

let admins = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.j@corp.com",
    access_type: "finance_editor",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@corp.com",
    access_type: "placement_officer",
  },
  {
    id: 3,
    name: "Catherine Williams",
    email: "cathy.w@corp.com",
    access_type: "finance_editor",
  },
];
let nextId = 4;

// --- Helper for simulated delay ---
const simulateDelay = (req, res, next) => {
  setTimeout(next, 5); // 500ms delay
};

// --- API Endpoints ---

// GET /api/admins - Fetch all admins
app.get("/auth/admin/admins", simulateDelay, (req, res) => {
  console.log("GET /api/admins -> Fectching all admins");
  res.status(200).json(admins);
});

// POST /api/admins - Add a new admin
app.post("/auth/admin/admins", simulateDelay, (req, res) => {
  const { name, email, access_type } = req.body;

  if (!name || !email || !access_type) {
    return res
      .status(400)
      .json({ message: "Name, email, and access_type are required." });
  }

  const newAdmin = { id: nextId++, name, email, access_type };
  admins.unshift(newAdmin); // Add to the beginning of the array

  console.log("POST /api/admins -> Added new admin:", newAdmin);
  res.status(201).json(newAdmin);
});

// PUT /api/admins/:id - Update an existing admin
app.put("/auth/admin/admins/:id", simulateDelay, (req, res) => {
  const adminId = parseInt(req.params.id, 10);
  const { name, email, access_type } = req.body;

  const adminIndex = admins.findIndex((admin) => admin.id === adminId);

  if (adminIndex === -1) {
    return res.status(404).json({ message: "Admin not found." });
  }

  const updatedAdmin = { ...admins[adminIndex], name, email, access_type };
  admins[adminIndex] = updatedAdmin;

  console.log(`PUT /api/admins/${adminId} -> Updated admin:`, updatedAdmin);
  res.status(200).json(updatedAdmin);
});

// DELETE /api/admins/:id - Delete an admin
app.delete("/auth/admin/admins/:id", simulateDelay, (req, res) => {
  const adminId = parseInt(req.params.id, 10);
  const initialLength = admins.length;
  admins = admins.filter((admin) => admin.id !== adminId);

  if (admins.length === initialLength) {
    return res.status(404).json({ message: "Admin not found." });
  }

  console.log(`DELETE /api/admins/${adminId} -> Admin deleted.`);
  res.status(204).send(); // 204 No Content for successful deletion
});

const billingData = {
  annual_plan: {
    name: "Annual 1000 License Pack",
    total_licenses: 1000,
    renews_on: "2026-08-01T00:00:00Z",
    overage_rate: 25.0,
  },
  license_usage: {
    used: 750,
  },
  quarterly_usage: {
    next_invoice_date: "2025-10-01T00:00:00Z",
    overage: {
      count: 0,
      cost: 0,
    },
    total_unbilled: 170.0,
  },
  payment_method: {
    card_type: "Visa",
    last4: "4242",
    expiry: "12/28",
  },
  billing_history: [
    {
      id: "inv_quarter_2_2025",
      date: "2025-07-01T00:00:00Z",
      description: "Quarterly Usage (Apr - Jun 2025)",
      amount: 250.0,
      pdf_url: "#",
    },
    {
      id: "inv_quarter_1_2025",
      date: "2025-04-01T00:00:00Z",
      description: "Quarterly Usage (Jan - Mar 2025)",
      amount: 180.5,
      pdf_url: "#",
    },
  ],
};

// API Endpoint
app.get("/auth/admin/billing", (req, res) => {
  console.log("GET /api/billing-overview hit");
  // Simulate network delay
  setTimeout(() => {
    res.json(billingData);
  }, 100);
});

app.patch("/auth/admin/student/:id/status", (req, res) => {
  const id = parseInt(req.params.id);

  console.log(`Updated student ${id}:`);
  res.json({ message: "Student updated successfully" });
});

// PATCH /students/bulk-status - Bulk update status for multiple students
app.patch("/auth/admin/student/bulk_status", (req, res) => {
  console.log(`Bulk updated students.`);
  res.json({ message: "Bulk update successful" });
});

const notifications = [
  {
    id: 1,
    title: "New Job Opportunity",
    message: "TCS is hiring.",
    read: false,
  },
  {
    id: 2,
    title: "Application Viewed",
    message: "Your application for Google has been viewed.",
    read: false,
  },
  {
    id: 3,
    title: "Drive Reminder",
    message: "Infosys placement drive tomorrow.",
    read: true,
  },
  {
    id: 4,
    title: "New Job Opportunity",
    message: "TCS is hiring.",
    read: false,
  },
  {
    id: 5,
    title: "Application Viewed",
    message: "Your application for Google has been viewed.",
    read: false,
  },
  {
    id: 6,
    title: "Drive Reminder",
    message: "Infosys placement drive tomorrow.",
    read: true,
  },
  {
    id: 7,
    title: "New Job Opportunity",
    message: "TCS is hiring.",
    read: false,
  },
  {
    id: 8,
    title: "Application Viewed",
    message: "Your application for Google has been viewed.",
    read: false,
  },
  {
    id: 9,
    title: "Drive Reminder",
    message: "Infosys placement drive tomorrow.",
    read: true,
  },
  {
    id: 10,
    title: "New Job Opportunity",
    message: "TCS is hiring.",
    read: false,
  },
  {
    id: 11,
    title: "Application Viewed",
    message: "Your application for Google has been viewed.",
    read: false,
  },
  {
    id: 12,
    title: "Drive Reminder",
    message: "Infosys placement drive tomorrow.",
    read: true,
  },
];
app.get("/auth/notifications", (req, res) => {
  res.json(notifications);
});

app.post("/auth/admin/embedded_signup", (req, res) => {
  console.log(req.body);
  res.json({ message: "Super" });
});

const dashboardSummary = {
  stats: {
    total_students: 425,
    resumes_submitted: 380,
    active_placement_drives: 6,
    students_placed: 75,
  },
  placement_report: {
    kpi: {
      total_offers: 320,
      avg_package: "₹8.2 LPA",
      highest_package: "₹18 LPA",
      placement_percentage: "82%",
      most_active_dept: "Computer Science",
      top_companies: "TCS, Infosys, Accenture",
    },
    company_details: [
      { company_name: "TCS", offers: 120, avg: "₹8 LPA", highest: "₹12 LPA" },
      {
        company_name: "Infosys",
        offers: 80,
        avg: "₹7 LPA",
        highest: "₹10 LPA",
      },
      {
        company_name: "Accenture",
        offers: 50,
        avg: "₹9 LPA",
        highest: "₹14 LPA",
      },
      {
        company_name: "Deloitte",
        offers: 40,
        avg: "₹10 LPA",
        highest: "₹15 LPA",
      },
      {
        company_name: "Wipro",
        offers: 30,
        avg: "₹7.5 LPA",
        highest: "₹11 LPA",
      },
    ],
  },
  ai_mock_interview_stats: {
    summary: {
      total_interviews: 142,
      average_score: 78,
      students_participated: 95,
    },
    weekly_performance: {
      labels: ["week_1", "week_2", "week_3", "week_4", "week_5"],
      interviews_taken: [12, 18, 24, 20, 28],
      average_scores: [72, 75, 78, 74, 80],
    },
    recent_attempts: [
      { id: 1, student: "Arjun Sharma", date: "2025-10-08", score: 85 },
      { id: 2, student: "Priya Patel", date: "2025-10-07", score: 72 },
      { id: 3, student: "Ravi Kumar", date: "2025-10-06", score: 90 },
    ],
  },
};
const studentDashboardSummary = {
  user_name: "Amrutha Rao",
  profile_completion: 85,
  stats: {
    ai_interviews_taken: 4,
    upcoming_interviews: 2,
    jobs_applied: 12,
    offers_received: 100,
  },
  upcoming_drives: [
    {
      id: "1",
      company_name: "Google",
      job_title: "Software Engineer",
      location: "Bangalore",
      registration_deadline: "2025-11-08",
      ctc: "15LPA",
    },
    {
      id: "2",
      company_name: "Amazon",
      job_title: "Data Analyst",
      location: "Hyderabad",
      registration_deadline: "2025-11-12",
      ctc: "13LPA",
    },
    {
      id: "3",
      company_name: "Microsoft",
      job_title: "Cloud Engineer",
      location: "Pune",
      registration_deadline: "2025-11-18",
      ctc: "18LPA",
    },
  ],
  peer_comparison: [
    {
      id: "comp_1",
      metric_name: "Applications Submitted",
      your_value: 12,
      avg_value: 9,
      top_value: 20,
    },
    {
      id: "comp_15",
      metric_name: "Best Offer CTC (LPA)",
      your_value: 16,
      avg_value: 12,
      top_value: 45
    },
  ],
  ai_interview_stats: {
    time: "2025-11-03T15:19:00+05:30",
    global: {
      students_attempted: 163,
      avg_score: 74,
      top_score: 96,
    },
    student: {
      id: "123sdf123",
      attempts_count: 4,
      avg_score: 79,
      top_score: 92,
    },
  },
};


app.get("/auth/admin/dashboard", (req, res) => {
  res.json(dashboardSummary);
});

app.get("/auth/dashboard", (req, res) => {
  res.json(studentDashboardSummary);
});

const mockEvents = [
    {
      "id": "event001",
      "title": "Tech Career Fair 2024",
      "description": "Annual career fair featuring top tech companies recruiting for internships and full-time positions.",
      "date": "2026-06-15",
      "time": "10:00",
      "location": "Main Auditorium, Building A",
      "organizer": "Placement Cell",
      "max_attendees": 500,
      "attendees": [
        "student001",
        "student002",
        "student003"
      ],
      "poster_url": "https://example.com/posters/career-fair-2024.jpg",
      "documents": [
        {
          "name": "Event_Schedule.pdf",
          "url": "https://example.com/docs/schedule.pdf",
          "type": "application/pdf"
        },
        {
          "name": "Company_List.xlsx",
          "url": "https://example.com/docs/companies.xlsx",
          "type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
      ],
      "created_at": "2024-05-01T10:00:00.000Z",
      "updated_at": "2024-05-10T14:30:00.000Z",
      "attendee_count": 3,
      "status": "Done"
    },
    {
      "id": "event002",
      "title": "AI & Machine Learning Workshop",
      "description": "Hands-on workshop covering fundamentals of AI and ML with industry experts from Google.",
      "date": "2024-06-20",
      "time": "14:00",
      "location": "Computer Lab 301",
      "organizer": "CS Department",
      "max_attendees": 50,
      "attendees": [
        "student004",
        "student005"
      ],
      "poster_url": "https://example.com/posters/ai-workshop.jpg",
      "documents": [
        {
          "name": "Workshop_Materials.zip",
          "url": "https://example.com/docs/materials.zip",
          "type": "application/zip"
        }
      ],
      "created_at": "2024-05-05T09:00:00.000Z",
      "updated_at": "2024-05-12T11:00:00.000Z",
      "attendee_count": 2,
      "status": "past"
    },
    {
      "id": "event003",
      "title": "Resume Building Seminar",
      "description": "Learn how to craft an impressive resume and cover letter that stands out to recruiters.",
      "date": "2024-05-25",
      "time": "15:30",
      "location": "Seminar Hall B",
      "organizer": "Career Services",
      "max_attendees": 100,
      "attendees": [
        "student001",
        "student006",
        "student007"
      ],
      "poster_url": null,
      "documents": [],
      "created_at": "2024-04-20T08:00:00.000Z",
      "updated_at": "2024-05-01T10:00:00.000Z",
      "attendee_count": 3,
      "status": "past"
    }
    ,
    {
      "id": "event004",
      "title": "Startup Pitch Competition",
      "description": "Present your startup ideas to a panel of investors and win seed funding up to $50,000.",
      "date": "2024-07-10",
      "time": "09:00",
      "location": "Innovation Hub",
      "organizer": "Entrepreneurship Cell",
      "max_attendees": 200,
      "attendees": [
        "student008"
      ],
      "poster_url": "https://example.com/posters/pitch-competition.jpg",
      "documents": [
        {
          "name": "Competition_Rules.pdf",
          "url": "https://example.com/docs/rules.pdf",
          "type": "application/pdf"
        },
        {
          "name": "Registration_Form.docx",
          "url": "https://example.com/docs/registration.docx",
          "type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        }
      ],
      "created_at": "2024-05-15T12:00:00.000Z",
      "updated_at": "2024-05-20T16:00:00.000Z",
      "attendee_count": 1,
      "status": "past"
    },{
      "id": "event001",
      "title": "Tech Career Fair 2024",
      "description": "Annual career fair featuring top tech companies recruiting for internships and full-time positions.",
      "date": "2024-06-15",
      "time": "10:00",
      "location": "Main Auditorium, Building A",
      "organizer": "Placement Cell",
      "max_attendees": 500,
      "attendees": [
        "student001",
        "student002",
        "student003"
      ],
      "poster_url": "https://example.com/posters/career-fair-2024.jpg",
      "documents": [
        {
          "name": "Event_Schedule.pdf",
          "url": "https://example.com/docs/schedule.pdf",
          "type": "application/pdf"
        },
        {
          "name": "Company_List.xlsx",
          "url": "https://example.com/docs/companies.xlsx",
          "type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
      ],
      "created_at": "2024-05-01T10:00:00.000Z",
      "updated_at": "2024-05-10T14:30:00.000Z",
      "attendee_count": 3,
      "status": "past"
    },
    {
      "id": "event002",
      "title": "AI & Machine Learning Workshop",
      "description": "Hands-on workshop covering fundamentals of AI and ML with industry experts from Google.",
      "date": "2024-06-20",
      "time": "14:00",
      "location": "Computer Lab 301",
      "organizer": "CS Department",
      "max_attendees": 50,
      "attendees": [
        "student004",
        "student005"
      ],
      "poster_url": "https://example.com/posters/ai-workshop.jpg",
      "documents": [
        {
          "name": "Workshop_Materials.zip",
          "url": "https://example.com/docs/materials.zip",
          "type": "application/zip"
        }
      ],
      "created_at": "2024-05-05T09:00:00.000Z",
      "updated_at": "2024-05-12T11:00:00.000Z",
      "attendee_count": 2,
      "status": "past"
    },
    {
      "id": "event003",
      "title": "Resume Building Seminar",
      "description": "Learn how to craft an impressive resume and cover letter that stands out to recruiters.",
      "date": "2024-05-25",
      "time": "15:30",
      "location": "Seminar Hall B",
      "organizer": "Career Services",
      "max_attendees": 100,
      "attendees": [
        "student001",
        "student006",
        "student007"
      ],
      "poster_url": null,
      "documents": [],
      "created_at": "2024-04-20T08:00:00.000Z",
      "updated_at": "2024-05-01T10:00:00.000Z",
      "attendee_count": 3,
      "status": "past"
    }
    ,
    {
      "id": "event004",
      "title": "Startup Pitch Competition",
      "description": "Present your startup ideas to a panel of investors and win seed funding up to $50,000.",
      "date": "2024-07-10",
      "time": "09:00",
      "location": "Innovation Hub",
      "organizer": "Entrepreneurship Cell",
      "max_attendees": 200,
      "attendees": [
        "student008"
      ],
      "poster_url": "https://example.com/posters/pitch-competition.jpg",
      "documents": [
        {
          "name": "Competition_Rules.pdf",
          "url": "https://example.com/docs/rules.pdf",
          "type": "application/pdf"
        },
        {
          "name": "Registration_Form.docx",
          "url": "https://example.com/docs/registration.docx",
          "type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        }
      ],
      "created_at": "2024-05-15T12:00:00.000Z",
      "updated_at": "2024-05-20T16:00:00.000Z",
      "attendee_count": 1,
      "status": "past"
    },{
      "id": "event001",
      "title": "Tech Career Fair 2024",
      "description": "Annual career fair featuring top tech companies recruiting for internships and full-time positions.",
      "date": "2024-06-15",
      "time": "10:00",
      "location": "Main Auditorium, Building A",
      "organizer": "Placement Cell",
      "max_attendees": 500,
      "attendees": [
        "student001",
        "student002",
        "student003"
      ],
      "poster_url": "https://example.com/posters/career-fair-2024.jpg",
      "documents": [
        {
          "name": "Event_Schedule.pdf",
          "url": "https://example.com/docs/schedule.pdf",
          "type": "application/pdf"
        },
        {
          "name": "Company_List.xlsx",
          "url": "https://example.com/docs/companies.xlsx",
          "type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
      ],
      "created_at": "2024-05-01T10:00:00.000Z",
      "updated_at": "2024-05-10T14:30:00.000Z",
      "attendee_count": 3,
      "status": "past"
    },
    {
      "id": "event002",
      "title": "AI & Machine Learning Workshop",
      "description": "Hands-on workshop covering fundamentals of AI and ML with industry experts from Google.",
      "date": "2024-06-20",
      "time": "14:00",
      "location": "Computer Lab 301",
      "organizer": "CS Department",
      "max_attendees": 50,
      "attendees": [
        "student004",
        "student005"
      ],
      "poster_url": "https://example.com/posters/ai-workshop.jpg",
      "documents": [
        {
          "name": "Workshop_Materials.zip",
          "url": "https://example.com/docs/materials.zip",
          "type": "application/zip"
        }
      ],
      "created_at": "2024-05-05T09:00:00.000Z",
      "updated_at": "2024-05-12T11:00:00.000Z",
      "attendee_count": 2,
      "status": "past"
    },
    {
      "id": "event003",
      "title": "Resume Building Seminar",
      "description": "Learn how to craft an impressive resume and cover letter that stands out to recruiters.",
      "date": "2024-05-25",
      "time": "15:30",
      "location": "Seminar Hall B",
      "organizer": "Career Services",
      "max_attendees": 100,
      "attendees": [
        "student001",
        "student006",
        "student007"
      ],
      "poster_url": null,
      "documents": [],
      "created_at": "2024-04-20T08:00:00.000Z",
      "updated_at": "2024-05-01T10:00:00.000Z",
      "attendee_count": 3,
      "status": "past"
    }
    ,
    {
      "id": "event004",
      "title": "Startup Pitch Competition",
      "description": "Present your startup ideas to a panel of investors and win seed funding up to $50,000.",
      "date": "2024-07-10",
      "time": "09:00",
      "location": "Innovation Hub",
      "organizer": "Entrepreneurship Cell",
      "max_attendees": 200,
      "attendees": [
        "student008"
      ],
      "poster_url": "https://example.com/posters/pitch-competition.jpg",
      "documents": [
        {
          "name": "Competition_Rules.pdf",
          "url": "https://example.com/docs/rules.pdf",
          "type": "application/pdf"
        },
        {
          "name": "Registration_Form.docx",
          "url": "https://example.com/docs/registration.docx",
          "type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        }
      ],
      "created_at": "2024-05-15T12:00:00.000Z",
      "updated_at": "2024-05-20T16:00:00.000Z",
      "attendee_count": 1,
      "status": "past"
    },{
      "id": "event001",
      "title": "Tech Career Fair 2024",
      "description": "Annual career fair featuring top tech companies recruiting for internships and full-time positions.",
      "date": "2024-06-15",
      "time": "10:00",
      "location": "Main Auditorium, Building A",
      "organizer": "Placement Cell",
      "max_attendees": 500,
      "attendees": [
        "student001",
        "student002",
        "student003"
      ],
      "poster_url": "https://example.com/posters/career-fair-2024.jpg",
      "documents": [
        {
          "name": "Event_Schedule.pdf",
          "url": "https://example.com/docs/schedule.pdf",
          "type": "application/pdf"
        },
        {
          "name": "Company_List.xlsx",
          "url": "https://example.com/docs/companies.xlsx",
          "type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
      ],
      "created_at": "2024-05-01T10:00:00.000Z",
      "updated_at": "2024-05-10T14:30:00.000Z",
      "attendee_count": 3,
      "status": "past"
    },
    {
      "id": "event002",
      "title": "AI & Machine Learning Workshop",
      "description": "Hands-on workshop covering fundamentals of AI and ML with industry experts from Google.",
      "date": "2024-06-20",
      "time": "14:00",
      "location": "Computer Lab 301",
      "organizer": "CS Department",
      "max_attendees": 50,
      "attendees": [
        "student004",
        "student005"
      ],
      "poster_url": "https://example.com/posters/ai-workshop.jpg",
      "documents": [
        {
          "name": "Workshop_Materials.zip",
          "url": "https://example.com/docs/materials.zip",
          "type": "application/zip"
        }
      ],
      "created_at": "2024-05-05T09:00:00.000Z",
      "updated_at": "2024-05-12T11:00:00.000Z",
      "attendee_count": 2,
      "status": "past"
    },
    {
      "id": "event003",
      "title": "Resume Building Seminar",
      "description": "Learn how to craft an impressive resume and cover letter that stands out to recruiters.",
      "date": "2024-05-25",
      "time": "15:30",
      "location": "Seminar Hall B",
      "organizer": "Career Services",
      "max_attendees": 100,
      "attendees": [
        "student001",
        "student006",
        "student007"
      ],
      "poster_url": null,
      "documents": [],
      "created_at": "2024-04-20T08:00:00.000Z",
      "updated_at": "2024-05-01T10:00:00.000Z",
      "attendee_count": 3,
      "status": "past"
    }
    ,
    {
      "id": "event004",
      "title": "Startup Pitch Competition",
      "description": "Present your startup ideas to a panel of investors and win seed funding up to $50,000.",
      "date": "2024-07-10",
      "time": "09:00",
      "location": "Innovation Hub",
      "organizer": "Entrepreneurship Cell",
      "max_attendees": 200,
      "attendees": [
        "student008"
      ],
      "poster_url": "https://example.com/posters/pitch-competition.jpg",
      "documents": [
        {
          "name": "Competition_Rules.pdf",
          "url": "https://example.com/docs/rules.pdf",
          "type": "application/pdf"
        },
        {
          "name": "Registration_Form.docx",
          "url": "https://example.com/docs/registration.docx",
          "type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        }
      ],
      "created_at": "2024-05-15T12:00:00.000Z",
      "updated_at": "2024-05-20T16:00:00.000Z",
      "attendee_count": 1,
      "status": "past"
    },{
      "id": "event001",
      "title": "Tech Career Fair 2024",
      "description": "Annual career fair featuring top tech companies recruiting for internships and full-time positions.",
      "date": "2024-06-15",
      "time": "10:00",
      "location": "Main Auditorium, Building A",
      "organizer": "Placement Cell",
      "max_attendees": 500,
      "attendees": [
        "student001",
        "student002",
        "student003"
      ],
      "poster_url": "https://example.com/posters/career-fair-2024.jpg",
      "documents": [
        {
          "name": "Event_Schedule.pdf",
          "url": "https://example.com/docs/schedule.pdf",
          "type": "application/pdf"
        },
        {
          "name": "Company_List.xlsx",
          "url": "https://example.com/docs/companies.xlsx",
          "type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
      ],
      "created_at": "2024-05-01T10:00:00.000Z",
      "updated_at": "2024-05-10T14:30:00.000Z",
      "attendee_count": 3,
      "status": "past"
    },
    {
      "id": "event002",
      "title": "AI & Machine Learning Workshop",
      "description": "Hands-on workshop covering fundamentals of AI and ML with industry experts from Google.",
      "date": "2024-06-20",
      "time": "14:00",
      "location": "Computer Lab 301",
      "organizer": "CS Department",
      "max_attendees": 50,
      "attendees": [
        "student004",
        "student005"
      ],
      "poster_url": "https://example.com/posters/ai-workshop.jpg",
      "documents": [
        {
          "name": "Workshop_Materials.zip",
          "url": "https://example.com/docs/materials.zip",
          "type": "application/zip"
        }
      ],
      "created_at": "2024-05-05T09:00:00.000Z",
      "updated_at": "2024-05-12T11:00:00.000Z",
      "attendee_count": 2,
      "status": "past"
    },
    {
      "id": "event003",
      "title": "Resume Building Seminar",
      "description": "Learn how to craft an impressive resume and cover letter that stands out to recruiters.",
      "date": "2024-05-25",
      "time": "15:30",
      "location": "Seminar Hall B",
      "organizer": "Career Services",
      "max_attendees": 100,
      "attendees": [
        "student001",
        "student006",
        "student007"
      ],
      "poster_url": null,
      "documents": [],
      "created_at": "2024-04-20T08:00:00.000Z",
      "updated_at": "2024-05-01T10:00:00.000Z",
      "attendee_count": 3,
      "status": "past"
    }
    ,
    {
      "id": "event004",
      "title": "Startup Pitch Competition",
      "description": "Present your startup ideas to a panel of investors and win seed funding up to $50,000.",
      "date": "2024-07-10",
      "time": "09:00",
      "location": "Innovation Hub",
      "organizer": "Entrepreneurship Cell",
      "max_attendees": 200,
      "attendees": [
        "student008"
      ],
      "poster_url": "https://example.com/posters/pitch-competition.jpg",
      "documents": [
        {
          "name": "Competition_Rules.pdf",
          "url": "https://example.com/docs/rules.pdf",
          "type": "application/pdf"
        },
        {
          "name": "Registration_Form.docx",
          "url": "https://example.com/docs/registration.docx",
          "type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        }
      ],
      "created_at": "2024-05-15T12:00:00.000Z",
      "updated_at": "2024-05-20T16:00:00.000Z",
      "attendee_count": 1,
      "status": "past"
    },{
      "id": "event001",
      "title": "Tech Career Fair 2024",
      "description": "Annual career fair featuring top tech companies recruiting for internships and full-time positions.",
      "date": "2024-06-15",
      "time": "10:00",
      "location": "Main Auditorium, Building A",
      "organizer": "Placement Cell",
      "max_attendees": 500,
      "attendees": [
        "student001",
        "student002",
        "student003"
      ],
      "poster_url": "https://example.com/posters/career-fair-2024.jpg",
      "documents": [
        {
          "name": "Event_Schedule.pdf",
          "url": "https://example.com/docs/schedule.pdf",
          "type": "application/pdf"
        },
        {
          "name": "Company_List.xlsx",
          "url": "https://example.com/docs/companies.xlsx",
          "type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
      ],
      "created_at": "2024-05-01T10:00:00.000Z",
      "updated_at": "2024-05-10T14:30:00.000Z",
      "attendee_count": 3,
      "status": "past"
    },
    {
      "id": "event002",
      "title": "AI & Machine Learning Workshop",
      "description": "Hands-on workshop covering fundamentals of AI and ML with industry experts from Google.",
      "date": "2024-06-20",
      "time": "14:00",
      "location": "Computer Lab 301",
      "organizer": "CS Department",
      "max_attendees": 50,
      "attendees": [
        "student004",
        "student005"
      ],
      "poster_url": "https://example.com/posters/ai-workshop.jpg",
      "documents": [
        {
          "name": "Workshop_Materials.zip",
          "url": "https://example.com/docs/materials.zip",
          "type": "application/zip"
        }
      ],
      "created_at": "2024-05-05T09:00:00.000Z",
      "updated_at": "2024-05-12T11:00:00.000Z",
      "attendee_count": 2,
      "status": "past"
    },
    {
      "id": "event003",
      "title": "Resume Building Seminar",
      "description": "Learn how to craft an impressive resume and cover letter that stands out to recruiters.",
      "date": "2024-05-25",
      "time": "15:30",
      "location": "Seminar Hall B",
      "organizer": "Career Services",
      "max_attendees": 100,
      "attendees": [
        "student001",
        "student006",
        "student007"
      ],
      "poster_url": null,
      "documents": [],
      "created_at": "2024-04-20T08:00:00.000Z",
      "updated_at": "2024-05-01T10:00:00.000Z",
      "attendee_count": 3,
      "status": "past"
    }
    ,
    {
      "id": "event004",
      "title": "Startup Pitch Competition",
      "description": "Present your startup ideas to a panel of investors and win seed funding up to $50,000.",
      "date": "2024-07-10",
      "time": "09:00",
      "location": "Innovation Hub",
      "organizer": "Entrepreneurship Cell",
      "max_attendees": 200,
      "attendees": [
        "student008"
      ],
      "poster_url": "https://example.com/posters/pitch-competition.jpg",
      "documents": [
        {
          "name": "Competition_Rules.pdf",
          "url": "https://example.com/docs/rules.pdf",
          "type": "application/pdf"
        },
        {
          "name": "Registration_Form.docx",
          "url": "https://example.com/docs/registration.docx",
          "type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        }
      ],
      "created_at": "2024-05-15T12:00:00.000Z",
      "updated_at": "2024-05-20T16:00:00.000Z",
      "attendee_count": 1,
      "status": "past"
    },{
      "id": "event001",
      "title": "Tech Career Fair 2024",
      "description": "Annual career fair featuring top tech companies recruiting for internships and full-time positions.",
      "date": "2024-06-15",
      "time": "10:00",
      "location": "Main Auditorium, Building A",
      "organizer": "Placement Cell",
      "max_attendees": 500,
      "attendees": [
        "student001",
        "student002",
        "student003"
      ],
      "poster_url": "https://example.com/posters/career-fair-2024.jpg",
      "documents": [
        {
          "name": "Event_Schedule.pdf",
          "url": "https://example.com/docs/schedule.pdf",
          "type": "application/pdf"
        },
        {
          "name": "Company_List.xlsx",
          "url": "https://example.com/docs/companies.xlsx",
          "type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
      ],
      "created_at": "2024-05-01T10:00:00.000Z",
      "updated_at": "2024-05-10T14:30:00.000Z",
      "attendee_count": 3,
      "status": "past"
    },
    {
      "id": "event002",
      "title": "AI & Machine Learning Workshop",
      "description": "Hands-on workshop covering fundamentals of AI and ML with industry experts from Google.",
      "date": "2024-06-20",
      "time": "14:00",
      "location": "Computer Lab 301",
      "organizer": "CS Department",
      "max_attendees": 50,
      "attendees": [
        "student004",
        "student005"
      ],
      "poster_url": "https://example.com/posters/ai-workshop.jpg",
      "documents": [
        {
          "name": "Workshop_Materials.zip",
          "url": "https://example.com/docs/materials.zip",
          "type": "application/zip"
        }
      ],
      "created_at": "2024-05-05T09:00:00.000Z",
      "updated_at": "2024-05-12T11:00:00.000Z",
      "attendee_count": 2,
      "status": "past"
    },
    {
      "id": "event003",
      "title": "Resume Building Seminar",
      "description": "Learn how to craft an impressive resume and cover letter that stands out to recruiters.",
      "date": "2024-05-25",
      "time": "15:30",
      "location": "Seminar Hall B",
      "organizer": "Career Services",
      "max_attendees": 100,
      "attendees": [
        "student001",
        "student006",
        "student007"
      ],
      "poster_url": null,
      "documents": [],
      "created_at": "2024-04-20T08:00:00.000Z",
      "updated_at": "2024-05-01T10:00:00.000Z",
      "attendee_count": 3,
      "status": "past"
    }
    ,
    {
      "id": "event004",
      "title": "Startup Pitch Competition",
      "description": "Present your startup ideas to a panel of investors and win seed funding up to $50,000.",
      "date": "2026-07-10",
      "time": "09:00",
      "location": "Innovation Hub",
      "organizer": "Entrepreneurship Cell",
      "max_attendees": 200,
      "attendees": [
        "student008"
      ],
      "poster_url": "https://example.com/posters/pitch-competition.jpg",
      "documents": [
        {
          "name": "Competition_Rules.pdf",
          "url": "https://example.com/docs/rules.pdf",
          "type": "application/pdf"
        },
        {
          "name": "Registration_Form.docx",
          "url": "https://example.com/docs/registration.docx",
          "type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        }
      ],
      "created_at": "2024-05-15T12:00:00.000Z",
      "updated_at": "2024-05-20T16:00:00.000Z",
      "attendee_count": 1,
      "status": "past"
    },
]

// Sample Students for Attendance
const mockStudents = [
  {
    id: "student001",
    name: "John Doe",
    email: "john.doe@college.edu",
    usn: "CS2021001",
    department: "Computer Science"
  },
  {
    id: "student002",
    name: "Jane Smith",
    email: "jane.smith@college.edu",
    usn: "CS2021002",
    department: "Computer Science"
  },
  {
    id: "student003",
    name: "Michael Johnson",
    email: "michael.j@college.edu",
    usn: "IT2021015",
    department: "Information Technology"
  }
];


// Assuming you have an Express appinstance

// ============================================
// HELPER FUNCTIONS
// ============================================

function getEventStatus(eventDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const evtDate = new Date(eventDate);
  evtDate.setHours(0, 0, 0, 0);

  if (evtDate < today) {
    return 'past';
  } else if (evtDate.getTime() === today.getTime()) {
    return 'today';
  } else {
    return 'upcoming';
  }
}

// ============================================
// ADMIN ENDPOINTS
// ============================================

// GET /api/admin/events - Get all events (with pagination)
app.get('/auth/admin/events', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';

  let filteredEvents = mockEvents;
  if (search) {
    filteredEvents = mockEvents.filter(event =>
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.organizer.toLowerCase().includes(search.toLowerCase())
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

  res.json({
    success: true,
    events: paginatedEvents.map(event => ({
      ...event,
      attendee_count: event.attendees.length,
      status: getEventStatus(event.date)
    })),
    current_page: page,
    total_pages: Math.ceil(filteredEvents.length / limit),
    total_events: filteredEvents.length
  });
});

// GET /api/admin/event/:id - Get single event details
app.get('/auth/admin/event/:id', (req, res) => {
  const event = mockEvents.find(e => e.id === req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found"
    });
  }

  const attendeesWithDetails = event.attendees.map(studentId => {
    const student = mockStudents.find(s => s.id === studentId);
    return student || { id: studentId, name: "Unknown Student" };
  });

  res.json({
    success: true,
    event: {
      ...event,
      attendees: attendeesWithDetails,
      attendee_count: event.attendees.length,
      status: getEventStatus(event.date)
    }
  });
});

// POST /api/admin/events - Create new event
app.post('/auth/admin/events', (req, res) => {
  const {
    title,
    description,
    date,
    time,
    location,
    organizer,
    max_attendees,
    poster_url,
    documents
  } = req.body;

  // if (!title || !date) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Missing required fields"
  //   });
  // }

  const newEvent = {
    id: `event${Date.now()}`,
    title,
    description: description || "",
    date,
    time,
    location,
    organizer: organizer || "Admin",
    max_attendees: max_attendees || 100,
    attendees: [],
    poster_url: poster_url || null,
    documents: documents || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  mockEvents.push(newEvent);

  res.status(201).json({
    success: true,
    message: "Event created successfully",
    event: newEvent
  });
});

// PUT /auth/admin/event/:id - Update event
app.put('/auth/admin/event/:id', (req, res) => {
  const eventIndex = mockEvents.findIndex(e => e.id === req.params.id);

  if (eventIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Event not found"
    });
  }

  const updatedEvent = {
    ...mockEvents[eventIndex],
    ...req.body,
    id: req.params.id,
    updatedAt: new Date().toISOString()
  };

  mockEvents[eventIndex] = updatedEvent;

  res.json({
    success: true,
    message: "Event updated successfully",
    event: updatedEvent
  });
});

// DELETE /auth/admin/event/:id - Delete event
app.delete('/auth/admin/event/:id', (req, res) => {
  const eventIndex = mockEvents.findIndex(e => e.id === req.params.id);

  if (eventIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Event not found"
    });
  }

  mockEvents.splice(eventIndex, 1);

  res.json({
    success: true,
    message: "Event deleted successfully"
  });
});

// POST /auth/admin/event/upload - Upload poster or documents
app.post('/auth/admin/event/upload', (req, res) => {
  const file = req.file; 

  if (!file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded"
    });
  }

  const fileUrl = `https://example.com/uploads/${Date.now()}_${file.originalname}`;

  res.json({
    success: true,
    message: "File uploaded successfully",
    url: fileUrl,
    fileName: file.originalname,
    fileType: file.mimetype
  });
});

// POST /auth/admin/event/:id/mark-attendance - Mark attendance manually
app.post('/auth/admin/event/:id/mark-attendance', (req, res) => {
  const { studentId } = req.body;
  const event = mockEvents.find(e => e.id === req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found"
    });
  }

  if (event.attendees.includes(studentId)) {
    return res.status(400).json({
      success: false,
      message: "Attendance already marked"
    });
  }

  if (event.attendees.length >= event.max_attendees) {
    return res.status(400).json({
      success: false,
      message: "Event is full"
    });
  }

  event.attendees.push(studentId);
  event.updatedAt = new Date().toISOString();

  res.json({
    success: true,
    message: "Attendance marked successfully",
    attendee_count: event.attendees.length
  });
});

// POST /auth/admin/event/:id/scan-qr - Scan QR code for attendance
app.post('/auth/admin/event/:id/scan-qr', (req, res) => {
  const { qrData } = req.body;
  const event = mockEvents.find(e => e.id === req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found"
    });
  }

  const studentId = qrData.replace('STUDENT:', '');

  if (event.attendees.includes(studentId)) {
    return res.status(400).json({
      success: false,
      message: "Attendance already marked"
    });
  }

  if (event.attendees.length >= event.max_attendees) {
    return res.status(400).json({
      success: false,
      message: "Event is full"
    });
  }

  event.attendees.push(studentId);
  event.updatedAt = new Date().toISOString();

  const student = mockStudents.find(s => s.id === studentId);

  res.json({
    success: true,
    message: "Attendance marked successfully",
    student: student || { id: studentId, name: "Unknown Student" },
    attendee_count: event.attendees.length
  });
});


// ============================================
// STUDENT ENDPOINTS
// ============================================

// GET /auth/student/events - Get all events for students
app.get('/auth/events', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const studentId = req.user?.id || "student001";

  const enhancedEvents = mockEvents.map(event => ({
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date,
    time: event.time,
    location: event.location,
    organizer: event.organizer,
    max_attendees: event.max_attendees,
    attendee_count: event.attendees.length,
    poster_url: event.poster_url,
    status: getEventStatus(event.date),
    attended: event.attendees.includes(studentId),
    isFull: event.attendees.length >= event.max_attendees
  }));

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedEvents = enhancedEvents.slice(startIndex, endIndex);

  res.json({
    success: true,
    events: paginatedEvents,
    currentPage: page,
    totalPages: Math.ceil(enhancedEvents.length / limit),
    totalEvents: enhancedEvents.length
  });
});

// GET /auth/student/event/:id - Get single event details for student
app.get('/auth/event/:id', (req, res) => {
  const studentId = req.user?.id || "student001";
  const event = mockEvents[0]


  res.json({
    success: true,
    event: {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      organizer: event.organizer,
      max_attendees: event.max_attendees,
      attendee_count: event.attendees.length,
      poster_url: event.poster_url,
      documents: event.documents,
      status: getEventStatus(event.date),
      attended: event.attendees.includes(studentId),
      isFull: event.attendees.length >= event.max_attendees
    }
  });
});

// POST /auth/student/event/:id/register - Register for event
app.post('/auth/event/:id/register', (req, res) => {
  const studentId = req.user?.id || "student001";
  const event = mockEvents.find(e => e.id === req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found"
    });
  }

  if (event.attendees.includes(studentId)) {
    return res.status(400).json({
      success: false,
      message: "You are already registered for this event"
    });
  }

  if (event.attendees.length >= event.max_attendees) {
    return res.status(400).json({
      success: false,
      message: "Event is full. Registration closed."
    });
  }

  const eventDate = new Date(event.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (eventDate < today) {
    return res.status(400).json({
      success: false,
      message: "Cannot register for past events"
    });
  }

  event.attendees.push(studentId);
  event.updatedAt = new Date().toISOString();

  res.json({
    success: true,
    message: "Successfully registered for the event",
    attendee_count: event.attendees.length
  });
});

// DELETE /auth/student/event/:id/unregister - Unregister from event
app.delete('/auth/event/:id/unregister', (req, res) => {
  const studentId = req.user?.id || "student001";
  const event = mockEvents.find(e => e.id === req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found"
    });
  }

  const attendeeIndex = event.attendees.indexOf(studentId);

  if (attendeeIndex === -1) {
    return res.status(400).json({
      success: false,
      message: "You are not registered for this event"
    });
  }

  event.attendees.splice(attendeeIndex, 1);
  event.updatedAt = new Date().toISOString();

  res.json({
    success: true,
    message: "Successfully unregistered from the event",
    attendee_count: event.attendees.length
  });
});

// Export app



app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000`, port);
});
