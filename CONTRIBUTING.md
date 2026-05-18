# Contributing to VaultMedic

Thank you for choosing to contribute to VaultMedic! We want to make contributing to this project as easy and safe as possible.

## Development Workflow

VaultMedic is structured as a unified **pnpm monorepo workspace**:
1. **Contracts**: Located in `contract/` (Rust/Soroban WASM crates).
2. **Backend API**: Located in `backend/` (Express, Drizzle ORM,vent Indexer).
3. **Frontend**: Located in `frontend/` (Next.js 15, Web Crypto subtle cryptography).

### Prerequisites
* Node.js v20.x+
* pnpm v10.x+
* Rust & Cargo v1.75+
* `stellar-cli` (Soroban CLI) for contract deployments.

---

## Step-by-Step setup

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Verify and test smart contracts**:
   ```bash
   # Run all cargo tests natively using the monorepo workspace filter
   pnpm --filter @vaultmedic/contracts test
   ```

3. **Database migrations**:
   Ensure you have configured your environment variables inside `backend/.env`, then push schema changes:
   ```bash
   pnpm --filter vaultmedic-backend db:generate
   pnpm --filter vaultmedic-backend db:push
   ```

4. **Launch development server**:
   ```bash
   pnpm dev
   ```

---

## Coding Standards & Style

* **TypeScript**: Ensure strict type-safety. Never use `any` unless explicitly required by external library typings.
* **Rust**: Format your contracts using `cargo fmt` and run `cargo clippy` before pushing code changes.
* **Git Commits**: Write clean, atomic commit messages detailing what you did and why.
