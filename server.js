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
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1MTIwMDE5NywianRpIjoiMDk0MzllMmQtZDYwOS00NTk1LTg0YmEtM2IxOWE0MjE0Nzg1IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjgiLCJuYmYiOjE3NTEyMDAxOTcsImNzcmYiOiJmOGU5YTA5OC04NjAwLTQzM2ItYWI4MC0xMjUzM2E3MWM4OWEiLCJleHAiOjE3NTEyMDEwOTcsInJvbGUiOiJzdHVkZW50In0.ORf3PLaBlWKfvKdOIKO5VmPWXfTwegcTjte_Qhmjmo0";

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
  const { token } = req.body;
  console.log("token: ", token);

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    return res.status(200).json({ valid: true });
  } catch (err) {
    return res.status(401).json({ valid: false, message: "invalid token" });
  }
});

let userProfile = {
  profilePic: null,
  fullName: "John Doe",
  dob: "1990-05-15",
  contactNumber: "9876543210",
  email: "john.doe@example.com",
  githubLink: "https://github.com/johndoe",
  linkedinLink: "https://linkedin.com/in/johndoe",
  address: "123 Mock Street, Mock City, MC 12345",
};

app.get("/auth/profile", (req, res) => {
  console.log("req: ", userProfile);
  res.status(200).json({ data: userProfile });
});

app.post("/auth/profile", (req, res) => {
  console.log("req: ", req.body);
  res.status(200).json();
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
    plan: "Pro",
    validity: "Valid until June 12, 2025",
    billingEmail: "user@example.com",
    billingAddress: "123 Main Street, NY",
    lastPayment: "May 3, 2025",
    paymentMethod: "Credit Card •••• 1234",
    dueAmount: 29.99,
    paymentHistory: [
      {
        date: "May 3, 2025",
        amount: 29.99,
        status: "Paid",
        invoiceUrl: "#",
      },
      {
        date: "April 3, 2025",
        amount: 29.99,
        status: "Paid",
        invoiceUrl: "#",
      },
    ],
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
  "personal-details": {
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
    programmingLanguages: ["Python", "Java"],
    frameworks: ["Pytorch"],
    tools: ["Vscode"],
    softSkills: ["Soft-skills"],
    otherSkills: ["Tech-SKils"],
  },
  "work-experience": {
    workExperience: [
      {
        title: "SSE1",
        company: "Akamai",
        startDate: "2024-01",
        endDate: "2025-02",
        responsibilities: "None",
        achievements: "Guided Missile launch",
      },
    ],
  },
  projects: {
    projects: [
      {
        title: "Project 1",
        technologies: "react, js, node",
        teamSize: "1",
        impact: "no impact",
        links: "https://www.link.com",
      },
    ],
  },
  education: {
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
  },
  certifications: {
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
  },
  internships: {
    internships: [
      {
        company: "Akamai",
        position: "AI Intern",
        startDate: "2023-01",
        endDate: "2025-05",
        location: "Bengaluru ",
      },
    ],
  },
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
        description: "Desc",
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
  res.json({ resumes: mockResumes });
});

app.post("/auth/resume/rename", (req, res) => {
  const request = req.body;
  res.status(200).json("Success");
});

app.delete("/auth/resume", (req, res) => {
  const request = req.body;
  res.status(200).json("Success");
});

