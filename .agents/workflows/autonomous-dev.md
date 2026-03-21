---
description: Comprehensive Autonomous Development Loop (9-Agent Structure)
---

# 9-Agent Autonomous Loop

This workflow orchestrates a full team from Planning to Release, with a focus on Auditability and Compliance (Health Data).

## Workflow Steps

### 1. Planning & Design (PM + Architect + Data + Ethics)
- **PM**: Create `docs/PRD.md` and `docs/ACCEPTANCE.md`.
- **Architect**: Create `docs/ARCHITECTURE.md`.
- **Data Analyst**: Create `docs/DATA_DICTIONARY.md`.
- **Ethics**: Create `docs/ETHICS_REVIEW.md`.
- **Action**: Switch to `Mode: PLANNING`.

### 2. Implementation & Security (Dev + DevOps + Security)
- **Programmer**: Implement code according to `docs/PRD.md` and `docs/ARCHITECTURE.md`.
- **Security**: Create `docs/THREAT_MODEL.md` and check for secret leaks.
- **DevOps**: Setup `Dockerfile` and `docs/DEPLOYMENT.md`.
- **Action**: Switch to `Mode: EXECUTION`.

### 3. Verification & Quality (QA + PM)
- **QA**: Execute tests and update `docs/CHANGE_REQUESTS.md`.
- **Validation**:
  - If `BLOCKER` or `MAJOR` exists in `CHANGE_REQUESTS.md`: Return to **Step 2**.
  - If all criteria in `ACCEPTANCE.md` are PASS: Proceed.
- **Action**: Switch to `Mode: VERIFICATION`.

### 4. Documentation & Closing (Doc/UX + PM)
- **Doc/UX**: Generate `docs/USER_GUIDE.md`.
- **PM**: Verify all deliverables and close task.
- **Action**: Create `walkthrough.md` and notify user.

## Role Transitions
The agent identifies the required "role" based on the current step and switches context automatically. Any missing deliverable (e.g., missing `ETHICS_REVIEW.md` in a health project) is treated as a blocking error by the **PM** role.
