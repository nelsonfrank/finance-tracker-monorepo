CREATE TYPE "account_type" AS ENUM (
  'bank',
  'credit',
  'wallet',
  'investment'
);

CREATE TYPE "category_type" AS ENUM (
  'income',
  'expense'
);

CREATE TYPE "transaction_type" AS ENUM (
  'income',
  'expense'
);

CREATE TYPE "period_type" AS ENUM (
  'weekly',
  'monthly',
  'yearly'
);

CREATE TYPE "investment_types" AS ENUM (
  'stock',
  'bond',
  'crypto',
  'fund'
);

CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "email" varchar NOT NULL,
  "password_hash" varchar NOT NULL,
  "first_name" varchar,
  "last_name" varchar,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "accounts" (
  "id" integer PRIMARY KEY,
  "user_id" integer NOT NULL,
  "name" varchar NOT NULL,
  "type" account_type NOT NULL,
  "balance" float DEFAULT 0,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "categories" (
  "id" integer PRIMARY KEY,
  "user_id" integer NOT NULL,
  "name" varchar NOT NULL,
  "type" category_type NOT NULL,
  "is_default" bool DEFAULT false,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "transactions" (
  "id" integer PRIMARY KEY,
  "user_id" integer NOT NULL,
  "account_id" integer NOT NULL,
  "category_id" integer NOT NULL,
  "amount" float NOT NULL,
  "type" transaction_type NOT NULL,
  "date" date NOT NULL,
  "description" text,
  "is_recurring" bool DEFAULT false,
  "metadata" jsonb,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "budgets" (
  "id" integer PRIMARY KEY,
  "user_id" integer NOT NULL,
  "category_id" integer NOT NULL,
  "amount" float NOT NULL,
  "period" period_type NOT NULL,
  "start_date" date NOT NULL,
  "end_date" date,
  "spent_amount" float DEFAULT 0,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "savings_goals" (
  "id" integer PRIMARY KEY,
  "user_id" integer NOT NULL,
  "name" varchar NOT NULL,
  "target_amount" float NOT NULL,
  "current_amount" float DEFAULT 0,
  "deadline" date,
  "progress" decimal DEFAULT 0,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "investments" (
  "id" integer PRIMARY KEY,
  "user_id" integer NOT NULL,
  "name" varchar NOT NULL,
  "type" investment_types NOT NULL,
  "initial_value" float NOT NULL,
  "current_value" float DEFAULT 0,
  "purchase_date" date NOT NULL,
  "metadata" jsonb,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE UNIQUE INDEX "idx_users_email" ON "users" ("email");

CREATE INDEX "idx_accounts_user_id" ON "accounts" ("user_id");

CREATE INDEX "idx_categories_user_id" ON "categories" ("user_id");

CREATE INDEX "idx_transactions_user_id" ON "transactions" ("user_id");

CREATE INDEX "idx_transactions_date" ON "transactions" ("date");

CREATE INDEX "idx_transactions_category_id" ON "transactions" ("category_id");

CREATE INDEX "idx_transactions_user_id_date" ON "transactions" ("user_id", "date");

CREATE INDEX "idx_budgets_user_id" ON "budgets" ("user_id");

CREATE INDEX "idx_budgets_category_id" ON "budgets" ("category_id");

CREATE INDEX "idx_savings_goals_user_id" ON "savings_goals" ("user_id");

CREATE INDEX "idx_investments_user_id" ON "investments" ("user_id");

CREATE INDEX "idx_investments_purchase_date" ON "investments" ("purchase_date");

ALTER TABLE "accounts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "categories" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "transactions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "transactions" ADD FOREIGN KEY ("account_id") REFERENCES "accounts" ("id");

ALTER TABLE "transactions" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "budgets" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "budgets" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "savings_goals" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "investments" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
