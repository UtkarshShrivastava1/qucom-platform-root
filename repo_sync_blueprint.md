# 🔁 Generic Blueprint: 1-Way Auto-Sync Between Two GitHub Repos

> **Purpose**: Set up automatic 1-way mirroring from **Project A (source)** → **Project B (mirror)**  
> **Model**: Every push to Project A automatically syncs to Project B  
> **Written for**: Agentic AI execution — follow steps sequentially

---

## 📋 Variables (Fill These Before Starting)

| Variable | Description | Example |
|---|---|---|
| `PROJECT_A_DIR` | Absolute local path to Project A | `d:\Projects\my-app` |
| `PROJECT_A_URL` | GitHub HTTPS URL of Project A | `https://github.com/username/project-a.git` |
| `PROJECT_B_URL` | GitHub HTTPS URL of Project B | `https://github.com/username/project-b.git` |
| `MAIN_BRANCH` | Branch to sync | `main` |
| `MIRROR_REMOTE_NAME` | Alias for Project B remote | `mirror` (or any name) |

---

## ✅ Preconditions (Verify Before Running)

**Agent must confirm ALL of these before proceeding:**

- [ ] Project A local repo exists at `PROJECT_A_DIR`
- [ ] Project A is a valid git repo (`git status` returns no errors)
- [ ] Project A has a remote named `origin` pointing to `PROJECT_A_URL`
- [ ] Project B GitHub repo exists and is accessible
- [ ] **CRITICAL**: Project B has NO independent commits after the point of divergence (i.e., no work was done directly on Project B that doesn't exist in Project A). If it does — those commits will be lost on force push. Confirm with user before proceeding.
- [ ] User has push access to both GitHub repos (authenticated via HTTPS token or SSH)

---

## 🚀 Setup Steps

### Step 1 — Navigate to Project A

```bash
# All commands must run from inside Project A's directory
cd PROJECT_A_DIR
```

---

### Step 2 — Add Project B as a named remote

```bash
git remote add MIRROR_REMOTE_NAME PROJECT_B_URL
```

**Verify it was added:**
```bash
git remote -v
# Should show MIRROR_REMOTE_NAME in the list
```

---

### Step 3 — Initial sync: push all of Project A to Project B

```bash
# Force push to overwrite Project B with Project A's full history
git push MIRROR_REMOTE_NAME MAIN_BRANCH --force
```

**Expected output pattern:**
```
Enumerating objects: N, done.
...
To PROJECT_B_URL
   <old_hash>..<new_hash>  MAIN_BRANCH -> MAIN_BRANCH
```

> [!CAUTION]
> `--force` overwrites Project B's history. Only run this after confirming preconditions above.

---

### Step 4 — Configure dual push URL on origin (enables auto-sync)

This makes every future `git push origin MAIN_BRANCH` push to **both repos simultaneously**.

```bash
# Add Project B as a second push destination on origin
git remote set-url --add --push origin PROJECT_B_URL

# Add Project A back (required — set-url --add replaces the default)
git remote set-url --add --push origin PROJECT_A_URL
```

**Verify the dual push is configured:**
```bash
git remote -v
```

**Expected output (origin section):**
```
origin   PROJECT_A_URL (fetch)
origin   PROJECT_B_URL (push)       ← mirror
origin   PROJECT_A_URL (push)       ← source
```

> [!IMPORTANT]
> Both push URLs must appear for origin. If only one shows, the sync will be incomplete.

---

### Step 5 — Verify with a test push

Make a trivial commit (or just push current state) and confirm both repos update:

```bash
git push origin MAIN_BRANCH
```

Then check both GitHub repos in the browser — they should show the same latest commit hash.

---

## 🔍 Verification Checklist (Agent Must Confirm)

After setup, verify:

- [ ] `git remote -v` shows **two push URLs** for `origin`
- [ ] Project B GitHub page shows the **same latest commit** as Project A
- [ ] A test `git push origin MAIN_BRANCH` completes without errors and updates both repos

---

## 🔧 Maintenance Rules (Enforce These Forever)

| Rule | Reason |
|---|---|
| ✅ Always push from Project A local only | Ensures sync flows correctly |
| ❌ Never push directly to Project B (GitHub UI, another machine, collaborators) | Will cause divergence — next force push will wipe it |
| ✅ If Project B diverges, re-run Step 3 (`--force`) to re-sync | Resets Project B to match Project A |
| ✅ Both URLs in `origin` push config must stay intact | If one gets removed, partial sync breaks |

---

## 🔄 Rollback / Remove Mirror (Optional)

If you ever want to stop syncing:

```bash
# Remove the mirror push URL from origin
git remote set-url --delete --push origin PROJECT_B_URL

# Optionally remove the standalone mirror remote
git remote remove MIRROR_REMOTE_NAME
```

---


