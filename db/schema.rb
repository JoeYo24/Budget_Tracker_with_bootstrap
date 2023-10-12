# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_10_10_211438) do

  create_table "goals", force: :cascade do |t|
    t.integer "user_id", null: false
    t.decimal "amount"
    t.string "description"
    t.date "target_date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "progress", limit: 2, default: 0
    t.index ["user_id"], name: "index_goals_on_user_id"
  end

  create_table "monthly_comparisons", force: :cascade do |t|
    t.integer "user_id", null: false
    t.decimal "savings"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.date "month"
    t.index ["user_id"], name: "index_monthly_comparisons_on_user_id"
  end

  create_table "savings_transactions", force: :cascade do |t|
    t.integer "user_id"
    t.decimal "amount", precision: 10, scale: 2
    t.string "description"
    t.date "date"
    t.integer "goal_id"
    t.boolean "applied", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "transaction_id", null: false
    t.index ["goal_id"], name: "index_savings_transactions_on_goal_id"
    t.index ["transaction_id"], name: "index_savings_transactions_on_transaction_id"
    t.index ["user_id"], name: "index_savings_transactions_on_user_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.string "token"
    t.integer "user_id"
    t.datetime "expires_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "transactions", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "description"
    t.decimal "amount"
    t.string "transaction_type"
    t.date "date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "goal_id"
    t.index ["user_id"], name: "index_transactions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "email", null: false
    t.integer "salary_after_tax", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.decimal "bank_savings", precision: 10, scale: 2, default: "0.0"
  end

  add_foreign_key "goals", "users"
  add_foreign_key "monthly_comparisons", "users"
  add_foreign_key "savings_transactions", "goals"
  add_foreign_key "savings_transactions", "transactions"
  add_foreign_key "savings_transactions", "users"
  add_foreign_key "sessions", "users"
  add_foreign_key "transactions", "users"
end
