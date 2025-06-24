# 🧪 Automated Testing Example (Jest + Supertest)

This repository is a **Proof of Concept (PoC)** demonstrating automated testing implementation using **Jest** and **Supertest** on an **Express + Prisma** backend and a **React + TypeScript** frontend.

This PoC is part of my research to improve software quality, reduce manual testing effort, and establish a standardized testing practice that can be adopted by future team members.

---

## 🎯 Background

Manual testing is often time-consuming and prone to human error. By introducing automated testing:
- The testing process becomes faster and more reliable.
- Bugs are detected earlier, preventing costly errors before deployment.
- Test cases serve as up-to-date documentation for the team.

Read my full research findings here:  
🔗 [Research Documentation](https://docs.google.com/document/d/1zfoa54ngLM5td8KPrYTHlT3gR3NGdM6syPDN1jYHG0g/edit?tab=t.0)

---

## 🧠 Methodology

This PoC was carried out using a structured methodology:
- **Requirement Analysis** — Identify the most important features to test.
- **Prioritization (MoSCoW)** — Focus on Must Have tests first, followed by Should Have and Could Have.
- **Implementation** — Develop unit and integration tests with Jest and Supertest.
- **Evaluation** — Assess testing results and verify correctness against expectations.
- **Documentation** — Write clear testing guidelines so they can be adopted by future team members.

See my methodology in detail here:  
🔗 [Methodology Documentation](https://docs.google.com/document/d/1t0qrQK8yzZw9Yyyp3mMIpOu4DrIfEFXuM02ZXnZ-ZEI/edit?usp=sharing)

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express.js, Prisma ORM, PostgreSQL  
- **Frontend:** React, TypeScript, TanStack Query  
- **Testing Tools:** Jest, Supertest, Faker.js  
- **Mocking:** Jest mock functions for isolating tests

---

## ✅ Getting Started

1. **Clone this repository**:
   ```bash
   git clone https://github.com/Kezota/AutomatedTestingExample.git
   cd AutomatedTestingExample
   ```
2. **Install dependencies & run tests for the server**:
   ```bash
   cd server
   npm i
   npm test
   ```
3. **Install dependencies & run tests for the client**:
   ```bash
   cd ../client
   npm i
   npm test
   ```

📝 Notes
- Make sure you have Prisma installed and properly set up.
- Adjust your environment variables in .env as needed before running tests.
- Run npm i separately in both server and client directories.

