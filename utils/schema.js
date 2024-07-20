const { pgTable, serial, text, varchar } = require("drizzle-orm/pg-core");

export const mockInterView = pgTable("MockInterView", {
    id: serial("id").primaryKey(),
    mockInterView: text("mockInterView").notNull(),
    jobDescription: varchar("jobDescription").notNull(),
    jobPosition: varchar("jobPosition").notNull(),
    jobExperience: varchar("jobExperience").notNull(),
    createdAt: varchar("createdAt").notNull(),
    createdBy: varchar("createdBy").notNull(),
    mockId: varchar("mockId").notNull(),
})

export const userAnswer = pgTable("userAnswer", {
    id: serial("id").primaryKey(),
    question: varchar("question").notNull(),
    correctAns: text("correctAns").notNull(),
    userAns: text("userAns").notNull(),
    feedback: varchar("feedback").notNull(),
    rating: varchar("rating").notNull(),
    userEmail: varchar("userEmail").notNull(),
    createdAt: varchar("createdAt").notNull(),

    mockId: varchar("mockId").notNull(),
})