app.get("/auth/resume/:id", (req, res) => {
  const id = req.params;
  console.log("id: ", id);

  res.json(mockResumeData);
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

let mockInterviews = [
  { id: "1", name: "Frontend Developer", score: 20, date: "12/05/2025" },
  { id: "2", name: "Backend Engineer", score: 40, date: "12/03/2025" },
  { id: "3", name: "Backend Engineer", score: 60, date: "12/03/2025" },
  { id: "4", name: "Backend Engineer", score: 80, date: "12/03/2025" },
  { id: "5", name: "Backend Engineer", score: 100, date: "12/03/2025" },
];

app.post("/auth/interview", upload.single("jd_file"), (req, res) => {
  const resumeId = req.body.resume_id;
  const jdText = req.body.jd_text;
  const jdFile = req.file;

  if (!resumeId) {
    return res.status(400).json({ error: "Missing resume_id" });
  }

  if (!jdText && !jdFile) {
    return res.status(400).json({ error: "Missing JD text or file" });
  }

  console.log("Received interview request:");
  console.log("Resume ID:", resumeId);
  if (jdText) console.log("JD Text:", jdText);
  if (jdFile) console.log("JD File:", jdFile.originalname);

  // Mock response
  const mockInterviewId = Math.floor(Math.random() * 1000000);

  return res.json({ id: mockInterviewId });
});

app.get("/auth/interview", (req, res) => {
  res.json(mockInterviews);
});

const fakeResult = {
  name: "Frontend Developer Interview",
  date: "2025-06-08T10:30:00Z",
  resumeName: "JaneDoeResume.pdf",
  score: 87,
  breakdown: [
    { category: "JavaScript", score: 90 },
    { category: "React", score: 85 },
    { category: "CSS", score: 80 },
  ],
  questions: [
    {
      question: "What is a closure in JavaScript?",
      answer: "It's a function that remembers its lexical scope.",
      feedback: "Great explanation. Very concise.",
      category: "JavaScript",
      categoryScore: 95,
    },
    {
      question: "What are hooks in React?",
      answer: "Functions that let you use state and other React features.",
      feedback: "Well answered. Could use a bit more detail.",
      category: "React",
      categoryScore: 85,
    },
  ],
};

app.get("/auth/interview/result/:id", (req, res) => {
  res.json(fakeResult);
});

app.get("/auth/interview/new/:id", (req, res) => {
  const data = {
    questions: [
      "What is your name?",
      "What is your name?",
      "What is your name?",
      "What is your name?",
      "What is your name?",
      "Describe your strengths and weaknesses.",
      "Why do you want to work here?",
      "Where do you see yourself in 5 years?",
    ],
    duration: 500,
  };
  res.jsonp(data);
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
      <h1 class="name">${resumeData["personal-details"].fullName}</h1>
      <div class="contact-info">
        <p>Email: ${resumeData["personal-details"].email} | Phone: ${
    resumeData["personal-details"].phone
  }</p>
        <p>LinkedIn: ${resumeData["personal-details"].linkedin} | Website: ${
    resumeData["personal-details"].portfolio
  }</p>
      </div>
    </header>

    <div class="resume-content">
      <div class="column">
        <!-- Work Experience -->
        <section class="section">
          <h2 class="heading2">Work Experience</h2>
          ${resumeData["work-experience"].workExperience
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
          ].programmingLanguages.join(", ")}</p>
          <p><strong>Frameworks:</strong> ${resumeData[
            "skills"
          ].frameworks.join(", ")}</p>
          <p><strong>Tools:</strong> ${resumeData["skills"].tools.join(
            ", "
          )}</p>
          <p><strong>Soft Skills:</strong> ${resumeData[
            "skills"
          ].softSkills.join(", ")}</p>
          <p><strong>Other Skills:</strong> ${resumeData[
            "skills"
          ].otherSkills.join(", ")}</p>
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
  .work-experience .work-item {
    margin-bottom: 15px;
  }

  .work-experience p {
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
  fullName: "John Doe",
  dob: "1990-01-01",
  contactNumber: null,
  email: "john.doe@example.com",
  employeeId: "HAJ12235",
  departmentId: "None",
  designation: "Assistant Placement Officer",
  address: "123 Admin St, City, Country",
  profilePic: null, // Assume this is just filename or null
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
app.get("/auth/admin/college_profile", (req, res) => {
  res.json({ data: collegeProfile });
});

// PUT Admin Profile
app.post("/auth/admin/admin_profile", (req, res) => {
  const {
    fullName,
    dob,
    contactNumber,
    email,
    employeeId,
    designation,
    departmentId,
    address,
    profilePic,
  } = req.body;

  // Basic validation example
  if (!fullName || !contactNumber || !email || !address) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  adminProfile = {
    fullName,
    dob,
    contactNumber,
    email,
    employeeId,
    designation,
    departmentId,
    address,
    profilePic,
  };

  return res.json({
    message: "Admin profile updated successfully.",
  });
});

// PUT College Profile
app.post("/auth/admin/college_profile", (req, res) => {
  const {
    collegeName,
    collegeCode,
    collegeEmail,
    collegeContact,
    collegeAddress,
  } = req.body;

  if (!collegeName || !collegeCode || !collegeEmail) {
    return res
      .status(400)
      .json({ message: "Missing required college fields." });
  }

  collegeProfile = {
    collegeName,
    collegeCode,
    collegeEmail,
    collegeContact,
    collegeAddress,
  };

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
    rollNo: s.rollNo,
    branch: s.branch,
    cgpa: s.cgpa,
    isPlaced: s.isPlaced,
  }));

  res.json({
    students: trimmedStudents,
    totalPages,
  });
});

// GET /auth/admin/student/:id

const roles = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "Designer",
];
const locations = ["New York", "San Francisco", "Remote", "Austin"];

// Mock jobs data
const allJobs = Array.from({ length: 100 }).map((_, i) => {
  const role = roles[i % roles.length];
  const location = locations[i % locations.length];
  return {
    id: i + 1,
    role,
    company: `Company ${i + 1}`,
    location,
    remote: location === "Remote",
    experience: (i % 5) + 1,
    salary: 60000 + i * 1000,
    applications: (i * 7) % 50,
    deadline: new Date(
      Date.now() + (i % 30) * 24 * 60 * 60 * 1000
    ).toISOString(),
    status: i % 3 === 0 ? "Open" : "Closed",
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
    totalPages,
  });
});

app.get("/auth/admin/job/:jobId", (req, res) => {
  const jobId = parseInt(req.params.jobId, 10);
  const job = allJobs.find((j) => j.id === jobId);
  
  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  // Get pagination and filter params from the query
  const { page = 1, limit = 10, search = '', dateFilter = '' } = req.query;
  const currentPage = parseInt(page, 10);
  const perPage = parseInt(limit, 10);
  
  // Mock applicants data with random applied dates
  const shuffledApplicants = students.map(student => ({
    ...student,
    appliedAt: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000  // Random date in the past 30 days
    ).toISOString()
  }));

  // Apply search filter (by name or email)
  const filteredApplicants = shuffledApplicants.filter(applicant => {
    const searchTerm = search.toLowerCase();
    return (
      applicant.name.toLowerCase().includes(searchTerm) ||
      applicant.email.toLowerCase().includes(searchTerm)
    );
  });

  // Apply date filter (if available)
  const filteredByDate = dateFilter
    ? filteredApplicants.filter(applicant => {
        const appliedDate = new Date(applicant.appliedAt);
        const filterDate = new Date(dateFilter);
        return (
          appliedDate.getFullYear() === filterDate.getFullYear() &&
          appliedDate.getMonth() === filterDate.getMonth()
        );
      })
    : filteredApplicants;

  // Pagination logic
  const totalApplicants = filteredByDate.length;
  const totalPages = Math.ceil(totalApplicants / perPage);
  const paginatedApplicants = filteredByDate.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  // Only include the necessary fields
  const applicantsResponse = paginatedApplicants.map(applicant => ({
    id: applicant.id,
    name: applicant.name,
    branch: applicant.branch,
    usn: applicant.usn,
    email: applicant.email,
    appliedAt: applicant.appliedAt,
  }));

  // Respond with job details, paginated applicants, and pagination metadata
  res.json({
    job,
    applicants: applicantsResponse,
    totalPages,  // Total number of pages based on the filtered data
    currentPage,  // Current page number
  });
});


const jobb = {
    "jobTitle": "Software Engineer",
    "companyName": "Tech Corp",
    "jobLocation": "San Francisco, CA",
    "jobType": "Full-time",
    "applicationDeadline": "2023-12-31",
    "description": "We are looking for a passionate software engineer...",
    "requirements": "Proficiency in JavaScript, React, etc.",
    "otherRequirements": "Experience with cloud technologies",
    "salaryRange": "80,000 - 100,000 USD",
    "contactEmail": "jobs@techcorp.com",
    "eligibleBranches": ["Computer Science", "Electronics and Communication"],
    "cgpaRequirement": "7.5",
    "backlogRequirement": "No backlog",
    "jdPdf": null,
    "passoutYear": "2024"
}

app.get("/auth/admin/job/edit/:jobId", (req, res) => { 
  res.status(200).json({...jobb})
} );


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

app.post("/auth/admin/job/create", (req, res) => {
  res.status(200).json({
    msg: "Succesfull",
  });
});

const dept = [
  {"id" : "1", "name" : "CSE"},
  {"id" : "2", "name" : "ME"},
  {"id" : "3", "name" : "ISE"},
  {"id" : "4", "name" : "AIML"},
  {"id" : "5", "name" : "AIDS"},

]  

app.get("/auth/admin/department", (req,res)=>{
res.json(dept)

})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000`, port);
});
